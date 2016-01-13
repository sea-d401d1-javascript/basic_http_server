'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require(path.join(__dirname, '../lib/server'));
const router = require(path.join(__dirname, '../lib/router'));
chai.use(chaiHttp);
const expect = chai.expect;

/* eslint-disable no-unused-expressions */

describe('simple http server', () => {
  before(() => {
    this.server = server.start(3030, router);
  });
  it('should respond 404 to invalid request', done => {
    chai.request('http://localhost:3030').get('/notvalid').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(404);
      expect(res.text).to.eql('404 Not Found');
      done();
    });
  });
  it('/time should respond with time', done => {
    chai.request('http://localhost:3030').get('/time').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      // // was it a valid date?
      expect(Number.isNaN(Date.parse(res.body.time))).to.be.false;
      done();
    });
  });
  it('/greet/:name should respond with "Hello name"', done => {
    chai.request('http://localhost:3030')
      .get('/greet/world')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello world');
        done();
      });
  });
  it('/greet with JSON name should respond with "Hello name"', done => {
    chai.request('http://localhost:3030').post('/greet')
      .send({'name': 'world'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello world');
        done();
      });
  });
  after(() => {
    this.server.close();
  });
});
