// routes/itens_pacotes.js
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

// Rota para obter todos os itens de pacotes
router.get('/', (req, res) => {
    db.query('SELECT * FROM itens_pacotes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para obter um item de pacote por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM itens_pacotes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Item de pacote não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo item a um pacote
router.post('/', (req, res) => {
    const { pacote_id, servico_id, quantidade } = req.body;
    db.query('INSERT INTO itens_pacotes (pacote_id, servico_id, quantidade) VALUES (?, ?, ?)', 
             [pacote_id, servico_id, quantidade], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, pacote_id, servico_id, quantidade });
    });
});

// Rota para atualizar um item de pacote
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { pacote_id, servico_id, quantidade } = req.body;
    db.query('UPDATE itens_pacotes SET pacote_id = ?, servico_id = ?, quantidade = ? WHERE id = ?', 
             [pacote_id, servico_id, quantidade, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item de pacote não encontrado' });
        }
        res.json({ message: 'Item de pacote atualizado com sucesso' });
    });
});

// Rota para deletar um item de pacote
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM itens_pacotes WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item de pacote não encontrado' });
        }
        res.json({ message: 'Item de pacote deletado com sucesso' });
    });
});

module.exports = router;
