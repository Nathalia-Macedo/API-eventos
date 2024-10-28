// routes/servicos.js
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

// Rota para obter todos os serviços
router.get('/', (req, res) => {
    db.query('SELECT * FROM servicos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para adicionar um novo serviço
router.post('/', (req, res) => {
    const { nome, descricao, preco } = req.body;
    db.query('INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?)', [nome, descricao, preco], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, nome, descricao, preco });
    });
});

// Rota para atualizar um serviço
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nome, descricao, preco } = req.body;

    db.query(
        'UPDATE servicos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
        [nome, descricao, preco, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Serviço não encontrado' });
            }
            res.status(200).json({ id, nome, descricao, preco });
        }
    );
});

// Rota para deletar um serviço
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM servicos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Serviço não encontrado' });
        }
        res.status(204).send(); // Sem conteúdo para resposta de deleção bem-sucedida
    });
});

module.exports = router;
