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
const question = document.createElement("h1");



let answered ='';
let countQ = 0;
let time = 60;
const questions =[
    {
        q :"question 1?",
        ans:['ans1','ans2','ans3'],
        tru: 'ans1'
    },
    {
        q: "question 2?",
        ans: ['answer1', 'answer2', 'answer3'],
        tru: 'answer2'
    },
    {
        q : "question 3?",
        ans: ['anssss1', 'anssss2', 'ansss3'],
        tru: 'ansss3'
    }
];
let var12 = 'this is text';


//when you click start the quiz starts
function startQuiz (){
    removeStart();
    //show timer in display
    displayTimer(time);
    //timer starts
    const timerInterval = setInterval( function (){
        time--;
        displayTimer(time);
        if (time <=0 ) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            endQuiz();
        }else if( countQ===questions.length){
            clearInterval(timerInterval);
            endQuiz();
        }
    },1000 );
    //give first question with answers
    generateQ(countQ);
        
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
//generates first question and answer
function generateQ(counter){

    let ques = questions[counter].q;
    let answers = questions[counter].ans;

    question.textContent = ques;
    body.appendChild(question);
    question.setAttribute("style","text-align: center; font-weight: bold;");

    for(let i = 0; i<answers.length; i++){
    const answerEl = document.createElement("button");
    answerEl.textContent = answers[i];
    answerEl.setAttribute("class","button");
    answerEl.setAttribute("name", answers[i]);
    answerEl.addEventListener('click',checkQ);
    body.appendChild(answerEl);
    }
}

//check if answer is right or wrong
//displays answer
//goes to the next one
function checkQ(event){

    button = event.target;
    answered = button.name;

    if( answered === questions[countQ].tru){
        const isTrue = true;
       showAnswer(isTrue)
        countQ++;
        if(countQ<questions.length){
            generateNext(countQ);
        }else{
            console.log("no more q");
        }

    }else{
        console.log("this is not true");
        const isTrue = false;
        showAnswer(isTrue);
        time-=10;
        countQ++; if (countQ < questions.length) {
            generateNext(countQ);
        } else {
            console.log("no more q");
        }
        
     }
}
//show answer for a sec
function showAnswer(answer){
    second = 1;
    const answerD = document.createElement('h4');
    if (answer) {
        answerD.textContent = "RIGHT!"
    } else {
        answerD.textContent = "Wrong!"
    }
    body.appendChild(answerD);
    const timerInterval = setInterval(function () {
        second--;
        if (second == 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            answerD.remove();
        } 
     }
    , 500);
   
}
//generates next question
function generateNext(counter){
    question.textContent = questions[counter].q;
    const selectButtons = document.querySelectorAll('button');
    let answers = questions[counter].ans;
    for (let i = 0; i < answers.length; i++) {
       selectButtons[i].textContent = answers[i];
    }

}
function endQuiz(){
    console.log("were done here");
    const result = time;
    removeAll();

}
function removeAll (){
    const buttons = document.querySelectorAll('button');
    for(let i = 0; i<buttons.length; i++){
        buttons[i].remove();
    }
    question.remove();

}
startButton.addEventListener("click",startQuiz);
