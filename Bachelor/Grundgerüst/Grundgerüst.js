// DOM-Elemente, auf die zugegriffen wird
const input = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let images = document.querySelectorAll(".container .image-container .image");

/*Dieser Code zeigt die Funktion für eine Such- und Filterfunktion.
 *wenn der User die Suchfunktion anklickt, klappt sie auf und zeigt das Inputfeld.
 *Wenn eine Eingabe des Users erfolgt, wird die "images"-Liste gefiltet je nach Wert bei der Eingabe,
 *entspricht der Wert der Eingabe des Users dem "game-type"-Attribut des image, wird das image angezeigt.
 *Solange die Eingabe leer ist, werden alle images angezeigt.
 */
const expandSearch = () => {
  searchButton.classList.toggle("close");
  input.classList.toggle("square");
};
searchButton.addEventListener("click", expandSearch);
input.oninput = () => {
  images.forEach((hide) => (hide.style.display = "none"));
  let value = input.value;
  images.forEach((filter) => {
    let gameTitle = filter.getAttribute("game-type");
    if (value == gameTitle || value.toUpperCase() == gameTitle.toUpperCase()) {
      filter.style.display = "block";
    }
    if (input.value == "") {
      filter.style.display = "block";
    }
  });
};

// DOM-Elemente, auf die zugegriffen wird
const buttonItem = document.querySelectorAll(".button-stufe");
const imageItem = document.getElementsByClassName("gameItem");

/*
 *Dieser Code beschreibt die Funktion für die Filterboxen, wenn der User auf einen Button klickt, passiert folgendes:
 *1. Der "class name" jedes Elements im "buttonItem"-Array wird auf empty string gesetzt
 *2. Der "class name" des Buttons, auf den geklickt wurde, wird auf "active" gesetzt.
 *3. Mit der Schleife wird durch jedes Element im "imageItem"-Array iteriert.
 *4. Wenn der "textContent" "Alle Spiele" ist oder der Wert des aktuellen Elements kleingeschrieben mit dem "data-filter" übereinstimmt,
 *wird das aktuelle Element in der Schleife angezeigt bzw. nicht angezeigt, wenn es nicht mit "data-filter" übereinstimmt.
 */

buttonItem.forEach((button) => {
  button.onclick = function () {
    buttonItem.forEach((button) => {
      button.className = "";
    });
    button.className = "active";

    const value = button.textContent;
    for (let i = 0; i < imageItem.length; i++) {
      if (
        value == "Alle Spiele" ||
        imageItem[i].getAttribute("data-filter") == value.toLowerCase()
      ) {
        imageItem[i].style.display = "block";
      } else {
        imageItem[i].style.display = "none";
      }
    }
  };
});
