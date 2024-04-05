const gameBoard = (function () {
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  function clearBoard() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j] = Cell();
      }
    }
  }
  const addMark = (row, column, token) => {
    board[row][column].addValue(token);
  };
  const getBoard = () => board;
  console.log(board);
  return { getBoard, clearBoard, addMark };
})();

function Cell() {
  let value = 0;
  const addValue = (token) => {
    if (value === 0) {
      value = token;
    } else {
      return;
    }
  };

  const getValue = () => value;

  return { getValue, addValue };
}

const Player = (function () {
  const players = [];
  function CreatePlayer(name, token) {
    let score = 0;
    this.name = name;
    this.token = token;
    this.getsScore = () => score;
    this.addScore = (n) => {
      score += n;
    };
  }
  function updateName(player, name) {
    player.name = name;
  }
  CreatePlayer.prototype.resetScore = () => {
    score = 0;
  };
  const player1 = new CreatePlayer('Player1', 1);
  const player2 = new CreatePlayer('Player2', 2);
  return { player1, player2, updateName };
})();

const Game = (function () {
  function PlayRound() {}
})();
