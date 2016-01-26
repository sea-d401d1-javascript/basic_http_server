'use strict';

const path = require('path');
const server = require(path.join(__dirname, 'lib/server'));
const router = require(path.join(__dirname, 'lib/router'));

server.start(3000, router);

module.exports = server;
