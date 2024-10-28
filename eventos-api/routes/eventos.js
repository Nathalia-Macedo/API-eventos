// routes/eventos.js
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

// Rota para obter todos os eventos
router.get('/', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para obter um evento por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM events WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo evento
router.post('/', (req, res) => {
    const { nome, data, local, usuario_id } = req.body;
    db.query('INSERT INTO events (nome, data, local, usuario_id) VALUES (?, ?, ?, ?)', 
             [nome, data, local, usuario_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nome, data, local, usuario_id });
    });
});

// Rota para atualizar um evento
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, data, local, usuario_id } = req.body;
    db.query('UPDATE events SET nome = ?, data = ?, local = ?, usuario_id = ? WHERE id = ?', 
             [nome, data, local, usuario_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json({ message: 'Evento atualizado com sucesso' });
    });
});

// Rota para deletar um evento
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM events WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json({ message: 'Evento deletado com sucesso' });
    });
});

module.exports = router;
