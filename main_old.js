const B = () => {
    let b = [];
    let p = [];
    let cp = 0;
    class P {
        constructor(n, c) {
            this.n = n;
            this.c = c;
            this.v = 0;
        }
    }

    function z() {      //Function zum erstellen der Spieloberfläche (Inputfelder, Gameboard)
        const bE = document.querySelector('.game');
        const pI = document.createElement('div');
        const p1l = document.createElement('label');
        const p1i = document.createElement('input');
        p1l.innerHTML = "Player 1: ";
        p1i.setAttribute('type', 'text');
        pI.classList.add('playerinfo', 'visible');
        p1i.id = 'name1';
        bE.appendChild(pI);
        pI.appendChild(p1l);
        pI.appendChild(p1i);
        const p2l = document.createElement('label');
        p2l.innerHTML = "Player 2: ";
        const p2i = document.createElement('input');
        p2i.setAttribute('type', 'text');
        p2i.id = 'name2';
        pI.appendChild(p2l);
        pI.appendChild(p2i);
        const pbn = document.createElement('button');
        pbn.textContent = 'Submit';
        pbn.id = 'pbtn';
        pI.appendChild(pbn);
        const wI = document.createElement('div');
        wI.classList.add('winfo', 'hidden');
        bE.appendChild(wI);
        const p1 = document.createElement('h3');
        p1.id = 'p1';
        const p2 = document.createElement('h3');
        p2.id = 'p2';
        wI.appendChild(p1);
        wI.appendChild(p2);

        pbn.addEventListener('click', () => {
            pI.classList.remove('visible');
            pI.classList.add('hidden');
            wI.classList.remove('hidden');
            wI.classList.add('visible');
            pa = new P(document.getElementById('name1').value, "red");
            pb = new P(document.getElementById('name2').value, "yellow");
            p1.innerText = document.getElementById('name1').value + ": 0";
            p1.style.color = 'red';
            p2.innerText = document.getElementById('name2').value + ": 0";
            p2.style.color = 'yellow';
            p.push(pa, pb);
            const bE = document.querySelector('.board');
            for (let row = 0; row < 6; row++) {
                b[row] = [];
                for (let col = 0; col < 7; col++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell', 'empty');
                    cell.dataset.column = col;
                    cell.dataset.row = row;
                    b[row][col] = cell;
                    bE.appendChild(cell);
                }
            }
            document.querySelectorAll('.cell').forEach((cell) => {
                cell.addEventListener('click', () => {
                    const column = parseInt(cell.dataset.column);
                    w(column);
                });
            });
        });

        document.getElementById('reset').addEventListener('click', () => {
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
                cell.classList.remove('red', 'yellow');
                cell.classList.add('empty');
            });

            b = [];
            p = [];
            const pI = document.querySelector('.playerinfo');
            pI.classList.remove('hidden');
            pI.classList.add('visible');
            const bE = document.querySelector('.board');
            bE.innerHTML = "";
            wI.classList.remove('visible');
            wI.classList.add('hidden');

        });
    }

    function y(row, col) {
        function x(dx, dy) {
            let count = 1;
            let r = row + dx;
            let c = col + dy;
            while (r >= 0 && r < 6 && c >= 0 && c < 7 && b[r][c].classList.contains(p[cp].c)) {
                count++;
                r += dx;
                c += dy;
            }

            r = row - dx;
            c = col - dy;
            while (r >= 0 && r < 6 && c >= 0 && c < 7 && b[r][c].classList.contains(p[cp].c)) {
                count++;
                r -= dx;
                c -= dy;
            }

            return count >= 4;
        }

        return (x(1, 0) || x(0, 1) || x(1, 1) || x(1, -1));
    }

    function w(column) {
        for (let row = 5; row >= 0; row--) {
            const cell = b[row][column];
            if (cell.classList.contains('empty')) {
                cell.classList.remove('empty');
                cell.classList.add(p[cp].c);
                if (y(row, column)) {
                    setTimeout(() => {
                        alert(`${p[cp].n} wins!`);
                        p[cp].v++;
                        if(p[cp].c === 'red') {
                            const w = document.getElementById('p1');
                            w.innerText = p[cp].n + ": " + p[cp].v.toString();
                        }
                        else {
                            const w = document.getElementById('p2');
                            w.innerText = p[cp].n + ": " + p[cp].v.toString();
                        }
                        const cells = document.querySelectorAll('.cell');
                        cells.forEach((cell) => {
                            cell.classList.remove('red', 'yellow');
                            cell.classList.add('empty');
                        });
                    }, 100);
                } else {
                    cp = p[cp].c === 'red' ? 1 : 0;
                }
                return;
            }
        }
    }

    return {
        z,
    };
};


const a = B();
a.z();

