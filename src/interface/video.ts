import {Descriptor} from "../state/applicationState";

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export interface Vector2D {
    x: number;
    y: number;
}

export type Triangle = [Vector2D, Vector2D, Vector2D];

export interface Transform {
    position: Vector2D;
    rotation: Vector2D;
    scale: Vector2D;
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
            position: { x: 0, y: 0 },
            rotation: { x: 0, y: 0 },
            scale: { x: 0, y: 0 }
        }}
}

const rectanglePoints = (x: number, y: number): Triangle[] =>
    [
        [
            {x: -x, y: y },
            {x: x, y: y },
            {x: x, y: -y },
        ],
        [
            {x: -x, y: y },
            {x: -x, y: -y },
            {x: x, y: -y },
        ]
    ]

export const createRectangleWithDefaults = (descriptor: string, width: number, height: number): Entity =>
    createTriangleWithDefaults(descriptor, rectanglePoints(width, height))

export const createGeometry = () => {

}