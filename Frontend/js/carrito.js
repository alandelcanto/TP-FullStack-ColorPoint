const CARRITO_KEY = "colorpoint-carrito";
const urlBackend = "http://localhost:3000";

// Obtener carrito desde localStorage
function obtenerCarrito() {
    const carrito = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    return carrito;
}

// Guardar carrito y actualizar contador
function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Agregar producto
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
}

// Quitar una unidad
function quitarUnidad(id) {
    const carrito = obtenerCarrito()
        .map((p) => {
            if (p.id == id && p.cantidad > 0) {
                p.cantidad--;
            }
            return p;
        })
        .filter((p) => p.cantidad > 0);

    guardarCarrito(carrito);
}

// Sumar una unidad
function sumarUnidad(id) {
    const carrito = obtenerCarrito().map((p) => {
        if (p.id == id) {
            p.cantidad++;
        }
        return p;
    });

    guardarCarrito(carrito);
}

// Eliminar completamente un producto
function eliminarProducto(id) {
    const carrito = obtenerCarrito().filter((p) => p.id != id);
    guardarCarrito(carrito);
}

async function cargarImagen(id) {
    try {
        const response = await fetch(`${urlBackend}/api/imagenes/${id}`);

        const imagenRaw = await response.json();
        return imagenRaw.payload.url;
    } catch (error) {
        console.error(`Error al cargar productos desde ${urlBackend}:`, error);
    }
}

// Renderizar carrito
async function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-productos");
    const carrito = obtenerCarrito();
    const totalContenedor = document.getElementById("total-carrito");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML =
            '<div class="mensaje-vacio">Tu carrito está vacío.</div>';
        if (totalContenedor) totalContenedor.innerText = "Total: $0";
        return;
    }

    let total = 0;

    carrito.forEach(async (producto) => {
        total += producto.precio * producto.cantidad;

        const image = await cargarImagen(producto.img);
        const item = document.createElement("div");
        item.className = "item-carrito";
        item.innerHTML = `
	  <img src="${image}" alt="${producto.nombre}">
	  <div class="nombre">${producto.nombre}</div>
	  <div class="precio">
		$${producto.precio} x ${producto.cantidad} = <strong>$${
            producto.precio * producto.cantidad
        }</strong>
	  </div>
	  <div class="acciones">
		<button data-action="restar" data-id="${producto.id}">-</button>
		<span>${producto.cantidad}</span>
		<button data-action="sumar" data-id="${producto.id}">+</button>
		<button data-action="eliminar" data-id="${
            producto.id
        }" class="eliminar">Eliminar</button>
	  </div>
	`;
        contenedor.appendChild(item);
    });

    if (totalContenedor) {
        totalContenedor.innerText = `Total: $${total}`;
    }
}

// Actualizar contador en navbar
function actualizarContadorCarrito() {
    const total = obtenerCarrito().reduce((acc, p) => acc + p.cantidad, 0);
    const linkCarrito = document.querySelector(
        '#navbar-inferior a[href="carrito.html"]'
    );
    if (linkCarrito) {
        linkCarrito.innerHTML = `CARRITO (${total})`;
    }
}

// Delegar clicks para botones de acción
document.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id; // ID como string

    console.log(`[click] Acción: ${action}, ID: ${id}`);

    if (action === "sumar") {
        sumarUnidad(id);
        renderizarCarrito();
    } else if (action === "restar") {
        quitarUnidad(id);
        renderizarCarrito();
    } else if (action === "eliminar") {
        eliminarProducto(id);
        renderizarCarrito();
    }
});

// Inicialización al cargar la página del carrito
document.addEventListener("DOMContentLoaded", () => {
    console.log("[DOMContentLoaded] Renderizando carrito");
    actualizarContadorCarrito();
    renderizarCarrito();

    // Botón CANCELAR
    const btnCancelar = document.getElementById("btn-cancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
                localStorage.removeItem(CARRITO_KEY);
                renderizarCarrito();
                actualizarContadorCarrito();
            }
        });
    }

    // Botón FINALIZAR
    const btnFinalizar = document.getElementById("btn-finalizar");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            const carrito = obtenerCarrito();
            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            if (confirm("¿Estás seguro de finalizar la compra?")) {
                // Guardar el ticket en localStorage
                const ticket = {
                    fecha: new Date().toLocaleString(),
                    items: carrito,
                    total: carrito.reduce(
                        (acc, p) => acc + p.precio * p.cantidad,
                        0
                    ),
                };
                localStorage.setItem(
                    "colorpoint-ticket",
                    JSON.stringify(ticket)
                );

                // Vaciar el carrito después de guardar el ticket
                localStorage.removeItem(CARRITO_KEY);

                fetch(`${urlBackend}/api/comprobantes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre_cliente: sessionStorage.getItem("nombreCliente"),
                        fecha: ticket.fecha,
                        total: ticket.total,
                        detalleComprobante: ticket.items.map((p) => ({
                            producto_id: p.id,
                            cantidad: p.cantidad,
                            precio_unidad: p.precio,
                            precio_subtotal: p.precio * p.cantidad,
                        })),
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem("idTicket", data.payload.id);
                        console.log("[finalizar] Ticket guardado:", ticket);
                        window.location.href = "ticket.html";
                    })

                    .catch((error) => console.error(error));
            }
        });
    }
});
