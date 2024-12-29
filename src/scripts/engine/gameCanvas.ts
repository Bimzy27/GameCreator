import { Scene } from "./scene.js";
import { Vector2 } from "./vector2.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

console.log("Canvas Script loaded");

if (ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, 150, 100);

    ctx.fillStyle = "red";
    ctx.fillRect(300, 300, 150, 100);
}

const scene = new Scene(new Vector2(canvas.width, canvas.height));

export function getScene(): Scene { return scene; };