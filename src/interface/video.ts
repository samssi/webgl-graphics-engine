import {Triangle} from "../webgl/renderer/2d";

interface Video {
    drawTriangle(triangle: Triangle): void;
    drawTriangles(triangles: Triangle[]): void;
}