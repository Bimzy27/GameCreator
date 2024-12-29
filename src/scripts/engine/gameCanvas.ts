import { Scene } from "./scene.js";
import { Vector2 } from "./vector2.js";

export class GameCanvas {
    private readonly scene: Scene;
    constructor() {
        const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.scene = new Scene(new Vector2(canvas.width, canvas.height), ctx);
    }    
    public getScene(): Scene { return this.scene; };
}