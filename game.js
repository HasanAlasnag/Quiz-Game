document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        { question: "What is the capital of France?", options: ["Paris", "Rome", "Berlin", "London"], answer: "Paris" },
        { question: "What is the result of 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is the largest planet in our solar system?", options: ["Jupiter", "Saturn", "Neptune", "Mars"], answer: "Jupiter" }
    ];

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next');
    const restartButton = document.getElementById('restart');
    const loginContainer = document.getElementById('login-container');
    const quizContainer = document.getElementById('quiz-container');
    const usernameInput = document.getElementById('username');
    const startButton = document.getElementById('start-button');
    const welcomeMessage = document.getElementById('welcome-message');

    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    let username = '';

    startButton.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (username) {
            welcomeMessage.textContent = `Welcome, ${username}`;
            loginContainer.style.display = 'none';
            quizContainer.style.display = 'block';
            loadQuestion();
        } else {
            alert('Please enter your username.');
        }
    });

    function loadQuestion() {
        const current = questions[currentQuestion];
        questionElement.textContent = current.question;
        optionsElement.innerHTML = '';
        current.options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.addEventListener('click', () => {
                if (!answered) {
                    checkAnswer(option);
                    answered = true;
                    btn.disabled = true;
                }
            });
            optionsElement.appendChild(btn);
        });
        resultElement.textContent = '';
        nextButton.style.display = 'none';
    }

    function checkAnswer(selected) {
        if (selected === questions[currentQuestion].answer) {
            score++;
            resultElement.textContent = `Correct! 🤩 Your score is: ${score} / ${currentQuestion + 1}`;
        } else {
            resultElement.textContent = `Wrong! 🤐 Your score is: ${score} / ${currentQuestion + 1}`;
        }
        nextButton.style.display = "block";
    }

    nextButton.addEventListener('click', () => {
        currentQuestion++;
        answered = false;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        answered = false;
        loadQuestion();
        resultElement.textContent = '';
        restartButton.style.display = 'none';
    });

    function showResult() {
        questionElement.textContent = '';
        optionsElement.innerHTML = '';
        nextButton.style.display = 'none';
        restartButton.style.display = 'block';
        if (score > questions.length / 2) {
            resultElement.textContent = `Congratulations ${username}! 🎉 You passed! Your score is ${score} out of ${questions.length}.`;
        } else {
            resultElement.textContent = `Sorry ${username}, you didn't pass. Your score is ${score} out of ${questions.length}.`;
        }
    }
});