// Archivo que contiene las operaciones CRUD para la tabla `espacio`.

const db = require('../database'); // Asegúrate de tener un archivo de conexión a la base de datos

// Obtener todos los espacios
const getEspacios = async () => {
    const query = 'SELECT * FROM espacio';
    const result = await db.query(query);
    return result.rows;
};

// Agregar un nuevo espacio
const addEspacio = async (espacio) => {
    const query = 'INSERT INTO espacio (nombre, descripcion) VALUES ($1, $2) RETURNING *';
    const values = [espacio.nombre, espacio.descripcion];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar un espacio por ID
const deleteEspacio = async (id) => {
    const query = 'DELETE FROM espacio WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
};

// Actualizar un espacio por ID
const updateEspacio = async (id, espacio) => {
    const query = 'UPDATE espacio SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *';
    const values = [espacio.nombre, espacio.descripcion, id];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getEspacios,
    addEspacio,
    deleteEspacio,
    updateEspacio
};