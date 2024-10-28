const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const usuariosRouter = require('../routes/usuarios'); // Importa as rotas de usuários
const servicosRouter = require('../routes/servicos'); // Importa as rotas de serviços
const pacotesRouter = require('../routes/pacotes'); // Importa as rotas de pacotes
const eventosRouter = require("../routes/eventos");
const reservasRouter = require('../routes/reservas');
const itens_pacotesRouter = require("../routes/itens_pacotes");
const fornecedoresRouter = require("../routes/fornecedores");

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta para o servidor

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Carregar a documentação Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

// Usar o Swagger em uma rota específica
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Usar as rotas da API
app.use('/api/usuarios', usuariosRouter);
app.use('/api/servicos', servicosRouter);
app.use('/api/pacotes', pacotesRouter);
app.use('/api/eventos', eventosRouter);
app.use('/api/reservas', reservasRouter);
app.use('/api/itens_pacotes', itens_pacotesRouter);
app.use('/api/fornecedores', fornecedoresRouter);

// Rota raiz para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
