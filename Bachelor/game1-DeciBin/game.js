let checkAnswerButton = document.getElementById("check");
let digitInput = document.getElementById("input");
let userInput = document.getElementById("userInput");
let deziInput = document.getElementsByClassName("deziInput");
let score = document.getElementById("score");
let user_score = 0;
let count_down = 15;
let count_down_element = document.getElementById("countDown");
count_down_element.innerHTML = count_down;

let inputted = false;
let running = false;

/**
 * GameOver Panel
 */
let gameOver = document.getElementById("gameover");
let gameOverScore = document.getElementById("gameoverinfo");
let gameoverVersuch = document.getElementById("btn-versuch");
let gameoverVerlassen = document.getElementById("btn-verlassen");
let gameOverSound = document.getElementById("gameOverSound");

//Inputfelder
let digitOne = document.getElementById("digit1");
let digitTwo = document.getElementById("digit2");
let digitThree = document.getElementById("digit3");
let digitFour = document.getElementById("digit4");
let digitFive = document.getElementById("digit5");

let resultOne = document.getElementById("result1");
let resultTwo = document.getElementById("result2");
let resultThree = document.getElementById("result3");
let resultFour = document.getElementById("result4");
let resultFive = document.getElementById("result5");

let inputBoxTwo = document.getElementById("inputBox2");
let inputBoxThree = document.getElementById("inputBox3");
let inputBoxFour = document.getElementById("inputBox4");
let inputBoxFive = document.getElementById("inputBox5");

function isGameOver() {
  count_down = 0;
  gameOver.style.display = "block";
  gameOverScore.innerHTML =
    "Game Over! <br> Dein Score beträgt: " + `${user_score}`;

  document.getElementById("check").disabled = true;
  document.getElementById("userInput").disabled = true;
  document.getElementById("userInput").style.backgroundColor = "white";
  document.getElementById("gameOverSound").play();
}

function refreshPage() {
  window.location.reload();
}

gameoverVersuch.addEventListener("click", refreshPage);

function randomNum() {
  return Math.ceil(Math.random() * 31);
}

randomNum();
inputstart();

let inputboxes = document.getElementsByClassName("inputBoxes");

function createBoxes(value) {
  for (var i = 0; i < inputboxes.length; i++) {
    inputboxes[i].style.visibility = "hidden";
  }
  for (var i = 0; i < value; i++) {
    inputboxes[i].style.visibility = "visible";
  }
}

function display() {
  let number = randomNum();
  digitInput.value = number;
  digitOne.value = digitInput.value;
  document.getElementById("check").disabled = true;
  checkAnswerButton.style.backgroundColor = "grey";
  createBoxes(deciToBin(number).length);
}
display();

resultOne.addEventListener("input", () => {
  digitTwo.value = resultOne.value;
});
resultTwo.addEventListener("input", () => {
  digitThree.value = resultTwo.value;
});
resultThree.addEventListener("input", () => {
  digitFour.value = resultThree.value;
});
resultFour.addEventListener("input", () => {
  digitFive.value = resultFour.value;
});

userInput.addEventListener("input", () => {
  document.getElementById("check").disabled = false;
  checkAnswerButton.style.backgroundColor = "royalblue";
});

function deciToBin(decimal) {
  let binary = "";
  while (decimal > 0) {
    if (decimal & 1) {
      binary = "1" + binary;
    } else {
      binary = "0" + binary;
    }
    decimal = decimal >> 1;
  }
  return binary;
}

function validate() {
  let correct_answer = deciToBin(eval(digitInput.value));
  let user_value = parseFloat(userInput.value);

  if (correct_answer == user_value) {
    display();
    user_score++;
    count_down += 15;
    score.innerHTML = `Score: <br> ${user_score}`;
  } else {
    isGameOver();
    count_down_element = false;
    if (user_score < 0) {
      user_score = 0;
      score.innerHTML = 0;
      count_down_element = false;
      isGameOver();
    }
  }
  userInput.value = "";
}

function runInterval() {
  let timerInterval = setInterval(() => {
    count_down -= 1;
    count_down_element.innerHTML = count_down;

    if (count_down == 0) {
      isGameOver();
      display();
      count_down_element = 0;
    }
  }, 1000);
}

checkAnswerButton.addEventListener("click", validate);
checkAnswerButton.addEventListener("click", clearInput);

function inputstart() {
  for (var i = 0; i < deziInput.length; i++) {
    deziInput[i].addEventListener("keyup", () => {
      inputted = true;

      if (inputted && !running) {
        runInterval();
        running = true;
      }
    });
  }
  running = false;
}
function clearInput() {
  for (var i = 0; i < deziInput.length; i++) {
    deziInput[i].value = "";
  }
}
