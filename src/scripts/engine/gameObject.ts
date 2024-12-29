import { Transform } from "./transform.js";

export class GameObject {
    private id: string;
    private transform: Transform;
    
    constructor(id: string, transform: Transform) {
        this.id = id;
        this.transform = transform;
    }

    public update(deltaTime: number): void {
        const speed = 1;
        this.transform.position.x += speed * deltaTime;
    }
}