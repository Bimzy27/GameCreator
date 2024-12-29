import { GameObject } from "./gameObject.js";
import { Transform } from "./transform.js";
import { Vector2 } from "./vector2.js";

export class Scene {
    private size: Vector2;
    private gameObjects: GameObject[] = [];

    constructor(size: Vector2) {
        this.size = size;
        this.gameObjects = [
            new GameObject('player', new Transform(this.center())),
            new GameObject('enemy', new Transform(this.center().add(new Vector2(100, 100))))
        ];
    }

    public center(): Vector2 {
        return this.size.divide(2);
    }

    public update(deltaTime: number): void {
        this.gameObjects.forEach((gameObject) => {
            gameObject.update(deltaTime);
        });
    }
}