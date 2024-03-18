

const dog_class = 'dog';
const cat_class = 'cat';
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessage = document.querySelector(".winning-message");
const restartGame = document.getElementById("restart");

let turns = 0;
let dog_score = 0;
let cat_score = 0;
var dogTurn = false;

updateScore();

cellElements.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;
    const currentClass = dogTurn ? dog_class : cat_class;
    swapTurns();
    placeMark(cell, currentClass);
    checkWin();
    turns++;
    handleHoverImage();
}

function handleHoverImage() {
    let hoverClass = dogTurn ? "cell-dog" : "cell-cat";
    cellElements.forEach(cell => {
        cell.classList.remove("cell-dog", "cell-cat");
        cell.classList.add(hoverClass);
    })
}

function placeMark(cell, currentClass) {
    console.log(cell)
    const childDiv = cell.querySelector('div');
    childDiv.classList.add(currentClass);
    cell.classList.add('no-hover')
}


function swapTurns() {
    dogTurn = !dogTurn;
}


function checkWin() {
    const cellContents = Array.from(cellElements).map(cell => cell.querySelector('div').classList.contains(dog_class) ? dog_class : cell.querySelector('div').classList.contains(cat_class) ? cat_class : '');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (cellContents[a] && cellContents[a] === cellContents[b] && cellContents[a] === cellContents[c]) {
            winningMessage.style.display = "flex";
            if (cellContents[a] === dog_class) {
                winningMessage.querySelector('.data-win').textContent = "Dog wins!";
                dog_score++;
            } else if (cellContents[a] === cat_class) {
                winningMessage.querySelector('.data-win').textContent = "Cat wins!";
                cat_score++;
            }
            updateScore();
        }
    });
    
    if(turns==8 & winningMessage.style.display!="flex"){
        winningMessage.style.display = "flex";
        winningMessage.querySelector('.data-win').textContent = "It's a Tie!";
    }
}

function updateScore(){
    
        const scoreDogElement = document.querySelector('.dogScore');
        const scoreCatElement = document.querySelector('.catScore');
        scoreDogElement.textContent = dog_score;
        scoreCatElement.textContent = cat_score;
    
}

function removeMark() {
    cellElements.forEach(cell => {
        const childDiv = cell.querySelector('div');
        childDiv.classList.remove("dog", "cat");
        cell.classList.remove('no-hover');
    });
}

restartGame.addEventListener('click', function() {
    removeMark();
    winningMessage.style.display = "none";
    turns=0;
});
