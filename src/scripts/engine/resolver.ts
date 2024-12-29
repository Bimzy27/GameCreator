export class Resolver {
    private static services: Map<string, any> = new Map<string, any>();

    private constructor() {
    }

    public static register<T>(service: T): void {
        const serviceName = (service as any).constructor.name;
        Resolver.services.set(serviceName, service);
    }

    public static resolve<T>(serviceClass: new (...args: any[]) => T): T {
        const serviceName = serviceClass.name;
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service not found: ${serviceName}`);
        }
        return service as T;
    }
}