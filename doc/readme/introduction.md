[![Build Status](https://travis-ci.org/tmpfs/wget-parser.svg)](https://travis-ci.org/tmpfs/wget-parser)
[![npm version](http://img.shields.io/npm/v/wget-parser.svg)](https://npmjs.org/package/wget-parser)
[![Coverage Status](https://coveralls.io/repos/tmpfs/wget-parser/badge.svg?branch=master&service=github&v=1)](https://coveralls.io/github/tmpfs/wget-parser?branch=master)

Parses the spider output from [wget][] into an object structure of links.

This object could then be processed further to create a tree structure of the hierarchy of a website such that sitemap generation could be implemented.

Tested using `wget v1.15` on linux.
