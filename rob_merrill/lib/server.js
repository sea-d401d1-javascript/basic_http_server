const http = require('http'),
      fs = require('fs'),
      url = require('url');

//req will receive info about HTTP request. res will send back the desired response

var server = http.createServer(function(req, res) {
  var resData = {};
  var name = req.url.split('/')[2];
  var queryObj = url.parse(req.url, true);

  if (req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/../public/index.html', 'utf8');
  }

  if (req.url === '/time' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = new Date().toString();
  }

  if (req.url === '/greet/' + name && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = 'Hello ' + name;
  }

  if (req.url === '/greet/' + name && req.method === 'POST') {
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify({Hello: name});
  }

  res.writeHead(resData.status || 400, {
    'Content-Type': resData.contentType || 'text/plain'
  });
  res.write(resData.data || 'not found');
  res.end();
});

  server.listen(3000, function() {
    console.log('Server up on port 3000');
});
