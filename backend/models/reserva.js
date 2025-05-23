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
    const query = 'INSERT INTO reserva (id_espacio, id_usuario, fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id_espacio, id_usuario, fecha, hora_inicio, hora_fin];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Delete a reserva by ID
const deleteReserva = async (id_reserva) => {
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

module.exports = {
    getReservas,
    addReserva,
    deleteReserva,
    updateReserva
};