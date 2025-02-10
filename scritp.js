const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

function createBoard() {
    board.innerHTML = "";
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    if (gameBoard[row][col] !== "") return; 

    gameBoard[row][col] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `¡${currentPlayer} ha ganado!`;
        board.removeEventListener("click", handleCellClick);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Es el turno de ${currentPlayer}`;
}

function checkWinner() {
    for (let row = 0; row < 3; row++) {
        if (gameBoard[row][0] && gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2]) {
            return true;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (gameBoard[0][col] && gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col]) {
            return true;
        }
    }

    if (gameBoard[0][0] && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
        return true;
    }
    if (gameBoard[0][2] && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
        return true;
    }

    return false;
}

function resetGame() {
    currentPlayer = "X";
    gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    createBoard();
    statusText.textContent = `Es el turno de ${currentPlayer}`;
}

resetButton.addEventListener("click", resetGame);

createBoard();
