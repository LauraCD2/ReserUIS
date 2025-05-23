const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
// Importar modelo de reserva
const reservaModel = require('./models/reserva');

const app = express();
const port = 3001; // El backend correrá en el puerto 3001

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  user: 'server_software_fszj_user',      
  host: 'dpg-d0lv40h5pdvs738o6o0g-a.oregon-postgres.render.com',
  database: 'server_software_fszj',     
  password: 'ldEBJuS3fzJ8VNWcSD4PyefbXPwc68vX', 
  port: 5432,
  ssl: {
    rejectUnauthorized: false, 
  },
});

// Ruta de prueba
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ hora: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la base de datos');
  }
});

// Endpoint de login
app.post('/api/login', async (req, res) => {
  const { code, password, id_tipo_usuario } = req.body;
  try {
    // Buscar usuario por código, contraseña y tipo
    const result = await pool.query(
      `SELECT * FROM usuario WHERE codigo = $1 AND password = $2 AND id_tipo_usuario = $3`,
      [code, password, id_tipo_usuario]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Código o contraseña incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en la base de datos' });
  }
});

// Endpoint para crear una reserva
app.post('/api/reservas', async (req, res) => {
  try {
    const { id_espacio, id_usuario, fecha, hora_inicio, hora_fin } = req.body;
    const nuevaReserva = await reservaModel.addReserva({ id_espacio, id_usuario, fecha, hora_inicio, hora_fin });
    res.status(201).json({ success: true, reserva: nuevaReserva });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al crear la reserva' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
