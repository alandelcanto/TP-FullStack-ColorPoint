let productos = [];
let tipoActual = 'pinturas'; // Estado actual (pinturas o herramientas)
let colorActual = 'reset';

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

// Funcion filtradora de productos
function filtrarProductos() {
  const filtrados = filtrarPorTexto(filtrarPorColor(productos, colorActual));
  mostrarProductos(filtrados);
}

// Filtro por texto para productos ya cargados
function filtrarPorTexto(productos) {
  const texto = document.getElementById('busquedaGlobal').value.toLowerCase();
  console.log(`-> Filtrando por texto: "${texto}"`);

  const filtrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(texto) ||
    (producto.descripcion && producto.descripcion.toLowerCase().includes(texto))
  );
  return filtrados;
}

// Filtrar por color (solo pinturas)
function filtrarPorColor(productos, color) {
  if (tipoActual !== 'pinturas') {
    return productos;
  }

  if (color === 'reset') {
    return productos;
  }

  const filtrados = productos.filter(p => (p.color || '').toLowerCase() === color.toLowerCase());
  return filtrados;
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
      const filtrosPinturas = document.querySelector('.filtros-pinturas');
      if (filtrosPinturas) {
        filtrosPinturas.style.display = tipoActual === 'pinturas' ? 'block' : 'none';
      }

      // Limpiar input búsqueda cuando se cambia tab
      const busquedaInput = document.getElementById('busquedaGlobal');
      if (busquedaInput) busquedaInput.value = '';

      cargarProductos();
    });
  });
}

// Configurar filtros para pinturas
function configurarFiltrosPinturas() {
  const formFiltros = document.querySelector('.filtros-pinturas');

  console.log('-> Configurando filtros de pinturas');

  // Extraer colores de productos
  const colores = [];
  productos.forEach(p => {
    const color = p.color;
    if (color && !colores.includes(color)) {
      colores.push(color);
    }
  });

  console.log(`-> Colores de pinturas encontrados: ${colores}`);

  // Agregar botón Reset
  const botonReset = document.createElement('button');
  botonReset.textContent = 'Reset';
  botonReset.type = 'button';
  botonReset.addEventListener('click', () => {
    const botonesColor = formFiltros.querySelectorAll('input[name="color"]');
    botonesColor.forEach(boton => {
      if (boton.checked) {
        boton.checked = false;
        colorActual = 'reset';
        filtrarProductos();
      }
    });
  });
  formFiltros.appendChild(botonReset);

  // Agregar botones de colores
  colores.forEach(color => {
    // Crear el Radiobutton
    const boton = document.createElement('input');
    boton.type = 'radio';
    boton.name = 'color';
    boton.id = `color-${color}`;
    boton.value = color;
    boton.addEventListener('change', () => {
      colorActual = color;
      filtrarProductos();
    } );

    // Crear el Label
    const label = document.createElement('label');
    label.setAttribute('for', `color-${color}`);
    label.textContent = color;

    // Agregar elementos al Form
    formFiltros.appendChild(boton);
    formFiltros.appendChild(label);
  });
}

// Configurar barra de búsqueda
function configurarBusqueda() {
  const busquedaInput = document.getElementById('busquedaGlobal');
  if (busquedaInput) {
    busquedaInput.addEventListener('keyup', filtrarProductos);
  }
}

// Inicialización general
function init() {
  configurarTabs();
  cargarProductos().then(() => {
    configurarFiltrosPinturas();
    configurarBusqueda();
  });

}

document.addEventListener('DOMContentLoaded', init);
