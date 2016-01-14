const http        = require('http');
const querystring = require('querystring');
const url         = require('url');
const PORT        = 3000;

var server = http.createServer(onRequest).listen(PORT);
var time = new Date().toISOString();
exports.time = time;

function onRequest(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1 style="text-align: center">Hello World</h1>');
  }
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(JSON.stringify({ time: time }));
    // trying to get input in url with substring
    res.write(req.url.substring(1, 0));
    res.end();
  }
  if (req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type':'text/plain'});
    req.on('data', (data) => {
      console.log(data.toString());
      res.write(data.toString());
      res.end();
    });
  }
}

console.log('Server is listening on port ' + PORT + '.');
