const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require(__dirname + '/../server.js');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const dateformat = require('dateformat');

describe('http GET time ',function(){
  it('should have a time route',function(done){
    request('localhost:3000')
      .get('/time')
      .end((err,res) => {
        var time = new Date();
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal(dateformat(time));
        done();
      });
  });
});

describe('http GET /greet/name',function(){
  it('should have a /greet/name for any name route',function(done){
    request('localhost:3000')
      .get('/greet/yueyue')
      .end((err,res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.body.greeting).to.equal('yueyue');
        done();
      });
  });
});

describe('http GET /',function(){
  it('should have a / route',function(done){
    request('localhost:3000')
      .get('/')
      .end((err,res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome');
        done();
      });
  });
});

describe('http POST locaclhost:3000/greet ',function(){
  it('should have a /greet route for post',function(done){
    request('localhost:3000')
      .post('/greet')
      .send('{"name":"yueyue"}')
      .end((err,res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(JSON.parse(res.body).name).to.equal('yueyue');
        done();
      });
  });
});
