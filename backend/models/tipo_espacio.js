// filepath: /reseruis-backend/reseruis-backend/src/db/tipo_espacio.js

const db = require('../database'); // Asegúrate de que la conexión a la base de datos esté configurada correctamente

// Obtener todos los tipos de espacio
const getTiposEspacio = async () => {
    const result = await db.query('SELECT * FROM tipo_espacio');
    return result.rows;
};

// Agregar un nuevo tipo de espacio
const addTipoEspacio = async (tipoEspacio) => {
    const result = await db.query(
        'INSERT INTO tipo_espacio (nombre) VALUES ($1) RETURNING *',
        [tipoEspacio.nombre]
    );
    return result.rows[0];
};

// Eliminar un tipo de espacio por ID
const deleteTipoEspacio = async (id_tipo_espacio) => {
    const result = await db.query('DELETE FROM tipo_espacio WHERE id_tipo_espacio = $1 RETURNING *', [id_tipo_espacio]);
    return result.rows[0];
};

// Actualizar un tipo de espacio por ID
const updateTipoEspacio = async (id_tipo_espacio, tipoEspacio) => {
    const result = await db.query(
        'UPDATE tipo_espacio SET nombre = $1 WHERE id_tipo_espacio = $2 RETURNING *',
        [tipoEspacio.nombre, id_tipo_espacio]
    );
    return result.rows[0];
};

module.exports = {
    getTiposEspacio,
    addTipoEspacio,
    deleteTipoEspacio,
    updateTipoEspacio
};