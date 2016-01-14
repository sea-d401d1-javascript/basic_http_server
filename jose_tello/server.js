const http        = require('http');
const querystring = require('querystring');
const url         = require('url');
const PORT        = 3000;

var server = http.createServer(onRequest).listen(PORT);

function date() {
  var time = new Date().toISOString();
  return time;
}

function onRequest(req, res) {
  // try to get url as string from req object
  var urlString = req.url.substring(1, req.url.length);
  var newUrl = urlString.indexOf('/')
  console.log(newUrl > -1);
  if (newUrl > -1) {
    var endpoint = urlString.split('/', 2)
    console.log(endpoint[1]);
    req.method === 'GET';
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write('Greetings ' + endpoint[1]);
    res.end();
  }
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1 style="text-align: center">Hello World</h1>');
  }
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('GIBBITY FLIBBITY, CRAIG');
    debugger;
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
