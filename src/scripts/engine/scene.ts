import { GameObject } from "./gameObject.js";
import { Transform } from "./transform.js";
import { Vector2 } from "./vector2.js";

export class Scene {
    private size: Vector2;
    private canvasRenderer: CanvasRenderingContext2D;
    private gameObjects: GameObject[] = [];

    constructor(size: Vector2, canvasRenderer: CanvasRenderingContext2D) {
        this.size = size;
        this.canvasRenderer = canvasRenderer;
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

        this.render();
    }

    private render(): void {
        this.canvasRenderer.clearRect(0, 0, this.size.x, this.size.y);
        this.gameObjects.forEach((gameObject) => {
            if (gameObject.id === 'player') {
                this.canvasRenderer.fillStyle = "green";
            }
            else {
                this.canvasRenderer.fillStyle = "red";
            }
            const pos = gameObject.transform.getPosition();
            this.canvasRenderer.fillRect(pos.x, pos.y, 50, 50);
        });
    }
}