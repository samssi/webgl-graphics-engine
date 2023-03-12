import {Degrees} from "../webgl/wgl-math";
import {Descriptor} from "../state/applicationState";

export interface Vector3d {
    x: number;
    y: number;
    z: number;
}

export interface Rotation {
    x: Degrees;
    y: Degrees;
    z: Degrees;
}

export interface Transform {
    position: Vector3d;
    rotation: Rotation;
    scale: Vector3d;
}

export interface Entity3d {
    descriptor: Descriptor;
    points: Float32Array;
    // TODO: temp solution
    colorPoints?: Uint8Array;
    transform: Transform;
}

export const resetTransform = (): Transform => ({
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    scale: {x: 1, y: 1, z: 1}
})

export const createEntityWithDefaults = (descriptor: string, points: Float32Array, colorPoints?: Uint8Array): Entity3d => {
    return {
        descriptor,
        points: points,
        colorPoints: colorPoints,
        transform: resetTransform()
    }
}