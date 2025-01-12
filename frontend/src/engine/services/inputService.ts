export class InputService {
    private readonly keys: Map<string, boolean>;
    private readonly mouseButtons: Map<number, boolean>;
    private readonly mousePosition: { x: number, y: number };
    
    constructor() {
        this.keys = new Map<string, boolean>();
        this.mouseButtons = new Map<number, boolean>();
        this.mousePosition = { x: 0, y: 0 };
        
        window.addEventListener('keydown', (e) => {
            this.keys.set(e.key, true);
        });
        window.addEventListener('keyup', (e) => {
            this.keys.set(e.key, false);
        });
        window.addEventListener('mousedown', (e) => this.mouseButtons.set(e.button, true));
        window.addEventListener('mouseup', (e) => this.mouseButtons.set(e.button, false));
        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }
    
    public isKeyDown(key: string): boolean {
        return this.keys.get(key) || false;
    }
    
    public isMouseDown(button: number): boolean {
        return this.mouseButtons.get(button) || false;
    }
    
    public getMousePosition(): { x: number, y: number } {
        return this.mousePosition;
    }
}