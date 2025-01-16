import { ApiService } from "../apiService.js";
import { engineEvent, EventService } from "../engine/services/eventService.js";
import { SceneData } from "../engine/sceneData.js";
import { Resolver } from "../engine/resolver.js";
import { SceneService } from "../engine/services/sceneService.js";

async function initializeAsync() {
    console.log('homePageView initialized');
    
    const createSceneBtn = document.getElementById('createSceneBtn');
    if (createSceneBtn) {
        createSceneBtn.addEventListener('click', () => {
            Resolver.resolve(SceneService).loadNewScene();
            Resolver.resolve(EventService).publish(engineEvent.ActivePageChanged, 'createLink');
        });
    }
    
    try {
        const scenes: SceneData[] = await ApiService.getInstance().loadScenesAsync();
        const sceneList = document.getElementById('sceneList') as HTMLUListElement;
        scenes.forEach((scene: SceneData) => {
            const li = document.createElement('li');
            li.textContent = scene.Name;
            
            const editSceneBtn = document.createElement('button');
            editSceneBtn.textContent = "Edit Scene";
            editSceneBtn.addEventListener('click', () => {
                Resolver.resolve(SceneService).loadScene(scene);
                Resolver.resolve(EventService).publish(engineEvent.ActivePageChanged, 'createLink');
            });
            li.appendChild(editSceneBtn);

            sceneList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading scenes:', error);
    }
}

Resolver.resolve(EventService).subscribe(engineEvent.ActivePageChangedCompleted, (activePage: string) => {
    if (activePage === 'homeLink') {
        initializeAsync();
    }
});

await initializeAsync();