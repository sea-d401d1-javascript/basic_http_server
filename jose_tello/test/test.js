const chai     = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect   = chai.expect;
const request  = chai.request;

var server = require(__dirname + '/../server.js');

describe('test simple http server', () => {
  
})
