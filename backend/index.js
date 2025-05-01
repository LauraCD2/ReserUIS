const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001; // El backend correrá en el puerto 3001

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  user: 'server_software_user',      
  host: 'dpg-d020thngi27c73f4060g-a.oregon-postgres.render.com',
  database: 'server_software',     
  password: 'DLYxGq4oon2ewgF3JdYFB2P8mxTJYwyn', 
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

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
