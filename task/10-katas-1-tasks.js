/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
  // const compassPoints = [];
  // const directions = ['N', 'E', 'S', 'W'];
  // const subDirections = ['', 'b'];

  // for (let i = 0; i < directions.length; i += 1) {
  //   const currentDirection = directions[i];
  //   for (let j = 0; j < 8; j += 1) {
  //     const abbreviation =
  //       currentDirection + subDirections[j % 2] + directions[(i + 1) % 4];
  //     const azimuth = (i * 8 + j) * 11.25;
  //     compassPoints.push({ abbreviation, azimuth });
  //   }
  // }

  // return compassPoints;
  throw new Error('Not implemented');
}

/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function expandBraces() {
  throw new Error('Not implemented');
}

/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
  const mtx = [];
  for (let i = 0; i < n; i += 1) mtx[i] = [];

  let i = 1;
  let j = 1;

  for (let e = 0; e < n * n; e += 1) {
    mtx[i - 1][j - 1] = e;
    if ((i + j) % 2 === 0) {
      if (j < n) j += 1;
      else i += 2;
      if (i > 1) i -= 1;
    } else {
      if (i < n) i += 1;
      else j += 2;
      if (j > 1) j -= 1;
    }
  }

  return mtx;
}

/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow() {
  // const dominoMap = new Map();

  // for (let i = 0; i < dominoes.length; i += 1) {
  //   const domino = dominoes[i];
  //   const [x, y] = domino;
  //   const key1 = `${x},${y}`;
  //   const key2 = `${y},${x}`;
  //   dominoMap.set(key1, (dominoMap.get(key1) || 0) + 1);
  //   dominoMap.set(key2, (dominoMap.get(key2) || 0) + 1);
  // }

  // const dominoKeys = Array.from(dominoMap.keys());
  // for (let i = 0; i < dominoKeys.length; i += 1) {
  //   const count = dominoMap.get(dominoKeys[i]);
  //   if (count % 2 !== 0) {
  //     return false;
  //   }
  // }

  // return true;
  throw new Error('Not implemented');
}

/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
  if (nums.length === 0) return '';

  let result = '';
  let start = nums[0];
  let end = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] === end + 1) {
      end = nums[i];
    } else {
      if (start === end) {
        result += `${start},`;
      } else if (end - start === 1) {
        result += `${start},${end},`;
      } else {
        result += `${start}-${end},`;
      }
      start = nums[i];
      end = nums[i];
    }
  }

  if (start === end) {
    result += `${start},`;
  } else if (end - start === 1) {
    result += `${start},${end}`;
  } else {
    result += `${start}-${end}`;
  }

  return result;
}

module.exports = {
  createCompassPoints,
  expandBraces,
  getZigZagMatrix,
  canDominoesMakeRow,
  extractRanges,
};
