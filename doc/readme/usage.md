## Usage

```javascript
var parser = require('wget-parser')
  , buf = new Buffer(0);      // buffer should contain the spider output
console.dir(parser(buf));
```

* `parser.Parser`: The parser class. 
* `parser.Link`: The class that represents a link. 
* `parser.ParseStream`: Parse stream class.

Streams support is available, see the [test spec](/test/spec/parser.js) for example usage.

### wget-parser

A program that reads from `stdin` and prints the result of the parse as JSON, exits with error code 1 if any broken links are found.

```
cat test/fixtures/mock.txt | wget-parser
cat test/fixtures/broken.txt | wget-parser; echo $?;
```

### wget-spider

A program that performs a spider with [wget][] and pipes the output to `wget-parser`:

```
wget-spider http://google.com
```
