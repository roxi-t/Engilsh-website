const question = "What is the capital of France?";
const answer = "";
const letters = "abcdefghijklmnopqrstuvwxyz".split('');
const answerContainer = document.getElementById('answer-container');
const lettersContainer = document.getElementById('letters-container');
const resultMessage = document.getElementById('result-message');

// اضافه کردن حروف به صفحه به صورت تصادفی
function setupLetters() {
    const shuffledLetters = letters.sort(() => 0.5 - Math.random()).slice(0, 15); // 15 حرف تصادفی
    const answerLetters = answer.split('').sort(() => 0.5 - Math.random()); // حروف جواب سوال
    const combinedLetters = shuffledLetters.concat(answerLetters).sort(() => 0.5 - Math.random());

    combinedLetters.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        letterElement.classList.add('letter');
        letterElement.addEventListener('click', () => selectLetter(letterElement));
        lettersContainer.appendChild(letterElement);
    });
}

// انتخاب حروف و نمایش در کانتینر پاسخ
function selectLetter(letterElement) {
    const selectedLetter = letterElement.textContent;
    answerContainer.textContent += selectedLetter;
    letterElement.style.display = 'none';
}

// بررسی جواب و نمایش نتیجه
document.getElementById('submit').addEventListener('click', () => {
    const userAnswer = answerContainer.textContent.toLowerCase();
    if (userAnswer === answer) {
        resultMessage.textContent = "Correct!";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Try Again!";
        resultMessage.style.color = "red";
    }
});

// راه‌اندازی بازی
document.addEventListener('DOMContentLoaded', setupLetters);
