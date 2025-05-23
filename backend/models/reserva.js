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
    const { espacioId, usuarioId, fecha, horaInicio, horaFin } = reservaData;
    const query = 'INSERT INTO reserva (espacio_id, usuario_id, fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [espacioId, usuarioId, fecha, horaInicio, horaFin];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Delete a reserva by ID
const deleteReserva = async (id) => {
    const query = 'DELETE FROM reserva WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
};

// Update a reserva by ID
const updateReserva = async (id, reservaData) => {
    const { espacioId, usuarioId, fecha, horaInicio, horaFin } = reservaData;
    const query = 'UPDATE reserva SET espacio_id = $1, usuario_id = $2, fecha = $3, hora_inicio = $4, hora_fin = $5 WHERE id = $6 RETURNING *';
    const values = [espacioId, usuarioId, fecha, horaInicio, horaFin, id];
    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getReservas,
    addReserva,
    deleteReserva,
    updateReserva
};