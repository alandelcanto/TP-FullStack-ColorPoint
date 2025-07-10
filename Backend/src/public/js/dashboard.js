function actualizarBotones() {
    const botones = document.querySelectorAll(".activar-desactivar-producto");

    botones.forEach((boton) => {
        if (boton.dataset.activo == "true") {
            if (boton.classList.contains("activar-producto")) {
                if (!boton.classList.contains("hidden")) {
                    boton.classList.add("hidden");
                }
            }
            if (boton.classList.contains("desactivar-producto")) {
                if (boton.classList.contains("hidden")) {
                    boton.classList.remove("hidden");
                }
            }
        }
        if (boton.dataset.activo === "false") {
            if (boton.classList.contains("activar-producto")) {
                if (boton.classList.contains("hidden")) {
                    boton.classList.remove("hidden");
                }
            }
            if (boton.classList.contains("desactivar-producto")) {
                if (!boton.classList.contains("hidden")) {
                    boton.classList.add("hidden");
                }
            }
        }
    });
}

document.addEventListener("click", async (e) => {
    const boton = e.target.closest(".botones-accion");
    if (!boton) return;

    const id = boton.dataset.id;

    if (boton.classList.contains("activar-producto")) {
        if (confirm("Desea activar el producto?")) {
            console.log("Sending PUT request to activate...");
            await fetch(`/api/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activo: true }),
            });
            location.reload();
        }
    }

    if (boton.classList.contains("desactivar-producto")) {
        if (confirm("Desea desactivar el producto?")) {
            console.log("Sending PUT request to deactivate...");
            await fetch(`/api/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activo: false }),
            });
            location.reload();
        }
    }

    if (boton.classList.contains("modificar-producto")) {
        window.location.href = `/editar-producto/${boton.dataset.id}`;
    }
});

function init() {
    actualizarBotones();
}

document.addEventListener("DOMContentLoaded", init);
