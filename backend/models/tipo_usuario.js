// filepath: /reseruis-backend/reseruis-backend/src/db/tipo_usuario.js

const db = require('../database'); // Asegúrate de que la conexión a la base de datos esté configurada correctamente

const getTiposUsuario = async () => {
    const query = 'SELECT * FROM tipo_usuario';
    const result = await db.query(query);
    return result.rows;
};

const addTipoUsuario = async (tipoUsuario) => {
    const query = 'INSERT INTO tipo_usuario (nombre) VALUES ($1) RETURNING *';
    const values = [tipoUsuario.nombre];
    const result = await db.query(query, values);
    return result.rows[0];
};

const deleteTipoUsuario = async (id_tipo_usuario) => {
    const query = 'DELETE FROM tipo_usuario WHERE id_tipo_usuario = $1 RETURNING *';
    const values = [id_tipo_usuario];
    const result = await db.query(query, values);
    return result.rows[0];
};

const updateTipoUsuario = async (id_tipo_usuario, tipoUsuario) => {
    const query = 'UPDATE tipo_usuario SET nombre = $1 WHERE id_tipo_usuario = $2 RETURNING *';
    const values = [tipoUsuario.nombre, id_tipo_usuario];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getTiposUsuario,
    addTipoUsuario,
    deleteTipoUsuario,
    updateTipoUsuario
};