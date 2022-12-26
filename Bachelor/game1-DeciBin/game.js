let checkAnswerButton = document.getElementById('check')
let input = document.getElementById('input');
let userInput = document.getElementById('userInput');
let score = document.getElementById('score');
let user_score = 0;
let count_down = 150;
let count_down_element = document.getElementById("countDown");
count_down_element.innerHTML = count_down;
let inputted = false;


//neue Elemente
let digitOne = document.getElementById('digit1')
let digitTwo = document.getElementById('digit2')
let digitThree = document.getElementById('digit3')
let digitFour = document.getElementById('digit4')
let digitFive = document.getElementById('digit5')

let resultOne = document.getElementById('result1')
let resultTwo = document.getElementById('result2')
let resultThree = document.getElementById('result3')
let resultFour = document.getElementById('result4')

let inputBoxTwo = document.getElementById('inputBox2')
let inputBoxThree = document.getElementById('inputBox3')
let inputBoxFour = document.getElementById('inputBox4')
let inputBoxFive = document.getElementById('inputBox5')
let resultFive = document.getElementById('result5')



function randomNum(){
    return Math.ceil(Math.random() * 31);
}
randomNum();


function display(){
    let number = randomNum();
    input.value = number;
    digitOne.value = input.value;

    if (number == 1){
        inputBoxTwo.style.display = 'none';
        inputBoxThree.style.display = 'none';
        inputBoxFour.style.display = 'none';
        inputBoxFive.style.display = 'none';
    }
    // Für Zahlen die kleiner als 4 & größer als 1 sind, braucht man nur 3 Zeilen
    else if(number < 4){
        inputBoxThree.style.display = 'none';
        inputBoxFour.style.display = 'none';
        inputBoxFive.style.display = 'none';

    }

    // Für Zahlen die kleiner als 8 & größer gleich 4 sind, braucht man nur 3 Zeilen
    else if(number < 8){
        inputBoxFour.style.display = 'none';
        inputBoxFive.style.display = 'none';

    }
    // Für Zahlen die kleiner als 16 & größer gleich 8 sind, braucht man nur 4 Zeilen
    else if(number < 16){
        inputBoxFive.style.display = 'none';
    }
}
display();

resultOne.addEventListener('input', () =>{
    digitTwo.value = resultOne.value
})
resultTwo.addEventListener('input', () =>{
    digitThree.value = resultTwo.value
})
resultThree.addEventListener('input', () =>{
    digitFour.value = resultThree.value
})
resultFour.addEventListener('input', () =>{
    digitFive.value = resultFour.value
})


function decitobin(wert1){
    let sol = "";
    while (wert1 > 0){
        if (wert1 & 1){
            sol = "1" + sol;
        }else{
            sol = "0" + sol;
        }
    wert1 = wert1 >> 1;
    }
    return sol;
}

function validate(){
    let correct_answer = decitobin(eval(input.value))
    let user_value = parseFloat(userInput.value) 


    if(correct_answer == user_value){
        display()
        user_score++;
        count_down += 150
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
        count_down -= 1;
        count_down_element.innerHTML = count_down;

        if(count_down == -1) {
            alert(`gameOver!, your Highscore: ${user_score}`)
            location.reload()
            display()
        }
    },100)
}

checkAnswerButton.addEventListener('click',validate)

checkAnswerButton.addEventListener('click', () =>{
    digitTwo.value = "";
    digitThree.value = "";
    digitFour.value = "";
    digitFive.value = "";

    resultOne.value = "";
    resultTwo.value = "";
    resultThree.value = "";
    resultFour.value = "";
    resultFive.value = "";
})

userInput.addEventListener('keyup',(e) => {
    if(!inputted){
        runInterval()
        inputted=true;
    }
    if(e.keyCode == 13){
        validate(); 
    }
})


