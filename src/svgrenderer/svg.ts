const svgElementOrFail = (svgConfig: SvgConfig, svgElement: HTMLElement): SVGElement => {
    const width = svgConfig.width;
    const height = svgConfig.height;

    if (svgElement instanceof SVGElement) {
        svgElement.setAttribute("viewBox", `${-width / 2}, ${-height / 2}, ${width}, ${height}`);
        svgElement.setAttribute("width", `${svgConfig.width}`);
        svgElement.setAttribute("height", `${svgConfig.height}`);
        return svgElement;
    }
    throw new Error("Invalid SVGElement! Are you passing <svg>-element?");
}

/*const vertexRender = (svgConfig: SvgConfig, svgElement: HTMLElement, vertices: XY[]) =>
    svgElementOrFail(svgConfig, svgElement).appendChild(createPolygonElement(svgConfig, vertices))*/

export type Points = [XY, XY, XY, ...XY[]];

export interface XY {
    x: number,
    y: number
}

export interface Polygon {
    points: Points;
    transform?: Transform;
}

export interface SvgConfig {
    style: string;
    width: number;
    height: number;
}

export interface Transform {
    scale?: [number, number],
    rotationDegrees?: number
}

export const defaultSvgConfig = (): SvgConfig => ({
    style: "fill:lime; stroke:purple; stroke-width:1;",
    width: 300,
    height: 300
})

const applyTransformations = (polygon: Polygon) => {
    let transform = "";
    if (polygon.transform) {
        if (polygon.transform.scale) {
            transform = `${transform}scale(${polygon.transform.scale.join(" ")})`;
        }
        if (polygon.transform.rotationDegrees) {
            transform = `${transform}rotate(${polygon.transform.rotationDegrees})`
        }
    }

    return transform;
}

const createPolygonElement = (svgConfig: SvgConfig, polygon: Polygon) => {
    const polygonElement = document.createElementNS("http://www.w3.org/2000/svg","polygon");
    polygonElement.setAttribute("points", asPolygonElementPoints(polygon.points));
    polygonElement.setAttribute("style", svgConfig.style);
    polygonElement.setAttribute("transform", applyTransformations(polygon));
    return polygonElement;
}

const asPolygonElementPoints = (points: XY[]) => {
    const polygonElementPoints = points.map(point => `${point.x},${point.y}`)
    return polygonElementPoints.join(" ");
}

export const clear = (svgConfig: SvgConfig, svgElement: HTMLElement) => svgElementOrFail(svgConfig, svgElement).replaceChildren();

/*export const renderVertices = (svgConfig: SvgConfig, svgElement: HTMLElement, vertices: XY[]) =>
    vertexRender(svgConfig, svgElement, vertices);*/

export const renderPolygon = (svgConfig: SvgConfig, svgElement: HTMLElement, polygon: Polygon) =>
    svgElementOrFail(svgConfig, svgElement).appendChild(createPolygonElement(svgConfig, polygon))

