const http = require('http');
const fs = require('fs');

exports.server = http.createServer((req, res) => {
  var name = req.url.slice(7);

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html' || req.url === '/index')) {
    console.log('Requested index page');
    res.writeHead(200, {'Content-Type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/../public/index.html');
    return index.pipe(res);
  } else if (req.method === 'GET' && req.url === '/time') {
    console.log('Requested time: ' + new Date());
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('The current date and time of the server is: ' + new Date());
    return res.end();
  } else if (req.method === 'GET' && req.url === ('/greet/' + name) && name.length > 0) {
    console.log(name + ' requested greeting');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello there, ' + name + '!');
    return res.end();
  } else if (req.method === 'POST' && req.url === '/greet') {
    console.log('Posted message to server');
    var fullData = '';
    req.on('data', (data) => {
      fullData += data;
    });
    req.on('end', () => {
      var jsonFormat = JSON.parse(fullData);
      var jsonText = 'Hello there, ' + jsonFormat.name + '!';
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(jsonText);
      return res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'Page not found'}));
    return res.end();
  }
});
