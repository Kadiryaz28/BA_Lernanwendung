const input = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let images = document.querySelectorAll('.container .image-container .image');


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
      if(value == gameTitle || value.toUpperCase() == gameTitle.toUpperCase()){
         filter.style.display = 'block';
      }
      if(input.value == ''){
         filter.style.display = 'block';
      }
   });
};

const buttonItem = document.querySelectorAll('.button-stufe');
const imageItem = document.getElementsByClassName('gameItem');
console.log(imageItem);

buttonItem.forEach(button => {
   button.onclick = function() {
    //active
    buttonItem.forEach(button => {
      button.className = "";
    })
    button.className = "active";

    //Filterfunktion
    const value = button.textContent;
    for(let i = 0; i < imageItem.length; i++){
        if (value == "Alle Spiele" || imageItem[i].getAttribute('data-filter') == value.toLowerCase()) {
         imageItem[i].style.display = 'block';
        } else{
         imageItem[i].style.display = 'none';
        }
    }
   }
});