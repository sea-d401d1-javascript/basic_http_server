const http = require('http');
const fs = require('fs');

var server = module.exports = exports = http.createServer((req, res) => {
  var greet = {};
  var timeRequested = {};
  var name = {};
  if(req.method === 'GET' && req.url === '/') {
    console.log('Request for ' + req.url + ' received');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello world ');
    return res.end();
  };

  if(req.method === 'GET' && req.url === '/time') {
    console.log('Getting time');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    timeRequested = 'Time logged at ' + new Date().toString() + ' ';
    res.write(timeRequested);
    console.log(timeRequested);
    return res.end();
  };

  if(req.method === 'POST' && req.url === '/jesse') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    greet = 'Hello, ';
    name = req.url.split('/')[1].toUpperCase();
    res.write(greet + name);
    console.log(greet);
    return res.end();
  };

  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Page not found ');
  return res.end();
});

server.listen(3000, () => console.log('Server up'));
