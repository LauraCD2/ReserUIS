document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.historialContainer');
  if (!container) return;

  // Elimina filas de ejemplo
  const filasEjemplo = container.querySelectorAll('.reservaFila:not(.encabezado)');
  filasEjemplo.forEach(fila => fila.remove());

  // Obtener id_usuario del localStorage
  const id_usuario = localStorage.getItem('id_usuario');
  console.log('Consultando historial para id_usuario:', id_usuario);
  if (!id_usuario) {
    const fila = document.createElement('div');
    fila.className = 'reservaFila';
    fila.innerHTML = '<div colspan="5">Debe iniciar sesión para ver su historial.</div>';
    container.appendChild(fila);
    return;
  }

  try {    const response = await fetch(`http://localhost:3001/api/reservas?id_usuario=${encodeURIComponent(id_usuario)}`);
    const data = await response.json();
    if (response.ok && data.success) {
      data.reservas.forEach(reserva => {
        const fila = document.createElement('div');
        fila.className = 'reservaFila';
        fila.innerHTML = `
          <div>${reserva.fecha}</div>
          <div>${reserva.tipo_espacio}</div>
          <div>${reserva.sala}</div>
          <div>${reserva.hora_inicio} - ${reserva.hora_fin}</div>
          <div class="estadoReservado">RESERVADO</div>
        `;
        container.appendChild(fila);
      });
    } else {
      const fila = document.createElement('div');
      fila.className = 'reservaFila';
      fila.innerHTML = '<div colspan="5">No hay reservas registradas.</div>';
      container.appendChild(fila);
    }
  } catch (err) {
    const fila = document.createElement('div');
    fila.className = 'reservaFila';
    fila.innerHTML = '<div colspan="5">Error al cargar el historial.</div>';
    container.appendChild(fila);
  }
});
