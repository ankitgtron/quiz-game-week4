const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public'); // public folder made here

const server = http.createServer((req, res) => {
    console.log(`Incoming request: ${req.url}`);

    if (req.url === '/' || req.url === '/index.html') {
        // index.html has been attached here
        const filePath = path.join(PUBLIC_DIR, 'index.html');
        serveFile(filePath, 'text/html', res);
    } 
    else if (req.url === '/questions') {
        // questions.json has been attached here
        const questionsFile = path.join(PUBLIC_DIR, 'questions.json');
        serveFile(questionsFile, 'application/json', res);
    } 
    else {
        // (CSS, JS) diplay files
        const filePath = path.join(PUBLIC_DIR, req.url);
        const ext = path.extname(filePath);

        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
        };

        if (mimeTypes[ext]) {
            serveFile(filePath, mimeTypes[ext], res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }
});

// Helper function to serve files
function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`, err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});