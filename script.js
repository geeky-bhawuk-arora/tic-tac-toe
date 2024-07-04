const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winningPlayer = currentPlayer === 'X' ? 'Kanishk' : 'Bhawuk';
        const funMessage = `🎉🎉 Hooray! Player ${winningPlayer} wins! 🎉🎉`;
        message.innerText = funMessage;
        alert(funMessage);
        gameActive = false;
        setTimeout(resetGame, 3000);
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        const funMessage = "😮😮 It's a draw! Try again! 😮😮";
        message.innerText = funMessage;
        alert(funMessage);
        gameActive = false;
        setTimeout(resetGame, 3000);
        return;
    }

    handlePlayerChange();
};

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const resetGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.innerText = '';
    cells.forEach(cell => cell.innerText = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
