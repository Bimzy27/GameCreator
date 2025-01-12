import { EventHandler } from "../eventHandler.js";

async function connectToDatabaseViaBackend() {
    try {
        console.log('Connecting to database...');
        const response = await fetch('/connect-to-db');
        if (!response.ok) {
            throw new Error('Failed to connect to database');
        }
        const dbConnections = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

const statusLbl = document.getElementById('statusLbl');
if (statusLbl) {
    statusLbl.textContent = 'Connecting to DB...';
    await connectToDatabaseViaBackend();
    statusLbl.textContent = 'Connected to DB';
    EventHandler.getInstance().publish('activePageChanged', 'createLink');
}