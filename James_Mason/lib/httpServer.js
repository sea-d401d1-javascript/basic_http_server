module.exports = exports = require('http').createServer(function(req, res) {
  var messageToClient = 'Hello';
  if (req.method === 'GET') {
    if (req.url === '/time') messageToClient = 'The current server time is ' + (new Date()).getHours() + ':' + (new Date()).getMinutes() + ':' + (new Date()).getSeconds() + ' on ' + ((new Date()).getMonth() + 1) + '/' + (new Date()).getDate() + '/' + (new Date()).getFullYear();
    if (!!(req.url.indexOf('/greet/') + 1)) messageToClient = 'Hello ' + req.url.substr((req.url.lastIndexOf('/') + 1), req.url.length);
    writeMessageToClient(messageToClient, res);
  } else if (req.method === 'POST' && !!(req.url.indexOf('/greet') + 1) && req.headers['content-type'] === 'application/json') {
    req.on('data', function(data) {
      if (JSON.parse(data).hasOwnProperty('name')) messageToClient = 'Hello ' + (JSON.parse(data)['name']);
      writeMessageToClient(messageToClient, res);
    });
  }
}).listen(3000);
var writeMessageToClient = function(message, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  if (message !== '') response.write((message + '\n'));
  response.end();
};
