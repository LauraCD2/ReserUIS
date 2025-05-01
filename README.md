# ReserUIS – Sistema de Reservas UIS

Sistema de reservas de espacios de la Universidad Industrial de Santander. Este proyecto permite a estudiantes, docentes y administrativos:

- Iniciar sesión según su rol (estudiante, profesor, administrativo o administrador)
- Visualizar espacios como el Coliseo, biblioteca, salas de entrenamiento, etc.
- Reservar salas en horarios disponibles
- Crear, editar y listar espacios y salas
- Consultar historial de reservas con su estado (reservado o cancelado)
- Visualizar reportes y estadísticas (próximamente)

---

## 🧩 Tecnologías

- HTML5, CSS3 y JavaScript
- Tipografía institucional `Humanist521` integrada vía `@font-face`
- Layout responsive básico con Flexbox y Grid
- Estilo visual fiel al diseño institucional proporcionado (PDF)

---

## 📁 Estructura del proyecto

```bash
reseruis/
├── index.html               # Pantalla de login
├── dashboard.html           # Tarjetas de espacios disponibles
├── gestionEspacios.html     # Formulario de creación y edición de espacios/salas
├── reservas.html            # Formulario de reservas y calendario
├── historial.html           # Listado de historial de reservas
├── css/
│   └── styles.css           # Estilos globales, con fuente institucional
├── js/
│   └── main.js              # Script base para interacción frontend
├── fonts/
│   └── *.woff2              # Archivos Humanist521 (uso institucional)
├── assets/
│   └── logo.png             # Imágenes, íconos u otros recursos
└── README.md                # Documentación del proyecto
