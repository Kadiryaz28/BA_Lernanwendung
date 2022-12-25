let checkAnswerButton = document.getElementById('check')
let input1 = document.getElementById('input');
let userInput = document.getElementById('userInput');
let score = document.getElementById('score');
let user_score = 0;
let count_down = 10000;
let count_down_element = document.getElementById("countDown");
count_down_element.innerHTML = count_down;
let inputted = false;

function randomNum(){
    return Math.ceil(Math.random() * 100);
}
randomNum();

function display(){
    let number = randomNum();
    input1.value = number;
}

display(); 

function validate(){
    let correct_answer = eval(input1.value)
    let user_value = parseFloat(userInput.value)

    console.log(correct_answer, user_value);

    if(user_value == correct_answer){
        display()
        user_score++;
        score.innerHTML = `Score: <br> ${user_score}`
    }
    else if(user_value == ''){
        alert('Enter a value')
    }
    else{
        alert(`Incorrect, it was ${correct_answer}`)
        display()
        user_score --
        score.innerHTML = `Score: ${user_score}`
        if(user_score < 0){
            alert("gameOver!")
            location.reload()
        }
    }
    userInput.value = ""
}
function runInterval(){
    let timerInterval = setInterval(() => {
        count_down -= 100;
        count_down_element.innerHTML = count_down;

        if(count_down == -100) {
            alert(`gameOver!, your Highscore: ${user_score}`)
            location.reload()
        }
    },100)
}

checkAnswerButton.addEventListener('click',validate)

userInput.addEventListener('keyup',(e) => {
    if(!inputted){
        runInterval()
        inputted=true;
    }
    if(e.keyCode == 13){
        validate(); 
    }
})


