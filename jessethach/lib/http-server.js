const http = require('http');
const fs = require('fs');//eslint-disable-line
const greet = require(__dirname + '/greet');

var server = module.exports = exports = http.createServer((req, res) => {
  var timeRequested = {};
  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello world ');
    return res.end();
  }

  else if(req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    timeRequested = 'Time logged at ' + new Date().toString() + ' ';
    res.write(timeRequested);
    return res.end();
  }

  else if(req.method === 'GET' && req.url.startsWith('/greet')) {//req.url startswith credit to Natalie Chow
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var name = req.url.split('/')[2];
    res.write(greet(name));
    return res.end();
  }

  else if(req.method === 'POST' && req.url === '/greet') {
    var resBody= '';
    req.on('data', (chunk) => {
      resBody += chunk;
    });
    req.on('end', () => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(greet(JSON.parse(resBody).name));
      res.end();
    });
  }

  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Page not found ');
    return res.end();
  }
});

server.listen(3000, () => console.log('Server up'));//eslint-disable-line
