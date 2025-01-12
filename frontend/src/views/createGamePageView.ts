import { GameCanvas } from '../engine/gameCanvas.js';
import { GameEngine } from '../engine/gameEngine.js';
import { Resolver } from '../engine/resolver.js';
import { SceneSaverService } from '../engine/services/sceneSaverService.js';
import { EventHandler } from '../eventHandler.js';

function initialize() {
    console.log('createGamePageView initialized');
    const playStatusLbl = document.getElementById('playStatusLbl');
    const startGameBtn = document.getElementById('startGameBtn');
    const stopGameBtn = document.getElementById('stopGameBtn');
    const resumeGameBtn = document.getElementById('resumeGameBtn');
    const saveGameBtn = document.getElementById('saveGameBtn');

    GameEngine.getInstance().resetGame();

    function setPlayStatusLbl(text: string) {
        if (playStatusLbl) {
            playStatusLbl.textContent = text;
        }
    }

    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            const gameCanvas = new GameCanvas();
            GameEngine.getInstance().startGame(gameCanvas.getScene());
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
            Resolver.resolve(SceneSaverService).saveSceneAsync();
        });
    }
    
    EventHandler.getInstance().subscribe('activePageChangedComplete', (activePage: string) => {
        if (activePage === 'createLink') {
            initialize();
        }
    });
}

initialize();
