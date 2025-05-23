// filepath: /reseruis-backend/reseruis-backend/src/db/usuario.js

const db = require('../database'); // Asegúrate de tener un archivo de conexión a la base de datos

// Obtener todos los usuarios
const getUsuarios = async () => {
    const query = 'SELECT * FROM usuario';
    const result = await db.query(query);
    return result.rows;
};

// Agregar un nuevo usuario
const addUsuario = async (usuario) => {
    const { nombre, email, tipo_usuario } = usuario;
    const query = 'INSERT INTO usuario (nombre, email, tipo_usuario) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, email, tipo_usuario];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar un usuario
const deleteUsuario = async (id) => {
    const query = 'DELETE FROM usuario WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
};

// Actualizar un usuario
const updateUsuario = async (id, usuario) => {
    const { nombre, email, tipo_usuario } = usuario;
    const query = 'UPDATE usuario SET nombre = $1, email = $2, tipo_usuario = $3 WHERE id = $4 RETURNING *';
    const values = [nombre, email, tipo_usuario, id];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getUsuarios,
    addUsuario,
    deleteUsuario,
    updateUsuario
};