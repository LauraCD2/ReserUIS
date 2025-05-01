document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const userRole = document.getElementById("userRole").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const code = document.getElementById("code").value;
  
    // Aquí irá la conexión al backend con fetch() o axios
    console.log("Login enviado:", { userRole, username, password, code });
  
    // Redirigir a dashboard si es exitoso (placeholder)
    // window.location.href = "dashboard.html";
  });
  