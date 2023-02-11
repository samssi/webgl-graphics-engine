export type Degrees = number;

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
export const rollover = (value: number, min: number, max: number) => {
    if (value > max) {
        return value % max;
    }
    if (value < min) {
        const abs = Math.abs(value);
        return max - (abs % max);
    }
    return value
}

export const degreesToRadians = (degrees: Degrees): number => {
    const angleInDegrees = 360 - rollover(degrees, 0, 360);
    return angleInDegrees * Math.PI / 180;
}