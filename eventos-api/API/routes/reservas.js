// routes/reservas.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nath_dev',
    password: '7335343707nath!',
    database: 'eventos',
    port: 3306
});

// Rota para obter todas as reservas
router.get('/', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para obter uma reserva por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM reservas WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Reserva não encontrada' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar uma nova reserva
router.post('/', (req, res) => {
    const { usuario_id, pacote_id, data_reserva, status } = req.body;
    db.query('INSERT INTO reservas (usuario_id, pacote_id, data_reserva, status) VALUES (?, ?, ?, ?)', 
             [usuario_id, pacote_id, data_reserva, status], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, usuario_id, pacote_id, data_reserva, status });
    });
});

// Rota para atualizar uma reserva
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { usuario_id, pacote_id, data_reserva, status } = req.body;
    db.query('UPDATE reservas SET usuario_id = ?, pacote_id = ?, data_reserva = ?, status = ? WHERE id = ?', 
             [usuario_id, pacote_id, data_reserva, status, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Reserva não encontrada' });
        }
        res.json({ message: 'Reserva atualizada com sucesso' });
    });
});

// Rota para deletar uma reserva
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM reservas WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Reserva não encontrada' });
        }
        res.json({ message: 'Reserva deletada com sucesso' });
    });
});

module.exports = router;
