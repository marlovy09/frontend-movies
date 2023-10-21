
import "./style.css";
const contenedorFormulario = document.querySelector(".formulario-container");
const contenedorPeliculas = document.querySelector(".box-container-1");
const contenedorFormularioEditar = document.querySelector(".editar-container");
const formularioEditar = document.querySelector("#formulario-editar");

let peliculaEditar = null;

function mostrarFormulario() {
  contenedorFormulario.classList.toggle("abrir-formulario");
}

function pintarPeliculaDOM(pelicula) {
  const peliculaHTML = document.createElement("div");
  peliculaHTML.classList.add("card");
  peliculaHTML.id = pelicula.id_movie;
  peliculaHTML.setAttribute("data-id", pelicula.id_movie);
  peliculaHTML.setAttribute("data-title", pelicula.title);
  peliculaHTML.setAttribute("data-genre", pelicula.genre);
  peliculaHTML.setAttribute("data-image", pelicula.image);
  peliculaHTML.setAttribute("data-age", pelicula.age);
  peliculaHTML.setAttribute("data-rating", pelicula.rating);
  peliculaHTML.innerHTML = `
        <button class="btn-eliminar">
          <lord-icon
          src="https://cdn.lordicon.com/xekbkxul.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#121331,secondary:#ffffff,tertiary:#646e78,quaternary:#ebe6ef"
          style="width: 30px; height: 30px"
          >
          </lord-icon>
        </button>
        <button class="btn-editar">
          <lord-icon
          src="https://cdn.lordicon.com/zfzufhzk.json"
          trigger="hover"
          style="width: 30px; height: 30px">
          </lord-icon>
        </button>
        <div class="content">
          <img
            src="${pelicula.image}"
            alt="${pelicula.title}"
          />
          <h3 class="nombre-pelicula">${pelicula.title}</h3>
          <p class="fecha-lanzamiento">Fecha lanzamiento: ${pelicula.age}</p>
          <p class="genero">Géneros: ${pelicula.genre}</p>
          <p class="rating">Rating: ${pelicula.rating}/10</p>
        </div>`;
  contenedorPeliculas.appendChild(peliculaHTML);
}

function obtenerPeliculas() {
  fetch("https://api-movies-dev-jjqf.2.us-1.fl0.io/movies/")
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener las peliculas");
      }
      return respuesta.json();
    })
    .then((peliculas) => {
      peliculas.forEach((pelicula) => {
        pintarPeliculaDOM(pelicula);
      });
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo obtener las peliculas");
    });
}

function crearPelicula(pelicula) {
  fetch("https://api-movies-dev-jjqf.2.us-1.fl0.io/movies/", {
    method: "POST",
    body: JSON.stringify(pelicula),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo crear la pelicula");
      }
      return respuesta.json();
    })
    .then((data) => {
      const mensaje = data.message;
      const pelicula = data.body;
      pintarPeliculaDOM(pelicula);
      alert(mensaje);
      mostrarFormulario();
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo crear la pelicula");
    });
}

function eliminarPelicula(id) {
  fetch(`https://api-movies-dev-jjqf.2.us-1.fl0.io/movies/${id}`, {
    method: "DELETE",
  })
    .then((respuesta) => {
      if (respuesta.status === 204) {
        const peliculaHTML = document.getElementById(id);
        peliculaHTML.remove();
        alert("Pelicula eliminada");
        return;
      }
      throw new Error("No se pudo eliminar la pelicula");
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo eliminar la pelicula");
    });
}

function editarPelicula(pelicula) {
  fetch(
    `https://api-movies-dev-jjqf.2.us-1.fl0.io/movies/${pelicula.id_movie}`,
    {
      method: "PUT",
      body: JSON.stringify(pelicula),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener la pelicula");
      }
      return respuesta.json();
    })
    .then((data) => {
      const mensaje = data.message;
      const pelicula = data.body;
      editarPeliculaDOM(pelicula);
      alert(mensaje);
      contenedorFormularioEditar.classList.remove("abrir-formulario");
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo obtener la pelicula");
    });
}

function editarPeliculaDOM(pelicula) {
  const peliculaHTML = document.getElementById(pelicula.id_movie);
  peliculaHTML.dataset.title = pelicula.title;
  peliculaHTML.dataset.genre = pelicula.genre;
  peliculaHTML.dataset.image = pelicula.image;
  peliculaHTML.dataset.age = pelicula.age;
  peliculaHTML.dataset.rating = pelicula.rating;
  peliculaHTML.innerHTML = `
        <button class="btn-eliminar">
          <lord-icon
          src="https://cdn.lordicon.com/xekbkxul.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#121331,secondary:#ffffff,tertiary:#646e78,quaternary:#ebe6ef"
          style="width: 30px; height: 30px"
          >
          </lord-icon>
        </button>
        <button class="btn-editar">
          <lord-icon
          src="https://cdn.lordicon.com/zfzufhzk.json"
          trigger="hover"
          style="width: 30px; height: 30px">
          </lord-icon>
        </button>
        <div class="content">
          <img
            src="${pelicula.image}"
            alt="${pelicula.title}"
          />
          <h3 class="nombre-pelicula">${pelicula.title}</h3>
          <p class="fecha-lanzamiento">Fecha lanzamiento: ${pelicula.age}</p>
          <p class="genero">Géneros: ${pelicula.genre}</p>
          <p class="rating">Rating: ${pelicula.rating}/10</p>
        </div>`;
}

function configurarFormulario(pelicula) {
  formularioEditar.elements.titulo.value = pelicula.title;
  formularioEditar.elements.genero.value = pelicula.genre;
  formularioEditar.elements.imagen.value = pelicula.image;
  formularioEditar.elements.fecha.value = pelicula.age;
  formularioEditar.elements.rating.value = pelicula.rating;
  formularioEditar.setAttribute("data-id", pelicula.id_movie);
  contenedorFormularioEditar.classList.add("abrir-formulario");
}

// Delegación de eventos

// Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  obtenerPeliculas();

});



// Evento click
document.addEventListener("click", (e) => {
  if (e.target.matches("#btn-agregar")) {
    mostrarFormulario();
  }

  if (e.target.matches(".btn-cerrar")) {
    mostrarFormulario();
  }

  if (
    e.target.matches(".btn-eliminar") ||
    e.target.matches(".btn-eliminar *")
  ) {
    let id;
    if (e.target.tagName === "BUTTON") {
      id = e.target.parentElement.id;
    } else {
      id = e.target.parentElement.parentElement.id;
    }
    eliminarPelicula(id);
  }

  if (e.target.matches(".btn-editar") || e.target.matches(".btn-editar *")) {
    let id;
    if (e.target.tagName === "BUTTON") {
      id = e.target.parentElement.id;
    } else {
      id = e.target.parentElement.parentElement.id;
    }

    const peliculaHTML = document.getElementById(id);
    if (peliculaHTML) {
      peliculaEditar = {
        id_movie: peliculaHTML.dataset.id,
        title: peliculaHTML.dataset.title,
        genre: peliculaHTML.dataset.genre,
        image: peliculaHTML.dataset.image,
        age: peliculaHTML.dataset.age,
        rating: peliculaHTML.dataset.rating,
      };
    } else {
      peliculaEditar = null;
    }
    if (peliculaEditar) {
      configurarFormulario(peliculaEditar);
    } else {
      alert("No se pudo editar la pelicula");
    }
  }

  if (e.target.matches(".btn-cerrar-editar")) {
    contenedorFormularioEditar.classList.remove("abrir-formulario");
  }
});

// Evento submit
document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches("#formulario-agregar")) {
    const peliculaNueva = {
      title: e.target.elements.titulo.value,
      genre: e.target.elements.genero.value,
      image: e.target.elements.imagen.value,
      age: e.target.elements.fecha.value,
      rating: e.target.elements.rating.value,
    };
    e.target.reset();
    crearPelicula(peliculaNueva);
  }

  if (e.target.matches("#formulario-editar")) {
    editarPelicula({
      id_movie: e.target.dataset.id,
      title: e.target.elements.titulo.value,
      genre: e.target.elements.genero.value,
      image: e.target.elements.imagen.value,
      age: e.target.elements.fecha.value,
      rating: e.target.elements.rating.value,
    });
  }
});


            