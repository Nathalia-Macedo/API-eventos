// routes/pacotes.js
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

// Rota para obter todos os pacotes
router.get('/', (req, res) => {
    db.query('SELECT * FROM pacotes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para obter um pacote por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM pacotes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pacote não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo pacote
router.post('/', (req, res) => {
    const { nome, usuario_id, evento_id, custo_total } = req.body;
    db.query('INSERT INTO pacotes (nome, usuario_id, evento_id, custo_total) VALUES (?, ?, ?, ?)', 
             [nome, usuario_id, evento_id, custo_total], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nome, usuario_id, evento_id, custo_total });
    });
});

// Rota para atualizar um pacote
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, usuario_id, evento_id, custo_total } = req.body;
    db.query('UPDATE pacotes SET nome = ?, usuario_id = ?, evento_id = ?, custo_total = ? WHERE id = ?', 
             [nome, usuario_id, evento_id, custo_total, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pacote não encontrado' });
        }
        res.json({ message: 'Pacote atualizado com sucesso' });
    });
});

// Rota para deletar um pacote
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pacotes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pacote não encontrado' });
        }
        res.json({ message: 'Pacote deletado com sucesso' });
    });
});

module.exports = router;
