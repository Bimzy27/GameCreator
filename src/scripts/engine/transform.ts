import { Vector2 } from "./vector2.js";

export class Transform {
    private position: Vector2;
    private rotation: number;
    private scale: Vector2;

    constructor(
        position: Vector2 = new Vector2(0, 0),
        rotation: number = 0,
        scale: Vector2 = new Vector2(1, 1)
    ) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    public getPosition(): Vector2 {
        return this.position;
    }

    public translate(translation: Vector2): void {
        this.position = this.position.add(translation);
    }
}