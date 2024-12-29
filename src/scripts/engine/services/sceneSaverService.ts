import { GameEngine } from "../gameEngine.js";

export class SceneSaverService {
    public saveScene(): void {
        const activeScene = GameEngine.ActiveScene;
        if (!activeScene) {
            console.log('No active scene to save');
            return;
        }
        
        const savedJson = activeScene.Data.toJsonObject();
        console.log('Scene saved');
        console.log(savedJson);
    }
}