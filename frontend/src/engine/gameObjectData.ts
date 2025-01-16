import { Transform } from "./transform.js";

export class GameObjectData {
    private name: string;
    private transform: Transform;

    constructor(name: string, transform: Transform) {
        this.name = name;
        this.transform = transform;
    }

    public get Name(): string {
        return this.name;
    }

    public get Transform(): Transform {
        return this.transform;
    }
}