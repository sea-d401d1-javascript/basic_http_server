const chai = require('chai');
const server = require(__dirname + '/../lib/httpserver.js');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('simple http server', () => {
  it('should respond to a request to time for current time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err,res) => {
      	expect(err).to.eql(null);
      	expect(res).to.have.status(200);
      	expect(res.body).to.eql({'msg': server.gettingDate()});
      	done();
      });
  });
  it('should respond to req to /greet/name to send greet name in string', (done) => {
    request('localhost:3000')
    .get('/greet/' + 'Joe')
    .end((err,res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.eql({'msg': 'Hello Joe'});
      done();
    });
  });
  it('should have a separate post request to /greet that takes JSON name', (done) => {
    request('localhost:3000')
    .post('/greet')
    .send({ msg: 'Luke' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Hello Luke');
      done();
    });
  });
  it('should 404', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });
});
