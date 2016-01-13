const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const server = require(__dirname + '/../server');

describe('HTTP server', () => {
  it('should 404 on a page that does not exist', (done) => {
    request('localhost:3000')
      .get('/DNE')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('page not found');
        done();
      });
  });

  it('should respond to /time with server time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        var date = new Date(res.text);
        // test if res.body constitutes a valid Date
        expect(isNaN(date.valueOf())).to.eql(false);
        done();
      });
  });

  it('should respond to a get request to /greet with greeting', (done) => {
    request('localhost:3000')
      .get('/greet/world')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello world');
        done();
      });
  });
});
