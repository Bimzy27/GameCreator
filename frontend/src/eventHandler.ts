type Callback = (data: any) => void;

export class EventHandler {
    private static instance: EventHandler;

    private constructor() {}

    public static getInstance(): EventHandler {
        if (!EventHandler.instance) {
            EventHandler.instance = new EventHandler();
        }
        return EventHandler.instance;
    }

    private events: { [key: string]: Callback[] } = {};

    public subscribe(event: string, callback: Callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    public unsubscribe(event: string, callback: Callback) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    public publish(event: string, data: any) {
        if (!this.events[event]) return;

        this.events[event].forEach(callback => callback(data));
    }
}