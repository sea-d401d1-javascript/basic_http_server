var chai = require('chai');
var server = require(__dirname + '/../server');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
var request = chai.request;

describe('simple http server', function() {
  after(() => {
    server.close();
  });
  it('should have a time route', function(done) {
    request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql(server.time);
        done();
      });
  });

  it('should have a greet route', function(done) {
    request('localhost:3000')
      .get('/greet/bob')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('hello bob');
        done();
      });
  });

  it('should 404 on a nonexistent page', function(done) {
    request('localhost:3000')
      .get('/dne')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });
});
