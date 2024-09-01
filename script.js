const gameArea = document.getElementById('gameArea');
const pointsDisplay = document.getElementById('points');
const timeDisplay = document.getElementById('time');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const finalPointsDisplay = document.getElementById('finalPoints');
const restartButton = document.getElementById('restartButton');

let points = 0;
let timeRemaining = 120; // 10 seconds for testing
let clickTimeLimit = 2000; // 2 seconds
let gameInterval;
let highestPoints = 0;
let sparkleInterval;

// Image sources (replace these with your image URLs)
const images = [
    'images/cat.png',
    'images/cow.png',
    'images/dog.png',
    'images/duck.png',
    'images/elephant.png',
    'images/goat.png',
    'images/hen.png',
    'images/horse.png',
    'images/parrot.png',
    'images/tiger.png'
];

// Corresponding audio files
const sounds = [
    'sounds/cat.mp3',
    'sounds/cow.mp3',
    'sounds/dog.mp3',
    'sounds/duck.mp3',
    'sounds/elephant.mp3',
    'sounds/goat.mp3',
    'sounds/hen.mp3',
    'sounds/horse.mp3',
    'sounds/parrot.mp3',
    'sounds/tiger.mp3'
];

// Generate 10 buttons with images and corresponding sounds
for (let i = 0; i < 10; i++) {
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = images[i];
    button.appendChild(img);
    button.style.visibility = 'hidden';

    // Create an audio object for the sound
    const sound = new Audio(sounds[i]);

    // Play the sound when the button is clicked
    button.addEventListener('click', () => {
        if (button.style.visibility === 'visible') {
            sound.play();
            handleClick(button);
        }
    });
    gameArea.appendChild(button);
}

// Start the game
startGame();

function startGame() {
    clearInterval(sparkleInterval);
    removeSparkles();

    gameOverOverlay.classList.remove('visible');
    restartButton.classList.remove('visible');
    restartButton.style.visibility = 'hidden';
    points = 0; // Reset points
    pointsDisplay.textContent = points;
    timeRemaining = 120; // Reset time for the game
    timeDisplay.textContent = timeRemaining;

    gameInterval = setInterval(() => {
        timeRemaining--;
        timeDisplay.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(gameInterval);
            endGame();
        } else {
            showRandomButton();
        }
    }, 1000);

    showRandomButton(); // Show the first random button immediately
}

function showRandomButton() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.style.visibility = 'hidden');

    const randomIndex = Math.floor(Math.random() * 10);
    const randomButton = buttons[randomIndex];
    randomButton.style.visibility = 'visible';
}

function handleClick(button) {
    if (button.style.visibility === 'visible') {
        points++;
        pointsDisplay.textContent = points;

        if (points % 50 === 0) {
            timeRemaining += 20;
            timeDisplay.textContent = timeRemaining;
        }

        button.style.visibility = 'hidden';
        showRandomButton(); // Immediately show the next random button

        if (points % 20 === 0 && clickTimeLimit > 2000) {
            clickTimeLimit = Math.max(2000, clickTimeLimit - 500);
        }
    }
}

function endGame() {
    if (points > highestPoints) {
        highestPoints = points;
    }

    finalPointsDisplay.textContent = points;
    gameOverOverlay.classList.add('visible');
    restartButton.classList.add('visible');
    restartButton.style.visibility = 'visible';

    sparkleInterval = setInterval(createSparkles, 2000);
}

function createSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkles';
    document.body.appendChild(sparkleContainer);

    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkleContainer.appendChild(sparkle);
    }

    setTimeout(() => {
        removeSparkles();
    }, 1000);
}

function removeSparkles() {
    const sparkleContainers = document.querySelectorAll('.sparkles');
    sparkleContainers.forEach(container => container.remove());
}

function restartGame() {
    clearInterval(sparkleInterval);
    removeSparkles();

    gameOverOverlay.classList.remove('visible');
    restartButton.classList.remove('visible');
    restartButton.style.visibility = 'hidden';
    startGame();
}
