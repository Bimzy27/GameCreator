import { Scene } from "./scene.js";
import { ServiceFactory } from "./serviceFactory.js";

export class GameEngine {
    private static instance: GameEngine;
    private gameRunning: boolean = false;
    private gameloop: NodeJS.Timeout | null = null;
    private activeScene: Scene | null = null;
    private lastUpdateTime: Date;

    // Private constructor to prevent direct instantiation
    private constructor() {
        this.lastUpdateTime = new Date();
        ServiceFactory.constructServices();
    }
    
    public static getInstance(): GameEngine {
        if (!GameEngine.instance) {
            GameEngine.instance = new GameEngine();
        }
        return GameEngine.instance;
    }

    public startGame(scene: Scene): void {
        if (this.gameRunning) {
            console.log('Game already running');
            return;
        }

        this.activeScene = scene;
        console.log('Game started');
        this.startLoopInterval();
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

    public resumeGame(): void {
        if (this.gameRunning) {
            console.log('Game already running');
            return;
        }

        if (!this.activeScene) {
            console.log('No active scene to resume');
            return;
        }

        console.log('Game resumed');
        this.startLoopInterval();
    }

    private startLoopInterval(): void {
        const FPS = 60;
        const msPerFrame = 1000 / FPS;
        this.lastUpdateTime = new Date();
        this.gameloop = setInterval(() => {
            if (this.activeScene) {
                const now = new Date();
                const deltaTime = now.getTime() - this.lastUpdateTime.getTime();
                const deltaTimeInSeconds = deltaTime / 1000;
                this.activeScene.update(deltaTimeInSeconds);
                this.lastUpdateTime = now;
            }
        }, msPerFrame);
        this.gameRunning = true;
    }
}