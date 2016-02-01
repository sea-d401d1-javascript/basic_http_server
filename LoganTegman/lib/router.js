'use strict';

const url = require('url');

module.exports = {
  'GET': {
    '/time': (res) => writeRes(res, {time: new Date().toString()}),
    '/greet': (res, req) =>
      writeRes(res, 'Hello ' + url.parse(req.url).pathname.split('/')[2],
      'text/plain')
  },
  'POST': {
    '/greet': (res, req) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => writeRes(res,
        'Hello ' + JSON.parse(body).name, 'text/plain'));
      return;
    }
  },
  '404': (res) => writeRes(res, '404 Not Found', 'text/plain', 404)
};

// Write a message back.
// If not specified the contentType will be application/json and the
// status code will be 200
function writeRes(res, message, contentType, status) {
  contentType = contentType || 'application/json';
  status = status || 200;
  if (typeof message === 'object') message = JSON.stringify(message);
  res.writeHead(status, {'Content-Type': contentType});
  res.end(message);
}
