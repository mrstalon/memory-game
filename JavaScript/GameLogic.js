let numbers = [];
let gameSquares = [];
let firstSquare = null;
let gameMenu;
let clickController = 0;
let howManySquarePairs = 0;
let isGameEndedCounter = 0;
let timerCounter = 0;

initializateSquareStyles();

function startGame() {
    let array = document.getElementsByClassName("game-square");
    let randomColors = getSomeColors();
    for (let i = 0; i < array.length; i++) {
        let index = random(randomColors.length);
        let color = randomColors.splice(index, 1)[0];
        gameSquares.push(new GameSquare(array[i], color));
    }
}

function random(n) {
    return Math.floor(Math.random() * n);
}

function getSomeColors() {
    let colorsCopy = numbers.slice();
    let randomColors = [];
    for (let i = 0; i < howManySquarePairs; i++) {
        let index = random(colorsCopy.length);
        randomColors.push(colorsCopy.splice(index, 1)[0]);
    }
    return randomColors.concat(randomColors.slice());
}

function randomizeColors() {
    let randomColors = getSomeColors();
    gameSquares.forEach(function (gameSquare) {
        let color = randomColors.splice(random(randomColors.length), 1)[0];
        gameSquare.setColor(color);
    });
}

function checkGame(gameSquare) {
    if (firstSquare === null) {
        firstSquare = gameSquare;
        return
    }

    if (firstSquare.color === gameSquare.color) {
        firstSquare.lock();
        gameSquare.lock();
        clickController = 0;
        isGameEndedCounter++;
        isGameEnded();
    } else {
        let a = firstSquare;
        let b = gameSquare;
        setTimeout(function () {
            a.reset();
            b.reset();
            clickController = 0;
            firstSquare = null;
        }, 400);
    }
    firstSquare = null;
}


function gameModeMedium() {
    changingGameMode(8, 'game-medium');
}

function gameModeEasy() {
    changingGameMode(4, 'game-easy');
}

function gameModeHard() {
    changingGameMode(15, 'game-hard');
}

function changingGameMode(pairsCount, gameModeSelector) {
    howManySquarePairs = pairsCount;
    let container = clearMenuPage();

    let gameArea = document.createElement('div');
    gameArea.setAttribute('id', gameModeSelector);
    container.appendChild(gameArea);

    for (let i = 0; i < pairsCount*2; i++) {
        let gameSquare = document.createElement('div');
        let squareContainer = document.createElement('div');
        let squareFront = document.createElement('div');
        let squareBack = document.createElement('div');
        gameSquare.setAttribute('class', 'game-square');
        squareContainer.appendChild(squareFront);
        squareContainer.appendChild(squareBack);
        gameSquare.appendChild(squareContainer);
        gameArea.appendChild(gameSquare);
    }

    let gameMenuButton = document.createElement('button');
    let textForMenu = document.createTextNode("Game menu");
    gameMenuButton.setAttribute('id', 'menu-return-button');
    gameMenuButton.setAttribute("onclick", 'setupGameMenu()');
    gameMenuButton.appendChild(textForMenu);
    gameArea.appendChild(gameMenuButton);
    gameArea.appendChild(addTimerElement());

    startGame();
    timer();
}

function addingWinAlert() {
    let container = clearGamePage();
    let endGameAlert = document.createElement('div');
    let endGameAlertContent = document.createElement('p');
    let tryAgainButton = document.createElement('button');
    let alertContectText = document.createTextNode("You won, congratulations!!!!Round time is --- " + timerCounter + 'seconds');
    let tryAgainButtonText = document.createTextNode('Try again');


    timerCounter = 0;
    endGameAlert.setAttribute('class', 'end-game-alert');
    endGameAlertContent.setAttribute('class', 'end-game-alert-content');
    endGameAlertContent.appendChild(alertContectText);
    endGameAlert.appendChild(endGameAlertContent);
    tryAgainButton.setAttribute('class', 'try-again-button');
    tryAgainButton.setAttribute('onclick', 'clearWinAlert()');
    tryAgainButton.appendChild(tryAgainButtonText);
    endGameAlert.appendChild(tryAgainButton);


    container.appendChild(endGameAlert);
}

function addTimerElement() {
    let timer = document.createElement('h3');
    let timerDescription = document.createElement('h3');
    let timerContainer = document.createElement('div');
    let timerContent = document.createTextNode('-1');
    let timerDescriptionContent = document.createTextNode('Round time: ');


    timerDescription.setAttribute('class', 'timer-description');
    timerContainer.setAttribute('class', 'timer-container');
    timer.setAttribute('class', 'timer');
    timerDescription.appendChild(timerDescriptionContent);
    timer.appendChild(timerContent);
    timerContainer.appendChild(timerDescription);
    timerContainer.appendChild(timer);
    return timerContainer;
}


function clearMenuPage() {
    let container = document.getElementById('container');
    gameMenu = document.getElementById('game-menu');
    container.removeChild(gameMenu);
    return container;
}

function clearGamePage() {
    let removeElement;
    let container = document.getElementById('container');

    if (howManySquarePairs === 4) {
        removeElement = document.getElementById('game-easy');
    } else if (howManySquarePairs === 8) {
        removeElement = document.getElementById('game-medium');
    } else if (howManySquarePairs === 15) {
        removeElement = document.getElementById('game-hard');
    }

    container.removeChild(removeElement);

    return container;
}

function clearWinAlert() {
    let container = document.getElementById('container');
    let removeElement = document.getElementsByClassName('end-game-alert');
    container.removeChild(removeElement[0]);
    container.appendChild(gameMenu);
}

function setupGameMenu() {
    let container = clearGamePage();
    container.appendChild(gameMenu);
    timerCounter = 0;
}

function isGameEnded() {
    if (isGameEndedCounter === howManySquarePairs) {
        setTimeout(addingWinAlert, 500);
        isGameEndedCounter = 0;
    }
}

function timer() {
    if(document.getElementsByClassName('timer')[0] === undefined){
        return;
    }
    ++timerCounter;
    document.getElementsByClassName('timer')[0].innerHTML = timerCounter;
    setTimeout('timer()', 1000);
}

function changeCardShirtsToWindowsShirt() {
    getLinkOfCardsShirtStyle('Styles/windows-card-shirt.css');
}

function changeCardShirtsToAppleShirt() {
    getLinkOfCardsShirtStyle('Styles/apple-card-shirt.css');
}

function changeCardShirtsToAndroidShirt() {
    getLinkOfCardsShirtStyle('Styles/android-card-shirt.css');
}

function getLinkOfCardsShirtStyle(linkToStyle) {
    let oldStyle = document.getElementById('card-shirt-style');
    let newStyle = document.createElement('link');
    newStyle.setAttribute('id', 'card-shirt-style');
    newStyle.setAttribute('href', linkToStyle);
    newStyle.setAttribute('type', 'text/css');
    newStyle.setAttribute('rel', 'stylesheet');
    document.getElementsByTagName("head").item(0).replaceChild(newStyle, oldStyle);
}

function initializateSquareStyles() {
    for (let i = 0; i < 16; i++) {
        numbers.push('square-' + i);
    }
}



