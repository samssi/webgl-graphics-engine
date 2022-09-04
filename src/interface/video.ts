export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export type Triangle = [Vector3D, Vector3D, Vector3D];

interface Video {
    drawTriangles(triangles: Triangle[]): void;
}