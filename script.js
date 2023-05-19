//  -----Initial data -----
let currentQuestion = 0;
//  the IF condition on function optionClickEvent adds value here
let correctAnswers = 0;

showQuestion();

//  ---- Events ----
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//  ----- Functions -----
function showQuestion(){
    //  check if the current question exist
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];
        
        //  grows the green bar according the questions
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        //  Show questions and Hide the Score
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        //  display the answer options
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`; // parseInt transform i(string)
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        //  All the options will get an "Click" event
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else{
        //  the questions ended
        finishQuiz();
    }
}

function optionClickEvent(e){
    //  The answer on array of questions.js is an integer, so we convert the options in integer
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
       correctAnswers++; 
    }

    //  go to the next question
    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);

    //  show different images and sentences according the correct answers
    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D0630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`

    //  Shows the score and hide the questions
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';

    document.querySelector('.progress--bar').style.width = '100%';

};

function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}