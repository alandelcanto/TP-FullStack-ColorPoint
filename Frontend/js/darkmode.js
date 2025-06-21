document.addEventListener("DOMContentLoaded", () => {
  const btnDarkMode = document.getElementById("dark-mode");

  // Aplica modo oscuro al cargar
  const modoOscuro = localStorage.getItem("modoOscuro");
  if (modoOscuro === "true") {
    document.body.classList.add("dark-mode");
    if (btnDarkMode) btnDarkMode.classList.replace("bi-moon", "bi-sun");
  }

  // Toggle del modo
  if (btnDarkMode) {
    btnDarkMode.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const esOscuro = document.body.classList.contains("dark-mode");
      localStorage.setItem("modoOscuro", esOscuro);

      // Cambiar ícono (usa Bootstrap Icons)
      btnDarkMode.classList.toggle("bi-moon", !esOscuro);
      btnDarkMode.classList.toggle("bi-sun", esOscuro);
    });
  }
});
