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
const quizTitle = document.getElementById('title');
const desc = document.querySelector("p");
const startButton = document.getElementById("start");
const timer = document.getElementById("time");
//when you click start the quiz starts
function startQuiz (){
    let time = 60;
    removeStart();
    //timer starts
    //show timer in display
    displayTimer(time);
    // const timerInterval = setInterval( function (){

    // },1000 );
    //quiz title,start button, description gets removed
    //question gets created
    //answer buttons are created


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

startButton.addEventListener("click",startQuiz);
