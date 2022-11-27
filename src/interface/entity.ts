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

export type Degrees = number;

export interface Transform {
    position: Vector2D;
    rotation: Degrees;
    scale: Vector2D;
}

export interface Entity {
    descriptor: Descriptor;
    points: Float32Array;
    transform: Transform;
}

export const createPointsWithDefaults = (descriptor: string, points: Float32Array): Entity => {
    return {
        descriptor,
        points: points,
        transform: {
            position: { x: 300, y: 200 },
            rotation: -365,
            scale: { x: 1, y: 1 }
        }}
}

const rectanglePoints = (x: number, y: number): Float32Array =>
    new Float32Array([
        -x, y,
        x, y,
        x, -y,

        -x, y,
        -x, -y,
        x, -y,
    ]);

export const createRectangleWithDefaults = (descriptor: string, width: number, height: number): Entity => {
    console.log(rectanglePoints(width, height));
    return createPointsWithDefaults(descriptor, rectanglePoints(width, height))
}

