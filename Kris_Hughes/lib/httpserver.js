const http = require('http');

function gettingDate() {
  var now = new Date();
  var minutes = now.getMinutes();
  if(minutes < 10) minutes = "0" + minutes;  
  var datetime = (now.getMonth()+1) + "/" +
                  now.getDate() + "/" +
                  now.getFullYear() + " @ " +  
                  now.getHours() + ":" + 
                  minutes;
  return datetime;
}

var server = http.createServer((req,res) => {
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});   
    res.write(JSON.stringify({'msg': gettingDate() })); 
    return res.end();
  
  } else if (req.method === 'GET' && req.url === '/greet/' + (req.url).slice(7)) {
  	res.writeHead(200, {'Content-Type': 'application/json'});
  	var greeting = 'Hello ' + (req.url).slice(7);
    res.write(JSON.stringify({'msg': greeting })); 
    return res.end();
  
  } else if (req.method === 'POST' && req.url === '/greet') {
    
    req.on('data', (data) => {
      var nameGiven = JSON.parse(data.toString());
      console.log(nameGiven);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello ' + nameGiven.msg);
      return res.end();
    });

  } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({'msg': 'page not found'}));
      return res.end();
  }
});

server.listen(3000, () => { console.log('server started')});

module.exports = server;
module.exports.gettingDate = gettingDate;