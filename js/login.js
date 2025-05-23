// Simulación de base de datos de usuarios
const usuarios = [
  { username: 'estudiante', code: '12345', password: 'estudiante123' },
  { username: 'profesor', code: '54321', password: 'profesor123' },
  { username: 'administrativo', code: '11111', password: 'admin123' }
];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorDiv = document.getElementById('loginError');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const code = document.getElementById('code').value;
    const password = document.getElementById('password').value;

    const usuario = usuarios.find(
      u => u.username === username && u.code === code && u.password === password
    );

    if (usuario) {
      errorDiv.style.display = 'none';
      window.location.href = 'gestionEspacios.html';
    } else {
      errorDiv.textContent = 'Código o contraseña incorrectos';
      errorDiv.style.display = 'block';
    }
  });
});