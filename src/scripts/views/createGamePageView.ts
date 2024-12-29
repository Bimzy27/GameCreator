import { GameEngine } from '../engine/gameEngine.js';

const startGameBtn = document.getElementById('startGameBtn');
const stopGameBtn = document.getElementById('stopGameBtn');

if (startGameBtn) {
    startGameBtn.addEventListener('click', () => {
        GameEngine.getInstance().startGame();
    });
}

if (stopGameBtn) {
    stopGameBtn.addEventListener('click', () => {
        GameEngine.getInstance().stopGame();
    });
}