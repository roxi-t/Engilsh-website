// Question bank for "Beginner" level
const easyQB = [
    { question: "Mossadegh took control of Iran’s oil industry. What word means “to take full control”?", options: ["Paris", "London", "Berlin", "Madrid"], correct: "Nationalize", image: "image/nationalize.jpg" },
    { question: "What word describes freedom from outside control?", options: ["3", "4", "5", "6"], correct: "Independence", image: "image/Independence.webp" },
    { question: "Oil is an example of valuable __________ that a country can use.", options: ["Blue", "Green", "Red", "Yellow"], correct: "Resources", image: "image/Resources.webp" },
    { question: "The lasting impact or influence Mossadegh left on Iran is called his __________.", options: ["5", "8", "10", "15"], correct: "Legacy", image: "image/Legacy.jpg" },
    { question: "Standing up against something you don’t agree with shows __________.", options: ["Cold", "Warm", "Cool", "Boiling"], correct: "Resistance", image: "image/Resistance.jpg" }
];

// Question bank for "Intermediate" level
const intermediateQB = [
    { question: "The economic penalties Britain imposed on Iran are called __________.", options: ["2", "3", "4", "5"], correct: "Sanctions", image: "image/Sanctions.jpg" },
    { question: "A legal disagreement brought to court is called a __________.", options: ["H2O", "O2", "CO2", "HO"], correct: "Case", image: "image/case.jpg" },
    { question: "Mossadegh’s ability to stay strong under pressure showed his __________.", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], correct: "Resilience", image: "image/Resiliance.jpg" },
    { question: "Someone who shows bravery and is admired, like Mossadegh, is a __________.", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: "Hero", image: "image/hero.jpg" },
    { question: "The learning Mossadegh gained in Europe is called his __________.", options: ["120", "124", "144", "148"], correct: "Education", image: "image/education.jpg" }
];

// Question bank for "Advanced" level
const advancedQB = [
    { question: "A country’s right to make its own choices without interference is __________.", options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], correct: "Sovereignty", image: "image/Sovereignty.jpg" },
    { question: "What word means having control over something important, like oil?", options: ["x", "2x", "x^2", "2"], correct: "Dominance", image: "image/Dominance.jpg" },
    { question: "The act of standing strong against something is called __________.", options: ["Au", "Ag", "Pb", "Fe"], correct: "Resistance", image: "image/Resistance.jpg" },
    { question: "The ability to handle hard times without giving up shows __________.", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correct: "Resilience", image: "image/Resiliance.jpg" },
    { question: "Today, Mossadegh’s lasting influence in Iran is known as his __________.", options: ["Earth", "Jupiter", "Saturn", "Mars"], correct: "Legacy", image: "image/Legacy.jpg" }
];

// Initial game state variables
let status = "Beginner"; // Current level of the quiz (Beginner, Intermediate, Advanced)
let n = 0; // Number of answered questions
let score = 0; // User's score
let currentQuestion = null; // Current question object
let answeredQuestions = new Set(); // Tracks the questions that have already been answered
let totalTime = 60; // Total time allowed per question
let timeLeft = totalTime; // Time left for the current question
let totalBonusTime = 0; // Accumulated bonus time for fast answers
let quickAnswerBonus = 0; // Count of quick answers given by the user
let timerInterval; // Stores the interval for the question timer
let questionStartTime; // Timestamp when the question started

// DOM elements used for displaying/loading questions and results
const loadingElement = document.getElementById('loading');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultContainer = document.getElementById('result');
const questionImage = document.getElementById('question-image');
const restartButton = document.getElementById('restart');
const viewResultsButton = document.getElementById('view-results');

// Stores the question banks by level (Beginner, Intermediate, Advanced)
const questions = {
    Beginner: easyQB,
    Intermediate: intermediateQB,
    Advanced: advancedQB
};

// Displays the loading spinner and hides the question/result containers
function showLoading() {
    loadingElement.classList.remove('hidden');
    questionContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
}

// Hides the loading spinner and shows the question container
function hideLoading() {
    loadingElement.classList.add('hidden');
    questionContainer.classList.remove('hidden');
}

// Gets the next question randomly and avoids repeated questions
function getNextQuestion() {
    const currentQuestions = questions[status]; // Get questions for the current level
    let nextQuestion = null;
    let tries = 0;

    // Randomly select a question until a new one is found (or after 100 attempts)
    while (!nextQuestion && tries < 100) {
        const index = Math.floor(Math.random() * currentQuestions.length); // Random index
        if (!answeredQuestions.has(index)) { // Ensure the question hasn't been answered
            nextQuestion = currentQuestions[index];
            answeredQuestions.add(index); // Mark this question as answered
        }
        tries++;
    }

    // Return the selected question or fallback to a random one if all are answered
    return nextQuestion || currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
}

// Displays the current question and shuffles the answer letters
function showQuestion() {
    if (n >= 5) { // If the user has answered 5 questions, show results button
        showResultsButton();
        return;
    }

    showLoading(); // Display the loading animation
    currentQuestion = getNextQuestion(); // Get the next question
    questionElement.textContent = currentQuestion.question; // Set the question text
    questionImage.src = currentQuestion.image; // Set the question image
    optionsElement.innerHTML = ""; // Clear any previous options

    const combinedLetters = shuffleLetters(currentQuestion.correct); // Shuffle letters

    // Display shuffled letters as clickable options
    combinedLetters.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        letterElement.classList.add('letter');
        letterElement.addEventListener('click', () => selectLetter(letterElement)); // Add click event
        optionsElement.appendChild(letterElement);
    });

    // Create or clear the input field for the answer
    let userInput = document.getElementById('user-answer');
    if (!userInput) {
        userInput = document.createElement('input'); // Create input if not existing
        userInput.type = 'text';
        userInput.id = 'user-answer';
        userInput.placeholder = 'Type your answer here...';
        userInput.readOnly = true; // Input is only updated via letter selection
        optionsElement.appendChild(userInput);
    } else {
        userInput.value = ''; // Clear the input for the new question
    }

    n++; // Increment the question counter
    hideLoading(); // Hide the loading animation and show the question
    startTimer(); // Start the question timer
}

// Randomly shuffles answer letters with additional random letters for difficulty
function shuffleLetters(answer) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split(''); // All letters
    const shuffledLetters = letters.sort(() => 0.5 - Math.random()).slice(0, 10); // Random 10 letters
    const answerLetters = answer.split('').sort(() => 0.5 - Math.random()); // Shuffle correct answer letters
    return shuffledLetters.concat(answerLetters).sort(() => 0.5 - Math.random()); // Combine and shuffle
}

// Adds the selected letter to the answer input field
function selectLetter(letterElement) {
    const userInput = document.getElementById('user-answer');
    userInput.value += letterElement.textContent; // Append selected letter to the input field
    letterElement.style.display = 'none'; // Hide the selected letter
}

// Checks if the user's answer is correct and updates the score
function checkAnswer() {
    const userInput = document.getElementById('user-answer').value.trim().toLowerCase();
    if (userInput === currentQuestion.correct.trim().toLowerCase()) {
        score++; // Increase score if the answer is correct
        handleAnswer(true); // Handle correct answer
    } else {
        handleAnswer(false); // Handle incorrect answer
    }
}

// Starts the timer for the current question
function startTimer() {
    timeLeft = totalTime; // Reset time for each question
    updateTimerDisplay(); // Update the timer display
    questionStartTime = Date.now(); // Record the time when the question starts
    timerInterval = setInterval(() => { // Set interval to decrement time each second
        timeLeft--;
        updateTimerDisplay(); // Update timer display each second
        if (timeLeft <= 0) { // If time runs out
            clearInterval(timerInterval); // Stop the timer
            checkAnswer(); // Automatically check the answer
        }
    }, 1000);
}

// Updates the displayed time remaining for the question
function updateTimerDisplay() {
    document.getElementById('time-left').textContent = `${timeLeft}s`; // Update the timer text
}

// Resets and restarts the timer for the next question
function resetTimer() {
    clearInterval(timerInterval); // Clear the existing timer
    startTimer(); // Start a new timer
}

// Handles the logic after an answer is given (correct/incorrect)
function handleAnswer(isCorrect) {
    clearInterval(timerInterval); // Stop the timer

    if (isCorrect) { // If the answer was correct
        totalBonusTime += timeLeft; // Add remaining time to bonus
        if (Date.now() - questionStartTime <= 30000) { // If the answer was quick (under 30 seconds)
            quickAnswerBonus++; // Increase quick answer bonus
        }
        status = getNextStatus(status); // Move to the next level
    } else {
        status = getPreviousStatus(status); // Downgrade the level
    }

    showQuestion(); // Show the next question
}

// Determines the next level based on the current status
function getNextStatus(currentStatus) {
    switch (currentStatus) {
        case "Beginner":
            return "Intermediate"; // Move from Beginner to Intermediate
        case "Intermediate":
            return "Advanced"; // Move from Intermediate to Advanced
        default:
            return "Advanced"; // Stay at Advanced level
    }
}

// Determines the previous level based on the current status
function getPreviousStatus(currentStatus) {
    switch (currentStatus) {
        case "Intermediate":
            return "Beginner"; // Move back to Beginner
        case "Advanced":
            return "Intermediate"; // Move back to Intermediate
        default:
            return "Beginner"; // Stay at Beginner level
    }
}

// Displays the results button and final score
function showResultsButton() {
    questionContainer.classList.add('hidden'); // Hide the question container
    resultContainer.classList.remove('hidden'); // Show the result container
    viewResultsButton.classList.remove('hidden'); // Show the view results button

    let bonusPoints = Math.floor(totalBonusTime / 120); // Calculate bonus points from time
    let totalScore = score + bonusPoints + quickAnswerBonus; // Total score = score + bonuses

    // Ensure the total score doesn't exceed 10
    if (totalScore > 10) {
        totalScore = 10;
    }

    // When clicking on view results, save the score and redirect to results page
    viewResultsButton.addEventListener('click', () => {
        localStorage.setItem('score', totalScore); // Save the score
        localStorage.setItem('totalBonusTime', totalBonusTime); // Save bonus time
        localStorage.setItem('quickAnswerBonus', quickAnswerBonus); // Save quick answer bonuses
        window.location.href = './result page/index3.html'; // Redirect to the results page
    });
}

// Restart button functionality to reset the quiz and start from the beginning
restartButton.addEventListener('click', () => {
    status = "Beginner"; // Reset level to Beginner
    n = 0; // Reset number of questions answered
    score = 0; // Reset score
    totalBonusTime = 0; // Reset bonus time
    quickAnswerBonus = 0; // Reset quick answer bonus
    answeredQuestions.clear(); // Clear answered questions set
    questionContainer.classList.remove('hidden'); // Show the question container
    resultContainer.classList.add('hidden'); // Hide the result container
    viewResultsButton.classList.add('hidden'); // Hide the results button
    showQuestion(); // Show the first question again
});

// Event listener for the submit button to check the answer and reset the timer
document.getElementById('submit').addEventListener('click', () => {
    checkAnswer(); // Check the user's answer
    resetTimer(); // Reset the timer for the next question
});
// DOM Elements for Modal and Spin Wheel
const modal = document.getElementById('spin-modal')
const closeModalButton = document.getElementById('close-modal')
const spinButton = document.getElementById('spin-btn')
const wheel = document.getElementById('wheel')
const rewardText = document.getElementById('reward-text')

let isSpinning = false

// Function to Open Modal
function openModal() {
    modal.classList.remove('hidden')
}

// Function to Close Modal
closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden')
    rewardText.textContent = '' // Clear reward text
})

// Function to Spin the Wheel
spinButton.addEventListener('click', () => {
    if (isSpinning) return // Prevent multiple spins
    isSpinning = true
    rewardText.textContent = ''

    const randomSpin = Math.floor(Math.random() * 360) + 720 // Random Spin
    const rotation = randomSpin % 360
    const slices = document.querySelectorAll('.slice')
    const sliceAngle = 360 / slices.length
    const selectedSliceIndex = Math.floor(rotation / sliceAngle)

    // Animate the spin with added easing effect
    wheel.style.transition = 'transform 3s ease-out'
    wheel.style.transform = `rotate(${randomSpin}deg)`

    setTimeout(() => {
        const selectedSlice = slices[selectedSliceIndex]
        const reward = selectedSlice.getAttribute('data-reward')
        rewardText.textContent = `🎉 شما جایزه گرفتید: ${reward}`
        isSpinning = false

        // Reset spin animation for next time
        wheel.style.transition = 'none'

        // Apply Reward to Game
        applyReward(reward)
    }, 3000)
})


// Apply Reward Logic
function applyReward(reward) {
    switch (reward) {
        case '+10s':
            timeLeft += 10 // Add 10 seconds to timer
            break
        case 'Hint':
            alert('سرنخ: با دقت بیشتری بررسی کنید!')
            break
        case '50-50':
            // Remove 2 incorrect options
            const options = Array.from(document.querySelectorAll('.option'))
            const incorrectOptions = options.filter(opt => opt.textContent !== currentQuestion.correct)
            incorrectOptions.slice(0, 2).forEach(opt => opt.style.display = 'none')
            break
        case '+5 Points':
            score += 5 // Add 5 points to score
            break
        default:
            console.log('جایزه ناشناخته')
    }
}

// Show Modal After Every Correct Answer
function handleAnswer(isCorrect) {
    if (isCorrect) {
        score++ // Increase score
        openModal() // Show Spin Wheel Modal after every correct answer
    }
    showQuestion() // Proceed to the next question
}



// Display the first question when the page loads
showQuestion();
