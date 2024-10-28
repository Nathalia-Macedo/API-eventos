// routes/usuarios.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nath_dev',
    password: '7335343707nath!',
    database: 'eventos',
    port: 3306
});

// Rota para obter todos os usuários
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para adicionar um novo usuário com senha criptografada
router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Gera um hash da senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        // Armazena o hash em vez da senha
        db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
            [nome, email, hashedPassword], 
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: results.insertId, nome, email });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um usuário com senha criptografada
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        // Gera um hash da nova senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        db.query(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, hashedPassword, id],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: 'Usuário não encontrado.' });
                }
                res.json({ id, nome, email });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar um usuário
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(204).send();
    });
});

module.exports = router;
