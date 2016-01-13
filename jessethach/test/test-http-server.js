const chai = require('chai');
const expect = require('chai').expect;
const server = require(__dirname + '/../lib/http-server.js');
const chaiHttp = require('chai-http');
const fs = require('fs');
chai.use(chaiHttp);
const request = chai.request;

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

  it('should have a greet route', (done) => {
    request('localhost:3000')
      .post('/jesse')
      .send({name: 'Jesse'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, JESSE');
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
