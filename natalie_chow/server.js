const http = require('http');

var server = module.exports = exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write((new Date()).toString());
    return res.end();
  }

  if (req.method === 'GET' && req.url.startsWith('/greet')) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var name = req.url.split('/')[2];
    res.write('Hello ' + name);
    return res.end();
  }

  // handle POST request

  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write('page not found');
  res.end();
});

server.listen(3000, () => {
  console.log('server running on port 3000');
})
