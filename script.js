const easyQB = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: "Paris", image: "1.webp" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4", image: "2.webp" },
    { question: "What is the color of the sky?", options: ["Blue", "Green", "Red", "Yellow"], correct: "Blue", image: "3.webp" },
    { question: "What is 5 + 3?", options: ["5", "8", "10", "15"], correct: "8", image: "4.webp" },
    { question: "What is the opposite of hot?", options: ["Cold", "Warm", "Cool", "Boiling"], correct: "Cold", image: "5.webp" }
];

const intermediateQB = [
    { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], correct: "4", image: "1.webp" },
    { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "HO"], correct: "H2O", image: "2.webp" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], correct: "Harper Lee", image: "3.webp" },
    { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: "Ottawa", image: "4.webp" },
    { question: "What is 12 * 12?", options: ["120", "124", "144", "148"], correct: "144", image: "5.webp" }
];

const advancedQB = [
    { question: "What is the capital of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], correct: "Canberra", image: "1.webp" },
    { question: "What is the derivative of x^2?", options: ["x", "2x", "x^2", "2"], correct: "2x", image: "2.webp" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], correct: "Au", image: "3.webp" },
    { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correct: "Albert Einstein", image: "4.webp" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], correct: "Jupiter", image: "5.webp" }
];

let status = "Beginner";
let n = 0;
let B = 0, I = 0, A = 0;
let score = 0;
let currentQuestion = null;

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

function showQuestion() {
    if (n >= 5) {
        showResultsButton();
        return;
    }

    showLoading();

    setTimeout(() => {
        const currentQuestions = questions[status];
        currentQuestion = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];

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
    }, 1000);
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
    const userInput = document.getElementById('user-answer').value;
    if (userInput.trim().toLowerCase() === currentQuestion.correct.trim().toLowerCase()) {
        score++;
        handleAnswer(true);
    } else {
        handleAnswer(false);
    }
}

function handleAnswer(isCorrect) {
    if (isCorrect) {
        if (status === "Beginner") {
            status = "Intermediate";
        } else if (status === "Intermediate") {
            status = "Advanced";
        }
    } else {
        if (status === "Intermediate") {
            status = "Beginner";
        } else if (status === "Advanced") {
            status = "Intermediate";
        }
    }

    n++;
    showQuestion();
}

function showResultsButton() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    viewResultsButton.classList.remove('hidden');

    viewResultsButton.addEventListener('click', () => {
        localStorage.setItem('score', score);
        window.location.href = 'index3.html';
    });
}

restartButton.addEventListener('click', () => {
    status = "Beginner";
    n = 0;
    B = 0;
    I = 0;
    A = 0;
    score = 0;
    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    viewResultsButton.classList.add('hidden');
    showQuestion();
});

document.getElementById('submit').addEventListener('click', checkAnswer);

showQuestion();
