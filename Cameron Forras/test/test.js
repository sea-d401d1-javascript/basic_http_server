var chai = require('chai');
chai.use(require('chai-http'));
var expect = chai.expect;
var fs = require('fs');
var server = require(__dirname + '/../server');
var request = chai.request;

describe('simple http server', () => {
  it('might could have a time route \(*southern accent*\)', (done) => {
    request('http://localhost:3000')
    .get('/time')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('might could make an html response \(*southern accent*\)', function() {
    chai.request('http://localhost:3000').get('/')
    .then(function(res) {
      expect(res).to.be.html();
    });
  });
});
