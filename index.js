var url = require('url')
  , through = require('through3')
  , pattern = /^(--\d+-\d+-\d+ \d+:\d+:\d+--\s*)(.*)$/;

/**
 *  Encapsulates a link entry.
 */
function Link(uri, link, line, broken) {
  this.url = uri;
  this.link = link;
  this.line = line;
  this.broken = broken;
}

/**
 *  Parser constructor.
 */
function Parser() {
  this.seen = [];
  this.doc = {links: [], broken: []};
}

/**
 *  Parse the output of `wget --spider`.
 *
 *  Tested against wget v1.15 on linux.
 */
function parse(buf, cb) {
  var s = Buffer.isBuffer(buf) ? buf.toString() : '' + buf
    , lines = Array.isArray(buf) ? buf : s.split(/\r?\n/)
    , inBroken
    , results = [];

  function onLine(line) {
    var u
      , link;
    if(/^--/.test(line)) {
      u = line.replace(pattern, '$2');
      if(!~this.seen.indexOf(u)) {
        link = new Link(url.parse(u), u, line, false);
        results.push(link);
        this.doc.links.push(link);
        this.seen.push(u);
      }
    }else if(!inBroken && /found \d+ broken links/i.test(line)) {
      inBroken = 1; 
    }else if(inBroken && inBroken < 3) {
      if(!line) {
        inBroken++;
        return;
      }
      link = new Link(url.parse(line), line, line, true);
      results.push(link);
      this.doc.broken.push(link);
    }
  }

  lines.forEach(onLine.bind(this));

  if(typeof cb === 'function') {
    return cb(results); 
  }

  return this.doc;
}

Parser.prototype.parse = parse;

function parser(data) {
  var p = new Parser();
  return p.parse(data);
}

/**
 *  Transform the array of lines using the standard parse function.
 */
function transform(chunk, encoding, cb) {
  function onParse(results) {
    for(var i = 0;i < results.length;i++) {
      this.push(results[i]);
    }
    cb();
  }
  this.parse(chunk, onParse.bind(this));
}

parser.Parser = Parser;
parser.Link = Link;
parser.pattern = pattern;
parser.ParseStream = through.transform(transform, {ctor: Parser});

module.exports = parser;
