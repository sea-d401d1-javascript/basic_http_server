const http = require('http');
const querystring = require('querystring');
const PORT = 3000;
const request = require('superagent');

var server = http.createServer(onRequest).listen(PORT);

function onRequest(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1 style="text-align: center">Hello World</h1>');
  }
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type':'text/html'});
    var time = new Date();
    res.write('<h1 style="text-align: center">' + time.toISOString() + '</h1>');
  }
  if (req.method === 'GET' && req.url === '/greet/name' + req.url) {
    res.writeHead(200, {'Content-Type':'text/html'})
    res.write('<h1 style"text-align: center">Greetings ' + req.url);
  }
  if (req.method === 'POST' && req.url === '/greet') {
    res.writeHead(200, {'Content-Type':'text/plain'});
    req.on('data', (data) => {
      console.log(data.toString());
      res.write(data.toString());
      res.end()
    });
  }
}

request
  .post('/greet')
  .set('Content-Type', 'application/json')
  .send({ name: 'tj' })
  .send({ pet: 'tobi' })
  .end((err, res) => {
    if (err || !res.ok) return 'Error.'
    return JSON.stringify(res.body);
  });


console.log('Server is listening on port ' + PORT + '.');
