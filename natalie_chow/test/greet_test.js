const expect = require('chai').expect;

const greet = require(__dirname + '/../lib/greet');

describe('Greet function', () => {
  it('should say hello with given name', () => {
    expect(greet('world')).to.eql('Hello world');
  });
});
