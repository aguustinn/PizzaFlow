const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors()); // O Frontend vai bater aqui, então precisamos de CORS aqui

// URL interna do Order Service (Configurada na Nuvem)
const ORDER_SERVICE_URL = process.env.ORDER_URL || 'http://localhost:3001';
const INVENTORY_SERVICE_URL = process.env.INVENTORY_URL || 'http://localhost:8080';

// Rota interceptadora: Criar Pedido
app.post('/api/orders', async (req, res) => {
    try {
        console.log('[API Gateway] Redirecionando requisição POST para o Order Service...');
        
        // Repassa a requisição HTTP inteira para o microsserviço interno
        const response = await axios.post(`${ORDER_SERVICE_URL}/api/orders`, req.body);
        
        // Devolve a resposta do microsserviço diretamente para o Frontend
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('[API Gateway] Erro ao conectar com o Order Service:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Erro na comunicação interna do sistema.' });
    }
});

// Rota interceptadora: Listar Pedidos
app.get('/api/orders', async (req, res) => {
    try {
        console.log('[API Gateway] Redirecionando requisição GET para o Order Service...');
        
        const response = await axios.get(`${ORDER_SERVICE_URL}/api/orders`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('[API Gateway] Erro ao conectar com o Order Service:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Erro na comunicação interna do sistema.' });
    }
});

const PORT = process.env.PORT || 3000;

app.get('/api/inventory', async (req, res) => {
    try {
        console.log('[API Gateway] Solicitando estoque ao Inventory Service (C#)...');
        const response = await axios.get(`${INVENTORY_SERVICE_URL}/api/inventory`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Serviço de estoque indisponível.' });
    }
});

app.post('/api/inventory/consume', async (req, res) => {
    try {
        const response = await axios.post(`${INVENTORY_SERVICE_URL}/api/inventory/consume`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Erro ao consumir estoque.' });
    }
});

app.delete('/api/orders', async (req, res) => {
    try {
        const response = await axios.delete(`${ORDER_SERVICE_URL}/api/orders`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao limpar pedidos.' });
    }
});

app.listen(PORT, () => console.log(`🔏 API Gateway ativo na porta ${PORT}`));