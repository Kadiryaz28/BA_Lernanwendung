const input = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let images = document.querySelectorAll('.container .image-container .image');
let pElement = document.getElementById('p-element');


const expandSearch = () => {
   searchButton.classList.toggle("close");
    input.classList.toggle("square");
  };
  searchButton.addEventListener("click", expandSearch);

input.oninput = () =>{
   images.forEach(hide => hide.style.display = 'none');
   let value = input.value;
   images.forEach(filter =>{
      let gameTitle = filter.getAttribute('game-type');
      if(value == gameTitle){
         filter.style.display = 'block';
      }
      if(input.val == ''){
         filter.style.display = 'block';
      }
   });
};

const buttonItem = document.querySelectorAll('.button-stufe');
const imageItem = document.querySelectorAll('.image-container .info-card div');

buttonItem.forEach(button => {
   button.onclick = function() {
    //active
    buttonItem.forEach(button => {
      button.className = "";
    })
    button.className = "active";

    //Filterfunktion
    const value = button.textContent;
    imageItem.forEach(img => {
        img.style.display = 'none';
        if (value == "Alle Spiele" || img.getAttribute('data-filter') == value.toLowerCase()  ) {
            img.style.display = 'block';
        }
    })
    pElement.style.display = 'block';
   }
});



