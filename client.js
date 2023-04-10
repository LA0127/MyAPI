document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-busqueda");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputBusqueda = document.getElementById("input-busqueda");
    const terminoBusqueda = inputBusqueda.value.trim();
    if (terminoBusqueda) {
      fetch(`https://3.144.175.207:443/api/peliculas/buscar/${terminoBusqueda}`)
        .then((response) => response.json())
        .then((data) => {
          mostrarResultadoBusqueda(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    }
  });

  // Carga inicial de datos
  fetch("https://3.144.175.207:443/api/peliculas")
      .then((response) => response.json())
    .then((data) => {
      mostrarPeliculas(data);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
});


  
function mostrarPeliculas(data) {
  const container = document.getElementById("peliculas");
  container.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos resultados

  data.forEach((pelicula) => {
    const div = document.createElement("div");
    div.classList.add("datos-item");

    div.innerHTML = `
      <h2>${pelicula.titulo}</h2>
    `;

    container.appendChild(div);
  });
}

function mostrarResultadoBusqueda(data) {
  const container = document.getElementById("resultado-busqueda");
  container.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos resultados

  if (data.length === 0) {
    container.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  data.forEach((pelicula) => {
    const div = document.createElement("div");
    div.classList.add("datos-item");

    div.innerHTML = `
      <h2>${pelicula.titulo} (${pelicula.ano})</h2>
      <div class="resultado-info">
        <p>Género: ${pelicula.genero}</p>
        <p>Director: ${pelicula.director}</p>
      </div>
    `;

    container.appendChild(div);
  });

  // Ocultar la lista de películas
  document.getElementById("peliculas").style.display = "none";
}