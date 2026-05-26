const quizData = {

    html: [

        {
            type: "single",
            question: "Which HTML tag is used to create a paragraph?",
            options: ["&lt;p&gt;", "&lt;h1&gt;", "&lt;img&gt;", "&lt;div&gt;"],
            answer: "&lt;p&gt;"
        },

        {
            type: "multiple",
            question: "Select valid semantic HTML tags.",
            options: ["&lt;header&gt;", "&lt;footer&gt;", "&lt;section&gt;", "&lt;color&gt;"],
            answer: ["&lt;header&gt;", "&lt;footer&gt;", "&lt;section&gt;"]
        },

        {
            type: "fill",
            question: "HTML stands for ______ Markup Language.",
            answer: "HyperText"
        },

        {
            type: "single",
            question: "Which tag inserts an image?",
            options: ["&lt;img&gt;", "&lt;src&gt;", "&lt;image&gt;", "&lt;picture&gt;"],
            answer: "&lt;img&gt;"
        }

    ],

    css: [

        {
            type: "single",
            question: "Which CSS property changes text color?",
            options: ["background", "font-size", "color", "border"],
            answer: "color"
        },

        {
            type: "multiple",
            question: "Select valid CSS position values.",
            options: ["absolute", "relative", "fixed", "bold"],
            answer: ["absolute", "relative", "fixed"]
        },

        {
            type: "fill",
            question: "CSS stands for Cascading ______ Sheets.",
            answer: "Style"
        },

        {
            type: "single",
            question: "Which property changes background color?",
            options: ["background-color", "bgcolor", "font-color", "color"],
            answer: "background-color"
        }

    ],

    javascript: [

        {
            type: "single",
            question: "Which keyword declares a variable?",
            options: ["var", "loop", "style", "print"],
            answer: "var"
        },

        {
            type: "multiple",
            question: "Select JavaScript data types.",
            options: ["String", "Boolean", "Number", "HTML"],
            answer: ["String", "Boolean", "Number"]
        },

        {
            type: "fill",
            question: "JavaScript makes webpages ______.",
            answer: "interactive"
        },

        {
            type: "single",
            question: "Which symbol is used for comments?",
            options: ["//", "**", "##", "<!-- -->"],
            answer: "//"
        }

    ]
};

let questions = [];
let currentQuestion = 0;
let score = 0;
let currentLanguage = "";
let timer;
let timeLeft = 60;

const languageBox = document.getElementById("languageBox");
const quizBox = document.getElementById("quizBox");

const question = document.getElementById("question");
const options = document.getElementById("options");

const fillInput = document.getElementById("fillInput");

const nextBtn = document.getElementById("nextBtn");

const result = document.getElementById("result");

const questionCount = document.getElementById("questionCount");

const timerElement = document.getElementById("timer");


// START QUIZ
function startQuiz(language){

    currentLanguage = language;

    questions = [...quizData[language]];

    questions.sort(() => Math.random() - 0.5);

    currentQuestion = 0;

    score = 0;

    timeLeft = 60;

    languageBox.style.display = "none";

    quizBox.style.display = "block";

    result.innerHTML = "";

    startTimer();

    loadQuestion();
}


// TIMER
function startTimer(){

    clearInterval(timer);

    timer = setInterval(() => {

        timeLeft--;

        timerElement.innerText = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            finishQuiz();
        }

    },1000);
}


// LOAD QUESTION
function loadQuestion(){

    options.innerHTML = "";

    fillInput.style.display = "none";

    fillInput.value = "";

    questionCount.innerText = currentQuestion + 1;

    let q = questions[currentQuestion];

    question.innerHTML = q.question;

    // SINGLE
    if(q.type === "single"){

        q.options.forEach(option => {

            options.innerHTML += `
            
            <div class="option">

                <input type="radio" name="option" value="${option}">

                <label>${option}</label>

            </div>
            
            `;
        });
    }

    // MULTIPLE
    else if(q.type === "multiple"){

        q.options.forEach(option => {

            options.innerHTML += `
            
            <div class="option">

                <input type="checkbox" value="${option}">

                <label>${option}</label>

            </div>
            
            `;
        });
    }

    // FILL
    else if(q.type === "fill"){

        fillInput.style.display = "block";
    }

}


// NEXT BUTTON
nextBtn.addEventListener("click", () => {

    checkAnswer();

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();
    }

    else{

        finishQuiz();
    }

});


// CHECK ANSWER
function checkAnswer(){

    let q = questions[currentQuestion];

    // SINGLE
    if(q.type === "single"){

        let selected = document.querySelector('input[name="option"]:checked');

        if(selected && selected.value === q.answer){

            score++;
        }
    }

    // MULTIPLE
    else if(q.type === "multiple"){

        let checked = document.querySelectorAll('input[type="checkbox"]:checked');

        let selectedAnswers = [];

        checked.forEach(item => {

            selectedAnswers.push(item.value);

        });

        selectedAnswers.sort();

        let correctAnswers = [...q.answer].sort();

        if(JSON.stringify(selectedAnswers) === JSON.stringify(correctAnswers)){

            score++;
        }
    }

    // FILL
    else if(q.type === "fill"){

        let userAnswer = fillInput.value.trim().toLowerCase();

        if(userAnswer === q.answer.toLowerCase()){

            score++;
        }
    }

}


// FINISH QUIZ
function finishQuiz(){

    clearInterval(timer);

    quizBox.style.display = "none";

    result.innerHTML = `
    
        <div class="score-box">

            <h2>Exam Completed</h2>

            <p>Total Questions: ${questions.length}</p>
            

            <p>Correct Answers: ${score}</p>

            <p>Your Score: ${score} / ${questions.length}</p>

            <div class="result-buttons">

                <button onclick="playAgain()">
                    Retake Exam
                </button>

                <button onclick="doneQuiz()">
                    Finish
                </button>

            </div>

        </div>
    
    `;
}


// PLAY AGAIN
function playAgain(){

    questions = [...quizData[currentLanguage]];

    questions.sort(() => Math.random() - 0.5);

    currentQuestion = 0;

    score = 0;

    timeLeft = 60;

    result.innerHTML = "";

    quizBox.style.display = "block";

    startTimer();

    loadQuestion();
}


// DONE
function doneQuiz(){

    result.innerHTML = `
    
        <div class="score-box">

            <h2>Thank You</h2>

            <b>Your assessment has been submitted successfully</b>

            <button onclick="goHome()">
                Go Home
            </button>

        </div>
    
    `;
}


// HOME
function goHome(){

    result.innerHTML = "";

    languageBox.style.display = "block";
}