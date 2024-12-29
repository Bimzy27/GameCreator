import { GameCanvas } from '../engine/gameCanvas.js';
import { GameEngine } from '../engine/gameEngine.js';

const startGameBtn = document.getElementById('startGameBtn');
const stopGameBtn = document.getElementById('stopGameBtn');
const resumeGameBtn = document.getElementById('resumeGameBtn');

if (startGameBtn) {
    startGameBtn.addEventListener('click', () => {
        const gameCanvas = new GameCanvas();
        GameEngine.getInstance().startGame(gameCanvas.getScene());
    });
}

if (stopGameBtn) {
    stopGameBtn.addEventListener('click', () => {
        GameEngine.getInstance().stopGame();
    });
}

if (resumeGameBtn) {
    resumeGameBtn.addEventListener('click', () => {
        GameEngine.getInstance().resumeGame();
    });
}