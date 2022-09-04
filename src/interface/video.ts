export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export type Triangle = [Vector3D, Vector3D, Vector3D];

// TODO: Next version will contain entities
export interface Entity {
    entity: Triangle[];
    translation: Vector3D[];
    rotation: Vector3D[];
    scale: Vector3D[];
}