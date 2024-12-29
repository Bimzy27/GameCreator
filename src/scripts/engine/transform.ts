import { Vector2 } from "./vector2.js";

export class Transform {
    constructor(
        public position: Vector2 = new Vector2(0, 0),
        public rotation: number = 0,
        public scale: Vector2 = new Vector2(1, 1)
    ) {
    }
}