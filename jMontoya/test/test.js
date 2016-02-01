const chai = require('chai'),
      chaihttp = require('chai-http');
chai.use(chaihttp)

const expect = chai.expect;
require(__dirname + '/../server');

var server = 'localhost:3000';

describe('GET request to /time', function() {
  it('should respond with the current date and time', function(done) {
    chai.request(server)
      .get('/time')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response).to.have.status(200);         //checks to make sure routing is working correctly
        expect(response.text.length).to.eql(39);      //date.toString should equal 39 chars
        done();
      });
  });
});

describe('GET request to /greet', function(done) {
  it('should respond to GET request to /greet/testname by greeting testname', function(done) {
    chai.request(server)
      .get('/greet/testname')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response).to.have.status(200);
        expect(response.text).to.eql('Hola my amigo testname.');
        done();
      });
  });
  it('should respond to POST request by greeting the name in the request body', function(done) {
    chai.request(server)
      .get('/greet')
      .send({"name": "joeBlow"})
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response).to.have.status(200);
        expect(response.text).to.eql('Hola my amigo .');
        done();
      });
  });
});
