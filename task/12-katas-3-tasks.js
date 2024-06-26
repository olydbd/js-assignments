/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ];
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false
 */

function findStringInSnakingPuzzle() {
  throw new Error('Not implemented');
}

/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
  if (chars.length === 1) {
    yield chars;
  } else {
    for (let i = 0; i < chars.length; i += 1) {
      const char = chars[i];
      const remainingChars = chars.slice(0, i) + chars.slice(i + 1);
      const subPermutations = getPermutations(remainingChars);
      let subPermutation = subPermutations.next();
      while (!subPermutation.done) {
        yield char + subPermutation.value;
        subPermutation = subPermutations.next();
      }
    }
  }
}

/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
  let r = 0;
  let m = 0;
  for (let i = quotes.length - 1; i >= 0; i -= 1) {
    r += Math.max(0, m - quotes[i]);
    m = Math.max(m, quotes[i]);
  }
  return r;
}

/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 *
 * @class
 *
 * @example
 *
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 *
 */
function UrlShortener() {
  this.urlAllowedChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {
  encode(url) {
    let s = url
      .split('')
      .reduce(
        (pv, cv) =>
          pv +
          (this.urlAllowedChars.indexOf(cv) < 10 ? '0' : '') +
          this.urlAllowedChars.indexOf(cv),
        ''
      );
    let answer = '';
    if (s.length % 4 !== 0) s += '99';
    while (s.length > 0) {
      answer += String.fromCharCode(s.slice(0, 4));
      s = s.slice(4);
    }
    return answer;
  },

  decode(code) {
    return code.split('').reduce((pv, cv) => {
      let pv2 = pv;
      pv2 +=
        this.urlAllowedChars[Math.floor(cv.charCodeAt(0) / 100)] +
        (cv.charCodeAt(0) % 100 !== 99
          ? this.urlAllowedChars[cv.charCodeAt(0) % 100]
          : '');
      return pv2;
    }, '');
  },
};

module.exports = {
  findStringInSnakingPuzzle,
  getPermutations,
  getMostProfitFromStockQuotes,
  UrlShortener,
};
