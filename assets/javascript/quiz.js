
const header = document.querySelector('#header');
const startButton = document.getElementById("start");
const startEnd = document.querySelector(".startEnd");
const timer = document.getElementById('timer');
const body = document.body;
const questionsDiv = document.querySelector('.questionsDiv');
const end = document.getElementById('end');
const highScoresDiv = document.getElementById('highScoresDiv');
const highscores = document.getElementById('highscores');

let time = 60;
let current = 0;
let persons = [];
const questions = [
    {
        q: "What is the Capital of ITALY?",
        ans: ['Milano', 'Rome', 'Venice','Florence'],
        tru: 'Rome'
    },
    {
        q: "What is the Capital of FRANCE?",
        ans: ['Paris', 'Nice', 'Lyon','Bordeux'],
        tru: 'Paris'
    },
    {
        q: "What is the Capital of SPAIN?",
        ans: ['Barcelona', 'Valenica', 'Bilbao','Madrid'],
        tru: 'Madrid'
    },
    {
        q: "What is the Capital of the UNITED STATES?",
        ans: ['New York', 'Los Angeles', 'Washington D.C.', 'Miami'],
        tru: 'Washington D.C.'
    }, 
    {
        q: "What is the Capital of MEXICO?",
        ans: ['Mexico City', 'Oaxaca', 'Puebla', 'Tijuana'],
        tru: 'Mexico City'
    },
    {
        q: "What is the Capital of NORWAY?",
        ans: ['Oslo', 'Stockholm', 'Bergen', 'Copenhagen'],
        tru: 'Oslo'
    },
    {
        q: "What is the Capital of CHINA?",
        ans: ['Tokkyo', 'Hong Kong', 'Beijing', 'Shangai'],
        tru: 'Beijing'
    },
    {
        q: "What is the Capital of GERMANY?",
        ans: ['Munich', 'Luxembourg', 'Berlin', 'Frankfurt'],
        tru: 'Berlin'
    },
    {
        q: "What is the Capital of CANADA?",
        ans: ['Toronto', 'Montreal', 'Otawa', 'Edmonton'],
        tru: 'Madrid'
    },
    {
        q: "What is the Capital of SWITZERLAND?",
        ans: ['Zurich', 'Bern', 'Geneva', 'Basel'],
        tru: 'Bern'
    }
];


function startQuiz() {

    //hide start elements
    hideStartElements();
    highscores.setAttribute('class', 'hidden');
    header.setAttribute('class','headerblock')
    //start timer
    displayTimer(time);
    const timerInterval = setInterval(function () {
        time--;
        displayTimer(time);
        if (time <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else if (current == questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
    //create question  and  answer elements
    createQelements();
    //fill in the question and answers
    fillQuestion(current);

}

//hides starter display
function hideStartElements() {
    startEnd.setAttribute('class', 'hidden');

}
//displays the timer 
function displayTimer(num) {
    timer.textContent = "Time: " + num;
}
//creates the question and the answer buttons
function createQelements() {
    //make the questionsDiv visible
    questionsDiv.setAttribute('class', 'questionsDiv');
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
//fills in the guestion and answers
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
//after the answer is selected checks if its correct or wrong
function checkQuestion(e) {
    const answered = e.target.value;
    let isTrue = false;
    //if its correct show a popup and go to next question
    if (answered == questions[current].tru) {
        isTrue = true;
        showAnswer(isTrue);
        current++;
        if (current < questions.length) {
            fillQuestion(current);
        }
    //if its wrong deduct 10s show popup and go to next question
    } else {
        showAnswer(isTrue);
        current++;
        time -= 10;
        if (current < questions.length) {
            fillQuestion(current);
        }
    }
}
//displays the answer (correct/wrong)(popup)
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
            clearInterval(timerInterval);
            answerD.remove();
        }
    }
        , 500);

}
//End the quiz, show the score and an input area for the name
function endQuiz() {
    end.setAttribute('class', 'endQ');
    timer.setAttribute('class', 'hidden');
    questionsDiv.setAttribute('class', 'hidden');

    const yourRes = document.getElementById('yourScore');
    if(time<0){
        time = 0;
    }
    yourRes.textContent = "Your result is " + time + '.';

    const submitB = document.getElementById('submitB');
    submitB.addEventListener("click", storeResult);

}
//storing the results in local storage
function storeResult() {
    const enteredName = document.querySelector('#entername');
    if(enteredName.value ===''){
        alert('Name cannot be blank');
        return;
    }
    const person = {
        name: enteredName.value.trim(),
        score: time,

    };
    persons.push(person);
    localStorage.setItem("scores", JSON.stringify(persons));
    showHighScores();
    //resets the value of input element
    enteredName.value = '';

}
// displays highscore list  
function showHighScores() {
    hideStartElements();
    highscores.setAttribute('class', 'hidden');
    end.setAttribute('class', 'hidden');
    highScoresDiv.setAttribute('class', 'visible');
    timer.setAttribute('class', 'hidden');

    clearList();
    renderList();
    //clear button to clear the highscores and delete the local storage
    const clearButton = document.getElementById('clearB');
    clearButton.addEventListener('click', function () {
        localStorage.clear();
        persons = [];
        clearList();
        renderList();
    });


    const backButton = document.getElementById('backB');
    backButton.addEventListener('click', backToMain);
}
//back button to main display resets quiz 
function backToMain() {
    header.setAttribute('class','headerflex');
    highScoresDiv.setAttribute('class', 'hidden');
    startEnd.setAttribute('class', 'startEnd');
    time = 60;
    current = 0;
    displayTimer(time);
    removeAll();
    highscores.setAttribute('class', 'display:block');
    timer.setAttribute('class', 'display:block');
}
//removes the question element and the answer button elements
function removeAll() {
    const question = document.getElementById("questionElement");
    const selectButtons = document.querySelectorAll('.answerElement');
    if (question && selectButtons) {
        question.remove();
        for (let i = 0; i < selectButtons.length; i++) {
            selectButtons[i].remove();
        }
    }
}
//clears the list of highscores
function clearList() {
    const listitems = document.querySelectorAll('li');
    if (listitems) {
        for (let j = 0; j < listitems.length; j++) {
            listitems[j].remove();
        }
    }
}
//renders the list of highscores 
function renderList() {
    const stored = JSON.parse(localStorage.getItem("scores"));
    if (stored == null) {
        return;
    }
    persons = stored;
    const list = document.querySelector('ol');
    //sorting by highscore
    stored.sort(function (a, b) {
        return b.score - a.score;
    });
    for (let i = 0; i < stored.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = stored[i].name + " - " + stored[i].score;
        list.append(listItem);
    }

}

highscores.addEventListener('click', showHighScores);
startButton.addEventListener('click', startQuiz);