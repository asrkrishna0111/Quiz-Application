const questions = [
    {
        question : "Which of the following is generally used for performing tasks like creating the structure of the relations, deleting relation?",
        answers: [
            {text: "DML(Data Manipulation Language)",correct: false },
            {text: "Query",correct: false },
            {text: "Relational Schema",correct: false},
            {text: "DDL(Data Definition Language)",correct: true },
        ]
    },
    {
        question : "Which of the following provides the ability to query information from the database and insert tuples into, delete tuples from, and modify tuples in the database?",
        answers: [
            {text: "DML(Data Manipulation Language)",correct: true },
            {text: "Query",correct: false },
            {text: "Relational Schema",correct: false},
            {text: "DDL(Data Definition Language)",correct: false },
        ]
    },
    {
        question : "The term FAT is stands for_____",
        answers: [
            {text: "File Allocation Tree",correct: false },
            {text: "File Allocation Table",correct: true },
            {text: "File Allocation Graph",correct: false},
            {text: "All of the above",correct: false },
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion =  questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            score++;
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();