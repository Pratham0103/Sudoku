import _board from "./_board";

function isValid(k, val) {
  let col,
    row,
    temp = k;
  col = k % 9; // too find colomm
  temp = k - col;
  for (let i = 0; i <= 9; i++) {
    // too find row
    if (i * 9 === temp) row = i;
  }
  if (val === 0) {
    // to handle backspace;
    _board[row][col] = null;

    return true;
  }
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      _board[row][i] === val ||
      _board[i][col] === val ||
      _board[m][n] === val
    ) {
      return false;
    }
  }
  _board[row][col] = val;
  return true;
}

export default isValid;
