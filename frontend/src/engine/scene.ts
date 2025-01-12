import { GameObject } from "./gameObject.js";
import { SceneData } from "./sceneData.js";
import { Transform } from "./transform.js";
import { Vector2 } from "./vector2.js";

export class Scene {
    private data: SceneData;
    private readonly canvasRenderer: CanvasRenderingContext2D;
    private gameObjects: GameObject[] = [];

    constructor(name: string, size: Vector2, canvasRenderer: CanvasRenderingContext2D) {
        const center = size.divide(2);
        this.gameObjects = [
            new GameObject('player', new Transform(center)),
            new GameObject('enemy', new Transform(center.add(new Vector2(100, 100))))
        ];
        const gameObjectDatas = this.gameObjects.map((gameObject) => gameObject.Data);
        this.data = new SceneData(name, size, gameObjectDatas);
        this.canvasRenderer = canvasRenderer;   
    }

    public get Data(): SceneData {
        const gameObjectDatas = this.gameObjects.map((gameObject) => gameObject.Data);
        this.data = new SceneData(this.data.Name, this.data.Size, gameObjectDatas);
        return this.data;
    }

    public update(deltaTime: number): void {
        this.gameObjects.forEach((gameObject) => {
            gameObject.update(deltaTime);
        });

        this.render();
    }

    private render(): void {
        this.canvasRenderer.clearRect(0, 0, this.data.Size.x, this.data.Size.y);
        this.gameObjects.forEach((gameObject) => {
            if (gameObject.Data.Name === 'player') {
                this.canvasRenderer.fillStyle = "green";
            }
            else {
                this.canvasRenderer.fillStyle = "red";
            }
            const pos = gameObject.Data.Transform.getPosition();
            this.canvasRenderer.fillRect(pos.x, pos.y, 50, 50);
        });
    }
}