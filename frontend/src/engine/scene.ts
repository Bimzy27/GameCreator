import { error } from "console";
import { GameObject } from "./gameObject.js";
import { SceneData } from "./sceneData.js";

export class Scene {
    private data: SceneData;
    private canvasRenderer: CanvasRenderingContext2D | undefined;
    private gameObjects: GameObject[] = [];

    constructor(data: SceneData) {
        this.data = data;
        this.gameObjects = data.GameObjectDatas.map((data) => new GameObject(data));
    }

    public get Data(): SceneData {
        /* const gameObjectDatas = this.gameObjects.map((gameObject) => gameObject.Data);
        this.data = new SceneData(this.data.Name, this.data.Size, gameObjectDatas); */
        return this.data;
    }

    public update(deltaTime: number): void {
        this.gameObjects.forEach((gameObject) => {
            gameObject.update(deltaTime);
        });

        this.render();
    }

    private render(): void {
        if (!this.canvasRenderer)
        {
            console.error("canvasRenderer is undefined");
            return;
        }

        this.canvasRenderer.clearRect(0, 0, this.data.Size.x, this.data.Size.y);
        this.gameObjects.forEach((gameObject) => {
            if (gameObject.Data.Name === 'player') {
                this.canvasRenderer!.fillStyle = "green";
            }
            else {
                this.canvasRenderer!.fillStyle = "red";
            }
            const pos = gameObject.Data.Transform.getPosition();
            this.canvasRenderer!.fillRect(pos.x, pos.y, 50, 50);
        });
    }

    public set CanvasRenderer(canvasRenderer: CanvasRenderingContext2D) {
        this.canvasRenderer = canvasRenderer;
    }
}