import { InputService } from "./inputService.js";
import { Resolver } from "../resolver.js";
import { SceneSaverService } from "./sceneSaverService.js";

export class ServiceFactory {
    public static constructServices(): void {
        Resolver.register(new InputService());
        Resolver.register(new SceneSaverService());
    }
}