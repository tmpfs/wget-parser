Table of Contents
=================

* [Spider parser](#spider-parser)
  * [Usage](#usage)
    * [wget-parser](#wget-parser)
    * [wget-spider](#wget-spider)
  * [Output](#output)
  * [Developer](#developer)
    * [Test](#test)
    * [Cover](#cover)
    * [Lint](#lint)
    * [Clean](#clean)
    * [Readme](#readme)

Spider parser
=============

[<img src="https://travis-ci.org/tmpfs/wget-parser.svg?v=1" alt="Build Status">](https://travis-ci.org/tmpfs/wget-parser)
[<img src="http://img.shields.io/npm/v/wget-parser.svg?v=1" alt="npm version">](https://npmjs.org/package/wget-parser)
[<img src="https://coveralls.io/repos/tmpfs/wget-parser/badge.svg?branch=master&service=github&v=2" alt="Coverage Status">](https://coveralls.io/github/tmpfs/wget-parser?branch=master).

Parses the spider output from [wget](https://www.gnu.org/software/wget) into an object structure of links.

This object could then be processed further to create a tree structure of the hierarchy of a website such that sitemap generation could be implemented.

Tested using `wget v1.15` on linux.

## Usage

```javascript
var parser = require('wget-parser')
  , buf = new Buffer(0);      // buffer should contain the spider output
console.dir(parser(buf));
```

* `parser.Parser`: The parser class. 
* `parser.Link`: The class that represents a link. 
* `parser.ParseStream`: Parse stream class.

Streams support is available, see the [test spec](https://github.com/tmpfs/wget-parser/blob/master/test/spec/parser.js) for example usage.

### wget-parser

A program that reads from `stdin` and prints the result of the parse as JSON, exits with error code 1 if any broken links are found.

```
cat test/fixtures/mock.txt | wget-parser
cat test/fixtures/broken.txt | wget-parser; echo $?;
```

### wget-spider

A program that performs a spider with [wget](https://www.gnu.org/software/wget) and pipes the output to `wget-parser`:

```
wget-spider http://google.com
```

## Output

Example output from the parser:

```json
{
  "links": [
    {
      "url": {
        "protocol": "http:",
        "slashes": true,
        "auth": null,
        "host": "google.com",
        "port": null,
        "hostname": "google.com",
        "hash": null,
        "search": null,
        "query": null,
        "pathname": "/",
        "path": "/",
        "href": "http://google.com/"
      },
      "link": "http://google.com/",
      "line": "--2016-02-10 16:11:57--  http://google.com/"
    },
    {
      "url": {
        "protocol": "http:",
        "slashes": true,
        "auth": null,
        "host": "www.google.co.id",
        "port": null,
        "hostname": "www.google.co.id",
        "hash": null,
        "search": "?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
        "query": "gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
        "pathname": "/",
        "path": "/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
        "href": "http://www.google.co.id/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ"
      },
      "link": "http://www.google.co.id/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
      "line": "--2016-02-10 16:11:57--  http://www.google.co.id/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ"
    }
  ],
  "broken": []
}
```

## Developer

### Test

To run the test suite:

```
npm test
```

### Cover

To generate code coverage run:

```
npm run cover
```

### Lint

Run the source tree through [jshint](http://jshint.com) and [jscs](http://jscs.info):

```
npm run lint
```

### Clean

Remove generated files:

```
npm run clean
```

### Readme

To build the readme file from the partial definitions:

```
npm run readme
```

Generated by [mdp(1)](https://github.com/tmpfs/mdp).

[wget]: https://www.gnu.org/software/wget
[jshint]: http://jshint.com
[jscs]: http://jscs.info
