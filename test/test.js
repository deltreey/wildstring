'use strict';

var assert = require('assert'),
    wildstring = require('../wildstring');

describe('wildstring - node', function() {
  it('should create an object and set a default wildcard', function() {
    assert.equal(wildstring.wildcard, '*');
  });

  describe('#match', function() {
  	it('should match exactly when no wildcard is given', function() {
  		// Given: a string and a pattern that match
  		var pattern = 'test',
  				string = 'test';

  		// When: we call wildcard.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should return false if the string doesn\'t match the pattern and no wildcard is given', function() {
  		// Given: a string and a pattern that don't match
  		var pattern = 'test',
  				string = 'testing';

  		// When: we call wildcard.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they don't match
  		assert.equal(result, false);
  	});

  	it('should return false if the string doesn\'t match the pattern and no wildcard is given, even when shorter', function() {
  		// Given: a string and a pattern that don't match
  		var pattern = 'testing',
  				string = '';

  		// When: we call wildcard.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they don't match
  		assert.equal(result, false);
  	});

  	it('should match everything if the pattern is only wildcards', function() {
  		// Given: any string and a pattern that is only wildcards
  		var pattern = '***',
  				string = 'test';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should match longer strings if the pattern ends with a wildcard', function() {
  		// Given: a string that is longer than the pattern, but matches up to the wildcard, and the pattern
  		var pattern = 'test*',
  				string = 'testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should match longer strings if the pattern begins with a wildcard', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = '*ing',
  				string = 'testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should match longer strings if the pattern begins with multiple wildcards', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = '***ing',
  				string = 'testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should match matching strings even if the pattern ends with a wildcard', function() {
  		// Given: a string that is longer than the pattern, but matches up to the wildcard, and the pattern
  		var pattern = 'test*',
  				string = 'test';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should match matching strings even if the pattern ends with multiple wildcards', function() {
  		// Given: a string that is longer than the pattern, but matches up to the wildcard, and the pattern
  		var pattern = 'test***',
  				string = 'test';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should match matching strings even if the pattern begins with a wildcard', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = '*ing',
  				string = 'testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should not match strings that have extra characters at the end when the pattern doesn\'t end with a wildcard', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = '*ing',
  				string = 'ings';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, false);
  	});

  	it('should not match strings that have extra characters at the beginning when the pattern doesn\'t begin with a wildcard', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = 'ing*',
  				string = 'testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, false);
  	});

  	it('should match strings that match the beginning and end with a wildcard in the middle', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = 'bow*ing',
  				string = 'bowstring';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should match matching strings even if there\'s a wildcard in the middle', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = 'test*ing',
  				string = 'testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should work with multiple wildcards in the middle', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = 'te*st*ing',
  				string = 'tea string';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should work with multiple wildcards in the middle and at the beginning', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = '*test*ing',
  				string = 'I\'m testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should work with multiple wildcards in the middle and at the end', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = 'te*st*ing*',
  				string = 'tea stings';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should move on if a wildcard doesn\'t continue to match but can later', function() {
  		// Given: a string that has a pattern after the wildcard twice
  		var pattern = '*test*ing',
  				string = 'I\'m testing this thing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should handle wildcarding duplicate characters well', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = '*||test*',
  				string = '|||||testing';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

  	it('should fail correctly with duplicate characters', function() {
  		// Given: a string that is longer than the pattern, but matches after to the wildcard, and the pattern
  		var pattern = '*))))))*',
  				string = ')))))';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, false);
  	});

  	it('should work with case sensitivity off', function() {
  		// Given: a string that does not match the case of the pattern, and case sensitivity is off
  		wildstring.caseSensitive = false;
  		var pattern = '*TEST',
  				string = 'TeSt';

  		// When: we call wildstring.match
  		var result = wildstring.match(pattern, string);

  		// Then: we should see that they match
  		assert.equal(result, true);
  	});

	it('should be able to see the same character as a wildcard', function() {
		// Given: a  string with the same character multiple times, and a pattern with a wildcard and some of the same character
		var pattern = '*zz',
			string = 'zzz';

		// When: we call wildstring.match
		var result = wildstring.match(pattern, string);

		// Then: we should see that they match
		assert.equal(result, true);
	});
  });

  describe('#replace', function() {
  	it('sholud return the pattern when no wildcard is given', function() {
  		// Given: a string array and a pattern with no wildcards
  		var pattern = 'test',
  				strings = ['testing'];

  		// When: we call wildstring.replace
  		var result = wildstring.replace(pattern, strings);

  		// Then: we should see that the pattern is unchanged
  		assert.equal(result, pattern);
  	});

  	it('should do ok as a date parser', function() {
  		var date = new Date(2015, 6, 15);	// month is 0 based for some reason
  		var strings = [ date.getMonth() + 1, date.getDate(), date.getFullYear() ];
  		var pattern = '*/*/*';
  		var result = wildstring.replace(pattern, strings);

  		assert.equal(result, '7/15/2015');
  	});

  	it('should tell you when you add too many strings', function() {
  		// Given: more strings than wildcards in the pattern
  		var pattern = 'Test *',
  				strings = [ 'testing', 'strings' ];

  		// When: we call wildstring.replace with the pattern and strings
  		assert.throws(function() { wildstring.replace(pattern, strings); });

  		// Then: we should get an error
  	});

  	it('should tell you when you add too many wildcards', function() {
  		// Given: more strings than wildcards in the pattern
  		var pattern = '* Te*st *',
  				strings = [ 'testing', 'strings' ];

  		// When: we call wildstring.replace with the pattern and strings
  		assert.throws(function() { wildstring.replace(pattern, strings); });

  		// Then: we should get an error
  	});
  });
});
