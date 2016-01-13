var server = require('server');
var router = require('router');
var requestHandlers = require('requestHandlers');

var route = {};
route['/'] = requestHandlers.index;
route['/time'] = requestHandlers.time;
route['/greet'] = requestHandlers.greet;
route['/postGreeting'] = requestHandlers.postGreeting;

server.start(router.router, route);
