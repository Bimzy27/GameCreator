import { GameObjectData } from "./gameObjectData.js";
import { Vector2 } from "./vector2.js";

export class SceneData {
    private readonly id: string | undefined;
    private name: string;
    private readonly size: Vector2;
    private readonly gameObjectDatas: GameObjectData[];

    constructor(name: string, size: Vector2, gameObjectDatas: GameObjectData[], id?: string) {
        if (id)
        {
            this.id = id;
        }
        this.name = name;
        this.size = size;
        this.gameObjectDatas = gameObjectDatas;
    }

    public get Id(): string | undefined {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Size(): Vector2 {
        return this.size;
    }

    public get GameObjectDatas(): GameObjectData[] {
        return this.gameObjectDatas;
    }
}