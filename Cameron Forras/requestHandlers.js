var fs = require('fs');
var url = require('url');

function index(res) {
  var content = fs.readFileSync(__dirname + '/public/index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
};

function time(res) {
  var time = new Date().getTime();
  var date = new Date(time);
  res.write('The current server time is: ' + date);
  res.write(content);
  res.end();
};

function postGreeting(res, req) {
  var query = url.parse(req.url, true).query;
  var json = JSON.stringify(query);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Yo, you wrote your name as: ' + query.name);
  res.end();
};

exports.index = index;
exports.time = time;
exports.greet = greet;
exports.greetName = greetName;
exports.postGreeting = postGreeting;
