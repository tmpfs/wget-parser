var expect = require('chai').expect
  , fs = require('fs')
  , parser = require('../../');

describe('parser:', function() {

  it('should parse buffer', function(done) {
    var buf = fs.readFileSync('test/fixtures/mock.txt')
      , res = parser(buf);
    expect(res).to.be.an('object');
    expect(res.links).to.be.an('array');
    expect(res.broken).to.be.an('array');
    expect(res.links.length).to.eql(2);
    expect(res.broken.length).to.eql(0);
    done();
  })

  it('should parse string', function(done) {
    var buf = '' + fs.readFileSync('test/fixtures/mock.txt')
      , res = parser(buf);
    expect(res).to.be.an('object');
    expect(res.links).to.be.an('array');
    expect(res.broken).to.be.an('array');
    expect(res.links.length).to.eql(2);
    expect(res.broken.length).to.eql(0);
    done();
  })

  it('should parse broken links', function(done) {
    var buf = fs.readFileSync('test/fixtures/broken.txt')
      , res = parser(buf);
    expect(res).to.be.an('object');
    expect(res.links).to.be.an('array');
    expect(res.broken).to.be.an('array');
    expect(res.links.length).to.eql(2);
    expect(res.broken.length).to.eql(2);
    done();
  })

})
