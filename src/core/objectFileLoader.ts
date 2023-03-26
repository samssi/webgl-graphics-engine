import {Entity3d, resetTransform} from "../interface/entity3d";
import {applicationState3d} from "../state/applicationState3d";

// TODO: just initially used to upscale object file points
const scaleFactor = 1500;

const fileExtension = (file: File) => {
    const filename = file.name;
    const fileExtensionsPosition = file.name.lastIndexOf(".");
    return fileExtensionsPosition > 0
        ?  filename.substring(fileExtensionsPosition)
        : ''
}

const storeFileContentAsEntity = (reader: FileReader) => {
    if (reader.result) {
        const fileContent = reader.result.toString();
        objectFileContentToEntity3d(fileContent);
    }
}

const fileToString = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => storeFileContentAsEntity(reader);
}

interface WavefrontObject {
    o: string;
    v: number[][];
    f: number[][][];
}

const parseObjectFileLineContent = (line: string): string => line.substring(2, line.length)

const parseV = (lineContent: string) =>
    [lineContent.split(" ").map(content => parseFloat(content) * scaleFactor)]

const parseF = (lineContent: string): number[][] => {
    const elements = lineContent.split(" ")
    const faces = elements.map(element => element.split("/"));
    return faces.map(face => face.map(element => parseFloat(element)))
}

const parsePointsFromObjectFile = (fileContent: string): WavefrontObject => {
    let o = "";
    let v: number[][] = [];
    let f: number[][][] = [];

    fileContent.split("\n").forEach(line => {
        if (line.startsWith("o ")) {
            o = parseObjectFileLineContent(line);
        }
        if (line.startsWith("v ")) {
            v.push(...parseV(parseObjectFileLineContent(line)));
        }
        if (line.startsWith("f ")) {
            f.push(parseF(parseObjectFileLineContent(line)));
        }
    })

    return {o, v, f};
}

const waveFrontObjectAsTrianglePoints = (wavefrontObject: WavefrontObject) => {
    const elements = wavefrontObject.f.flat();
    const positions = elements.map(element => element[0] - 1);
    if (positions.length % 3 !== 0) {
        throw new Error("Invalid amount of points to transform into triangles in WaveFront Object parsing");
    }
    return positions.map(position => wavefrontObject.v[position]);
}

// TODO: use waveform object file "o" as the descriptor
const objectFileContentToEntity3d = (fileContent: string) => {
    const wavefrontObject = parsePointsFromObjectFile(fileContent);
    console.log(wavefrontObject)

    const points = waveFrontObjectAsTrianglePoints(wavefrontObject);
    const entity: Entity3d = {
        // TODO: temp descriptor that replaces the default object with this one in
        // TODO: the renderer
        descriptor: "test",
        points: new Float32Array(points.flat()),
        transform: resetTransform()
    }
    applicationState3d.putEntity(entity);
}

export const objectFileLoader = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const [file] = target.files;
        console.log(`Read file called: ${file.name}`);
        fileExtension(file) === ".obj" && fileToString(file)
    }
}