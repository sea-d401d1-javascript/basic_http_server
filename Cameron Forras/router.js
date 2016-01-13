var requestHandlers = require('requestHandlers');

function router(route, pathname, res, req) {
  if (pathname.match(/^\/greet\/.*/) && request.method === 'GET') {
    var name = pathname.substring(7);
    requestHandlers.greetName(res, name);
  };
  else if (typeof route[pathname] === 'function') {
    route[pathname](res, req);
  }
  else {
    console.log('No request handler found for ' + pathname);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  }
}

exports.router = router;
