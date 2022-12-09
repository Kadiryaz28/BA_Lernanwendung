//let searchBox = document.querySelector('#search-box');
//<input type="text" placeholder="search images" id="search-box">
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
let images = document.querySelectorAll('.container .image-container .image');

const expand = () => {
    searchBtn.classList.toggle("close");
    input.classList.toggle("square");
  };
  searchBtn.addEventListener("click", expand);

input.oninput = () =>{
   images.forEach(hide => hide.style.display = 'none');
   let value = input.value;
   images.forEach(filter =>{
      let title = filter.getAttribute('data-title');
      if(value == title){
         filter.style.display = 'block';
      }
      if(input.value == ''){
         filter.style.display = 'block';
      }
   });
};

