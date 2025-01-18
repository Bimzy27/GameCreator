type Callback = (data: any) => void;

export enum engineEvent{
    SceneLoaded,
    ActivePageChanged,
    ActivePageChangedCompleted,
    GameObjectsChanged,
}

export class EventService {
    private events: { [key: string]: Callback[] } = {};

    constructor() {
        for (const key of Object.keys(engineEvent)) {
            const numKey = Number(key);
            if (!isNaN(numKey)) {
                this.events[numKey] = [];
            }
        }
    }

    public subscribe(event: engineEvent, callback: Callback) {
        if (!this.events[event]) return;

        this.events[event].push(callback);
    }

    public unsubscribe(event: engineEvent, callback: Callback) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    public publish(event: engineEvent, data?: any) {
        if (!this.events[event]) return;

        this.events[event].forEach(callback => callback(data));
    }
}