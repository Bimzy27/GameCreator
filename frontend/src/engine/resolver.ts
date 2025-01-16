import { ServiceFactory } from "./services/serviceFactory.js";

export class Resolver {
    
    private static instance: Resolver;
    private services: Map<string, any> = new Map<string, any>();

    private constructor() {
    }

    public static getInstance(): Resolver {
        if (!Resolver.instance) {
            Resolver.instance = new Resolver();
            ServiceFactory.constructServices();
        }
        return Resolver.instance;
    }

    public static register<T>(service: T): void {
        const serviceName = (service as any).constructor.name;
        Resolver.getInstance().services.set(serviceName, service);
    }

    public static resolve<T>(serviceClass: new (...args: any[]) => T): T {
        const serviceName = serviceClass.name;
        const service = Resolver.getInstance().services.get(serviceName);
        if (!service) {
            throw new Error(`Service not found: ${serviceName}`);
        }
        return service as T;
    }
}