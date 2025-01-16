import { InputService } from "./inputService.js";
import { Resolver } from "../resolver.js";
import { SceneService } from "./sceneService.js";
import { EventService } from "./eventService.js";

export class ServiceFactory {
    public static constructServices(): void {
        Resolver.register(new InputService());
        Resolver.register(new SceneService());
        Resolver.register(new EventService());
    }
}