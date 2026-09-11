// Pure game-logic helpers. No DOM, no React — easy to unit test on its own.

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const EMPTY_BOARD = Array(9).fill(null);

/**
 * Looks for a completed line on the board.
 * @param {Array<'X'|'O'|null>} board
 * @returns {{ symbol: 'X'|'O', line: number[] } | null}
 */
export function findWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { symbol: board[a], line };
    }
  }
  return null;
}

export function isDraw(board) {
  return board.every((cell) => cell !== null) && !findWinner(board);
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}
