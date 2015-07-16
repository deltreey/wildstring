'use strict';

var wildstring = {
	wildcard: '*',
	caseSensitive: true
};

function checkRollbackStrings (rollbackStrings, patternSubstrings) {
	for (var s = 0; s < rollbackStrings.length; ++s) {
		var currentString = rollbackStrings[s].string;	// starting with the rolled back string
		var patternIndex = rollbackStrings[s].index;

		while (patternIndex < patternSubstrings.length) {
			if (currentString.indexOf(patternSubstrings[patternIndex]) === -1) {
				break;
			}

			var testString = currentString.substr(1);	//remove just one char to retest
			rollbackStrings.push({ string: testString, index: patternIndex });
			if (testString.indexOf(patternSubstrings[patternIndex]) === -1) {
				rollbackStrings.pop();
				break;
			}

			currentString = currentString.substr(
				currentString.indexOf(patternSubstrings[patternIndex]) + patternSubstrings[patternIndex].length
			);

			patternIndex++;
			while (patternSubstrings[patternIndex] === '') {
				patternIndex++;
			}

			if (patternIndex >= patternSubstrings.length) {
				if (patternSubstrings[patternSubstrings.length - 1] !== '' &&
					currentString.length > 0) {
					// not ending with a wildcard, we need to backtrack
					break;
				}
				else {
					return true;
				}
			}
		}
	}

	return false;
}

wildstring.match = function (pattern, string) {
	// if there are no wildcards, must be exact
	if (pattern.indexOf(wildstring.wildcard) === -1) {
		return pattern === string;
	}
	if (!wildstring.caseSensitive) {
		pattern = pattern.toLowerCase();
		string = string.toLowerCase();
	}
	var patternSubstrings = pattern.split(wildstring.wildcard);
	
	var patternIndex = 0;
	var currentString = string;

	// find pattern beginning
	while (patternSubstrings[patternIndex] === '') {
		patternIndex++;
		// if the pattern is just wildcards, it matches
		if (patternIndex === pattern.length) {
			return true;
		}
	}

	if (patternIndex === 0 && string.indexOf(patternSubstrings[0]) !== 0) {
		// not starting with a wildcard
		return false;
	}

	var rollbackStrings = [];

	while (patternIndex < patternSubstrings.length) {
		if (currentString.indexOf(patternSubstrings[patternIndex]) === -1) {
			return checkRollbackStrings(rollbackStrings, patternSubstrings);
		}
		
		// create a queue of strings to roll back and try again if we fail later
		var testString = currentString.substr(1);	//remove just one char to retest
		rollbackStrings.push({ string: testString, index: patternIndex });
		if (testString.indexOf(patternSubstrings[patternIndex]) === -1) {
			rollbackStrings.pop();
		}

		currentString = currentString.substr(
			currentString.indexOf(patternSubstrings[patternIndex]) + patternSubstrings[patternIndex].length
		);

		patternIndex++;
		while (patternSubstrings[patternIndex] === '') {
			patternIndex++;
		}
	}

	if (patternIndex >= patternSubstrings.length &&
			patternSubstrings[patternSubstrings.length - 1] !== '' &&
			currentString.length > 0) {
		// not ending with a wildcard, we need to backtrack
		if (currentString === string) { // this string doesn't even match a little
			return false;
		}

		return checkRollbackStrings(rollbackStrings, patternSubstrings);
	}

	return true;
};


wildstring.replace = function (pattern, strings) {
	if (pattern === undefined || strings === undefined) {
		throw new Error('wildstring.replace takes the pattern as one parameter and either a string or an array of strings as the second.  You didn\'t pass enough parameters.');
	}
	if (typeof(strings) === typeof('')) {
		return pattern.replace(wildstring.wildcard, strings);
	}
	if (!Array.isArray(strings) || typeof(pattern) !== typeof('')) {
		throw new Error('wildstring.replace takes the pattern as one parameter and either a string or an array of strings as the second.  Your parameter types are incorrect.');
	}
	if (pattern.indexOf(wildstring.wildcard) === -1) {
		return pattern; // if there are no wildcards, just return the pattern
	}
	var patternSubstrings = pattern.split(wildstring.wildcard);
	if (patternSubstrings.length - 1 !== strings.length) {
		var message = 'There are a different number of wildcards than strings to replace them. You have ' +
			wildstring.wildcard +' wildcards in "' + wildstring.wildcard + '" and ' + wildstring.wildcard +
			' replacement strings.';
		throw new Error(wildstring.replace(message, [ patternSubstrings.length - 1, pattern, strings.length ]));
	}

	var result = '';

	for (var s = 0; s < strings.length; ++s) {
		result += patternSubstrings[s] + strings[s];
	}

	return result;
};

if (module) { module.exports = wildstring; }
