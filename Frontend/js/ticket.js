function generarIDTicket() {
  const timestamp = Date.now(); // a  modificar
  const random = Math.floor(Math.random() * 1000); // a modificar
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
    contenedor.innerHTML = '<p style="text-align: center;">No hay ticket disponible.</p>';
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
