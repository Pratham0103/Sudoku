const m = 9;
const n = 9;
let _board = Array(m)
  .fill()
  .map(() => Array(n));
for (var i = 0; i < m; i++) {
  for (var j = 0; j < n; j++) _board[i][j] = null;
}

export default _board;
