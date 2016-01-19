'use strict';

const http = require('http');
const url = require('url');

exports.start = (port, router) => {
  const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url);
    const base = '/' + parsedURL.pathname.split('/')[1];
    console.log(req.method + ' request for ' + base);
    if (router[req.method] && router[req.method][base]) {
      return router[req.method][base](res, req);
    }
    console.log('404 router');
    return router['404'](res);
  });
  server.listen(port);
  return server;
};
