import { GameObjectData } from "./gameObjectData.js";
import { Vector2 } from "./vector2.js";

export class SceneData {
    private readonly name: string;
    private readonly size: Vector2;
    private readonly gameObjectDatas: GameObjectData[];

    constructor(name: string, size: Vector2, gameObjectDatas: GameObjectData[]) {
        this.name = name;
        this.size = size;
        this.gameObjectDatas = gameObjectDatas;
    }

    public get Name(): string {
        return this.name;
    }

    public get Size(): Vector2 {
        return this.size;
    }

    public toJsonObject(): string {
        return JSON.stringify(this);
    }
}