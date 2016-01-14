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
      done();
    });
  });
  it('should greet the user when hits route /greet + name', (done) => {
    request('localhost:3000')
    .get('/greet/code_fellows')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Greetings code_fellows');
      done();
    });
  });
  it('should have a greet route that takes a post request', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send({ msg: 'hello world', password: '123' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
});
