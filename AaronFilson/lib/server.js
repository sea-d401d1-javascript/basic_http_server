var http = require('http');
var url = require('url');

var start = exports.start = function(route, handle){
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var greetRegex = /\/greet/ ;
    if(greetRegex.test(pathname)){
      pathname = '/greet'
    }
    console.log("Request for " + pathname + " received.");

    var contentVar = route(handle, pathname, request, response);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(contentVar);
    response.end();
  }
  var servHandle = http.createServer(onRequest).listen(3030);
  console.log("Server has started on port 3030.");
  var stopper = function(){
    servHandle.close();

  };

  var stop = exports.stop = stopper.bind(start);

};
