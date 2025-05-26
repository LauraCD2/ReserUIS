// Conexión global a PostgreSQL para los modelos
const { Pool } = require('pg');

console.log('Configurando conexión a la base de datos...');

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

// Evento cuando se crea una nueva conexión
pool.on('connect', () => {
  console.log('Nueva conexión establecida con la base de datos');
});

// Evento cuando hay un error
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexiones:', err);
});

// Función query con logging
const query = async (text, params) => {
  console.log('Ejecutando query:', { text, params });
  try {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query ejecutado:', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Error ejecutando query:', { text, error });
    throw error;
  }
};

module.exports = {
  query,
  pool
};
