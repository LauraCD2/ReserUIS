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
    // Crear div para mensajes si no existe
    let msgDiv = document.getElementById('reservaMsg');
    if (!msgDiv) {
      msgDiv = document.createElement('div');
      msgDiv.id = 'reservaMsg';
      msgDiv.style.margin = '10px 0';
      msgDiv.style.fontWeight = 'bold';
      form.parentNode.insertBefore(msgDiv, form.nextSibling);
    }
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const espacioMap = {
        sala_lectura: 4,
        cubiculo_individual: 5,
        cubiculo_grupal: 6
      };
      let id_usuario = localStorage.getItem('id_usuario');
      if (id_usuario) id_usuario = parseInt(id_usuario);
      const fechaInput = document.getElementById('reservaDate').value;
      const fecha = fechaInput ? new Date(fechaInput).toISOString().slice(0, 10) : '';
      const hora_inicio = document.getElementById('reservaHoraInicio').value.padEnd(8, ':00');
      const hora_fin = document.getElementById('reservaHoraFin').value.padEnd(8, ':00');
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      msgDiv.textContent = '';
      msgDiv.style.color = 'black';
      if (!id_usuario) {
        msgDiv.textContent = 'No hay usuario autenticado. Inicie sesión.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!id_espacio) {
        msgDiv.textContent = 'Seleccione un espacio válido.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!hora_inicio || !hora_fin) {
        msgDiv.textContent = 'Debe seleccionar hora de inicio y fin.';
        msgDiv.style.color = 'red';
        return;
      }
      if (hora_fin <= hora_inicio) {
        msgDiv.textContent = 'La hora de fin debe ser mayor que la de inicio.';
        msgDiv.style.color = 'red';
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
          msgDiv.textContent = 'Reserva realizada con éxito';
          msgDiv.style.color = 'green';
          setTimeout(() => { msgDiv.textContent = ''; }, 3000);
          form.reset();
        } else {
          msgDiv.textContent = data.message || 'No se pudo realizar la reserva';
          msgDiv.style.color = 'red';
          setTimeout(() => { msgDiv.textContent = ''; }, 4000);
        }
      } catch (err) {
        msgDiv.textContent = 'Error de conexión con el servidor';
        msgDiv.style.color = 'red';
      }
    });
  }
});

// --- RESERVA COLISEO ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservaFormColiseo');
  if (form) {
    let msgDiv = document.getElementById('reservaMsgColiseo');
    if (!msgDiv) {
      msgDiv = document.createElement('div');
      msgDiv.id = 'reservaMsgColiseo';
      msgDiv.style.margin = '10px 0';
      msgDiv.style.fontWeight = 'bold';
      form.parentNode.insertBefore(msgDiv, form.nextSibling);
    }
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const espacioMap = {
        gimnasio: 1,               // id_espacio 1
        lab_esfuerzo: 2,          // id_espacio 2
        spinning: 3               // id_espacio 3
      };
      let id_usuario = localStorage.getItem('id_usuario');
      if (id_usuario) id_usuario = parseInt(id_usuario);
      const fechaInput = document.getElementById('reservaDate').value;
      const fecha = fechaInput ? new Date(fechaInput).toISOString().slice(0, 10) : '';
      const hora_inicio = document.getElementById('reservaHoraInicio').value.padEnd(8, ':00');
      const hora_fin = document.getElementById('reservaHoraFin').value.padEnd(8, ':00');
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      msgDiv.textContent = '';
      msgDiv.style.color = 'black';
      if (!id_usuario) {
        msgDiv.textContent = 'No hay usuario autenticado. Inicie sesión.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!id_espacio) {
        msgDiv.textContent = 'Seleccione un espacio válido.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!hora_inicio || !hora_fin) {
        msgDiv.textContent = 'Debe seleccionar hora de inicio y fin.';
        msgDiv.style.color = 'red';
        return;
      }
      if (hora_fin <= hora_inicio) {
        msgDiv.textContent = 'La hora de fin debe ser mayor que la de inicio.';
        msgDiv.style.color = 'red';
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
          msgDiv.textContent = 'Reserva realizada con éxito';
          msgDiv.style.color = 'green';
          setTimeout(() => { msgDiv.textContent = ''; }, 3000);
          form.reset();
        } else {
          msgDiv.textContent = data.message || 'No se pudo realizar la reserva';
          msgDiv.style.color = 'red';
          setTimeout(() => { msgDiv.textContent = ''; }, 4000);
        }
      } catch (err) {
        msgDiv.textContent = 'Error de conexión con el servidor';
        msgDiv.style.color = 'red';
        setTimeout(() => { msgDiv.textContent = ''; }, 4000);
      }
    });
  }
});

// --- RESERVA CANCHAS ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservaFormCanchas');
  if (form) {
    let msgDiv = document.getElementById('reservaMsgCanchas');
    if (!msgDiv) {
      msgDiv = document.createElement('div');
      msgDiv.id = 'reservaMsgCanchas';
      msgDiv.style.margin = '10px 0';
      msgDiv.style.fontWeight = 'bold';
      form.parentNode.insertBefore(msgDiv, form.nextSibling);
    }
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const espacioMap = {
        futbol: 7,                // id_espacio 7
        arena: 8,                 // id_espacio 8
        voleibol: 9,              // id_espacio 9
        baloncesto: 10,           // id_espacio 10
        tenis: 11,                // id_espacio 11
        squash: 12,               // id_espacio 12
        diamante: 13,             // id_espacio 13
        primero_de_marzo: 14,     // id_espacio 14
        skatepark: 15,            // id_espacio 15
        teqball: 16               // id_espacio 16
      };
      let id_usuario = localStorage.getItem('id_usuario');
      if (id_usuario) id_usuario = parseInt(id_usuario);
      const fechaInput = document.getElementById('reservaDate').value;
      const fecha = fechaInput ? new Date(fechaInput).toISOString().slice(0, 10) : '';
      const hora_inicio = document.getElementById('reservaHoraInicio').value.padEnd(8, ':00');
      const hora_fin = document.getElementById('reservaHoraFin').value.padEnd(8, ':00');
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      msgDiv.textContent = '';
      msgDiv.style.color = 'black';
      if (!id_usuario) {
        msgDiv.textContent = 'No hay usuario autenticado. Inicie sesión.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!id_espacio) {
        msgDiv.textContent = 'Seleccione un espacio válido.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!hora_inicio || !hora_fin) {
        msgDiv.textContent = 'Debe seleccionar hora de inicio y fin.';
        msgDiv.style.color = 'red';
        return;
      }
      if (hora_fin <= hora_inicio) {
        msgDiv.textContent = 'La hora de fin debe ser mayor que la de inicio.';
        msgDiv.style.color = 'red';
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
          msgDiv.textContent = 'Reserva realizada con éxito';
          msgDiv.style.color = 'green';
          setTimeout(() => { msgDiv.textContent = ''; }, 3000);
          form.reset();
        } else {
          msgDiv.textContent = data.message || 'No se pudo realizar la reserva';
          msgDiv.style.color = 'red';
          setTimeout(() => { msgDiv.textContent = ''; }, 4000);
        }
      } catch (err) {
        msgDiv.textContent = 'Error de conexión con el servidor';
        msgDiv.style.color = 'red';
        setTimeout(() => { msgDiv.textContent = ''; }, 4000);
      }
    });
  }
});

// --- RESERVA CENTIC ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservaFormCENTIC');
  if (form) {
    let msgDiv = document.getElementById('reservaMsgCENTIC');
    if (!msgDiv) {
      msgDiv = document.createElement('div');
      msgDiv.id = 'reservaMsgCENTIC';
      msgDiv.style.margin = '10px 0';
      msgDiv.style.fontWeight = 'bold';
      form.parentNode.insertBefore(msgDiv, form.nextSibling);
    }
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const espacioMap = {
        sala: 17,                 // id_espacio 17
        auditorio: 18             // id_espacio 18
      };
      let id_usuario = localStorage.getItem('id_usuario');
      if (id_usuario) id_usuario = parseInt(id_usuario);
      const fechaInput = document.getElementById('reservaDate').value;
      const fecha = fechaInput ? new Date(fechaInput).toISOString().slice(0, 10) : '';
      const hora_inicio = document.getElementById('reservaHoraInicio').value.padEnd(8, ':00');
      const hora_fin = document.getElementById('reservaHoraFin').value.padEnd(8, ':00');
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      msgDiv.textContent = '';
      msgDiv.style.color = 'black';
      if (!id_usuario) {
        msgDiv.textContent = 'No hay usuario autenticado. Inicie sesión.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!id_espacio) {
        msgDiv.textContent = 'Seleccione un espacio válido.';
        msgDiv.style.color = 'red';
        return;
      }
      if (!hora_inicio || !hora_fin) {
        msgDiv.textContent = 'Debe seleccionar hora de inicio y fin.';
        msgDiv.style.color = 'red';
        return;
      }
      if (hora_fin <= hora_inicio) {
        msgDiv.textContent = 'La hora de fin debe ser mayor que la de inicio.';
        msgDiv.style.color = 'red';
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
          msgDiv.textContent = 'Reserva realizada con éxito';
          msgDiv.style.color = 'green';
          setTimeout(() => { msgDiv.textContent = ''; }, 3000);
          form.reset();
        } else {
          msgDiv.textContent = data.message || 'No se pudo realizar la reserva';
          msgDiv.style.color = 'red';
          setTimeout(() => { msgDiv.textContent = ''; }, 4000);
        }
      } catch (err) {
        msgDiv.textContent = 'Error de conexión con el servidor';
        msgDiv.style.color = 'red';
        setTimeout(() => { msgDiv.textContent = ''; }, 4000);
      }
    });
  }
});
