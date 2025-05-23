// Conexión global a PostgreSQL para los modelos
const { Pool } = require('pg');

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

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
