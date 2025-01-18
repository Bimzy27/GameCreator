import { GameEngine } from '../engine/gameEngine.js';
import { Resolver } from '../engine/resolver.js';
import { SceneService } from '../engine/services/sceneService.js';
import { engineEvent, EventService } from '../engine/services/eventService.js';
import { SceneData } from '../engine/sceneData.js';
import { GameObjectData } from '../engine/gameObjectData.js';
import { Scene } from '../engine/scene.js';
import { Transform } from '../engine/transform.js';
import { Vector2 } from '../engine/vector2.js';

function initialize() {
    console.log('gameEditorPageView initialized');

    const sceneIdLbl = document.getElementById('sceneIdLbl') as HTMLLabelElement;
    const sceneNameInput = document.getElementById('sceneNameInput') as HTMLInputElement;
    const playStatusLbl = document.getElementById('playStatusLbl');
    const startGameBtn = document.getElementById('startGameBtn');
    const stopGameBtn = document.getElementById('stopGameBtn');
    const resumeGameBtn = document.getElementById('resumeGameBtn');
    const saveGameBtn = document.getElementById('saveGameBtn');
    const closeGameBtn = document.getElementById('closeGameBtn');
    const addGameObjectBtn = document.getElementById('addGameObjectBtn');

    GameEngine.getInstance().resetGame();

    const scene = Resolver.resolve(SceneService).Scene;
    if (scene) {
        sceneIdLbl.innerText = scene.Data.Id ?? "No Id";
        sceneNameInput.value = scene.Data.Name;
    }

    function setPlayStatusLbl(text: string) {
        if (playStatusLbl) {
            playStatusLbl.textContent = text;
        }
    }

    if (sceneNameInput) {
        sceneNameInput.addEventListener('input', () => {
            const activeScene = Resolver.resolve(SceneService).Scene;
            if (activeScene)
            {
                activeScene.Data.Name = sceneNameInput.value;
            }
        });
    }

    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            GameEngine.getInstance().startGame();
            setPlayStatusLbl('Playing..');
        });
    }

    if (stopGameBtn) {
        stopGameBtn.addEventListener('click', () => {
            GameEngine.getInstance().stopGame();
            setPlayStatusLbl('Stopped..');
        });
    }

    if (resumeGameBtn) {
        resumeGameBtn.addEventListener('click', () => {
            GameEngine.getInstance().resumeGame();
            setPlayStatusLbl('Playing..');
        });
    }

    if (saveGameBtn) {
        saveGameBtn.addEventListener('click', () => {
            GameEngine.getInstance().stopGame();
            Resolver.resolve(SceneService).saveSceneAsync();
        });
    }

    if (closeGameBtn) {
        closeGameBtn.addEventListener('click', () => {
            GameEngine.getInstance().stopGame();
            Resolver.resolve(EventService).publish(engineEvent.ActivePageChanged, 'homeLink');
        });
    }

    if (addGameObjectBtn) {
        addGameObjectBtn.addEventListener('click', () => {
            Resolver.resolve(SceneService).addGameObject(new GameObjectData("GameObject", new Transform(new Vector2(0, 0), 0, new Vector2(1, 1))));
        });
    }
}

Resolver.resolve(EventService).subscribe(engineEvent.ActivePageChangedCompleted, (activePage: string) => {
    GameEngine.getInstance().stopGame();
    if (activePage === 'createLink') {
        initialize();
    }
});

Resolver.resolve(EventService).subscribe(engineEvent.GameObjectsChanged, () => {
    const gameObjectList = document.getElementById('gameObjectList') as HTMLUListElement;
    gameObjectList.innerHTML = '';
    const scene: Scene | undefined = Resolver.resolve(SceneService).Scene;

    if (scene)
    {
        scene.Data.GameObjectDatas.forEach((god: GameObjectData) => {
            const li = document.createElement('li');
            li.textContent = god.Name;
            
            const editGOBtn = document.createElement('button');
            editGOBtn.textContent = "Edit";
            editGOBtn.addEventListener('click', () => {
                //TODO
            });
            li.appendChild(editGOBtn);
    
            gameObjectList.appendChild(li);
        });
    }
});

initialize();
