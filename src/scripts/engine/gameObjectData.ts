import { Transform } from "./transform.js";
import { generateUUID } from "./uuidUtils.js";

export class GameObjectData {
    private id: string;
    private name: string;
    private transform: Transform;

    constructor(name: string, transform: Transform) {
        this.id = generateUUID();
        this.name = name;
        this.transform = transform;
    }

    public get Id(): string {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public get Transform(): Transform {
        return this.transform;
    }

    public toJsonObject(): string {
        return JSON.stringify(this);
    }
}