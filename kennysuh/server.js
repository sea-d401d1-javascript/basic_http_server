var http = require('http');

var server = module.exports = http.createServer(function(req, res) {
  if(req.method == 'GET' && req.url == '/time') {
    var time = module.exports.time = new Date().toString();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: time}));
    return res.end();
  }

  if(req.method == 'GET' && req.url.indexOf('/greet/') == 0) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'hello ' + req.url.slice(req.url.indexOf('t/') + 2)}));
    return res.end();
  }

  if(req.method == 'POST' && (req.url == '/greet')) {
    req.on('data', function(data) {
      var text = JSON.parse(data.toString()).msg;
      res.write(JSON.stringify({msg: 'hello ' + text}));
    });

    req.on('end', function() {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end();
    });

    return;
  }

  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'page not found'}))
  return res.end();
});

server.listen(3000, function() {
  console.log('server up');
})
