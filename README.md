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

```
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
```

---

## ▶️ Cómo usar este proyecto localmente

1. Clona este repositorio:
```bash
git clone https://github.com/tuusuario/reseruis.git
```

2. Abre la carpeta en Visual Studio Code:
```bash
cd reseruis
code .
```

3. Instala la extensión **Live Server** en VS Code (si no la tienes).

4. Haz clic derecho en `index.html` → **"Open with Live Server"**  
   Esto abrirá la app en tu navegador en `http://localhost:5500/` (u otro puerto).

---

## ⚠️ Notas importantes

- La fuente `Humanist521` está integrada localmente.
- El proyecto usa **camelCase** para todos los IDs, clases y nombres de variables.

---

## 🚧 Pendiente

- [ ] Conexión real con backend (login, CRUD de reservas, etc.)
- [ ] Reportes y gráficas con datos dinámicos
- [ ] Validaciones y feedback visual en formularios
