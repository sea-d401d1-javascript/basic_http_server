const http = require('http');
const passURL = require('./lib/passURL').passURL;
const dateformat = require('dateformat');

var onRequest = function(req,res) {
  if( req.method === 'GET' && req.url === '/time'){
    res.writeHead(200,{'Content-Type':'text/plain'});
    var time = new Date();
    var currentTime = dateformat(time);
    res.write(currentTime);
    res.end();
  }

  if(req.method === 'GET' && req.url === '/greet/' + passURL(req.url).slice(7)){
    var name = passURL(req.url).slice(7);
    var object = {};
    object['greeting'] = name;
    res.writeHead(200,{'Content-Type':'application/json'});
    res.write(JSON.stringify(object));
    res.end();
  }

  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write('Welcome');
    res.end();
  }

  if(req.method === 'POST' && req.url === '/greet'){

    var body = '';
    req.on('data', function (data) {
      body += data;
    });

    req.on('end',function(){
      res.writeHead(200,{'Content-Type':'application/json'});
      res.write(JSON.stringify(body));
      res.end();
    });
  }
};

var server = http.createServer(onRequest);

server.listen(3000, function() {
  console.log('server up');
});
