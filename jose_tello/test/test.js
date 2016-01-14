const chai     = require('chai');
const server   = require(__dirname + '/../server.js');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect   = chai.expect;
const request  = chai.request;

describe('test simple http server', () => {
  it('should have a time route returning date in JSON', (done) => {
    request('localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(server.date());
      console.log(server.date());
      debugger;
      done();
    });
  });
});
