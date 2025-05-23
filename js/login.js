document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorDiv = document.getElementById('loginError');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Mapear el tipo de usuario a su id_tipo_usuario
    const tipoUsuarioMap = {
      'estudiante': 1,
      'administrativo': 2,
      'profesor': 3
      
    };
    const username = document.getElementById('username').value;
    const code = document.getElementById('code').value;
    const password = document.getElementById('password').value;
    const id_tipo_usuario = tipoUsuarioMap[username];

    try {
      // Consulta al backend para validar usuario
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, password, id_tipo_usuario })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        errorDiv.style.display = 'none';
        // Guardar id_usuario en localStorage
        localStorage.setItem('id_usuario', data.user.id_usuario);
        window.location.href = 'espacios.html';
      } else {
        errorDiv.textContent = data.message || 'Código o contraseña incorrectos';
        errorDiv.style.display = 'block';
      }
    } catch (err) {
      errorDiv.textContent = 'Error de conexión con el servidor';
      errorDiv.style.display = 'block';
    }
  });
});