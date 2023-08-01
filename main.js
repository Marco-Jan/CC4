const GameBoard = () => {
    let gameBoard = [];
    let players = [];
    let currentPlayerIndex = 0;
    
    class Player {
        constructor(name, color) {
            this.name = name;
            this.color = color;
            this.winnigs = 0;
        }
    }


    function initializeGameBoard() {
        const boardElements = document.querySelector('.game');
        const playerInfoElement = document.createElement('div');
        const player1Label = document.createElement('label');
        const player1Input = document.createElement('input');
        player1Label.innerHTML = "Player 1: ";
        player1Input.setAttribute('type', 'text');
        playerInfoElement.classList.add('playerinfo', 'visible');
        player1Input.id = 'name1';
        boardElements.appendChild(playerInfoElement);
        playerInfoElement.appendChild(player1Label);
        playerInfoElement.appendChild(player1Input);

        const player2Label = document.createElement('label');
        player2Label.innerHTML = "Player 2: ";
        const player2Input = document.createElement('input');
        player2Input.setAttribute('type', 'text');
        player2Input.id = 'name2';
        playerInfoElement.appendChild(player2Label);
        playerInfoElement.appendChild(player2Input);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.id = 'pbtn';
        playerInfoElement.appendChild(submitButton);

        const winningInfoElement = document.createElement('div');
        winningInfoElement.classList.add('winfo', 'hidden');
        boardElements.appendChild(winningInfoElement);

        const player1Score = document.createElement('h3');
        player1Score.id = 'p1';
        const player2Score = document.createElement('h3');
        player2Score.id = 'p2';
        winningInfoElement.appendChild(player1Score);
        winningInfoElement.appendChild(player2Score);

        submitButton.addEventListener('click', () => {
            playerInfoElement.classList.remove('visible');
            playerInfoElement.classList.add('hidden');
            winningInfoElement.classList.remove('hidden');
            winningInfoElement.classList.add('visible');
            const playerOne = new Player(document.getElementById('name1').value, "red");
            const playerTwo = new Player(document.getElementById('name2').value, "yellow");
            player1Score.innerText = document.getElementById('name1').value + ": 0";
            player1Score.style.color = 'red';
            player2Score.innerText = document.getElementById('name2').value + ": 0";
            player2Score.style.color = 'yellow';
            players.push(playerOne, playerTwo);
            const boardElements = document.querySelector('.board');
            for (let row = 0; row < 6; row++) {
                gameBoard[row] = [];
                for (let col = 0; col < 7; col++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell', 'empty');
                    cell.dataset.column = col;
                    cell.dataset.row = row;
                    gameBoard[row][col] = cell;
                    boardElements.appendChild(cell);
                }
            }
            document.querySelectorAll('.cell').forEach((cell) => {
                cell.addEventListener('click', () => {
                    const column = parseInt(cell.dataset.column);
                    handleCellClick(column);
                });
            });
        });

        document.getElementById('reset').addEventListener('click', () => {
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
                cell.classList.remove('red', 'yellow');
                cell.classList.add('empty');
            });
            gameBoard = [];
            players = [];
            const playerInfoElement = document.querySelector('.playerinfo');
            playerInfoElement.classList.remove('hidden');
            playerInfoElement.classList.add('visible');
            const boardElements = document.querySelector('.board');
            boardElements.innerHTML = "";
            winningInfoElement.classList.remove('visible');
            winningInfoElement.classList.add('hidden');
        });
    }

    function checkWinCondition(row, col) {
        function checkDirection(directionx, directiony) {
            let count = 1;
            let rowWin = row + directionx;
            let colWin = col + directiony;
            while (rowWin >= 0 && rowWin < 6 && colWin >= 0 && colWin < 7 && gameBoard[rowWin][colWin].classList.contains(players[currentPlayerIndex].color)) {
                count++;
                rowWin += directionx;
                colWin += directiony;
            }

            rowWin = row - directionx;
            colWin = col - directiony;
            while (rowWin >= 0 && rowWin < 6 && colWin >= 0 && colWin < 7 && gameBoard[rowWin][colWin].classList.contains(players[currentPlayerIndex].color)) {
                count++;
                rowWin -= directionx;
                colWin -= directiony;
            }

            return count >= 4;
        }

        return (checkDirection(1, 0) || checkDirection(0, 1) || checkDirection(1, 1) || checkDirection(1, -1));
    }

    function handleCellClick(column) {
        for (let row = 5; row >= 0; row--) {
            const cell = gameBoard[row][column];
            if (cell.classList.contains('empty')) {
                cell.classList.remove('empty');
                cell.classList.add(players[currentPlayerIndex].color);
                if (checkWinCondition(row, column)) {
                    setTimeout(() => {
                        alert(`${players[currentPlayerIndex].name} wins!`);
                        players[currentPlayerIndex].winnigs++;
                        if(players[currentPlayerIndex].color === 'red') {
                            const winner = document.getElementById('p1');
                            winner.innerText = players[currentPlayerIndex].name + ": " + players[currentPlayerIndex].winnigs.toString();
                        }
                        else {
                            const winner = document.getElementById('p2');
                            winner.innerText = players[currentPlayerIndex].name + ": " + players[currentPlayerIndex].winnigs.toString();
                        }
                        const cells = document.querySelectorAll('.cell');
                        cells.forEach((cell) => {
                            cell.classList.remove('red', 'yellow');
                            cell.classList.add('empty');
                        });
                    }, 100);
                } else {
                    currentPlayerIndex = players[currentPlayerIndex].color === 'red' ? 1 : 0;
                }
                return;
            }
        }
    }

    return {
        initializeGameBoard,
    };

}



const gameInstance = GameBoard();
gameInstance.initializeGameBoard();
