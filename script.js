const whitelist = ["Benutzer1", "Benutzer2", "Benutzer3"];

function checkWhitelist() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('whitelist-message');
    if (whitelist.includes(username)) {
        document.getElementById('whitelist-section').style.display = 'none';
        document.getElementById('games-section').style.display = 'block';
    } else {
        message.textContent = 'Benutzer nicht auf der Whitelist!';
        message.style.color = 'red';
    }
}

function startGame(game) {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    switch (game) {
        case 'ticTacToe':
            startTicTacToe(container);
            break;
        case 'guessNumber':
            startGuessNumber(container);
            break;
    }
}

function startTicTacToe(container) {
    container.innerHTML = `
        <h3>Tic Tac Toe</h3>
        <table id="tic-tac-toe-board">
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
        </table>
        <p id="tic-tac-toe-message"></p>
        <button onclick="resetTicTacToe()">Neues Spiel</button>
    `;
    const cells = container.querySelectorAll('td');
    let currentPlayer = 'X';
    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            if (cell.textContent === '' && !checkWinner()) {
                cell.textContent = currentPlayer;
                if (checkWinner()) {
                    document.getElementById('tic-tac-toe-message').textContent = `Spieler ${currentPlayer} gewinnt!`;
                } else if (Array.from(cells).every(cell => cell.textContent !== '')) {
                    document.getElementById('tic-tac-toe-message').textContent = 'Unentschieden!';
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });
}

function checkWinner() {
    const board = Array.from(document.querySelectorAll('#tic-tac-toe-board td')).map(cell => cell.textContent);
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => 
        board[combo[0]] !== '' && 
        board[combo[0]] === board[combo[1]] && 
        board[combo[0]] === board[combo[2]]
    );
}

function resetTicTacToe() {
    document.getElementById('tic-tac-toe-message').textContent = '';
    const cells = document.querySelectorAll('#tic-tac-toe-board td');
    cells.forEach(cell => cell.textContent = '');
}

function startGuessNumber(container) {
    container.innerHTML = `
        <h3>Zahlenraten</h3>
        <p>Rate eine Zahl zwischen 1 und 100</p>
        <input type="number" id="guess-input" min="1" max="100">
        <button onclick="makeGuess()">Raten</button>
        <p id="guess-message"></p>
    `;
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    window.makeGuess = function () {
        const guess = parseInt(document.getElementById('guess-input').value);
        const message = document.getElementById('guess-message');
        if (guess === randomNumber) {
            message.textContent = 'Herzlichen Glückwunsch! Du hast die Zahl erraten!';
            message.style.color = 'green';
        } else if (guess < randomNumber) {
            message.textContent = 'Zu niedrig! Versuche es erneut.';
            message.style.color = 'orange';
        } else {
            message.textContent = 'Zu hoch! Versuche es erneut.';
            message.style.color = 'orange';
        }
    };
}
