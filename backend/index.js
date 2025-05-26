const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
// Importar modelos
const reservaModel = require('./models/reserva');
const espacioModel = require('./models/espacio');
const tipoEspacioModel = require('./models/tipo_espacio');

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

// Endpoint para obtener todas las reservas de un usuario
app.get('/api/reservas', async (req, res) => {
  try {
    const id_usuario = req.query.id_usuario;
    console.log('Historial solicitado para id_usuario:', id_usuario);
    if (!id_usuario) {
      return res.status(400).json({ success: false, message: 'id_usuario es requerido' });
    }
    const reservas = await reservaModel.getReservasConDetallesPorUsuario(id_usuario);
    console.log('RESERVAS ENVIADAS AL FRONT:', reservas); // DEPURACIÓN
    res.json({ success: true, reservas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener las reservas' });
  }
});

// Endpoint para eliminar una reserva por id_espacio
app.delete('/api/reservas/espacio/:id_espacio', async (req, res) => {
  try {
    const id_espacio = req.params.id_espacio;
    const deleted = await reservaModel.deleteReservaPorEspacio(id_espacio);
    if (deleted) {
      res.json({ success: true, message: 'Reserva eliminada' });
    } else {
      res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al eliminar la reserva' });
  }
});

// Endpoint para eliminar una reserva por id_reserva
app.delete('/api/reservas/:id_reserva', async (req, res) => {
  const { id_reserva } = req.params;
  try {
    const deleted = await require('./models/reserva').deleteReservaPorId(id_reserva);
    if (deleted) {
      res.json({ success: true, reserva: deleted });
    } else {
      res.status(404).json({ success: false, message: 'Reserva no encontrada.' });
    }
  } catch (err) {
    console.error('Error al eliminar reserva:', err);
    res.status(500).json({ success: false, message: 'Error del servidor al eliminar reserva.' });
  }
});

// Endpoint para obtener notificaciones de un usuario
app.get('/api/notificaciones', async (req, res) => {
  try {
    const id_usuario = req.query.id_usuario;
    if (!id_usuario) return res.status(400).json({ success: false, message: 'id_usuario es requerido' });
    const result = await pool.query(`
      SELECT mensaje, fecha
      FROM notificaciones
      WHERE id_usuario = $1
      ORDER BY fecha DESC
      LIMIT 30
    `, [id_usuario]);
    const notificaciones = result.rows.map(row => ({
      mensaje: row.mensaje,
      fecha: row.fecha
    }));
    res.json({ success: true, notificaciones });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener notificaciones' });
  }
});

// Endpoint para obtener tipos de espacio
app.get('/api/tipos-espacio', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_tipo_espacio, nombre FROM tipo_espacio ORDER BY nombre ASC');
    res.json({ success: true, tipos: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener tipos de espacio' });
  }
});

// Crear tipo de espacio
app.post('/api/tipos-espacio', async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ success: false, message: 'Nombre requerido' });
  try {
    const result = await pool.query('INSERT INTO tipo_espacio (nombre) VALUES ($1) RETURNING *', [nombre]);
    res.json({ success: true, tipo: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al crear tipo de espacio' });
  }
});

// Crear sala (espacio)
app.post('/api/espacios', async (req, res) => {
  const { nombre, id_tipo_espacio } = req.body;
  if (!nombre || !id_tipo_espacio) return res.status(400).json({ success: false, message: 'Nombre e id_tipo_espacio requeridos' });
  try {
    const result = await pool.query('INSERT INTO espacio (nombre, id_tipo_espacio) VALUES ($1, $2) RETURNING *', [nombre, id_tipo_espacio]);
    res.json({ success: true, espacio: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al crear sala' });
  }
});

// Endpoint para obtener todos los espacios
app.get('/api/espacios', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_espacio, nombre, id_tipo_espacio FROM espacio ORDER BY id_espacio DESC');
    res.json({ success: true, espacios: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener espacios' });
  }
});

// Endpoint para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_usuario, nombre, codigo, id_tipo_usuario FROM usuario WHERE id_tipo_usuario IN (1,2,3) ORDER BY id_usuario DESC');
    res.json({ success: true, usuarios: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
  }
});

// Endpoint para crear usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, codigo, password, id_tipo_usuario } = req.body;
  if (!nombre || !codigo || !password || !id_tipo_usuario) {
    return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO usuario (nombre, codigo, password, id_tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, codigo, id_tipo_usuario',
      [nombre, codigo, password, id_tipo_usuario]
    );
    res.json({ success: true, usuario: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al crear usuario' });
  }
});

// Eliminar usuario por nombre y código (primero reservas, luego usuario)
app.delete('/api/usuarios', async (req, res) => {
  const { nombre, codigo } = req.body;
  if (!nombre || !codigo) {
    return res.status(400).json({ success: false, message: 'Nombre y código requeridos' });
  }
  try {
    // Buscar el usuario por nombre y código
    const result = await pool.query('SELECT id_usuario FROM usuario WHERE nombre = $1 AND codigo = $2', [nombre, codigo]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    const id_usuario = result.rows[0].id_usuario;
    // Eliminar reservas del usuario
    await pool.query('DELETE FROM reserva WHERE id_usuario = $1', [id_usuario]);
    // Eliminar el usuario
    const deleted = await require('./models/usuario').deleteUsuario(id_usuario);
    if (deleted) {
      res.json({ success: true, usuario: deleted });
    } else {
      res.status(500).json({ success: false, message: 'No se pudo eliminar el usuario' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
  }
});

// Eliminar sala por nombre y tipo de espacio (primero reservas, luego sala)
app.delete('/api/espacios', async (req, res) => {
  const { nombre, id_tipo_espacio } = req.body;
  if (!nombre || !id_tipo_espacio) {
    return res.status(400).json({ success: false, message: 'Nombre y tipo de espacio requeridos' });
  }

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN'); // Iniciar transacción

    // Verificar si existe el tipo de espacio
    const tipoResult = await client.query(
      'SELECT id_tipo_espacio FROM tipo_espacio WHERE id_tipo_espacio = $1',
      [id_tipo_espacio]
    );

    if (tipoResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Tipo de espacio no encontrado' });
    }

    // Buscar la sala por nombre y tipo de espacio
    const espacioResult = await client.query(
      'SELECT id_espacio FROM espacio WHERE nombre = $1 AND id_tipo_espacio = $2',
      [nombre, id_tipo_espacio]
    );

    if (espacioResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Sala no encontrada' });
    }

    const id_espacio = espacioResult.rows[0].id_espacio;

    // Eliminar primero las reservas asociadas
    const reservasResult = await client.query(
      'DELETE FROM reserva WHERE id_espacio = $1 RETURNING id_reserva',
      [id_espacio]
    );
    
    // Eliminar el espacio
    const espacioDeleteResult = await client.query(
      'DELETE FROM espacio WHERE id_espacio = $1 AND id_tipo_espacio = $2 RETURNING *',
      [id_espacio, id_tipo_espacio]
    );

    if (espacioDeleteResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(500).json({ success: false, message: 'No se pudo eliminar la sala' });
    }

    await client.query('COMMIT');
    
    res.json({ 
      success: true, 
      mensaje: 'Sala eliminada correctamente',
      espacio: espacioDeleteResult.rows[0],
      reservasEliminadas: reservasResult.rows.length
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al eliminar sala:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error al eliminar sala',
      error: err.message 
    });
  } finally {
    client.release();
  }
});

// Endpoint para gestión de reservas (admin, con filtros)
app.get('/api/reservas-admin', async (req, res) => {
  try {
    const { usuario, espacio, fecha } = req.query;
    let filtros = [];
    let valores = [];
    // Filtro por usuario (nombre o código)
    if (usuario) {
      filtros.push('(u.nombre ILIKE $' + (valores.length+1) + ' OR u.codigo ILIKE $' + (valores.length+1) + ')');
      valores.push(`%${usuario}%`);
    }
    // Filtro por espacio/sala
    if (espacio) {
      filtros.push('(e.nombre ILIKE $' + (valores.length+1) + ' OR te.nombre ILIKE $' + (valores.length+1) + ')');
      valores.push(`%${espacio}%`);
    }
    // Filtro por fecha
    if (fecha) {
      filtros.push('r.fecha = $' + (valores.length+1));
      valores.push(fecha);
    }
    let where = filtros.length ? 'WHERE ' + filtros.join(' AND ') : '';
    const query = `
      SELECT r.id_reserva, r.id_espacio, r.fecha, te.nombre AS tipo_espacio, e.nombre AS sala, u.nombre AS usuario, u.codigo, r.hora_inicio, r.hora_fin
      FROM reserva r
      JOIN espacio e ON r.id_espacio = e.id_espacio
      JOIN tipo_espacio te ON e.id_tipo_espacio = te.id_tipo_espacio
      JOIN usuario u ON r.id_usuario = u.id_usuario
      ${where}
      ORDER BY r.fecha DESC, r.hora_inicio DESC
      LIMIT 100
    `;
    const result = await pool.query(query, valores);
    res.json({ success: true, reservas: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener reservas' });
  }
});

// Actualizar espacio
app.put('/api/espacios/:id', async (req, res) => {
  console.log('1. Iniciando actualización de espacio');
  console.log('Datos recibidos:', { id: req.params.id, ...req.body });

  const { id } = req.params;
  const { nombre, id_tipo_espacio } = req.body;

  if (!nombre || !id_tipo_espacio) {
    console.log('2. Error: Faltan datos requeridos');
    return res.json({ success: false, message: 'Faltan datos requeridos' });
  }

  try {
    console.log('3. Verificando si el espacio existe');
    // Verificar si el espacio existe
    const espacioExistente = await pool.query('SELECT * FROM espacio WHERE id_espacio = $1', [id]);
    console.log('Resultado búsqueda espacio:', espacioExistente.rows);
    
    if (espacioExistente.rows.length === 0) {
      console.log('4. Error: Espacio no encontrado');
      return res.json({ success: false, message: 'Espacio no encontrado' });
    }

    console.log('5. Verificando si el tipo de espacio existe');
    // Verificar si el tipo de espacio existe
    const tipoExistente = await pool.query('SELECT * FROM tipo_espacio WHERE id_tipo_espacio = $1', [id_tipo_espacio]);
    console.log('Resultado búsqueda tipo:', tipoExistente.rows);
    
    if (tipoExistente.rows.length === 0) {
      console.log('6. Error: Tipo de espacio no válido');
      return res.json({ success: false, message: 'Tipo de espacio no válido' });
    }

    console.log('7. Verificando si el nombre ya existe');
    // Verificar si el nombre ya existe para otro espacio
    const espacioNombre = await pool.query('SELECT * FROM espacio WHERE nombre = $1 AND id_espacio != $2', [nombre, id]);
    console.log('Resultado búsqueda nombre duplicado:', espacioNombre.rows);
    
    if (espacioNombre.rows.length > 0) {
      console.log('8. Error: Nombre duplicado');
      return res.json({ success: false, message: 'Ya existe un espacio con ese nombre' });
    }

    console.log('9. Intentando actualizar el espacio');
    // Actualizar el espacio usando el modelo
    const espacioActualizado = await espacioModel.updateEspacio(id, { nombre, id_tipo_espacio });
    console.log('Resultado actualización:', espacioActualizado);
    
    if (espacioActualizado) {
      console.log('10. Éxito: Espacio actualizado correctamente');
      res.json({ success: true, message: 'Espacio actualizado correctamente', espacio: espacioActualizado });
    } else {
      console.log('11. Error: No se pudo actualizar el espacio');
      res.json({ success: false, message: 'No se pudo actualizar el espacio' });
    }
  } catch (error) {
    console.error('12. Error en el proceso de actualización:', error);
    console.error('Stack trace:', error.stack);
    res.json({ success: false, message: 'Error al actualizar el espacio', error: error.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

