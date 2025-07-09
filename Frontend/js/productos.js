

let offset = 0;
let search = "";
let productos = [];
let tipoActual = "pinturas"; // Estado actual (pinturas o herramientas)
let colorActual = "reset";

// Cargar productos según la pestaña activa
async function cargarProductos() {
    const busquedaInput = document.getElementById("busquedaGlobal");
    if (busquedaInput) {
      if (search !== busquedaInput.value) {
        offset = 0;
        search = busquedaInput.value;
      }
    }

    
    const busquedaColor = colorActual === "reset" ? "" : colorActual;

    const params = {
        limit: 10,
        offset,
        search,
    };

    const urlParams = new URLSearchParams(params);

    const url =
        tipoActual === "pinturas"
            ? `${urlBackend}/api/productos/search/paints/${busquedaColor}?${urlParams}`
            : `${urlBackend}/api/productos/search/tools?${urlParams}`;
    console.log(
        `-> Cargando productos para tipo: ${tipoActual}, desde: ${url}`
    );

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const productosRaw = await response.json();

        productos = productosRaw.payload.rows;
        console.log(`-> Productos cargados (${productos.length}):`, productos);
        mostrarProductos(productos);
        configurarPaginacion(productosRaw.payload.count);
    } catch (error) {
        console.error(`Error al cargar productos desde ${url}:`, error);
        mostrarProductos([]);
    }
}

async function cargarImagen(id) {
    try {
        const response = await fetch(`${urlBackend}/api/imagenes/${id}`);

        const imagenRaw = await response.json();
        return imagenRaw.payload.url;
    } catch (error) {
        console.error(`Error al cargar productos desde ${url}:`, error);
    }
}

// Mostrar productos en el contenedor
function mostrarProductos(lista) {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    if (!lista.length) {
        contenedor.innerHTML = `<p>No se encontraron productos.</p>`;
        return;
    }

    lista.forEach(async (producto) => {

        const image = await cargarImagen(producto.img);
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
      <img src="${image}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
    `;
        div.dataset.producto = JSON.stringify(producto);
        contenedor.appendChild(div);
    });
}

// Configurar tabs para cambiar tipo y cargar productos
function configurarTabs() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            console.log(`-> Click en tab index: ${index}`);
            tabs.forEach((t) => t.classList.remove("activo"));
            tab.classList.add("activo");

            tipoActual = index === 0 ? "pinturas" : "herramientas";
            console.log(`-> tipoActual actualizado a: ${tipoActual}`);

            // Mostrar filtros solo si es pinturas
            const filtrosPinturas = document.querySelector(".filtros-pinturas");
            if (filtrosPinturas) {
                filtrosPinturas.style.display =
                    tipoActual === "pinturas" ? "block" : "none";
            }

            // Limpiar input búsqueda cuando se cambia tab
            const busquedaInput = document.getElementById("busquedaGlobal");
            if (busquedaInput) busquedaInput.value = "";

            offset = 0;
            cargarProductos();
        });
    });
}

async function cargarColores() {
    try {
        const response = await fetch(`${urlBackend}/api/productos/search/colors`);
        const coloresRaw = await response.json();
        return coloresRaw.payload;
    } catch (error) {
        console.error(`Error al cargar colores desde ${url}:`, error);
    }
}

// Configurar filtros para pinturas
async function configurarFiltrosPinturas() {
    const formFiltros = document.querySelector(".filtros-pinturas");

    console.log("-> Configurando filtros de pinturas");

    let coloresRaw = await cargarColores();

    const colores = coloresRaw.map((color) => color.color_material);
    
    console.log(`-> Colores de pinturas encontrados: ${colores}`);

    // Agregar botón Reset
    const botonReset = document.createElement("button");
    botonReset.textContent = "Reset";
    botonReset.type = "button";
    botonReset.addEventListener("click", () => {
        const botonesColor = formFiltros.querySelectorAll(
            'input[name="color"]'
        );
        botonesColor.forEach((boton) => {
            if (boton.checked) {
                boton.checked = false;
                colorActual = "reset";
                offset = 0;
                cargarProductos();
            }
        });
    });
    formFiltros.appendChild(botonReset);

    // Agregar botones de colores
    colores.forEach((color) => {
        // Crear el Radiobutton
        const boton = document.createElement("input");
        boton.type = "radio";
        boton.name = "color";
        boton.id = `color-${color}`;
        boton.value = color;
        boton.addEventListener("change", () => {
            colorActual = color;
            offset = 0;
            cargarProductos();
        });

        // Crear el Label
        const label = document.createElement("label");
        label.setAttribute("for", `color-${color}`);
        label.textContent = color;

        // Agregar elementos al Form
        formFiltros.appendChild(boton);
        formFiltros.appendChild(label);
    });
}

// Configurar barra de búsqueda
function configurarBusqueda() {
    const busquedaInput = document.getElementById("busquedaGlobal");
    if (busquedaInput) {
        busquedaInput.addEventListener("keyup", cargarProductos);
    }
}

function configurarPaginacion(count) {
    const paginacion = document.getElementById("paginacion");
    if (paginacion) {
        paginacion.innerHTML = "";
        for (let i = 0; i < Math.ceil(count / 10); i++) {
            const boton = document.createElement("button");
            boton.textContent = i + 1;
            boton.id = `boton-pagina-${i * 10}`;
            if (i * 10 === offset) boton.classList.add("activo");
            boton.addEventListener("click", () => {
                offset = (i) * 10;
                cargarProductos();
            });
            paginacion.appendChild(boton);
        }
    }
}

// Evento delegado para botones de carrito
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const card = e.target.closest(".product-card");
        const data = card?.dataset.producto;
        if (data) {
            const producto = JSON.parse(data);
            agregarAlCarrito(producto);
        }
    }
});

// Inicialización general
async function init() {
    configurarTabs();
    cargarProductos().then( async () => {
        await configurarFiltrosPinturas();
        configurarBusqueda();
    });
}

document.addEventListener("DOMContentLoaded", init);
