// filepath: /reseruis-backend/reseruis-backend/src/db/tipo_espacio.js

const db = require('../database'); // Asegúrate de que la conexión a la base de datos esté configurada correctamente

// Obtener todos los tipos de espacio
const getTiposEspacio = async () => {
    const query = 'SELECT * FROM tipo_espacio';
    const result = await db.query(query);
    return result.rows;
};

// Agregar un nuevo tipo de espacio
const addTipoEspacio = async (tipoEspacio) => {
    const query = 'INSERT INTO tipo_espacio (nombre) VALUES ($1) RETURNING *';
    const values = [tipoEspacio.nombre];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar un tipo de espacio por ID
const deleteTipoEspacio = async (id_tipo_espacio) => {
    const query = 'DELETE FROM tipo_espacio WHERE id_tipo_espacio = $1 RETURNING *';
    const values = [id_tipo_espacio];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Actualizar un tipo de espacio por ID
const updateTipoEspacio = async (id_tipo_espacio, tipoEspacio) => {
    const query = 'UPDATE tipo_espacio SET nombre = $1 WHERE id_tipo_espacio = $2 RETURNING *';
    const values = [tipoEspacio.nombre, id_tipo_espacio];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getTiposEspacio,
    addTipoEspacio,
    deleteTipoEspacio,
    updateTipoEspacio
};