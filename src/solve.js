import _board from "./_board";
import isvalid from "./valid";

function Solve() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (_board[i][j] == null) {
        for (let k = 1; k <= 9; k++) {
          if (isvalid(i * 9 + j, k)) {
            _board[i][j] = k;
            if (Solve()) {
              return true;
            } else {
              _board[i][j] = null;
            }
          }
        
        }
        return false;
      }
    }
  }
  return true;
}

export default Solve;
