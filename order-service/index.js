const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

// Simulação de Banco de Dados
let orders = [];

// Variável de ambiente para conectar com a cozinha (Local ou Nuvem)
const KITCHEN_SERVICE_URL = process.env.KITCHEN_URL || 'http://localhost:3002';

app.post('/api/orders', async (req, res) => {
    const { customer, item } = req.body;
    
    const newOrder = {
        id: Math.floor(Math.random() * 10000),
        customer,
        item,
        status: 'Recebido'
    };
    
    orders.push(newOrder);
    console.log(`[Order Service] Pedido ${newOrder.id} salvo no banco.`);

    // Comunicação Assíncrona com o Kitchen Service
    // Se a cozinha cair, o cliente ainda consegue fazer o pedido (Tolerância a Falhas)
    axios.post(`${KITCHEN_SERVICE_URL}/api/process`, { orderId: newOrder.id })
        .then(() => console.log(`[Order Service] Pedido ${newOrder.id} enviado para a cozinha.`))
        .catch(() => console.error(`[Order Service] Cozinha indisponível. Pedido ${newOrder.id} na fila de espera.`));

    res.status(201).json({ message: 'Pedido registrado com sucesso!', order: newOrder });
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Webhook para a cozinha atualizar o status do pedido
app.post('/api/orders/update', (req, res) => {
    const { orderId, status } = req.body;
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        console.log(`[Order Service] Pedido ${orderId} atualizado para: ${status}`);
    }
    res.sendStatus(200);
});

app.delete('/api/orders', (req, res) => {
    orders = []; // Zera o array em memória
    console.log('[Order Service] Banco de dados em memória limpo!');
    res.status(200).json({ message: 'Todos os pedidos foram apagados.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🍕 Order Service rodando na porta ${PORT}`));