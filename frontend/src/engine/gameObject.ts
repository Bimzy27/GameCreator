import { InputService } from "./services/inputService.js";
import { Resolver } from "./resolver.js";
import { Transform } from "./transform.js";
import { Vector2 } from "./vector2.js";
import { GameObjectData } from "./gameObjectData.js";

export class GameObject {
    private data: GameObjectData;
    
    constructor(data: GameObjectData) {
        this.data = data;
    }

    public get Data(): GameObjectData {
        return this.data;
    }

    public update(deltaTime: number): void {
        const speed = 50;
        if (this.data.Name === 'player') {
            let movement = new Vector2(0, 0);
            
            const inputService: InputService = Resolver.resolve(InputService);
            if (inputService.isKeyDown('ArrowUp') || inputService.isKeyDown('w')) {
                movement.y = -1;
            }
            else if (inputService.isKeyDown('ArrowDown') || inputService.isKeyDown('s')) {
                movement.y = 1;
            }

            if (inputService.isKeyDown('ArrowLeft') || inputService.isKeyDown('a')) {
                movement.x = -1;
            }
            else if (inputService.isKeyDown('ArrowRight') || inputService.isKeyDown('d')) {
                movement.x = 1;
            }

            movement = movement.normalize();
            movement = movement.multiply(speed * deltaTime * 4);
            this.data.Transform.translate(movement);
        }
    }
}