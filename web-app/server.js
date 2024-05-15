const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/products') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            fs.appendFileSync('./products.json', body);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Data added to products.json');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 5500;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
