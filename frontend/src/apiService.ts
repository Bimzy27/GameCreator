import { GameObjectData } from "./engine/gameObjectData.js";
import { SceneData } from "./engine/sceneData.js";
import { Transform } from "./engine/transform.js";
import { Vector2 } from "./engine/vector2.js";

export class ApiService {
    private static instance: ApiService;

    private constructor() {}

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public async saveSceneAsync(sceneData: SceneData): Promise<void> {
        try {
            console.log("sceneData:")
            console.log(sceneData)
            const response = await fetch('/save-scene-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sceneData)
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

    public async loadScenesAsync(): Promise<SceneData[]> {
        try {
            const response = await fetch('/load-scenes-data');
            if (!response.ok) {
                throw new Error(JSON.stringify(response.json()));
            }
            const scenesData = await response.json();
            return scenesData.map(
                (scene: any) => {
                    console.log(scene);
                    const tmp = new SceneData(
                        scene.name, 
                        new Vector2(scene.size.x, scene.size.y), 
                        scene.gameObjectDatas.map(
                            (gameObject: any) => 
                                new GameObjectData(
                                    gameObject.name,
                                    new Transform(
                                        new Vector2(gameObject.transform.position.x, gameObject.transform.position.y),
                                        gameObject.transform.rotation,
                                        new Vector2(gameObject.transform.scale.x, gameObject.transform.scale.y),
                                    ))),
                        scene._id)
                    console.log(tmp);
                    return tmp;
                });
        } catch (error) {
            console.error('Error loading scenes:', error);
        }
        return [];
    }
}