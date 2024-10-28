// routes/fornecedores.js
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

// Rota para obter todos os fornecedores
router.get('/', (req, res) => {
    db.query('SELECT * FROM fornecedores', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para obter um fornecedor por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM fornecedores WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo fornecedor
router.post('/', (req, res) => {
    const { nome, contato, tipo_servico, disponibilidade } = req.body;
    db.query('INSERT INTO fornecedores (nome, contato, tipo_servico, disponibilidade) VALUES (?, ?, ?, ?)', 
             [nome, contato, tipo_servico, disponibilidade], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nome, contato, tipo_servico, disponibilidade });
    });
});

// Rota para atualizar um fornecedor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, contato, tipo_servico, disponibilidade } = req.body;
    db.query('UPDATE fornecedores SET nome = ?, contato = ?, tipo_servico = ?, disponibilidade = ? WHERE id = ?', 
             [nome, contato, tipo_servico, disponibilidade, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.json({ message: 'Fornecedor atualizado com sucesso' });
    });
});

// Rota para deletar um fornecedor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM fornecedores WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.json({ message: 'Fornecedor deletado com sucesso' });
    });
});

module.exports = router;
