var url = require('url');

/**
 *  Encapsulates a link entry.
 */
function Link(url, link, line) {
  return {
    url: url,
    link: link,
    line: line
  }
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
function parse(buf) {
  var s = Buffer.isBuffer(buf) ? buf.toString() : '' + buf;
  var lines = s.split(/\r?\n/)
    , inBroken;
  function onLine(line) {
    var u
      , link;
    if(/^--/.test(line)) {
      u = line.replace(/^(--\d+-\d+-\d+ \d+:\d+:\d+--\s*)(.*)$/, '$2');
      if(!~this.seen.indexOf(u)) {
        link = new Link(url.parse(u), u, line);
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
      this.doc.broken.push(new Link(url.parse(line), line, line));
    }
  }
  lines.forEach(onLine.bind(this));
  return this.doc;
}

Parser.prototype.parse = parse;

module.exports = function parser(data) {
  var p = new Parser();
  return p.parse(data);
}
