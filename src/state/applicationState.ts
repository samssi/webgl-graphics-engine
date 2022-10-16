import {Triangle} from "../interface/video";


export const applicationState = (() => {
    // TODO: objects and objectsToDraw as separate storages
    let triangles: Triangle[] = [];

    return {
        updateTriangles(newTriangles: Triangle[]): void {
            triangles = newTriangles;
        },
        triangles(): Triangle[] {
            return structuredClone(triangles);
        }
    }
})();