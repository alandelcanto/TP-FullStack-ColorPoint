let productos = [];
let tipoActual = 'pinturas'; // Estado actual (pinturas o herramientas)

// Cargar productos según la pestaña activa
async function cargarProductos() {
  const url = tipoActual === 'pinturas' ? 'data/pinturas.json' : 'data/herramientas.json';
  console.log(`-> Cargando productos para tipo: ${tipoActual}, desde: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    productos = await response.json();
    console.log(`-> Productos cargados (${productos.length}):`, productos);
    mostrarProductos(productos);
  } catch (error) {
    console.error(`Error al cargar productos desde ${url}:`, error);
    mostrarProductos([]);
  }
}

// Mostrar productos en el contenedor
function mostrarProductos(lista) {
  const contenedor = document.getElementById('lista-productos');
  contenedor.innerHTML = '';

  if (!lista.length) {
    contenedor.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">No se encontraron productos.</p>`;
    return;
  }

  lista.forEach(producto => {
    contenedor.innerHTML += `
      <div class="product-card">
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button class="add-to-cart" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    `;
  });
}

// Filtro por texto para productos ya cargados
function filtrarPorTexto() {
  const texto = document.getElementById('busquedaTipo').value.toLowerCase();
  console.log(`-> Filtrando por texto: "${texto}"`);

  const filtrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(texto) ||
    (producto.descripcion && producto.descripcion.toLowerCase().includes(texto))
  );
  mostrarProductos(filtrados);
}

// Filtrar por color (solo pinturas)
function filtrarPorColor(color) {
  if (tipoActual !== 'pinturas') {
    mostrarProductos(productos);
    return;
  }

  if (color === 'reset') {
    mostrarProductos(productos);
    return;
  }

  const filtrados = productos.filter(p => (p.color || '').toLowerCase() === color.toLowerCase());
  mostrarProductos(filtrados);
}

// Configurar tabs para cambiar tipo y cargar productos
function configurarTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      console.log(`-> Click en tab index: ${index}`);
      tabs.forEach(t => t.classList.remove('activo'));
      tab.classList.add('activo');

      tipoActual = index === 0 ? 'pinturas' : 'herramientas';
      console.log(`-> tipoActual actualizado a: ${tipoActual}`);

      // Mostrar filtros solo si es pinturas
      const filtrosPinturas = document.getElementById('filtros-pinturas');
      if (filtrosPinturas) {
        filtrosPinturas.style.display = tipoActual === 'pinturas' ? 'block' : 'none';
      }

      // Limpiar input búsqueda cuando se cambia tab
      const busquedaInput = document.getElementById('busquedaTipo');
      if (busquedaInput) busquedaInput.value = '';

      cargarProductos();
    });
  });
}

// Inicialización general
function init() {
  configurarTabs();
  cargarProductos();

  const busquedaInput = document.getElementById('busquedaTipo');
  if (busquedaInput) {
    busquedaInput.addEventListener('keyup', filtrarPorTexto);
  }

  document.querySelectorAll('.color').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.classList.contains('reset') ? 'reset' : btn.style.backgroundColor;
      filtrarPorColor(color);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
