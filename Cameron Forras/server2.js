const http = require('http'),
      fs = require('fs');
      

var server = module.exports = exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/time') {
    var time = new Date()
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(JSON.stringify({msg: 'The date and time is: ' + time}))
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/greet') {
    var content = fs.readFile(__dirname + '/public/greet.html')
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(content);
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/greet/name') {

  }

  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'page not found'}));
  return res.end();
});

server.listen(3000, () => console.log('Yo, server is up!'));
