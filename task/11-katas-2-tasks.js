/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
  const a = [
    ' _ | ||_|',
    '     |  |',
    ' _  _||_ ',
    ' _  _| _|',
    '   |_|  |',
    ' _ |_  _|',
    ' _ |_ |_|',
    ' _   |  |',
    ' _ |_||_|',
    ' _ |_| _|',
  ];
  let b = bankAccount.split('\n');
  b.pop();
  let s = 0;
  while (b[0].length > 0) {
    s =
      s * 10 +
      a.indexOf(b[0].slice(0, 3) + b[1].slice(0, 3) + b[2].slice(0, 3));
    b = b.map((v) => v.slice(3));
  }
  return s;
}

/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
  if (text.length <= columns) {
    yield text;
    return;
  }
  const lastSpaceIndex = text.lastIndexOf(' ', columns);
  const line = text.slice(0, lastSpaceIndex);
  yield line;
  yield* wrapText(text.slice(lastSpaceIndex + 1), columns);
}

/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0,
};

function getPokerHandRank(hand) {
  const rankValues = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };
  const ranks = hand
    .map((card) => (card.length === 2 ? card[0] : card[0] + card[1]))
    .sort((a, b) => rankValues[a] - rankValues[b]);
  const suits = hand.map((card) => (card.length === 2 ? card[1] : card[2]));

  const isFlush = suits.every((suit) => suit === suits[0]);

  const isStraight = ranks.some((rank, index) => {
    if (index === 0) return false;
    const prevRank = ranks[index - 1];
    let item = 0;
    if (rank === 'A' && prevRank === '5') {
      item = 6;
    } else {
      item = rankValues[rank];
    }
    return Math.abs(item - rankValues[prevRank]) !== 1;
  });

  const groupedRanks = ranks.reduce((acc, rank) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {});

  const rankCounts = Object.values(groupedRanks);

  if (isFlush && !isStraight) return PokerRank.StraightFlush;
  if (rankCounts.includes(4)) return PokerRank.FourOfKind;
  if (rankCounts.includes(3) && rankCounts.includes(2))
    return PokerRank.FullHouse;
  if (isFlush) return PokerRank.Flush;
  if (!isStraight) return PokerRank.Straight;
  if (rankCounts.includes(3)) return PokerRank.ThreeOfKind;
  if (rankCounts.filter((count) => count === 2).length === 2)
    return PokerRank.TwoPairs;
  if (rankCounts.includes(2)) return PokerRank.OnePair;

  return PokerRank.HighCard;
}

/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */

function isRectangle(lines, startX, startY, endX, endY) {
  for (let y = startY; y <= endY; y += 1) {
    for (let x = startX; x <= endX; x += 1) {
      if (y === startY || y === endY) {
        if ((x === startX || x === endX) && lines[y][x] !== '+') {
          return false;
        }
      } else {
        if (lines[y][x] === '+') {
          return false;
        }
        if ((x === startX || x === endX) && lines[y][x] !== '|') {
          return false;
        }
      }
    }
  }
  return true;
}

function drawRectangle(width, height) {
  let rectangle = `+${'-'.repeat(width - 2)}+\n`;
  for (let y = 1; y < height - 1; y += 1) {
    rectangle += `|${' '.repeat(width - 2)}|\n`;
  }
  rectangle += `+${'-'.repeat(width - 2)}+\n`;
  return rectangle;
}

function* getFigureRectangles(figure) {
  const lines = figure.split('\n');
  const height = lines.length;
  const width = lines[0].length;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (lines[y][x] === '+') {
        for (let bottomY = y + 1; bottomY < height; bottomY += 1) {
          if (lines[bottomY][x] === '+') {
            for (let rightX = x + 1; rightX < width; rightX += 1) {
              if (lines[y][rightX] === '+') {
                if (lines[bottomY][rightX] === '+') {
                  if (isRectangle(lines, x, y, rightX, bottomY)) {
                    yield drawRectangle(rightX - x + 1, bottomY - y + 1);
                    rightX = width;
                    bottomY = height;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

module.exports = {
  parseBankAccount,
  wrapText,
  PokerRank,
  getPokerHandRank,
  getFigureRectangles,
};
