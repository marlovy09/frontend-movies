import "./style.css";
//boton para cargar mas peliculas
let loadMorebtn1 = document.querySelector("#load-more-1");

let currentItem1 = 4;

loadMorebtn1.onclick = () => {
  let boxes = [...document.querySelectorAll(".box-container-1 box-1")];
  for (var i = currentItem1; i < currentItem1 + 4; i++) {
    boxes[i].style.display = "inline block";
  }
  currentItem1 += 4;
  if (currentItem1 >= boxes.length) {
    loadMorebtn1.style.display = "none";
  }
};

let loadMorebtn2 = document.querySelector("#load-more-2");

let currentItem2 = 4;

loadMorebtn2.onclick = () => {
  let boxes = [...document.querySelectorAll(".box-container-2 box-2")];
  for (var i = currentItem2; i < currentItem2 + 4; i++) {
    boxes[i].style.display = "inline block";
  }
  currentItem2 += 4;
  if (currentItem2 >= boxes.length) {
    loadMorebtn2.style.display = "none";
  }
};

let loadMorebtn3 = document.querySelector("#load-more-3");

let currentItem3 = 4;

loadMorebtn3.onclick = () => {
  let boxes = [...document.querySelectorAll(".box-container-3 box-3")];
  for (var i = currentItem3; i < currentItem3 + 4; i++) {
    boxes[i].style.display = "inline block";
  }
  currentItem3 += 4;
  if (currentItem3 >= boxes.length) {
    loadMorebtn3.style.display = "none";
  }
};

//boton para añadir pelicula, formulario

const botonAñadirPelicula = document.querySelector("#BTNañadirPelicula");
const formulario = document.querySelector("#fomulario");

botonAñadirPelicula.addEventListener("click", function () {
  formulario.style.display = "block";
  console.log();
});
