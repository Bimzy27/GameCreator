export class GameEngine {
    private static instance: GameEngine;
    private gameRunning: boolean = false;
    private gameloop: NodeJS.Timeout | null = null;

    // Private constructor to prevent direct instantiation
    private constructor() {
    }
    
    public static getInstance(): GameEngine {
        if (!GameEngine.instance) {
            GameEngine.instance = new GameEngine();
        }
        return GameEngine.instance;
    }

    public startGame(): void {
        if (this.gameRunning) {
            console.log('Game already running');
            return;
        }

        console.log('Game started');
        const FPS = 60;
        const msPerFrame = 1000 / FPS;
        this.gameloop = setInterval(() => {
            console.log('Update loop running... ');
        }, msPerFrame);
        this.gameRunning = true;
    }

    public stopGame(): void {
        if (!this.gameRunning) {
            console.log('Game already stopped');
            return;
        }

        if (this.gameloop) {
            clearInterval(this.gameloop);
            console.log('Game stopped');
        }
        this.gameRunning = false;
    }
}