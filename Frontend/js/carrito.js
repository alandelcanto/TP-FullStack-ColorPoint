const CARRITO_KEY = 'colorpoint-carrito';

// Obtener carrito desde localStorage
function obtenerCarrito() {
  const carrito = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
  console.log('[obtenerCarrito]', carrito);
  return carrito;
}

// Guardar carrito y actualizar contador
function guardarCarrito(carrito) {
  console.log('[guardarCarrito]', carrito);
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Agregar producto
function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
}

// Quitar una unidad
function quitarUnidad(id) {
  console.log('[quitarUnidad] ID:', id);
  const carrito = obtenerCarrito().map(p => {
    if (p.id === id && p.cantidad > 0) {
      p.cantidad--;
    }
    return p;
  }).filter(p => p.cantidad > 0);

  guardarCarrito(carrito);
  renderizarCarrito();
}

// Sumar una unidad
function sumarUnidad(id) {
  console.log('[sumarUnidad] ID:', id);
  const carrito = obtenerCarrito().map(p => {
    if (p.id === id) {
      p.cantidad++;
    }
    return p;
  });

  guardarCarrito(carrito);
  renderizarCarrito();
}

// Eliminar completamente un producto
function eliminarProducto(id) {
  console.log('[eliminarProducto] ID:', id);
  const carrito = obtenerCarrito().filter(p => p.id !== id);
  guardarCarrito(carrito);
  renderizarCarrito();
}

// Renderizar carrito
function renderizarCarrito() {
  const contenedor = document.getElementById('carrito-productos');
  const carrito = obtenerCarrito();
  if (!contenedor) return;

  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p style="text-align: center;">Tu carrito está vacío.</p>';
    return;
  }

  console.log('[renderizarCarrito] Productos en carrito:', carrito);

  carrito.forEach(producto => {
    console.log('[renderizarCarrito] producto:', producto);
    const item = document.createElement('div');
    item.className = 'item-carrito';
    item.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <div class="nombre">${producto.nombre}</div>
      <div class="precio">
        $${producto.precio} x ${producto.cantidad} = <strong>$${producto.precio * producto.cantidad}</strong>
      </div>
      <div class="acciones">
        <button data-action="restar" data-id="${producto.id}">-</button>
        <span>${producto.cantidad}</span>
        <button data-action="sumar" data-id="${producto.id}">+</button>
        <button data-action="eliminar" data-id="${producto.id}" class="eliminar">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(item);
  });
}

// Actualizar contador en navbar
function actualizarContadorCarrito() {
  const total = obtenerCarrito().reduce((acc, p) => acc + p.cantidad, 0);
  const linkCarrito = document.querySelector('#navbar-inferior a[href="carrito.html"]');
  if (linkCarrito) {
    linkCarrito.innerHTML = `CARRITO (${total})`;
  }
}

// Delegar clicks para botones de acción
document.addEventListener('click', e => {
  const button = e.target.closest('button[data-action]');
  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id; // ID como string
  console.log('[click en botón]', action, 'ID:', id);

  if (action === 'sumar') {
    sumarUnidad(id);
  } else if (action === 'restar') {
    quitarUnidad(id);
  } else if (action === 'eliminar') {
    eliminarProducto(id);
  }
});

// Inicialización al cargar la página del carrito
document.addEventListener('DOMContentLoaded', () => {
  console.log('[DOMContentLoaded] Renderizando carrito');
  actualizarContadorCarrito();
  renderizarCarrito();

  // Botón CANCELAR
  const btnCancelar = document.getElementById('btn-cancelar');
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
        localStorage.removeItem(CARRITO_KEY);
        renderizarCarrito();
        actualizarContadorCarrito();
        console.log('[cancelar] Carrito eliminado');
      }
    });
  }

// Botón FINALIZAR
const btnFinalizar = document.getElementById('btn-finalizar');
if (btnFinalizar) {
  btnFinalizar.addEventListener('click', () => {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Guardar el ticket en localStorage
    const ticket = {
      fecha: new Date().toLocaleString(),
      items: carrito,
      total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0),
    };
    localStorage.setItem('colorpoint-ticket', JSON.stringify(ticket));
    console.log('[finalizar] Ticket guardado:', ticket);

    // Redirigir
    window.location.href = 'ticket.html';
  });
}
});
