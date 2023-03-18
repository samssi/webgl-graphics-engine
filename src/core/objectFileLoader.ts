import {Entity3d, resetTransform} from "../interface/entity3d";

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
        console.log(objectFileContentToEntity3d(fileContent));
    }
}

const fileToString = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => storeFileContentAsEntity(reader);
}

interface WavefrontObject {
    o: string;
    v: string[];
}

const parseObjectFileLineContent = (line: string) => line.substring(2, line.length)

const parseV = (lineContent: string) => lineContent.split(" ")

const parsePointsFromObjectFile = (fileContent: string): WavefrontObject => {
    let o = "";
    let v: string[] = [];

    fileContent.split("\n").forEach(line => {
        if (line.startsWith("o ")) {
            o = parseObjectFileLineContent(line);
        }
        if (line.startsWith("v ")) {
            v.push(...parseV(parseObjectFileLineContent(line)));
        }
    })

    return {o, v};
}

// TODO: use waveform object file "o" as the descriptor
const objectFileContentToEntity3d = (fileContent: string) => {
    /*const entity: Entity3d = {
        descriptor: fileName,
        points: parsePointsFromObjectFile(fileContent),
        transform: resetTransform()
    }*/
    console.log(parsePointsFromObjectFile(fileContent))
}

export const objectFileLoader = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const [file] = target.files;
        console.log(`Read file called: ${file.name}`);
        fileExtension(file) === ".obj" && fileToString(file)
    }
}