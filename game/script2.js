function startTest() {
    window.location.href = './game page/index2.html';
}

// Menu toggle script
document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.remove('active');
});

// ایجاد حروف شناور
function createFloatingLetters() {
    const container = document.querySelector('.background-letters');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const colors = ['#FFA07A', '#20B2AA', '#778899', '#FF6347', '#4682B4'];
    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.textContent = letters[Math.floor(Math.random() * letters.length)];
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        span.style.left = `${Math.random() * 100}%`;
        span.style.top = `${Math.random() * 100}%`;
        span.style.fontSize = `${Math.random() * 3 + 1}em`;
        span.style.animationDuration = `${Math.random() * 5 + 3}s`;
        container.appendChild(span);
    }
}

// فراخوانی تابع حروف شناور
createFloatingLetters();

// افکت تایپ‌شونده
document.addEventListener('DOMContentLoaded', function () {
    const text = "Welcome!";
    let index = 0;
    const typingText = document.getElementById('typing-text');

    function typeText() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 150); // تنظیم سرعت تایپ
        }
    }

    typeText();
});
