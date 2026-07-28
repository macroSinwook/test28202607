const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/profile' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      id: 1,
      name: 'Macro',
      email: 'macro@example.com'
    }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
