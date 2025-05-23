// This file contains the CRUD operations for the 'reserva' table.
// It exports functions to interact with the database for reservations.

const db = require('../database'); // Adjust the path as necessary for your database connection

// Get all reservas
const getReservas = async () => {
    const query = 'SELECT * FROM reserva';
    const result = await db.query(query);
    return result.rows;
};

// Add a new reserva
const addReserva = async (reservaData) => {
    const { id_espacio, id_usuario, fecha, hora_inicio, hora_fin } = reservaData;
    // El insert debe ser en el orden correcto: id_usuario, id_espacio, fecha, hora_inicio, hora_fin
    const query = 'INSERT INTO reserva (id_usuario, id_espacio, fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id_usuario, id_espacio, fecha, hora_inicio, hora_fin];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar una reserva por id_espacio
const deleteReservaPorEspacio = async (id_espacio) => {
    const query = 'DELETE FROM reserva WHERE id_espacio = $1 RETURNING *';
    const result = await db.query(query, [id_espacio]);
    return result.rows[0];
};

// Eliminar una reserva por id_reserva
const deleteReservaPorId = async (id_reserva) => {
    const query = 'DELETE FROM reserva WHERE id_reserva = $1 RETURNING *';
    const result = await db.query(query, [id_reserva]);
    return result.rows[0];
};

// Update a reserva by ID
const updateReserva = async (id_reserva, reservaData) => {
    const { id_espacio, id_usuario, fecha, hora_inicio, hora_fin } = reservaData;
    const query = 'UPDATE reserva SET id_espacio = $1, id_usuario = $2, fecha = $3, hora_inicio = $4, hora_fin = $5 WHERE id_reserva = $6 RETURNING *';
    const values = [id_espacio, id_usuario, fecha, hora_inicio, hora_fin, id_reserva];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Obtener reservas con detalles completos para historial de un usuario
const getReservasConDetallesPorUsuario = async (id_usuario) => {
    const query = `
        SELECT r.id_reserva, r.id_espacio, r.fecha, te.nombre AS tipo_espacio, e.nombre AS sala, u.nombre AS usuario, r.hora_inicio, r.hora_fin
        FROM reserva r
        JOIN espacio e ON r.id_espacio = e.id_espacio
        JOIN tipo_espacio te ON e.id_tipo_espacio = te.id_tipo_espacio
        JOIN usuario u ON r.id_usuario = u.id_usuario
        WHERE CAST(r.id_usuario AS TEXT) = $1
        ORDER BY r.fecha DESC, r.hora_inicio DESC
    `;
    const result = await db.query(query, [id_usuario]);
    return result.rows;
};

module.exports = {
    getReservas,
    addReserva,
    updateReserva,
    getReservasConDetallesPorUsuario,
    deleteReservaPorEspacio,
    deleteReservaPorId 
};