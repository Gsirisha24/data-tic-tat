const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let gameActive = true;
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const createCell = (index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
};

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
};

const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
};

const resetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
};

resetBtn.addEventListener('click', resetGame);

for (let i = 0; i < 9; i++) {
    createCell(i);
}

statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
