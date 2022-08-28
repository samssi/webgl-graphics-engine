export type Functionality = "up" | "down" | "left" | "right" | "none";

export interface EventListener<InputEventType extends UIEvent> {
    type: keyof DocumentEventMap;
    eventFunction: (event: InputEventType) => void;
    options?: boolean;
}

export interface Input<InputEventType extends UIEvent> {
    listeners(): [EventListener<InputEventType>];
}