import { GameEngine } from '../engine/gameEngine.js';
import { Resolver } from '../engine/resolver.js';
import { SceneService } from '../engine/services/sceneService.js';
import { engineEvent, EventService } from '../engine/services/eventService.js';

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
}

Resolver.resolve(EventService).subscribe(engineEvent.ActivePageChangedCompleted, (activePage: string) => {
    GameEngine.getInstance().stopGame();
    if (activePage === 'createLink') {
        initialize();
    }
});

initialize();
