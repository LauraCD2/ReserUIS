// Archivo que contiene las operaciones CRUD para la tabla `espacio`.

const db = require('../database');

// Obtener todos los espacios
const getEspacios = async () => {
    const query = 'SELECT * FROM espacio';
    const result = await db.query(query);
    return result.rows;
};

// Agregar un nuevo espacio
const addEspacio = async (espacio) => {
    const query = 'INSERT INTO espacio (nombre, id_tipo_espacio) VALUES ($1, $2) RETURNING *';
    const values = [espacio.nombre, espacio.id_tipo_espacio];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar un espacio por ID
const deleteEspacio = async (id_espacio) => {
    const query = 'DELETE FROM espacio WHERE id_espacio = $1 RETURNING *';
    const result = await db.query(query, [id_espacio]);
    return result.rows[0];
};

// Actualizar un espacio por ID
const updateEspacio = async (id_espacio, espacio) => {
    const query = 'UPDATE espacio SET nombre = $1, id_tipo_espacio = $2 WHERE id_espacio = $3 RETURNING *';
    const values = [espacio.nombre, espacio.id_tipo_espacio, id_espacio];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getEspacios,
    addEspacio,
    deleteEspacio,
    updateEspacio
};