'use strict'
/**
 * Example of errors occuring when not using ";" at the end of line.
 */
const a = 'Hello'
const b = 'World' + '!'
[a, b].forEach(s => console.log(s))