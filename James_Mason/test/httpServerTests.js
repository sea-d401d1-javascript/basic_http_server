var net = require('net'), chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect, request = chai.request;
describe('HTTP Server with Basic Routing', function() {
  before(function(done) {
    this.server = require(__dirname + '/../lib/httpServer');
    done();
  });
  after(function(done) {
    this.server.close(done);
  });
  it('Should return a personalized greeting when a client performs a GET request to "/greet/name".', function() {
    request('http://localhost:3000').get('/greet/aoifnaoij').end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Hello aoifnaoij');
      done();
    });
  });
  it('should return a personalized greeting when a client performs a POST request to /greet and sends a JSON object with a property, name.', function(done) {
    request('http://localhost:3000').post('/greet').send({name: 'jnglsdgj'}).end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Hello jnglsdgj\n');
      done();
    });
  });
  it('Should return the current server time when a client performs a GET request to "/time".', function(done) {
    request('http://localhost:3000').get('/time').end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text.indexOf('The current server time is')).to.eql(0);
      done();
    });
  });
});
