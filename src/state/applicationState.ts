import {Triangle} from "../interface/video";


export const applicationState = (() => {
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