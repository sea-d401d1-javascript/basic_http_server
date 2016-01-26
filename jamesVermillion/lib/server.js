const http = require('http');
const url = require('url');
var exports = module.exports;

exports.server = http.createServer(function(req, res){
  
  if(req.method === 'GET' && req.url.substring(0,7) === '/greet/'){
    var name = url.parse(req.url).pathname.substring(7);
    res.writeHead(200, {"Content-Type":"text/plain"}); //eslint-disable-line
    res.write(`hello ${name}`);
    res.end();
  }

  else if (req.method === 'POST' && req.url == '/greet') {
    var requestJSON = '';
    req.on('data', (data) => {
      requestJSON += data;
    });
    req.on('end', () => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(`hello ${(JSON.parse(requestJSON).name)}`);
      res.end();
    });
  }

  else if(req.method === 'GET' && req.url === '/time'){
    res.writeHead(200, {"Content-Type":"text/plain"}); //eslint-disable-line
    res.end(`The local time is: ${new Date()}`);
  }
  else {
    res.writeHead(404, {"Content-Type":"text/plain"}); //eslint-disable-line
    res.end('PAGE NOT FOUND. you gotta go!');
  }
    
   
}).listen(3000);

















// const http = require('http');
// const fs = require('fs');

// var server = module.exports = exports = http.createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/greet/*') {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.write(JSON.stringify({msg: 'hello world'}));
//     return res.end();
//   }

//   if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var index = fs.createReadStream(__dirname + '/public/index.html');
//     return index.pipe(res); 
//   }

//   res.writeHead(404, {'Content-Type': 'application/json'});
//   res.write(JSON.stringify({msg: 'page not found'}));
//   return res.end();
// });

// server.listen(3000, () => console.log('server up'));