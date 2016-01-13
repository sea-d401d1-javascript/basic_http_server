const http = require('http');
const fs = require('fs');

var server = module.exports = exports = http.createServer((req, res) => {
  var name = req.url.slice(7);
  console.log(name);

  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html' || req.url === '/index')) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);
  }

  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('The current date and time of the server is: ' + new Date());
    return res.end();
  }

  if (req.method === 'GET' && req.url === ('/greet/' + name)) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('Hello there, ' + name.toUpperCase() + '!');
    return res.end();
  }

  if (req.method === 'POST' && req.url === '/greet') {
    req.on('data', function(data) {
      var jsonFormat = JSON.parse(data.toString());
      console.log(jsonFormat);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello there, ' + jsonFormat.name + '!');
      return res.end();
    });
  }

  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'Page not found'}));
  return res.end();
});

server.listen(3000, () => console.log('Server started!'));
