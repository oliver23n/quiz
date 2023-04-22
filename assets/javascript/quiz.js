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

const startButton = document.getElementById("start");
const startEnd = document.querySelector(".startEnd");
const timer = document.getElementById('timer');
const body = document.body;
const questionsDiv = document.querySelector('.questionsDiv');
const end = document.getElementById('end');
const highScoresDiv = document.getElementById('highScoresDiv');

let time = 60;
let current = 0;
let persons = [];
const questions = [
    {
        q: "question 1?",
        ans: ['ans1', 'ans2', 'ans3'],
        tru: 'ans1'
    },
    {
        q: "question 2?",
        ans: ['answer1', 'answer2', 'answer3'],
        tru: 'answer2'
    },
    {
        q: "question 3?",
        ans: ['anssss1', 'anssss2', 'ansss3'],
        tru: 'ansss3'
    }
];


function startQuiz() {
    
    //hide start elements
    hideStartElements();
    //start timer
    displayTimer(time);
    const timerInterval = setInterval(function () {
        time--;
        displayTimer(time);
        if (time == 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else if (current == questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);

    //create questin answer elements
    createQelements();
    //fill in the question and answers
    fillQuestion(current);

}

//hides starter display
function hideStartElements() {
    startEnd.setAttribute('class', 'hidden');
}
function displayTimer(num) {
    timer.textContent = "Time: " + num;
}
function createQelements() {
    questionsDiv.setAttribute('class','questionsDiv');
    const quesitonElement = document.createElement('h2');
    
    quesitonElement.setAttribute("id", "questionElement");
    questionsDiv.appendChild(quesitonElement);
    
    for (let i = 0; i < questions[0].ans.length; i++) {
        const answerElement = document.createElement('button');
        answerElement.setAttribute('class', 'answerElement');
        answerElement.addEventListener('click', checkQuestion);
        answerElement.textContent = "";
        questionsDiv.appendChild(answerElement);
    }
    
}
//fills in the questin and answer elements
function fillQuestion(currentQuestion) {
    let question = questions[currentQuestion].q;
    let answers = questions[currentQuestion].ans;
    const qelement = document.querySelector('#questionElement');
    qelement.textContent = question;
    const selectButtons = document.querySelectorAll('.answerElement');
    for (let i = 0; i < answers.length; i++) {
        selectButtons[i].textContent = answers[i];
        selectButtons[i].value = answers[i];
        
    }
}
//after the answer is selecter checks if its correct or wrong
function checkQuestion(e) {
    const answered = e.target.value;
    let isTrue = false;
    if (answered == questions[current].tru) {
        isTrue = true;
        showAnswer(isTrue);
        current++;
        if (current < questions.length) {
            fillQuestion(current);
        }
    } else {
        showAnswer(isTrue);
        current++;
        time -= 10;
        if (current < questions.length) {
            fillQuestion(current);
        }
    }
}
//displays the answer (correct/wrong)
function showAnswer(answer) {
    second = 1;
    const answerD = document.createElement('h4');
    if (answer) {
        answerD.textContent = "RIGHT!"
    } else {
        answerD.textContent = "Wrong!"
    }
    questionsDiv.appendChild(answerD);
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
function endQuiz() {
    end.setAttribute('class','visible');
    questionsDiv.setAttribute('class', 'hidden');
   
    
    const yourRes = document.getElementById('yourScore');
    yourRes.textContent = "Your result is "+ time +'.';

    const submitB = document.getElementById('submitB');
    submitB.addEventListener("click", storeResult);
 
}

function storeResult() {
    const enteredName = document.querySelector('#entername');
    const person = {
        name: enteredName.value.trim(),
            score: time,
            
        };
        persons.push(person);
        localStorage.setItem("scores", JSON.stringify(persons));
        showHighScores();
        enteredName.value = '';
    }
    
function showHighScores(){
    // hideStartElements();
    end.setAttribute('class','hidden');
    highScoresDiv.setAttribute('class','visible');

    
    
    clearList();
    renderList();
    const clearButton = document.getElementById('clearB');
    clearButton.addEventListener('click',function(){
        console.log('should clear');
        localStorage.clear();
        persons = [];
        clearList();
        renderList();
    });

    
    const backButton = document.getElementById('backB');
    backButton.addEventListener('click',backToMain);
}

function backToMain(){
    highScoresDiv.setAttribute('class','hidden');
    startEnd.setAttribute('class','startEnd');
    time = 60;
    current = 0;
    displayTimer(time);
    removeAll();
}
function removeAll(){
    document.getElementById("questionElement").remove();
    const selectButtons = document.querySelectorAll('.answerElement');
    for(let i =0; i< selectButtons.length; i++){
        selectButtons[i].remove();
        }
}
function clearList(){
    const listitems = document.querySelectorAll('li');
    for (let j = 0; j < listitems.length; j++) {
        listitems[j].remove();
        console.log('delete item' + listitems[j]);
    }
}
function renderList(){
    const stored = JSON.parse(localStorage.getItem("scores"));
    if(stored == null){
        return;
    }
    const list = document.querySelector('ul');
    for (let i = 0; i < stored.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = stored[i].name + " - " + persons[i].score;
        list.append(listItem);
    }

}

startButton.addEventListener('click', startQuiz);