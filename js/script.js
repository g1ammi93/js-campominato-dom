// Recupero gli elementi in pagina

const grid = document.getElementById('grid');
const button = document.getElementById('button')
const playerScore = document.getElementById('score')

// Funzioni

// Funzione creazione cella

const createCell = (content) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = content;
    return cell;
}

// Funzione creazione bombe

const casualBombs = (cells, totalBombs) => {
    const bombs = [];
    while (bombs.length < totalBombs) {

        const randomNumber = Math.floor(Math.random() * cells) + 1;
        if (!bombs.includes(randomNumber)) bombs.push(randomNumber);
    }
    return bombs;
}

// Funzione di fine gioco
const endGame = (score, hasWon = false) => {
    const message = hasWon ? 'Sei un grande, nulla da dire!' : 'Hai perso! Punti totali: ' + score;

    alert(message);

    gameOver = true;
}

// Rows and Cols

const rows = 10;
const cols = 10;
const totalCells = rows * cols;
// Numero di bombe
const totalBombs = 16;
// Punteggio massimo
const maxPoints = totalCells - totalBombs;
// Preparo il GameOver
let gameOver = false;


// Svolgimento delle funzioni dentro il click del bottone

button.addEventListener('click', function () {

    gameOver = false;
    button.innerText = 'Ricomincia'

    // Preparo il punteggio
    let score = 0;
    // Scrivo il punteggio in pagina
    playerScore.innerHTML = `Score: 0`;

    // Rimuovo il figlio di grid così che il loop riparta da capo
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }


    // generiamo le bombe

    const bombs = casualBombs(totalCells, totalBombs);
    console.log(bombs)

    // Creo un ciclo for perchè mi servirà la i

    for (let i = 1; i <= totalCells; i++) {


        // creo la cella e gli assegno il numero
        const cell = createCell(i);

        // Aggiungo le funzioni al click

        cell.addEventListener('click', () => {
            if (gameOver) return;
            // Rendiamo le celle cliccabili una sola volta
            if (cell.classList.contains('clicked')) return;
            // Aggiungiamo la classe clicked
            cell.classList.add('clicked');
            // Quando clicco su una cella metto il numero in console
            console.log('Cella cliccata numero:', i)
            // Controllo che non sia stata colpita una bomba
            const hasHitBomb = bombs.includes(parseInt(cell.innerText));

            if (hasHitBomb) {
                cell.classList.add('bomb');
                endGame(score, false);
            } else {
                // Modifico ed incremento il punteggio in pagina
                playerScore.innerHTML = `Score: ${++score}`

                if (score === maxPoints) {
                    endGame(score, true)
                }
            }

            // Aggiungo il gameover in caso di vittoria o di bomba colpita
        })



        // Appendo la classe in pagina

        grid.appendChild(cell);
    }
})


// Svolgiamo il centro del gioco