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
    objectCenter: Vector2D;
    position: Vector2D;
    rotation: Degrees;
    scale: Vector2D;
}

export interface Entity {
    descriptor: Descriptor;
    points: Float32Array;
    transform: Transform;
}

const min = (current: number, candidate: number) => Math.min(current, candidate);
const max = (current: number, candidate: number) => Math.max(current, candidate);
const minMaxAverage = (min: number, max: number) => (min + max) / 2;

export const centerOfAnObject = (points: Float32Array): Vector2D => {
    if (points.length < 2) {
        throw new Error('Points should have always minimum of two values!')
    }
    let minX = points[0];
    let maxX = points[0];
    let minY = points[1];
    let maxY = points[1];

    const updateX = (value: number) => {
        minX = min(minX, value);
        maxX = max(maxX, value);
    }

    const updateY = (value: number) => {
        minY = min(minY, value);
        maxY = max(maxY, value);
    }

    points.forEach((value: number, i: number) =>
        i % 2 === 0 ? updateX(value) : updateY(value)
    );

    return {
        x: -minMaxAverage(minX, maxX),
        y: -minMaxAverage(minY, maxY)
    }
}

export const createPointsWithDefaults = (descriptor: string, points: Float32Array): Entity => {
    return {
        descriptor,
        points: points,
        transform: {
            objectCenter: centerOfAnObject(points),
            position: { x: 0, y: 0 },
            rotation: 0,
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

