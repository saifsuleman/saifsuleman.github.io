const Color = Object.freeze({
    RED: [255, 0, 0],
    GREEN: [0, 255, 0],
    BLUE: [0, 0, 255],
    YELLOW: [255, 255, 0],
    ORANGE: [255, 165, 0],
})

let correct = shuffleArray(Object.keys(Color));
const guess = shuffleArray(Object.keys(Color));
const calculateCorrect = () => correct.reduce((acc, color, i) => acc + (color === guess[i]), 0);

let [guessN, correctN, selectedI] = [0, calculateCorrect(), null];
let showAnswer = false;
let cheated = false;

function setup() {
    createCanvas(1920, 1080)
}

function draw() {
    background(0)
    guess.forEach((color, i) => {
        drawCup(500 + i * 200, 300, color);
    });

    if (showAnswer) {
        correct.forEach((color, i) => {
            drawCup(500 + i * 200, 700, color);
        });
    }

    if (correctN != null) {
        // render text correctN
        fill(255);
        textSize(32);
        text(`Correct: ${correctN}`, 500, 500);
    }

    if (selectedI != null) {
        fill(255);
        textSize(20);
        text("Selected", 500 + selectedI * 200, 450);
    } else if (correctN == null) {
        fill(255);
        rect(700, 650, 450, 100);
        fill(0);
        textSize(32);
        text("Click to confirm", 800, 700);
    }

    fill(255);
    textSize(16);
    if (cheated) {
        text(`Guesses: You cheated`, 500, 220);
    } else {
        text(`Guesses: ${guessN}`, 500, 220);
    }
}

function mouseClicked() {
    if (correctN == null && mouseY > 650 && mouseY < 750 && mouseX > 700 && mouseX < 1150) {
        correctN = calculateCorrect();
        guessN++;
        return;
    }

    if (mouseY < 300 || mouseY > 400) return;
    const i = Math.floor((mouseX - 500) / 200);
    if (i < 0 || i >= guess.length) return;
    selectedI == null ? selectedI = i : doSwap(selectedI, i);
}

function keyPressed() {
    // check if 't' is clicked
    if (keyCode == 84) {
        showAnswer = !showAnswer;
        cheated = true;
    }
}

function doSwap(i, j) {
    if (i == j) {
        selectedI = null;
        return;
    }
    [guess[i], guess[j]] = [guess[j], guess[i]];
    selectedI = correctN = null;
}

function drawCup(x, y, color) {
    if (!color) {
        return;
    }
    fill(...Color[color]);
    rect(x, y, 100, 100);
}

function shuffleArray(array) {
    array = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
