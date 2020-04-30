const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const levelBoard = document.querySelector('.level');
const objBoard = document.querySelector('.obj');
const moles = document.querySelectorAll('.mole');
let lastHole;

let maxTime = 1000;
const timeDiff = 200;
let minTime = maxTime - timeDiff;
let gameTime = 10000;
let timeUp = false;
let score = 0;
let levelUpScore = Math.round(gameTime / 1000) - 1;
objBoard.textContent = levelUpScore;
const hardenLevelBy = 0.1;
let level = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        // console.log('same');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(minTime, maxTime);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
    // console.log(time, hole);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
        timeUp = true;
        if (score >= levelUpScore) {
            levelUp();
        }
    }, gameTime);
}

function levelUp() {
    alert('Level up');
    maxTime *= (1 - hardenLevelBy);
    minTime *= (1 - hardenLevelBy);
    level++;
    if (levelUpScore > 2) levelUpScore--;
    levelBoard.textContent = level;
    objBoard.textContent = levelUpScore;
    // console.log(level, levelUpScore, gameTime, maxTime, minTime);
}

function bonk(e) {
    if (!e.isTrusted) {
        console.log('Cheater');
        return;
    }
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));