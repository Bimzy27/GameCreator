import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { loadScenesDataAsync, saveSceneDataAsync } from './routes/sceneRoutes.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mimeTypes: { [key: string]: string } = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.wasm': 'application/wasm'
};

const server = http.createServer(async (req, res) => {
    let parsedUrl = url.parse(req.url || '');
    let pathname = `${__dirname}${parsedUrl.pathname}`;
    let ext = path.parse(pathname).ext;

    if (req.method === 'GET' && parsedUrl.pathname === '/load-scenes-data') {
        try {
            const scenes = await loadScenesDataAsync();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(scenes));
        } catch (err) {
            console.error('hello world');
            console.error('Failed to load scenes:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to load scenes' }));
        }
        return;
    }

    if (req.method === 'POST' && parsedUrl.pathname === '/save-scene-data') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                await saveSceneDataAsync(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data saved successfully' }));
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });
        return;
    }

    if (ext == '') {
        pathname += 'index.html';
        ext = '.html';
    }

    pathname = pathname.split('/').join('\\');

    fs.exists(pathname, (exist) => {
        if (!exist) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("404 Not Found");
            return;
        }

        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end("500 Internal Server Error");
                return;
            }

            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
            res.end(data);
        });
    });
});

await server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});