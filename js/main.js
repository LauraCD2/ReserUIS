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
          form.reset();
        } else {
          msgDiv.textContent = data.message || 'Error al realizar la reserva';
          msgDiv.style.color = 'red';
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
        gimnasio: 1,
        lab_esfuerzo: 2,
        spinning: 3
      };
      const id_usuario = localStorage.getItem('id_usuario');
      const fecha = document.getElementById('reservaDate').value;
      const hora_inicio = document.getElementById('reservaHoraInicio')?.value || document.getElementById('reservaTime')?.value;
      const hora_fin = document.getElementById('reservaHoraFin')?.value || document.getElementById('reservaTime')?.value;
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      msgDiv.textContent = '';
      msgDiv.style.color = 'black';
      if (!id_usuario) { msgDiv.textContent = 'No hay usuario autenticado. Inicie sesión.'; msgDiv.style.color = 'red'; return; }
      if (!id_espacio) { msgDiv.textContent = 'Seleccione un espacio válido.'; msgDiv.style.color = 'red'; return; }
      if (!hora_inicio || !hora_fin) { msgDiv.textContent = 'Debe seleccionar hora de inicio y fin.'; msgDiv.style.color = 'red'; return; }
      if (hora_fin <= hora_inicio) { msgDiv.textContent = 'La hora de fin debe ser mayor que la de inicio.'; msgDiv.style.color = 'red'; return; }
      try {
        const response = await fetch('http://localhost:3001/api/reservas', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_espacio, id_usuario, fecha, hora_inicio, hora_fin })
        });
        const data = await response.json();
        if (response.ok && data.success) { msgDiv.textContent = 'Reserva realizada con éxito'; msgDiv.style.color = 'green'; form.reset(); }
        else { msgDiv.textContent = data.message || 'Error al realizar la reserva'; msgDiv.style.color = 'red'; }
      } catch (err) { msgDiv.textContent = 'Error de conexión con el servidor'; msgDiv.style.color = 'red'; }
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
        futbol: 7,
        arena: 8,
        voleibol: 9,
        baloncesto: 10,
        tenis: 11,
        squash: 12,
        diamante: 13,
        primero_de_marzo: 14,
        skatepark: 15,
        teqball: 16
      };
      const id_usuario = localStorage.getItem('id_usuario');
      const fecha = document.getElementById('reservaDate').value;
      const hora_inicio = document.getElementById('reservaHoraInicio')?.value || document.getElementById('reservaTime')?.value;
      const hora_fin = document.getElementById('reservaHoraFin')?.value || document.getElementById('reservaTime')?.value;
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      msgDiv.textContent = '';
      msgDiv.style.color = 'black';
      if (!id_usuario) { msgDiv.textContent = 'No hay usuario autenticado. Inicie sesión.'; msgDiv.style.color = 'red'; return; }
      if (!id_espacio) { msgDiv.textContent = 'Seleccione un espacio válido.'; msgDiv.style.color = 'red'; return; }
      if (!hora_inicio || !hora_fin) { msgDiv.textContent = 'Debe seleccionar hora de inicio y fin.'; msgDiv.style.color = 'red'; return; }
      if (hora_fin <= hora_inicio) { msgDiv.textContent = 'La hora de fin debe ser mayor que la de inicio.'; msgDiv.style.color = 'red'; return; }
      try {
        const response = await fetch('http://localhost:3001/api/reservas', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_espacio, id_usuario, fecha, hora_inicio, hora_fin })
        });
        const data = await response.json();
        if (response.ok && data.success) { msgDiv.textContent = 'Reserva realizada con éxito'; msgDiv.style.color = 'green'; form.reset(); }
        else { msgDiv.textContent = data.message || 'Error al realizar la reserva'; msgDiv.style.color = 'red'; }
      } catch (err) { msgDiv.textContent = 'Error de conexión con el servidor'; msgDiv.style.color = 'red'; }
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
        sala: 17,
        auditorio: 18
      };
      const id_usuario = localStorage.getItem('id_usuario');
      const fecha = document.getElementById('reservaDate').value;
      const hora_inicio = document.getElementById('reservaHoraInicio')?.value || document.getElementById('reservaTime')?.value;
      const hora_fin = document.getElementById('reservaHoraFin')?.value || document.getElementById('reservaTime')?.value;
      const espacio = document.getElementById('reservaEspacio').value;
      const id_espacio = espacioMap[espacio];
      msgDiv.textContent = '';
      msgDiv.style.color = 'black';
      if (!id_usuario) { msgDiv.textContent = 'No hay usuario autenticado. Inicie sesión.'; msgDiv.style.color = 'red'; return; }
      if (!id_espacio) { msgDiv.textContent = 'Seleccione un espacio válido.'; msgDiv.style.color = 'red'; return; }
      if (!hora_inicio || !hora_fin) { msgDiv.textContent = 'Debe seleccionar hora de inicio y fin.'; msgDiv.style.color = 'red'; return; }
      if (hora_fin <= hora_inicio) { msgDiv.textContent = 'La hora de fin debe ser mayor que la de inicio.'; msgDiv.style.color = 'red'; return; }
      try {
        const response = await fetch('http://localhost:3001/api/reservas', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_espacio, id_usuario, fecha, hora_inicio, hora_fin })
        });
        const data = await response.json();
        if (response.ok && data.success) { msgDiv.textContent = 'Reserva realizada con éxito'; msgDiv.style.color = 'green'; form.reset(); }
        else { msgDiv.textContent = data.message || 'Error al realizar la reserva'; msgDiv.style.color = 'red'; }
      } catch (err) { msgDiv.textContent = 'Error de conexión con el servidor'; msgDiv.style.color = 'red'; }
    });
  }
});
