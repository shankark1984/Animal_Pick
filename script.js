const gameArea = document.getElementById('gameArea');
const pointsDisplay = document.getElementById('points');
const timeDisplay = document.getElementById('time');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const finalPointsDisplay = document.getElementById('finalPoints');

let points = 0;
let timeRemaining = 120; // 2 minutes
let clickTimeLimit = 2000; // 2 seconds
let gameInterval;
let highestPoints = 0;

// Image sources and corresponding sound files (replace these with your image and sound URLs)
const animals = [
    { image: 'cat.png', sound: 'cat.mp3' },
    { image: 'cow.png', sound: 'cow.mp3' },
    { image: 'dog.png', sound: 'dog.mp3' },
    { image: 'duck.png', sound: 'duck.mp3' },
    { image: 'elephant.png', sound: 'elephant.mp3' },
    { image: 'goat.png', sound: 'goat.mp3' },
    { image: 'hen.png', sound: 'hen.mp3' },
    { image: 'horse.png', sound: 'horse.mp3' },
    { image: 'parrot.png', sound: 'parrot.mp3' },
    { image: 'tiger.png', sound: 'tiger.mp3' }
];

// Generate 10 buttons with images and sounds
for (let i = 0; i < 10; i++) {
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = animals[i].image;
    button.appendChild(img);
    button.style.visibility = 'hidden';
    
    // Attach the sound to the button
    button.addEventListener('click', () => {
        playSound(animals[i].sound);
        handleClick(button);
    });
    
    gameArea.appendChild(button);
}

// Function to play the sound
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// Start the game
startGame();

function startGame() {
    gameOverOverlay.classList.remove('visible'); // Hide game over overlay
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
}

function showRandomButton() {
    // Hide all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.style.visibility = 'hidden');

    // Select a random button to show
    const randomIndex = Math.floor(Math.random() * 10);
    const randomButton = buttons[randomIndex];
    randomButton.style.visibility = 'visible';

    // Set a timeout to hide the button after the clickTimeLimit
    setTimeout(() => {
        randomButton.style.visibility = 'hidden';
    }, clickTimeLimit);
}

function handleClick(button) {
    if (button.style.visibility === 'visible') {
        points++;
        pointsDisplay.textContent = points;

        // Make the button disappear immediately
        button.style.visibility = 'hidden';

        // Reduce time limit every 20 points
        if (points % 20 === 0 && clickTimeLimit > 2000) {
            clickTimeLimit = Math.max(2000, clickTimeLimit - 5000);
        }
    }
}

function endGame() {
    // Store highest points
    if (points > highestPoints) {
        highestPoints = points;
    }

    // Show game over overlay with total points
    finalPointsDisplay.textContent = points;
    gameOverOverlay.classList.add('visible');

    // Display sparkles effect
    createSparkles();

    // Reset points and time for the next game
    points = 0;
    pointsDisplay.textContent = points;
    timeRemaining = 120;
    clickTimeLimit = 2000;
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

    // Remove sparkles after animation
    setTimeout(() => {
        document.body.removeChild(sparkleContainer);
    }, 2000);
}

function restartGame() {
    // Hide the game over overlay and start a new game
    gameOverOverlay.classList.remove('visible');
    startGame();
}
