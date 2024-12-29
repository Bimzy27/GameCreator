import { InputService } from "./inputService.js";
import { Resolver } from "./resolver.js";
import { Transform } from "./transform.js";
import { Vector2 } from "./vector2.js";

export class GameObject {
    public readonly id: string;
    public readonly transform: Transform;
    
    constructor(id: string, transform: Transform) {
        this.id = id;
        this.transform = transform;
    }

    public update(deltaTime: number): void {
        const speed = 50;
        if (this.id === 'player') {
            let movement = new Vector2(0, 0);
            
            const inputService: InputService = Resolver.resolve(InputService);
            if (inputService.isKeyDown('ArrowUp')) {
                movement.y = -1;
            }
            else if (inputService.isKeyDown('ArrowDown')) {
                movement.y = 1;
            }

            if (inputService.isKeyDown('ArrowLeft')) {
                movement.x = -1;
            }
            else if (inputService.isKeyDown('ArrowRight')) {
                movement.x = 1;
            }

            movement = movement.multiply(speed * deltaTime);
            console.log(movement);
            this.transform.translate(movement);
        }
        else {
            this.transform.translate(new Vector2(speed * deltaTime, 0));
        }
    }
}