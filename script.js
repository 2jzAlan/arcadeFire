const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const highScoreSpan = document.querySelector('[data-high-score]');
const resetButton = document.getElementById('resetButton');

const SELECTIONS = [
    {
        name: 'fire',
        emoji: '🔥',
        beats: 'wind'
    },
    {
        name: 'wind',
        emoji: '💨',
        beats: 'water'
    },
    {
        name: 'water',
        emoji: '🌊',
        beats: 'fire'
    },
];

let consecutiveWins = 0;

function updateHighScore() {
    const currentHighScore = parseInt(highScoreSpan.innerText);

    if (consecutiveWins > currentHighScore / 1000) {
        highScoreSpan.innerText = consecutiveWins * 1000;
    }
}

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) {
        incrementScore(yourScoreSpan);
        consecutiveWins++;
    } else {
        consecutiveWins = 0;
    }

    if (computerWinner) {
        incrementScore(computerScoreSpan);
        consecutiveWins = 0;
    }

    updateHighScore();
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')

    if (winner) div.classList.add('winner')

    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}

// Reset function
function resetGame() {
    yourScoreSpan.innerText = '0';
    computerScoreSpan.innerText = '0';
    highScoreSpan.innerText = '0';
    consecutiveWins = 0;

    const resultSelections = document.querySelectorAll('.result-selection');
    resultSelections.forEach(selection => selection.remove());
}

resetButton.addEventListener('click', resetGame);

function navigateToMainMenu() {
      window.location.href = 'intro.html';
    }