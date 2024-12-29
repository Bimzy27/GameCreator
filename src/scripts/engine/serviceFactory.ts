import { InputService } from "./inputService.js";
import { Resolver } from "./resolver.js";

export class ServiceFactory {
    public static constructServices(): void {
        Resolver.register(new InputService());
    }
}