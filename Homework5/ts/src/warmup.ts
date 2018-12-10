/*
 * A collection of functions illustrating some basic JavaScript.
 */

const request = require('request-promise');
const crypto = require('crypto');

/*
 * Returns an array with the minimum number of U.S. quarters, dimes, nickels, and
 * pennies, respectively, that make the given amount. This solution uses mutable
 * variables because it's rather common in JavaScript. If you want a more functional
 * solution see http://cs.lmu.edu/~ray/notes/functionalprogramming/.
 */
exports.change = (amount) => {
  if (amount < 0) {
    throw new RangeError('amount cannot be negative');
  }
  const result = [];
  let remaining = amount;
  [25, 10, 5, 1].forEach((value) => {
    result.push(Math.floor(remaining / value));
    remaining %= value;
  });
  return result;
};

/*
 * Returns a copy of the string with apostrophes and double quotes removed.
 */
exports.stripQuotes = s => s.replace(/['"]/g, '');

/*
 * Returns a random permutation of a string. This is a swap-based implementation of
 * the Fisher-Yates shuffle, which is awesome. Don't use the random technique! See
 * http://sroucheray.org/blog/2009/11/array-sort-should-not-be-used-to-shuffle-an-array/.
 * This implementation works by swapping elements of an array in place. We should do
 * performance testing to compare it with a version that destroys one array or string
 * as it pulls characters from it and adds them to a result.
 */
exports.scramble = (s) => {
  const characters = s.split('');
  let j = characters.length;
  while (j) {
    const i = Math.floor(Math.random() * j--); // eslint-disable-line no-plusplus
    [characters[j], characters[i]] = [characters[i], characters[j]];
  }
  return characters.join('');
};

/*
 * Produces successive powers of a base, up to the given limit, passing each to a
 * callback. This is one of the few fairly decent uses of the classic for-statement,
 * I think.
 */
exports.powers = (base, limit, callback) => {
  let power = 1;
  while (power <= limit) {
    callback(power);
    power *= base;
  }
};

/*
 * A generator that generates successive powers of a base, up to the given limit.
 */
exports.powersGenerator = function* (base, limit) { // eslint-disable-line func-names
  for (let power = 1; power <= limit; power *= base) {
    yield power;
  }
};

/*
 * The famous chainable function problem, implemented in a readable fashion. It is
 * possible to code golf this problem, producing a function s, implemented like this:
 *
 *   s=a=>a?b=>b?s(a+' '+b):a:''
 *
 * The golfed version is very cool but isn't quite accurate, because it uses falsiness,
 * not undefinedness, as determining whether or not an argument was passed.
 */
exports.say = (firstWord) => {
  const words = [];
  function sayMore(word) {
    if (word === undefined) {
      return words.join(' ');
    }
    words.push(word);
    return sayMore;
  }
  return sayMore(firstWord);
};

/*
 * Returns the interleaving of an array with a bunch of values. The lengths of the
 * array and the number of values do not need to be the same.
 */
exports.interleave = (a, ...b) => {
  const firstLength = a.length;
  const secondLength = b.length;
  const max = Math.max(firstLength, secondLength);
  const result = [];
  for (let i = 0; i < max; i += 1) {
    if (i < firstLength) result.push(a[i]);
    if (i < secondLength) result.push(b[i]);
  }
  return result;
};

/*
 * Creates a cylinder object in the "Crockford Classes" style. There are no units for
 * the radius and height.
 */
exports.cylinder = (specification) => {
  let { radius = 1, height = 1 } = specification;
  const capArea = () => Math.PI * radius * radius;
  const surfaceArea = () => (2 * capArea()) + (2 * Math.PI * radius * height);
  const stretch = (factor) => { height *= factor; };
  const widen = (factor) => { radius *= factor; };
  const volume = () => Math.PI * radius * radius * height;
  const toString = () => `Cylinder with radius ${radius} and height ${height}`;
  return Object.freeze({
    volume,
    surfaceArea,
    get radius() { return radius; },
    get height() { return height; },
    stretch,
    widen,
    toString,
  });
};

/*
 * Returns an array of two functions, an encyptor and a decryptor, each using a
 * given key and a given encryption algorithm. The encryptor turns a UTF-8 encoded
 * string into a hex-string; the decryptor does the reverse.
 */
exports.makeCryptoFunctions = (key, algorithm) => [
  (data) => {
    const cipher = crypto.createCipher(algorithm, key);
    return cipher.update(data, 'utf-8', 'hex') + cipher.final('hex');
  },
  (data) => {
    const cipher = crypto.createDecipher(algorithm, key);
    return cipher.update(data, 'hex', 'utf-8') + cipher.final('utf-8');
  },
];

/*
 * Returns a promise for a name of the form "surname, name" obtained from the Uinames
 * API, for the given region and gender.
 */
exports.randomName = ({ region, gender }) => request({
  method: 'GET',
  uri: 'https://uinames.com/api/',
  json: true,
  headers: { 'User-Agent': 'Homework Assignment from LMU' },
  qs: { region, gender, amount: 1 },
}).then(p => `${p.surname}, ${p.name}`);
