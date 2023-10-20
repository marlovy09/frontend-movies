import "./style.css";
// //boton para cargar mas peliculas
// const BtnAbrirMenu = document.querySelector("");
// const BtnCerrarMenu = document.querySelector("");
// const formularioContainer = document.querySelector("");
// const container = document.querySelector("");
// const formulario = document.querySelector("");
// const eliminarPersonaje = document.querySelector("")

// // Abrir formulario con el boton del header
// BtnAbrirMenu.addEventListener("click", () => {
//   formularioContainer.classList.add("abrirFormulario");
// });

// // Cerrar formulario con el boton del formulario
// BtbCerrarMenu.addEventListener("click", () => {
//   formularioContainer.classList.remove("abrirFormulario");
// });

//boton para añadir pelicula, formulario

const botonAñadirPelicula = document.querySelector("#BTNañadirPelicula");
const formulario = document.querySelector("#fomulario");

botonAñadirPelicula.addEventListener("click", function () {
  formulario.style.display = "block";
  console.log();
});
