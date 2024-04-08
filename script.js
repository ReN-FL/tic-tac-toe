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

  const printBoard = () => {
    const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
    return boardValues;
  };
  return { printBoard, getBoard, clearBoard, addMark };
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
  players.push('null');
  players.push(player1);
  players.push(player2);
  return { players, updateName };
})();

const Game = (function () {
  let currentTurn = 0;
  function startRound() {
    if (currentTurn == 1) {
      currentTurn = 2;
    } else {
      currentTurn = 1;
    }
    console.log(`${Player.players[currentTurn].name}`);
    console.table(gameBoard.printBoard());
  }
  function playRound(row, column) {
    gameBoard.addMark(row, column, currentTurn);
    checkWin();
    startRound();
  }
  function checkWin() {
    let arr = gameBoard.printBoard();
    const allEqual = (arr) => arr.every((val) => val === arr[0]);
    arr.map((row) => {
      if (row[0] !== 0) {
        if (allEqual(row)) {
          let winner = row[0];
          console.log(winner);
          gameWin(winner);
        }
      }
    });
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][i] !== 0) {
        if (arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i]) {
          let winner = arr[0][i];
          gameWin(winner);
        }
      }
    }
  }
  function gameWin(winner) {
    console.log(`${Player.players[winner].name} won`);
    Player.players[winner].addScore(1);
    gameBoard.clearBoard();
    currentTurn = 0;
  }
  return { startRound, playRound, checkWin };
})();
