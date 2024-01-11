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
    const bomb = [];
    while (bomb.lenght < totalBombs) {
        const randomNumber = Math.floor(Math.random() * cells) + 1;
        if (!bomb.includes(randomNumber)) bomb.push(randomNumber);
    }
    return bomb;
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

    // Preparo il punteggio
    let score = 0;
    // Scrivo il punteggio in pagina
    playerScore.innerHTML = `Score: 0`;

    // Rimuovo il figlio di grid così che il loop riparta da capo
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    // Creo un ciclo for perchè mi servirà la i

    for (let i = 1; i <= totalCells; i++) {


        // creo la cella e gli assegno il numero
        const cell = createCell(i);

        // Aggiungo le funzioni al click

        cell.addEventListener('click', () => {
            // Rendiamo le celle cliccabili una sola volta
            if (cell.classList.contains('clicked')) return;
            // Aggiungiamo la classe clicked
            cell.classList.add('clicked');
            // Modifico ed incremento il punteggio in pagina
            playerScore.innerHTML = `Score: ${++score}`
            // Quando clicco su una cella metto il numero in console
            console.log('Cella cliccata numero:', i)
            // Controllo che non sia stata colpita una bomba
            const hasHitBomb = bombs.includes(parseInt(cell.innerText));

            // Aggiungo il gameover in caso di vittoria o di bomba colpita
        })

        // generiamo le bombe

        const bombs = casualBombs(totalCells, totalBombs);
        console.log(bombs)

        // Appendo la classe in pagina

        grid.appendChild(cell);
    }
})


// Svolgiamo il centro del gioco