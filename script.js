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
    this.updateName = (n) => {
      this.name = n;
    };
  }
  CreatePlayer.prototype.resetScore = () => {
    score = 0;
  };
  const player1 = new CreatePlayer('Player1', 1);
  const player2 = new CreatePlayer('Player2', 2);
  players.push('null');
  players.push(player1);
  players.push(player2);
  return { players };
})();

const Game = (function () {
  let currentTurn = 0;
  let turnCount = 1;
  function startRound() {
    if (currentTurn == 1) {
      currentTurn = 2;
    } else {
      currentTurn = 1;
    }
    Display.updateInfo(`${Player.players[currentTurn].name}`);
    Display.updateBoard();
  }
  function playRound(row, column) {
    let arr = gameBoard.printBoard();
    if (arr[row][column] !== 0) {
      return '';
    } else {
      gameBoard.addMark(row, column, currentTurn);
      checkWin();
      turnCount++;
      startRound();
    }
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
    if (arr[1][1] !== 0) {
      if (
        (arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) ||
        (arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0])
      ) {
        let winner = arr[1][1];
        gameWin(winner);
      }
    }
    if (turnCount == 9) {
      tie();
    }
  }
  function gameWin(winner) {
    Display.updateWin(`${Player.players[winner].name} won`);
    Player.players[winner].addScore(1);
    gameBoard.clearBoard();
    currentTurn = 0;
    turnCount = 1;
  }
  function tie() {
    gameBoard.clearBoard();
    currentTurn = 0;
    turnCount = 1;
    Display.updateWin('its a tie');
  }
  function reset() {
    gameBoard.clearBoard();
    currentTurn = 0;
    turnCount = 1;
    Display.updateBoard();
  }
  return { startRound, playRound, checkWin, reset };
})();

const Display = (function () {
  function updateBoard() {
    const board = document.querySelector('.gameboard');
    const items = document.querySelectorAll('.board-item');
    items.forEach((e) => {
      board.removeChild(e);
    });
    let arr = gameBoard.printBoard();
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        const square = document.createElement('button');
        square.classList = 'board-item';
        square.setAttribute('type', 'button');
        if (arr[i][j] == 1) {
          square.textContent = 'x';
        } else if (arr[i][j] == 2) {
          square.textContent = 'o';
        } else {
          square.textContent = '';
        }
        square.addEventListener('click', () => {
          Game.playRound(i, j);
        });
        board.appendChild(square);
      }
    }
  }
  function updateInfo(str) {
    const info = document.querySelector('.info-text');
    info.textContent = str;
  }
  function updateWin(str) {
    const winT = document.querySelector('.win-text');
    winT.textContent = str;
  }
  const UiControl = (function () {
    const btStart = document.querySelector('.bt-start');
    btStart.addEventListener('click', () => {
      Game.startRound();
    });

    const btReset = document.querySelector('.bt-reset');
    btReset.addEventListener('click', () => {
      Game.reset();
    });

    const btName = document.querySelector('.bt-name');
    const modal = document.querySelector('dialog');
    btName.addEventListener('click', () => {
      modal.toggleAttribute('open');
    });

    const btSave = document.querySelector('#bt-save');
    btSave.addEventListener('click', () => {
      const newName1 = document.querySelector('#name1').value;
      const newName2 = document.querySelector('#name2').value;
      Player.players[1].updateName(newName1);
      Player.players[2].updateName(newName2);
    });
  })();
  return { updateBoard, updateInfo, updateWin };
})();
