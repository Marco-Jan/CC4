class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.winnings = 0;
    }
}

class GameBoard {
    constructor() {
        this.gameBoard = [];
        this.players = [];
        this.currentPlayerIndex = 0;
        this.initializeGameBoard();
    }

    createElement(tag, attributes = {}, textContent = '') {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        element.textContent = textContent;
        return element;
    }

    initializeGameBoard() {
        const boardElements = document.querySelector('.game');
        const playerInfoElement = this.createElement('div', {class: 'playerinfo visible'});
        const player1Input = this.createElement('input', {type: 'text', id: 'name1'});
        playerInfoElement.append(
            this.createElement('label', {}, 'Player 1: '),
            player1Input,
            this.createElement('label', {}, 'Player 2: '),
            this.createElement('input', {type: 'text', id: 'name2'}),
            this.createElement('button', {id: 'pbtn'}, 'Submit'),
        );

        const winningInfoElement = this.createElement('div', {class: 'winfo hidden'});
        winningInfoElement.append(
            this.createElement('h3', {id: 'p1'}),
            this.createElement('h3', {id: 'p2'}),
        );

        boardElements.append(playerInfoElement, winningInfoElement);

        document.getElementById('pbtn').addEventListener('click', () => this.startGame(playerInfoElement, winningInfoElement));
        document.getElementById('reset').addEventListener('click', () => this.resetGame(playerInfoElement, winningInfoElement));
    }

    startGame(playerInfoElement, winningInfoElement) {
        const playerOne = new Player(document.getElementById('name1').value, "red");
        const playerTwo = new Player(document.getElementById('name2').value, "yellow");
        this.players.push(playerOne, playerTwo);

        this.updateVisibility(playerInfoElement, winningInfoElement);

        this.updateScore(playerOne, playerTwo);

        const boardElements = document.querySelector('.board');

        for (let row = 0; row < 6; row++) {
            this.gameBoard[row] = [];
            for (let col = 0; col < 7; col++) {
                const cell = this.createElement('div', {class: 'cell empty', 'data-column': col, 'data-row': row});
                this.gameBoard[row][col] = cell;
                boardElements.appendChild(cell);
            }
        }

        document.querySelectorAll('.cell').forEach((cell) => {
            cell.addEventListener('click', () => {
                const column = parseInt(cell.dataset.column);
                this.handleCellClick(column);
            });
        });
    }

    resetGame(playerInfoElement, winningInfoElement) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.classList.remove('red', 'yellow');
            cell.classList.add('empty');
        });
        this.gameBoard = [];
        this.players = [];

        this.updateVisibility(playerInfoElement, winningInfoElement);

        const boardElements = document.querySelector('.board');
        boardElements.innerHTML = "";
    }

    checkWinCondition(row, col) {
        const checkDirection = (directionx, directiony) => {
            let count = 1;
            let rowWin = row + directionx;
            let colWin = col + directiony;
            while (this.isWithinBounds(rowWin, colWin) && this.gameBoard[rowWin][colWin].classList.contains(this.players[this.currentPlayerIndex].color)) {
                count++;
                rowWin += directionx;
                colWin += directiony;
            }

            rowWin = row - directionx;
            colWin = col - directiony;
            while (this.isWithinBounds(rowWin, colWin) && this.gameBoard[rowWin][colWin].classList.contains(this.players[this.currentPlayerIndex].color)) {
                count++;
                rowWin -= directionx;
                colWin -= directiony;
            }

            return count >= 4;
        }

        return (checkDirection(1, 0) || checkDirection(0, 1) || checkDirection(1, 1) || checkDirection(1, -1));
    }

    handleCellClick(column) {
        for (let row = 5; row >= 0; row--) {
            const cell = this.gameBoard[row][column];
            if (cell.classList.contains('empty')) {
                cell.classList.remove('empty');
                cell.classList.add(this.players[this.currentPlayerIndex].color);
                if (this.checkWinCondition(row, column)) {
                    setTimeout(() => {
                        this.players[this.currentPlayerIndex].winnings++;
                        this.updateScore(this.players[0], this.players[1]);
                        this.resetGame(document.querySelector('.playerinfo'), document.querySelector('.winfo'));
                    }, 100);
                } else {
                    this.currentPlayerIndex = this.players[this.currentPlayerIndex].color === 'red' ? 1 : 0;
                }
                return;
            }
        }
    }

    isWithinBounds(row, col) {
        return row >= 0 && row < 6 && col >= 0 && col < 7;
    }

    updateVisibility(playerInfoElement, winningInfoElement) {
        playerInfoElement.classList.toggle('visible');
        playerInfoElement.classList.toggle('hidden');
        winningInfoElement.classList.toggle('hidden');
        winningInfoElement.classList.toggle('visible');
    }

    updateScore(player1, player2) {
        const player1Score = document.getElementById('p1');
        const player2Score = document.getElementById('p2');

        player1Score.innerText = player1.name + ": " + player1.winnings;
        player1Score.style.color = player1.color;

        player2Score.innerText = player2.name + ": " + player2.winnings;
        player2Score.style.color = player2.color;
    }
}

const gameInstance = new GameBoard();
