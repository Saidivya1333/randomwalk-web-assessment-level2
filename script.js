document.addEventListener('DOMContentLoaded', () => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X'; // Human is 'X', Computer is 'O'
    let gameActive = true;
    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');

    const winningMessage = (player) => `Player ${player === 'X' ? 'Human' : 'Computer'} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer === 'X' ? 'Human' : 'Computer'}'s turn`;

    statusDisplay.innerHTML = currentPlayerTurn();

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const showModal = (message) => {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modalMessage');
        modalMessage.innerText = message;
        modal.style.display = 'block';
    };

    const closeModal = () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    };

    document.getElementById('closeModal').addEventListener('click', closeModal);

    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive || currentPlayer !== 'X') {
            return;
        }

        // Human player makes the move
        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add('x');

        handleResultValidation();

        if (gameActive) {
            currentPlayer = 'O'; // Switch to computer's turn
            statusDisplay.innerHTML = currentPlayerTurn();
            setTimeout(computerMove, 500); // Computer moves after a slight delay
        }
    };

    const computerMove = () => {
        const availableCells = board
            .map((cell, index) => (cell === '' ? index : null))
            .filter(index => index !== null);

        if (availableCells.length === 0 || !gameActive) {
            return;
        }

        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].innerHTML = 'O';
        cells[randomIndex].classList.add('o');

        handleResultValidation();

        if (gameActive) {
            currentPlayer = 'X'; // Switch back to the human's turn
            statusDisplay.innerHTML = currentPlayerTurn();
        }
    };

    // ... [Previous code remains unchanged] ...

const handleResultValidation = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showModal(winningMessage(currentPlayer));
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        showModal("It's a tie!");  // Explicitly say there is a tie
        gameActive = false;
        return;
    }
};

// ... [Rest of the code remains unchanged] ...

 

    const resetGame = () => {
        gameActive = true;
        currentPlayer = 'X'; // Human starts first
        board = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerHTML = currentPlayerTurn();
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o');
        });
        closeModal(); // Close modal if it's open
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('reset').addEventListener('click', resetGame);
});
