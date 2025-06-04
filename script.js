const cells = document.querySelectorAll('.cell');
const messageEl = document.getElementById('message');
const overlay = document.getElementById('overlay');
const restartBtn = document.getElementById('restart');

let board = Array(9).fill(null);
let gameOver = false;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener('click', playerMove);
});

restartBtn.addEventListener('click', resetGame);

function playerMove(e) {
    const index = +e.target.dataset.index;
    if (board[index] || gameOver) return;

    makeMove(index, 'O');
    if (checkGameOver()) return;

    setTimeout(computerMove, 300);
}

function computerMove() {
    const emptyIndices = board.map((v,i) => v ? null : i).filter(i => i !== null);
    if (emptyIndices.length === 0) return;
    const index = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(index, 'X');
    checkGameOver();
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player === 'O' ? 'O' : 'X';
    cells[index].style.cursor = 'default';
}

function checkGameOver() {
    for (const pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            endGame(board[a] === 'O' ? 'player' : 'computer');
            return true;
        }
    }
    if (board.every(cell => cell)) {
        endGame('draw');
        return true;
    }
    return false;
}

function endGame(winner) {
    gameOver = true;
    let text = '';
    if (winner === 'player') {
        text = 'HAI BATTUTO MARZOBOT';
    } else if (winner === 'computer') {
        text = 'SEI STATO DIOPORCATO';
    } else {
        text = 'PAREGGIO';
    }
    messageEl.textContent = text;
    overlay.classList.add('show');
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.cursor = 'pointer';
    });
    overlay.classList.remove('show');
    gameOver = false;
}
