const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');//eslint-disable-line
const request = chai.request;

const server = require(__dirname + '/../lib/http-server.js');//eslint-disable-line

describe('HTTP server', () => {
  it('should have run server', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello world ');
        done();
      });
  });

  it('should greet tom after curl', (done) => {
    request('localhost:3000')
      .get('/greet/tom')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, tom ');
        done();
      });
  });

  it('should have a greet route', (done) => {
    request('localhost:3000')
      .post('/greet')
      .send({name: 'jesse'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, jesse ');
        done();
      });
  });

  it('should 404 on a page that does not exist', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('Page not found ');
        done();
      });
  });
});
