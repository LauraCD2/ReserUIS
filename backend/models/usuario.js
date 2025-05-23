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
    const { nombre, codigo, password, id_tipo_usuario } = usuario;
    const query = 'INSERT INTO usuario (nombre, codigo, password, id_tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nombre, codigo, password, id_tipo_usuario];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar un usuario
const deleteUsuario = async (id_usuario) => {
    const query = 'DELETE FROM usuario WHERE id_usuario = $1 RETURNING *';
    const result = await db.query(query, [id_usuario]);
    return result.rows[0];
};

// Actualizar un usuario
const updateUsuario = async (id_usuario, usuario) => {
    const { nombre, codigo, password, id_tipo_usuario } = usuario;
    const query = 'UPDATE usuario SET nombre = $1, codigo = $2, password = $3, id_tipo_usuario = $4 WHERE id_usuario = $5 RETURNING *';
    const values = [nombre, codigo, password, id_tipo_usuario, id_usuario];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getUsuarios,
    addUsuario,
    deleteUsuario,
    updateUsuario
};