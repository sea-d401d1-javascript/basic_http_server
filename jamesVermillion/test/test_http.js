const chai = require('chai');
const server = require(__dirname +'/../lib/server').server; //eslint-disable-line
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('simple http server', () => {
  it('should greet jim', (done) => {
    request('localhost:3000')
      .get('/greet/jim')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('hello jim');
        done();
      });
  });
  
  it('should 404 to you', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('PAGE NOT FOUND. you gotta go!');
        done();
      });
  });

  it('get the time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(`The local time is: ${new Date()}`);
        done();
      });
  });

  it('handle POST', (done) => {
    request('localhost:3000')
      .post('/greet')
      .send({name: 'jim'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('hello jim');
        done();
      });
  });
});
