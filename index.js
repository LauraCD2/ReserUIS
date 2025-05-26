const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservuis',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Actualizar espacio
app.put('/api/espacios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, id_tipo_espacio } = req.body;

  if (!nombre || !id_tipo_espacio) {
    return res.json({ success: false, message: 'Faltan datos requeridos' });
  }

  try {
    // Verificar si el espacio existe
    const [espacioExistente] = await pool.query('SELECT * FROM espacio WHERE id_espacio = ?', [id]);
    if (espacioExistente.length === 0) {
      return res.json({ success: false, message: 'Espacio no encontrado' });
    }

    // Verificar si el tipo de espacio existe
    const [tipoExistente] = await pool.query('SELECT * FROM tipo_espacio WHERE id_tipo_espacio = ?', [id_tipo_espacio]);
    if (tipoExistente.length === 0) {
      return res.json({ success: false, message: 'Tipo de espacio no válido' });
    }

    // Verificar si el nombre ya existe para otro espacio
    const [espacioNombre] = await pool.query('SELECT * FROM espacio WHERE nombre = ? AND id_espacio != ?', [nombre, id]);
    if (espacioNombre.length > 0) {
      return res.json({ success: false, message: 'Ya existe un espacio con ese nombre' });
    }

    // Actualizar el espacio
    await pool.query('UPDATE espacio SET nombre = ?, id_tipo_espacio = ? WHERE id_espacio = ?', [nombre, id_tipo_espacio, id]);
    res.json({ success: true, message: 'Espacio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar espacio:', error);
    res.json({ success: false, message: 'Error al actualizar el espacio' });
  }
});

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 