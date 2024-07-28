const easyQB = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: "Paris", image: "image/1.webp" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4", image: "image/6.webp" },
    { question: "What is the color of the sky?", options: ["Blue", "Green", "Red", "Yellow"], correct: "Blue", image: "image/7.webp" },
    { question: "What is 5 + 3?", options: ["5", "8", "10", "15"], correct: "8", image: "image/8.webp" },
    { question: "What is the opposite of hot?", options: ["Cold", "Warm", "Cool", "Boiling"], correct: "Cold", image: "image/9.webp" }
];

const intermediateQB = [
    { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], correct: "4", image: "image/2.webp" },
    { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "HO"], correct: "H2O", image: "image/3.webp" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], correct: "Harper Lee", image: "image/11.webp" },
    { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: "Ottawa", image: "image/15.webp" },
    { question: "What is 12 * 12?", options: ["120", "124", "144", "148"], correct: "144", image: "image/12.webp" }
];

const advancedQB = [
    { question: "What is the capital of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], correct: "Canberra", image: "image/4.webp" },
    { question: "What is the derivative of x^2?", options: ["x", "2x", "x^2", "2"], correct: "2x", image: "image/5.webp" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], correct: "Au", image: "image/13.webp" },
    { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correct: "Albert Einstein", image: "image/15.webp" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], correct: "Jupiter", image: "image/16.webp" }
];

let status = "Beginner";
let n = 0;
let score = 0;
let currentQuestion = null;
let answeredQuestions = new Set();
let totalTime = 60;
let timeLeft = totalTime;
let totalBonusTime = 0;
let quickAnswerBonus = 0;
let timerInterval;
let questionStartTime;

const loadingElement = document.getElementById('loading');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultContainer = document.getElementById('result');
const questionImage = document.getElementById('question-image');
const restartButton = document.getElementById('restart');
const viewResultsButton = document.getElementById('view-results');

const questions = {
    Beginner: easyQB,
    Intermediate: intermediateQB,
    Advanced: advancedQB
};

function showLoading() {
    loadingElement.classList.remove('hidden');
    questionContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
}

function hideLoading() {
    loadingElement.classList.add('hidden');
    questionContainer.classList.remove('hidden');
}

function getNextQuestion() {
    const currentQuestions = questions[status];
    let nextQuestion = null;
    let tries = 0;

    while (!nextQuestion && tries < 100) {
        const index = Math.floor(Math.random() * currentQuestions.length);
        if (!answeredQuestions.has(index)) {
            nextQuestion = currentQuestions[index];
            answeredQuestions.add(index);
        }
        tries++;
    }

    return nextQuestion || currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
}

function showQuestion() {
    if (n >= 5) {
        showResultsButton();
        return;
    }

    showLoading();
    currentQuestion = getNextQuestion();
    questionElement.textContent = currentQuestion.question;
    questionImage.src = currentQuestion.image;
    optionsElement.innerHTML = "";

    const combinedLetters = shuffleLetters(currentQuestion.correct);

    combinedLetters.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        letterElement.classList.add('letter');
        letterElement.addEventListener('click', () => selectLetter(letterElement));
        optionsElement.appendChild(letterElement);
    });

    let userInput = document.getElementById('user-answer');
    if (!userInput) {
        userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.id = 'user-answer';
        userInput.placeholder = 'Type your answer here...';
        userInput.readOnly = true;
        optionsElement.appendChild(userInput);
    } else {
        userInput.value = '';
    }

    n++;
    hideLoading();
    startTimer();
}

function shuffleLetters(answer) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split('');
    const shuffledLetters = letters.sort(() => 0.5 - Math.random()).slice(0, 10);
    const answerLetters = answer.split('').sort(() => 0.5 - Math.random());
    return shuffledLetters.concat(answerLetters).sort(() => 0.5 - Math.random());
}

function selectLetter(letterElement) {
    const userInput = document.getElementById('user-answer');
    userInput.value += letterElement.textContent;
    letterElement.style.display = 'none';
}

function checkAnswer() {
    const userInput = document.getElementById('user-answer').value.trim().toLowerCase();
    if (userInput === currentQuestion.correct.trim().toLowerCase()) {
        score++;
        handleAnswer(true);
    } else {
        handleAnswer(false);
    }
}

function startTimer() {
    timeLeft = totalTime;
    updateTimerDisplay();
    questionStartTime = Date.now();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('time-left').textContent = `${timeLeft}s`;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

function handleAnswer(isCorrect) {
    clearInterval(timerInterval);

    if (isCorrect) {
        totalBonusTime += timeLeft;
        if (Date.now() - questionStartTime <= 30000) {
            quickAnswerBonus++;
        }
        status = getNextStatus(status);
    } else {
        status = getPreviousStatus(status);
    }

    showQuestion();
}

function getNextStatus(currentStatus) {
    switch (currentStatus) {
        case "Beginner":
            return "Intermediate";
        case "Intermediate":
            return "Advanced";
        default:
            return "Advanced";
    }
}

function getPreviousStatus(currentStatus) {
    switch (currentStatus) {
        case "Intermediate":
            return "Beginner";
        case "Advanced":
            return "Intermediate";
        default:
            return "Beginner";
    }
}

function showResultsButton() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    viewResultsButton.classList.remove('hidden');

    let bonusPoints = Math.floor(totalBonusTime / 120);
    let totalScore = score + bonusPoints + quickAnswerBonus;

    // Ensure total score does not exceed 10
    if (totalScore > 10) {
        totalScore = 10;
    }

    viewResultsButton.addEventListener('click', () => {
        localStorage.setItem('score', totalScore);
        localStorage.setItem('totalBonusTime', totalBonusTime);
        localStorage.setItem('quickAnswerBonus', quickAnswerBonus);
        window.location.href = 'index3.html';
    });
}

restartButton.addEventListener('click', () => {
    status = "Beginner";
    n = 0;
    score = 0;
    totalBonusTime = 0;
    quickAnswerBonus = 0;
    answeredQuestions.clear();
    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    viewResultsButton.classList.add('hidden');
    showQuestion();
});

document.getElementById('submit').addEventListener('click', () => {
    checkAnswer();
    resetTimer();
});

showQuestion();
