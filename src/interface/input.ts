export type Functionality =
        "up" | "down" | "left" | "right" |
        "x-counter-clockwise" | "x-clockwise" |
        "y-counter-clockwise" | "y-clockwise" |
        "z-counter-clockwise" | "z-clockwise" |
        "scale-x+" | "scale-x-" |
        "scale-y+" | "scale-y-" |
        "reset" | "none";

export interface EventListener<InputEventType extends UIEvent> {
    type: keyof DocumentEventMap;
    eventFunction: (event: InputEventType) => void;
    options?: boolean;
}

export interface Listener<InputEventType extends UIEvent> {
    listeners(): [EventListener<InputEventType>];
}