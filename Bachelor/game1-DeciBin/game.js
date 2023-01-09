//DOM-Elemente, auf die zugegriffen wird
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

/*
 *Diese Funktion wird aufgerufen, wenn das Spiel vorbei ist. 
 *1. count-down wird auf 0 gesetzt, damit das Spiel terminiert 
 *2. "gameOver"-Seite wird aufgerufen 
 *3. Der "user_score" des Spielers wird angezeigt 
 *4. "check" und "userInput" werden ausgeschaltet, damit der User keine Eingabe mehr machen kann 
 *5. Die Farbe von "userInput" wechselt zu weiß *
 *6. Die Audio "gameOverSound" wird abgespielt
 */
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

/**
 * Lädt die Seite jedes Mal neu, wenn auf das Element "gameoverVersuch" geklickt wird
**/
function refreshPage() {
  //lädt die Seite neu
  window.location.reload();
}

//Funktion refreshPage() wird ausgeführt, wenn auf gameoverVersuch geklickt wird
gameoverVersuch.addEventListener("click", refreshPage);

//randomNum() generiert eine Zahl zwischen 1 und 31
function randomNum() {
  return Math.ceil(Math.random() * 31);
}

randomNum();
inputstart();

let inputboxes = document.getElementsByClassName("inputBoxes");

/*
 * createBoxes erstellt die Anzahl an "inputboxes", welche benötigt werden für die Zwischenschrittrechnung
 * Dieser bekommt eine Zahl als "value"
 * Die Funktion setzt zuerst die Sichtbarkeit der "inputboxes" auf "hidden" und versteckt sie
 * Danach setzt die Funktion die Sichtbarkeit ersten "value"-Elemente im array auf "visible", 
 * so das sie sichtbar sind. z.B. wenn der Input 3 ist, werden 3 Zeilen an "inputboxes" erstellt
 */
function createBoxes(value) {
  for (var i = 0; i < inputboxes.length; i++) {
    inputboxes[i].style.visibility = "hidden";
  }
  for (var i = 0; i < value; i++) {
    inputboxes[i].style.visibility = "visible";
  }
}

/* Die Funktion display() zeigt eine random-generierte Zahl an und erstellt die inputBoxes der Zahl entsprechend
 */
function display() {
  //random Zahl wird generiert
  let number = randomNum();
  //zeigt die Zahl und setzt die "inputboxes" der Zahl entsprechend
  digitInput.value = number;
  digitOne.value = digitInput.value;
  //Checkbutton wird ausgeschaltet und grau angezeigt, um zu zeigen, dass es noch nicht benutzt werden kann
  document.getElementById("check").disabled = true;
  checkAnswerButton.style.backgroundColor = "grey";
  createBoxes(deciToBin(number).length);
}
display();

//Diese EventListener füllen jeweils die nächste Zeile der Zwischenrechnung mit dem Ergebnis
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

// schaltet den Checkbutton frei und ändert die Farbe, wenn eine Eingabe in "userInput" folgt
userInput.addEventListener("input", () => {
  document.getElementById("check").disabled = false;
  checkAnswerButton.style.backgroundColor = "royalblue";
});

/*
 * Diese Funktion konvertiert eine Dezimalzahl zu einer Binärzahl
 * @param decimal - Zahl, die konvertiert werden soll
 * @return binary - Binärzahl, ausgegeben als String
 */
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

/* Diese Funktion überprüft die Eingabe des Spielers.
 * Ist die Antwort richtig, wird das Spiel fortgeführt und der Score inkrementiert um 1
 * Ist sie falsch, endet das Spiel
 */
function validate() {
  // die richtige Antwort wird in Binär umgewandelt
  let correct_answer = deciToBin(eval(digitInput.value));
  // die Eingabe des Nutzers wird in eine floating-point number umgewandelt
  let user_value = parseFloat(userInput.value);

  // Ist die Eingabe des Nutzers richtig, wird das Spiel fortgeführt und Score wird inkrementiert
  if (correct_answer == user_value) {
    display();
    user_score++;
    count_down += 15;
    score.innerHTML = `Score: <br> ${user_score}`;
    // Ist die Antwort falsch, terminiert das Spiel
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
  // Eingabe des Spielers wird zurückgesetzt
  userInput.value = "";
}

/* Diese Funktion stellt einen Timer ein, dieser dekrementiert um 1 jede Sekunde
 * erreicht count_down 0, endet das Spiel
 */
function runInterval() {
  let timerInterval = setInterval(() => {
    //Dekrementiert die Zahl um 1 und updated cound_down_element
    count_down -= 1;
    count_down_element.innerHTML = count_down;

    // wenn der count_down bei 0 ist, terminiert das Spiel und wird resetted
    if (count_down == 0) {
      isGameOver();
      display();
      count_down_element = 0;
    }
  }, 1000);
}

//checkButton ruft die Funktionen validate() und clearInput() auf bei Klick
checkAnswerButton.addEventListener("click", validate);
checkAnswerButton.addEventListener("click", clearInput);

//Diese Funktion startet einen EventListener, der wiederrum den Timer startet, wenn eine Eingabe Spielers folgt
function inputstart() {
  //Jedes Element im deziInput-Array wird das "keyup"-Event zugewiesen
  for (var i = 0; i < deziInput.length; i++) {
    deziInput[i].addEventListener("keyup", () => {
      //setzt inputted auf true, wenn eine Eingabe erfolgt
      inputted = true;

      //Wenn der Timer nicht bereits läuft, starte ihn
      if (inputted && !running) {
        runInterval();
        running = true;
      }
    });
  }
  //ansonsten wird running auf false gesetzt, um zu zeigen, dass der Timer nicht läuft
  running = false;
}
//Leert den Input in allen Elementen des deziInput-Arrays
function clearInput() {
  //iteriert über alle Elemente im Array und setzt sie auf einen empty String
  for (var i = 0; i < deziInput.length; i++) {
    deziInput[i].value = "";
  }
}
