var fs = require('fs'),
    chai = require('chai'),
    expect = chai.expect,
    chaihttp = require('chai-http'),
    server = require(__dirname + '/../lib/server.js');
chai.use(chaihttp);

describe('http server', function() {
  before(function() {
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
    this.currentTime = Date();
    this.greetByName = 'Hello david';
    this.greetByNameJson = '{"Hello":"david"}';
  });

  it('should be able to get an index', function(done) {
    chai.request('localhost:3000')
    //debugger;
      .get('/')
      .end(function(err, res) {
        // debugger;
        expect(err).to.eq(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.indexFileString);
        done();
    }.bind(this));
  });

  it('should be able to get /time', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.currentTime);
        done();
      }.bind(this));
  });

  it('should be able to get /greet/name where name is a single word string', function(done) {
    chai.request('localhost:3000')
      .get('/greet/david')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.greetByName);
        done();
       }.bind(this));
  });

  it('should be able to post /greet that takes the name in JSON format', function(done) {
    chai.request('localhost:3000')
      .post('/greet/david')
      .send( '{"Hello":"david"}')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.greetByNameJson);
        done();
      }.bind(this));
  });

}); // end describe
