import { GameEngine } from "../gameEngine.js";

export class SceneSaverService {
    public async saveSceneAsync(): Promise<void> {
        const activeScene = GameEngine.ActiveScene;
        if (!activeScene) {
            console.log('No active scene to save');
            return;
        }
        
        const data = activeScene.Data;
        
        try {
            const response = await fetch('/save-scene-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log('Data saved successfully:', responseData);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
}