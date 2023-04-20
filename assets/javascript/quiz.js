// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// Acceptance Criteria
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
const body = document.body;
const quizTitle = document.getElementById('title');
const desc = document.querySelector("p");
const startButton = document.getElementById("start");
const timer = document.getElementById("time");


const questions =[
    {
        q :"question 1?",
        ans:['ans1','ans2','ans3'],
        tru: 'ans1'
    },
    {
        q: "question 2?",
        ans: ['ans1', 'ans2', 'ans3'],
        tru: 'ans2'
    },
    {
        q : "question 3?",
        ans: ['ans1', 'ans2', 'ans3'],
        tru: 'ans3'
}
];
let var12 = 'this is text';


//when you click start the quiz starts
function startQuiz (){
    let time = 60;
    let countQ = 0;
    removeStart();
    //show timer in display
    displayTimer(time);
    //timer starts
    const timerInterval = setInterval( function (){
        time--;
        displayTimer(time);
        if (time === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
        }
    },1000 );
    //give question with answers
    generateQ(questions[countQ].q,questions[countQ].ans);
    //check if answer is correect
    //display answer
    
}
//removes quiz title, description and start button
function removeStart(){
    quizTitle.remove();
    desc.remove();
    startButton.remove();
}
//shows timer 
function displayTimer(num){
    timer.textContent = "Time: "+ num;
}
//show question and answer
function generateQ(ques,answers){
    const question = document.createElement("h1");
    question.textContent = ques;
    body.appendChild(question);
    question.setAttribute("style","text-align: center; font-weight: bold;");
    for(let i = 0; i<answers.length; i++){
    const answerEl = document.createElement("button");
    answerEl.textContent = answers[i];
    answerEl.setAttribute("class","button");
    body.appendChild(answerEl);
    }
}

startButton.addEventListener("click",startQuiz);
