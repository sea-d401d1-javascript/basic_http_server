var url = require('url');

function start(request, response){
  console.log('in start handler');
  var contentVar = 'Hi. This is the index page. Try going to the /time or /greet pages, too.';
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(contentVar);
  response.end();
  return contentVar;
}

function time(request, response){
  console.log('in time handler');
  var myTime = new Date();
  console.log(myTime);
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write( myTime.toString());
  response.end();
  return myTime.toString();
}

function greet(request, response){
  console.log('in greet handler');
  console.log('the method is : ' + request.method);

  if(request.method == 'GET'){
    var pathname = url.parse(request.url).pathname;
    var greetStart = /\/greet\// ;
    var nStr = greetStart.exec(pathname);
    var nameStr = pathname.slice(nStr['index'] + 7);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Hello ' + nameStr);
    response.end();
    return nameStr;
  }

  if(request.method == 'POST'){
      request.on('data', function(chunk){
      var parserObj = JSON.parse(chunk.toString());
      var retStr = 'Hello ' + parserObj['name'];
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(retStr);
      response.end();
      return retStr;
    });
  }
}

exports.start = start;
exports.time = time;
exports.greet = greet;
