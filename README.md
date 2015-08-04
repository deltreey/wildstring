# [wildstring](https://www.youtube.com/watch?v=4qHX493bB3U)

Simple String Wildcard Handling

[![build status](https://secure.travis-ci.org/deltreey/wildstring.png)](http://travis-ci.org/deltreey/wildstring)
[![npm version](https://badge.fury.io/js/wildstring.svg)](https://www.npmjs.com/package/wildstring)
[![Codacy Badge](https://www.codacy.com/project/badge/8436bfefb89345d0933bb91f59ed3b22)](https://www.codacy.com/app/suicidolt/wildstring)
[![Code Climate](https://codeclimate.com/github/deltreey/wildstring/badges/gpa.svg)](https://codeclimate.com/github/deltreey/wildstring)
[![bitHound Score](https://www.bithound.io/github/deltreey/wildstring/badges/score.svg?)](https://www.bithound.io/github/deltreey/wildstring)
[![Join the chat at https://gitter.im/deltreey/wildstring](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/deltreey/wildstring?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Shake it shake it

Installing wildstring is a snap.  wildstring has no dependencies, so you don't need anything else to run it. If you want to use tools though, here's some tips on how to install it with popular installers.

#### node.js
``` bash
npm install wildstring
```
then:
``` js
var wildstring = require('wildstring');
```

#### bower
``` bash
bower install wildstring
```

#### html

``` html
<script src="wildstring.js"></script>
```

## Hold me tight

Especially with something that does something new, it's important to see how it works.  Below are some examples, but here's a brief explanation as well.

In this explanation, I'll use `*` as my wildcard for simplicity.  If you put a wildcard at the beginning, for example `*Thing` then you can match anything or nothing before your string.  So your string could be `Wild Thing` or just `Thing` and it would match fine.  The same is true for the end.  `Wild*` would match `Wild Thing` or just `Wild`.  If you want to match text in the middle of the string, it works the same way. `Wild*Thing` matches both `WildThing` and `Wild and crazy Thing`.
``` js
wildstring.match('Test*', 'Testing');                 // true, wildcard matches 'ing'
wildstring.match('*ing', 'testing');                  // true, wildcard matches 'test'
wildstring.match('Test*', 'Test');                    // true, wildcard can match empty strings
wildstring.match('*ing', 'Testing it');               // false, no wildcard do match ' it'
wildstring.match('Test', 'Testing');                  // false, no wildcard to match 'ing'
wildstring.match('Test*ing', 'Testing this thing');   // true, matches 'Test' and the end of 'thing', the rest is wildcard matched
wildstring.match('*))))))*', ')))))');                // false, not enough parenthesis
```

### You make my heart string

You can use wildstring for string interpolation, which makes for an easier interface to parse data from users who maybe don't know regular expressions.
``` js
wildstring.replace('I * node.*', [ 'love', 'js' ]);   // 'I love node.js'
wildstring.replace('I * node.*', 'script');           // 'I script node.script' * this behavior is the same as "I * node.*".replace("*", "script") and actually uses that method
wildstring.replace('I * node.*', [ 'love' ]);         // THROWS AN ERROR, wildcard count and number of strings to insert must match
wildstring.replace('*/*/*', [ new Date.getMonth() + 1, new Date.getDate(), new Date.getFullYear]);
// 7/15/2015 (or whatever day it is), probably better to learn the js date parser though
```

### You make everything, groovy

You can use your own wildcards with wildstring, so you can wildstring everything.  You can even turn off case sensitive matching if you want.
``` js
wildstring.wildcard = 'stuff';
wildstring.match('Test stuff', 'Test wild');            // true, wildcard 'stuff' matches 'wild'
wildstring.replace('stuff and stuffthings', [ 'WILD', 'thing' ]); // 'WILD and thingthings'
// turn off case sensitive matching
wildstring.caseSensitive = false;
wildstring.match('tEsT', 'TeSt');                       // true, 'test' matches 'test'
```

## I think I love you

If you want to contribute to wildstring, it's really easy.  Just make sure you have [nodejs](https://nodejs.org/) installed and do the following.
``` bash
git clone https://github.com/deltreey/wildstring
# npm install -g grunt-cli # if you don't have it
npm install
grunt
```

grunt will run all the tests and jshint, so just make sure it passes before submitting a pull request

## But I wanna know for sure

Documentation: [http://deltreey.github.io/wildstring](http://deltreey.github.io/wildstring)

Repository: [https://github.com/deltreey/wildstring](https://github.com/deltreey/wildstring)
