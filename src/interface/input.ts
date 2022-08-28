export type Functionality = "up" | "down" | "left" | "right" | "none";

export interface EventListener<K extends UIEvent> {
    type: keyof DocumentEventMap;
    eventFunction: (event: K) => void;
    options?: boolean;
}

export interface Input<K extends UIEvent> {
    listeners(): [EventListener<K>];
}