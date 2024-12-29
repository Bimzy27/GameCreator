import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { GameEngine } from './scripts/engine/gameEngine.js';

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

const server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url || '');
    let pathname = `${__dirname}${parsedUrl.pathname}`;
    let ext = path.parse(pathname).ext;

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

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});