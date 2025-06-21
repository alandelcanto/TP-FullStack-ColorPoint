function init() {
  sessionStorage.clear();

  const nombre = document.querySelector("#nombreCliente");
  const botonContinuar = document.querySelector(".boton-continuar");

  botonContinuar.addEventListener("click", () => {
    if (nombre.value !== "") {
      sessionStorage.setItem("nombreCliente", nombre.value);
      console.log(nombre.value);
      window.location.href = "productos.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
