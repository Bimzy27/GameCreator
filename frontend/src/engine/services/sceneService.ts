import { ApiService } from "../../apiService.js";
import { GameObjectData } from "../gameObjectData.js";
import { Resolver } from "../resolver.js";
import { Scene } from "../scene.js";
import { SceneData } from "../sceneData.js";
import { Transform } from "../transform.js";
import { Vector2 } from "../vector2.js";
import { engineEvent, EventService } from "./eventService.js";

export class SceneService {

    private scene: Scene | undefined;

    public async saveSceneAsync(): Promise<void> {
        if (!this.Scene) {
            console.log('No active scene to save');
            return;
        }
        
        const data = this.Scene.Data;
        await ApiService.getInstance().saveSceneAsync(data);
    }

    public loadScene(sceneData: SceneData): void {
        this.scene = new Scene(sceneData);
    }

    public loadNewScene(): void {
        const newSceneData = new SceneData("Game Scene", new Vector2(800, 600), [
            new GameObjectData('player', new Transform(new Vector2(400, 300))),
            new GameObjectData('enemy', new Transform(new Vector2(500, 400)))
        ]);
        this.loadScene(newSceneData);
    }

    public get Scene(): Scene | undefined {
        return this.scene;
    }

    public addGameObject(gameObjectData: GameObjectData)
    {
        this.Scene?.Data.GameObjectDatas.push(gameObjectData);
        this.Scene?.refresh();
        Resolver.resolve(EventService).publish(engineEvent.GameObjectsChanged);
    }
}