const boardSize = 3;
const getParent = document.querySelector(".tic-tac-toe");
let player = "X";
let board = [];
let boardMap={};







createBoard();
addListener();

function updateGameData(row, col, value) {
  if (!board[row]) {
    board[row] = [];
  }
  board[row][col] = value;
  if (getWinner()) console.log("Won", player);
}


// ! optimise it using hashmap
function getWinner() {
  for (let i = 0; i < boardSize; i++) {
    // * check row
    if (board[i]?.length === boardSize && checkLine(board[i])) {
      return true;
    }

    // * check column
    const columnValues = board.map((item) => item[i]);
    if (columnValues.length === boardSize && checkLine(columnValues)) {
      return true;
    }

    // * diagonal
    const diagonalValues = board.map((item, index) => item[index]);
    if (diagonalValues.length === boardSize && checkLine(diagonalValues))
      return true;

    // * reverse Diagonal
    const reverseDiagonalValues = board.map(
      (row, idx) => row[boardSize - idx - 1]
    );
    if (
      reverseDiagonalValues?.length === boardSize &&
      checkLine(reverseDiagonalValues)
    )
      return true;
  }
}

function checkLine(arr) {
  if (!arr) return false;
  if (arr.includes(undefined)) return false;
  return arr.every((data) => data && arr[0] === data);
}

function addListener() {
  getParent.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell") && !e.target.innerText) {
      e.target.innerText = player;

      const rowNo = e.target.dataset.row;
      const colNo = e.target.dataset.col;

      updateGameData(rowNo, colNo, player);
      changePlayer();
    }
  });
}

function changePlayer() {
  player = player === "X" ? "O" : "X";
}

function createBoard() {
  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      row.appendChild(cell);
    }
    getParent.appendChild(row);
  }
}
