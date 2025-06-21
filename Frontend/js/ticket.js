function generarIDTicket() {
  const timestamp = Date.now(); 
  const random = Math.floor(Math.random() * 1000);
  return `TCK-${timestamp}-${random}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('ticket-detalle');
  const data = localStorage.getItem('colorpoint-ticket');
  const nombreCliente = sessionStorage.getItem('nombreCliente') || 'Cliente';
  const empresa = "Color Point";
  const fecha = new Date().toLocaleString();
  const ticketID = generarIDTicket();

  if (!contenedor) return;

  if (!data) {
    contenedor.innerHTML = '<p>No hay ticket disponible.</p>';
    const btnImprimir = document.getElementById('btn-imprimir');
    if (btnImprimir) btnImprimir.style.display = 'none';
    return;
  }

  const ticket = JSON.parse(data);
  const { items, total } = ticket;

  const html = `
    <div class="ticket-box">
      <h2>Ticket de Compra</h2>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Cliente:</strong> ${nombreCliente}</p>
      <p><strong>Fecha:</strong> ${fecha}</p>
      <p><strong>ID Ticket:</strong> ${ticketID}</p>
      
      <ul class="lista-productos">
        ${items.map(p => `
          <li>
            <div class="nombre">${p.nombre}</div>
            <div class="detalle">$${p.precio} x ${p.cantidad} = <strong>$${p.precio * p.cantidad}</strong></div>
          </li>
        `).join('')}
      </ul>

      <p class="total"><strong>Total a pagar:</strong> $${total}</p>
    </div>
  `;

  contenedor.innerHTML = html;
});

//  Eliminar ticket y redirigir al presionar el botón de imprimir
document.addEventListener('click', e => {
  const boton = e.target.closest('#btn-imprimir');
  if (!boton) return;

  // Eliminar ticket
  localStorage.removeItem('colorpoint-ticket');

  // Redirigir a index.html
  window.location.href = 'index.html';
});
