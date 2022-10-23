import {Descriptor} from "../state/applicationState";

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export type Triangle = [Vector3D, Vector3D, Vector3D];

export interface Transform {
    position: Vector3D;
    rotation: Vector3D;
    scale: Vector3D;
}


// TODO: Next version will contain entities
export interface Entity {
    descriptor: Descriptor;
    // TODO: entity will contain set of triangles to make the desired object
    // TODO: hint: make an array: Triangle[]
    triangles: Triangle[];
    transform: Transform;
}

export const createTriangleWithDefaults = (descriptor: string, triangles: Triangle[]): Entity => {
    return {
        descriptor,
        triangles: triangles,
        transform: {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0, y: 0, z: 0 }
        }}
}

const quadPoints = (x: number, y: number): Triangle[] => {
    return [
        [
            {x: -x, y: y, z: 0},
            {x: x, y: y, z: 0},
            {x: x, y: -y, z: 0},
        ],
        [
            {x: -x, y: y, z: 0},
            {x: -x, y: -y, z: 0},
            {x: x, y: -y, z: 0},
        ]
    ];
}

/*
export const createQuadWithDefaults = (descriptor: string, width: number, height: number): Entity => {
    const x = width / 2;
    const y = height / 2;


    const trianglesForQuad = createTriangleWithDefaults(descriptor, )
}
*/