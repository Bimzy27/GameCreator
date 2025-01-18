import { Resolver } from "./resolver.js";
import { engineEvent, EventService } from "./services/eventService.js";
import { SceneService } from "./services/sceneService.js";

export class GameEngine {
    private static instance: GameEngine;
    private gameRunning: boolean = false;
    private gameloop: NodeJS.Timeout | undefined = undefined;
    private lastUpdateTime: Date;

    private constructor() {
        this.lastUpdateTime = new Date();
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

    public resetGame(): void {
        this.stopGame();
        const scene = Resolver.resolve(SceneService).Scene;
        if (scene)
        {
            Resolver.resolve(EventService).publish(engineEvent.GameObjectsChanged);
            const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            scene.CanvasRenderer = ctx;
            scene.render();
        }
    }

    public resumeGame(): void {
        if (this.gameRunning) {
            console.log('Game already running');
            return;
        }
        
        const scene = Resolver.resolve(SceneService).Scene;
        if (!scene) {
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
        const scene = Resolver.resolve(SceneService).Scene;
        this.gameloop = setInterval(() => {
            if (scene) {
                const now = new Date();
                const deltaTime = now.getTime() - this.lastUpdateTime.getTime();
                const deltaTimeInSeconds = deltaTime / 1000;
                scene.update(deltaTimeInSeconds);
                this.lastUpdateTime = now;
            }
        }, msPerFrame);
        this.gameRunning = true;
    }
}