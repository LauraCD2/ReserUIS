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

  // Crear o reutilizar un div para mensajes
  let msgDiv = document.getElementById('msgHistorial');
  if (!msgDiv) {
    msgDiv = document.createElement('div');
    msgDiv.id = 'msgHistorial';
    msgDiv.style.margin = '20px 0 0 0';
    msgDiv.style.fontWeight = 'bold';
    msgDiv.style.textAlign = 'center';
    document.querySelector('.historialContainer').appendChild(msgDiv);
  }

  // Función para mostrar ventana flotante de mensaje
  function mostrarVentanaMensajeHistorial(texto, color = '#045D18') {
    const ventana = document.getElementById('ventanaMensajeHistorial');
    const textoSpan = document.getElementById('textoVentanaMensajeHistorial');
    ventana.style.display = 'block';
    textoSpan.textContent = texto;
    textoSpan.style.color = color;
  }
  // Cerrar ventana mensaje
  document.getElementById('cerrarVentanaMensajeHistorial').onclick = function() {
    document.getElementById('ventanaMensajeHistorial').style.display = 'none';
  }

  try {
    const response = await fetch(`http://localhost:3001/api/reservas?id_usuario=${encodeURIComponent(id_usuario)}`);
    const data = await response.json();
    if (response.ok && data.success && Array.isArray(data.reservas)) {
      data.reservas.forEach((reserva, idx) => {
        console.log('Reserva recibida:', reserva); // DEPURACIÓN
        const fila = document.createElement('div');
        fila.className = 'reservaFila';
        fila.setAttribute('data-id-reserva', reserva.id_reserva); // Para fácil acceso
        fila.setAttribute('data-id-espacio', reserva.id_espacio); // Para fácil acceso
        const fechaSolo = reserva.fecha ? reserva.fecha.slice(0, 10) : '';
        const horaInicio = reserva.hora_inicio ? reserva.hora_inicio.slice(0,5) : '';
        const horaFin = reserva.hora_fin ? reserva.hora_fin.slice(0,5) : '';
        fila.innerHTML = `
          <div>${fechaSolo}</div>
          <div>${reserva.tipo_espacio}</div>
          <div>${reserva.sala}</div>
          <div>${horaInicio} - ${horaFin}</div>
          <div><button class="btnCancelarReserva" data-idx="${idx}" data-id-espacio="${reserva.id_espacio}" style="background:#b30000;color:#fff;padding:0.5rem 1.2rem;border:none;border-radius:5px;font-weight:bold;cursor:pointer;">Cancelar reserva</button></div>
        `;
        container.appendChild(fila);
      });
      // Evento para los botones cancelar
      document.querySelectorAll('.btnCancelarReserva').forEach(btn => {
        btn.addEventListener('click', function() {
          const idx = this.getAttribute('data-idx');
          const idReserva = this.closest('.reservaFila').getAttribute('data-id-reserva');
          window.reservaCancelarIdx = idx;
          window.reservaCancelarIdReserva = idReserva;
          window.reservaCancelarBtn = this;
          document.getElementById('modalCancelar').style.display = 'flex';
        });
      });
      // Modal cancelar eventos
      document.getElementById('btnCancelarCerrar').onclick = cerrarModalCancelar;
      function cerrarModalCancelar() {
        document.getElementById('modalCancelar').style.display = 'none';
        window.reservaCancelarIdx = undefined;
        window.reservaCancelarIdReserva = undefined;
      }
      document.getElementById('btnCancelarConfirmar').onclick = async function() {
        document.getElementById('modalCancelar').style.display = 'none';
        const idReserva = window.reservaCancelarIdReserva;
        if (!idReserva) return;
        try {
          const response = await fetch(`http://localhost:3001/api/reservas/${idReserva}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            mostrarVentanaMensajeHistorial('Reserva cancelada exitosamente.', 'green');
            // Eliminar la fila visualmente
            if (window.reservaCancelarBtn) {
              const fila = window.reservaCancelarBtn.closest('.reservaFila');
              if (fila) fila.remove();
            }
          } else {
            const data = await response.json();
            console.error('Error:', data.message);
            mostrarVentanaMensajeHistorial(data.message || 'No se pudo cancelar la reserva.', 'red');
          }
        } catch (err) {
          mostrarVentanaMensajeHistorial('Error de conexión con el servidor.', 'red');
        }
        window.reservaCancelarIdx = undefined;
        window.reservaCancelarIdReserva = undefined;
        window.reservaCancelarBtn = undefined;
      };
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
