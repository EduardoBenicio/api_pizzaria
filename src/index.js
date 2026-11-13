
import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// IMPORTAÇÃO DAS ROTAS
import authRoutes from './routes/authRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import itemPedidoRoutes from './routes/itempedidoRoutes.js';
import entregadorRoutes from './routes/entregadorRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';

// CONFIGURAÇÕES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: [
        'http://localhost:3333',
        'https://meudominio.com'
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true
};

// INICIALIZAÇÃO DO EXPRESS
const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// ARQUIVOS ESTÁTICOS
app.use(express.static(
    path.join(__dirname, '..', 'public')
));

// ROTA PRINCIPAL
app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '..', 'pages', 'home.html')
    );
});

// ROTAS DA API
const apiPrefix = '/api';

// Itens do pedido
app.use(`${apiPrefix}/itempedido`, itemPedidoRoutes);

// Entregadores
app.use(`${apiPrefix}/entregador`, entregadorRoutes);

// Clientes
app.use(`${apiPrefix}/clientes`, clienteRoutes);

// Login
app.use(`${apiPrefix}/login`, authRoutes);

// Produtos
app.use(`${apiPrefix}/produtos`, produtoRoutes);

// Pedidos
app.use(`${apiPrefix}/pedidos`, pedidoRoutes);

// ROTA NÃO ENCONTRADA
app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    });
});

// TRATAMENTO DE ERROS
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        erro: 'Erro interno do servidor'
    });
});

// INICIALIZAÇÃO DO SERVIDOR
const PORTA = process.env.PORT || 3333;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
