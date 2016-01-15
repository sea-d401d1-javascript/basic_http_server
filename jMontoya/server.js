const http = require('http'),
      fs = require('fs');
var date = new Date(),
    currentTime = date.toString(),
    PORT = 3000;

var server = http.createServer(function(request, response) {

  var responseData = {},
      urlPath =request.url.split('/'),
      url = request.url,
      rD = responseData;

  function writeResponse() {
    response.writeHead(rD.status || 404, {
      'Content-Type': rD.contentType || 'text/plain'
    });
    response.write(rD.data || 'not found');
    response.end();
  }   //end writeResponse function

  if (url === '/' && request.method === 'GET') {
    rD.status = 200;
    rD.contentType = 'text/html';
    rD.data = fs.readFileSync(__dirname + '/public/index.html');
    writeResponse();
  } else if (urlPath[1] === 'greet' && request.method === 'GET') {
      rD.status = 200;
      rD.contentType = 'text/plain';
      var name = request.url.substring(7, request.url.length);
      rD.data = 'Hola my amigo ' + name + '.';
      writeResponse();
  } else if (urlPath[1] = 'greet' && request.method === 'POST') {
      rD.status = 200;
      rD.contentType = 'text/plain';
      rD.data = 'post detected';

      request.on('data', function(data) {
        var obj = JSON.parse(data);
        rD.data = 'Hola ' + obj.name + '.';
        writeResponse();
      });
  } else if(urlPath[1] = 'time' && request.method === 'GET') {
      rD.status = 200;
      rD.contentType = 'text/plain';
      rD.data = currentTime;
      writeResponse();
    }
});   //end http.createServer function

server.listen(PORT, function() {
  console.log('server up');
});
