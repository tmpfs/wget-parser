## Usage

```javascript
var parser = require('wget-parser')
  , buf = new Buffer(0);      // buffer should contain the spider output
console.dir(parser(buf));
```

## wget-parser

A program that reads from `stdin` and prints the result of the parse as JSON:

```
cat test/fixtures/mock.txt | wget-parser
```

## wget-spider

A program that performs a spider with [wget][] and pipes the output to `wget-parser`:

```
wget-spider http://google.com
```
