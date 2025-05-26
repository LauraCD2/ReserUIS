// Archivo que contiene las operaciones CRUD para la tabla `espacio`.

const db = require('../database');

// Obtener todos los espacios
const getEspacios = async () => {
    console.log('Model: Obteniendo todos los espacios');
    const result = await db.query('SELECT * FROM espacio');
    console.log('Model: Espacios obtenidos:', result.rows);
    return result.rows;
};

// Agregar un nuevo espacio
const addEspacio = async (espacio) => {
    console.log('Model: Agregando nuevo espacio:', espacio);
    const result = await db.query(
        'INSERT INTO espacio (nombre, id_tipo_espacio) VALUES ($1, $2) RETURNING *',
        [espacio.nombre, espacio.id_tipo_espacio]
    );
    console.log('Model: Espacio agregado:', result.rows[0]);
    return result.rows[0];
};

// Eliminar un espacio por ID
const deleteEspacio = async (id_espacio) => {
    console.log('Model: Eliminando espacio:', id_espacio);
    const result = await db.query('DELETE FROM espacio WHERE id_espacio = $1 RETURNING *', [id_espacio]);
    console.log('Model: Espacio eliminado:', result.rows[0]);
    return result.rows[0];
};

// Actualizar un espacio por ID
const updateEspacio = async (id_espacio, espacio) => {
    console.log('Model: Actualizando espacio:', { id_espacio, ...espacio });
    try {
        const result = await db.query(
            'UPDATE espacio SET nombre = $1, id_tipo_espacio = $2 WHERE id_espacio = $3 RETURNING *',
            [espacio.nombre, espacio.id_tipo_espacio, id_espacio]
        );
        console.log('Model: Resultado de actualización:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Model: Error al actualizar espacio:', error);
        throw error;
    }
};

module.exports = {
    getEspacios,
    addEspacio,
    deleteEspacio,
    updateEspacio
};