
const buttonColours = [`red`, `blue`, `green`, `yellow`];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;
let heading = document.querySelector(`h1`);
let inGame = true;

function playWrongSound() {
    let wrongSound = new Audio(`wrong.mp3`);
    wrongSound.play();
}

function playButtonSound(randomChosenColour) {
    let audio = new Audio(`${randomChosenColour}.mp3`);
    audio.play();
}

function animateButton(randomChosenColour) {
    let randomChosenButton = document.querySelector(`.${randomChosenColour}`);
    randomChosenButton.classList.add(`flash-animation`);
    randomChosenButton.addEventListener(`animationend`, () => {
        randomChosenButton.classList.remove(`flash-animation`);
    });
}

function animatePress(buttonPressed) {
    let button = document.querySelector(`#${buttonPressed}`);
    button.classList.add(`pressed`);
    setTimeout(() => {
        button.classList.remove(`pressed`);
    }, 100)
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animateButton(randomChosenColour);
    playButtonSound(randomChosenColour);


    if (level !== 0) {
        heading.innerHTML = `Level: ${level}`
    }

    console.log(gamePattern);
}

function clickHandler(button) {
    userClickedPattern.push(button);
    animatePress(button);
    console.log(userClickedPattern);
    checkAnswer(button);
}

for (let button of buttonColours) {
    document.querySelector(`#${button}`).addEventListener(`click`, () => {
        clickHandler(button);
    });
}

function resetGame() {
    console.log(`resetting game..`);
    heading.innerHTML = `Press Enter Key or Tap to Start`;
    level = 1;
    userClickedPattern = [];
    gamePattern = [];
    document.querySelectorAll(`.btn`).forEach(button => {
        button.classList.remove(`disabled`);
    });
    document.querySelector(`#level-title`).classList.remove(`game-over-title`);
    document.body.classList.remove(`game-over-bg`);
}

function disableButtons() {
    document.querySelectorAll(`.btn`).forEach(button => {
        button.classList.add(`disabled`);
    });
}

function handleEnterKey(e) {
    if (e.key.toLowerCase() === `enter`) {
        resetGame(e);
        startGame(e);
        document.removeEventListener(`keydown`, handleEnterKey);
    }
}

function handleScreenTap() {
    resetGame();
    initializeGame();
    document.removeEventListener(`touchstart`, handleScreenTap);
}

function gameEnd() {
    heading.innerHTML = `Game Over. Your Score Was: ${level}. Press Enter or tap To Restart.`;
    disableButtons();
    document.querySelector(`#level-title`).classList.add(`game-over-title`);
    document.body.classList.add(`game-over-bg`);
    document.addEventListener(`keydown`, handleEnterKey);
    document.addEventListener(`touchstart`, handleScreenTap);
}

function checkAnswer(button) {

    let continueGame = true;
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            continueGame = false;
            playWrongSound();
            gameEnd();
            break;
        }
    }

    if (continueGame && userClickedPattern.length === gamePattern.length) {
        level++;
        playButtonSound(button);
        userClickedPattern = [];
        setTimeout(function () {
            nextSequence()
        }, 1000);
    }

}

function initializeGame() {
    document.querySelectorAll(`.btn`).forEach(button => {
        button.classList.remove(`disabled`);
    });
    document.removeEventListener(`keydown`, startGame);
    document.removeEventListener(`touchstart`, initializeGame);
    nextSequence();
}

function startGame(e) {

    if (e.key.toLowerCase() === `enter`) {
        initializeGame();
    }
}

document.querySelectorAll(`.btn`).forEach(button => {
    button.classList.add(`disabled`);
});
document.addEventListener(`keydown`, startGame);
document.addEventListener(`touchstart`, initializeGame);

