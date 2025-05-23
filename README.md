# ReserUIS – Sistema de Reservas UIS

Sistema de reservas de espacios de la Universidad Industrial de Santander. Este proyecto permite a estudiantes, docentes y administrativos:

- Iniciar sesión según su rol (estudiante, profesor, administrativo o admin)
- Visualizar espacios como el Coliseo, biblioteca, salas de entrenamiento, etc.
- Reservar salas en horarios disponibles
- Crear, editar y listar espacios y salas
- Consultar historial de reservas con su estado (reservado o cancelado)
- Visualizar reportes y estadísticas (próximamente)
- Navegar por espacios y reservar salas específicas (Coliseo, Canchas, etc.)
- Confirmar reservas exitosas visualmente

---

## 🧩 Tecnologías

### Frontend
- HTML5, CSS3 y JavaScript
- Tipografía institucional `Humanist521` integrada vía `@font-face`
- Layout responsive básico con Flexbox y Grid

### Backend
- Node.js + Express
- Base de datos PostgreSQL (hosteada en Render)
- Conexión vía `pg` (node-postgres)
- CORS habilitado para conexión frontend
- API REST en desarrollo (ruta de prueba `/` activa)

---

## 📁 Estructura del proyecto

```
reseruis/
├── index.html                 # Pantalla de login
├── espacios.html                 # Tarjetas de espacios disponibles
├── gestionEspacios.html       # Formulario de creación y edición de espacios/salas
├── historial.html             # Listado de historial de reservas
├── notificaciones.html        # Alertas por cancelación o confirmación
├── logout.html                # Cierre de sesión con redirección automática
├── seleccionarSalaColiseo.html       # Salas del Coliseo para reservar
├── seleccionarSalaCanchas.html   # Salas deportivas tipo canchas (fútbol, squash, etc.)
├── seleccionarSalaBiblioteca.html   # Salas de la Biblioteca para reservar
├── seleccionarSalaCENTIC.html   # Salas del CENTIC para reservar
├── reservasColiseo.html        # Reservas para espacios del Coliseo
├── reservasCanchas.html        # Reservas para espacios de Canchas
├── reservasBiblioteca.html     # Reservas para espacios de Biblioteca
├── reservasCENTIC.html         # Reservas para espacios de CENTIC
├── css/
│   └── styles.css             # Estilos globales, con fuente institucional
├── js/
│   └── main.js                # Script base para interacción frontend
├── fonts/
│   └── *.woff2                # Archivos Humanist521 (uso institucional)
├── assets/
│   └── logo.png               # Imágenes, íconos u otros recursos
├── backend/
│   ├── index.js               # Servidor Express (API REST)
│   ├── package.json           # Dependencias backend (Express, pg, cors)
│   └── package-lock.json      # Lockfile generado automáticamente
└── README.md                  # Documentación del proyecto
```

---

## ▶️ Cómo usar este proyecto localmente

### Frontend

1. Clona este repositorio:
```bash
git clone https://github.com/LauraCD2/ReserUIS.git
```

2. Abre la carpeta en Visual Studio Code:
```bash
cd reseruis
code .
```

3. Instala la extensión **Live Server** en VS Code (si no la tienes).

4. Haz clic derecho en `index.html` → **"Open with Live Server"**

---

### Backend

1. Abre terminal en la carpeta `backend/`
2. Instala dependencias:
```bash
npm install
```

3. Ejecuta el servidor:
```bash
node index.js
```

4. El backend corre en: `http://localhost:3001`  
   Puedes probar con: [GET /](http://localhost:3001)

---

## ⚠️ Notas importantes

- La fuente `Humanist521`, fuente institucional de la UIS, está integrada localmente.
- El proyecto usa **camelCase** para IDs, clases y nombres de variables.
- Todas las vistas están listas para conectarse vía `fetch()`.

---

## 🚧 Pendiente

- [ ] Endpoints reales para login, reservas, historial
- [ ] Reportes y gráficas con datos reales
- [ ] Validaciones y feedback visual en formularios
