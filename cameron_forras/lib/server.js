var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  var resData = {}
  if(req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
  }
});

server.listen(3000, function() {
  console.log('Yo, server up!');
});
