document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const userRole = document.getElementById("userRole").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const code = document.getElementById("code").value;
  
    // Aquí irá la conexión al backend con fetch() o axios
    console.log("Login enviado:", { userRole, username, password, code });
  
    // Redirigir a espacios si es exitoso (placeholder)
    // window.location.href = "espacios.html";
  });

// --- RESERVA BIBLIOTECA ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservaFormBiblioteca');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      // Mapeo de espacios a id_espacio según la base de datos
      const espacioMap = {
        sala_lectura: 4,
        cubiculo_individual: 5,
        cubiculo_grupal: 6
      };
      const id_usuario = localStorage.getItem('id_usuario');
      const fecha = document.getElementById('reservaDate').value;
      const hora_inicio = document.getElementById('reservaHoraInicio').value;
      const hora_fin = document.getElementById('reservaHoraFin').value;
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      if (!id_usuario) {
        alert('No hay usuario autenticado. Inicie sesión.');
        return;
      }
      if (!id_espacio) {
        alert('Seleccione un espacio válido.');
        return;
      }
      if (!hora_inicio || !hora_fin) {
        alert('Debe seleccionar hora de inicio y fin.');
        return;
      }
      if (hora_fin <= hora_inicio) {
        alert('La hora de fin debe ser mayor que la de inicio.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3001/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_espacio,
            id_usuario,
            fecha,
            hora_inicio,
            hora_fin
          })
        });
        const data = await response.json();
        if (response.ok && data.success) {
          alert('Reserva realizada con éxito');
          form.reset();
        } else {
          alert(data.message || 'Error al realizar la reserva');
        }
      } catch (err) {
        alert('Error de conexión con el servidor');
      }
    });
  }
});
