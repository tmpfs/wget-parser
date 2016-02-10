var expect = require('chai').expect
  , fs = require('fs')
  , parser = require('../../')
  , through = require('through3')
  , LineStream = require('stream-lines');

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

  it('should parse as stream', function(done) {

    var entries = 0;

    function transform(chunk, encoding, cb) {
      expect(chunk).to.be.an.instanceof(parser.Link);
      entries++;
      cb(); 
    }

    var Mock = through.transform(transform)
    var readable = fs.createReadStream('test/fixtures/mock.txt');
    readable.on('end', function() {
      expect(entries).to.eql(2);
      done();
    })
    readable
      .pipe(new LineStream())
      .pipe(new parser.ParseStream())
      .pipe(new Mock());
  })

})
