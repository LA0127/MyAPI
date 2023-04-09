document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-busqueda");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputBusqueda = document.getElementById("input-busqueda");
    const terminoBusqueda = inputBusqueda.value.trim();
    if (terminoBusqueda) {
      fetch(`http://18.221.26.134/api/peliculas/buscar/${terminoBusqueda}`)
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
  fetch("http://18.221.26.134/api/peliculas")
    .then((response) => response.json())
    .then((data) => {
      mostrarPeliculas(data);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
});