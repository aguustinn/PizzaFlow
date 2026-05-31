const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// URL do Order Service para devolver o status
const ORDER_SERVICE_URL = process.env.ORDER_URL || 'http://localhost:3001';

app.post('/api/process', (req, res) => {
    const { orderId } = req.body;
    console.log(`[Kitchen Service] Iniciando preparo do pedido ${orderId}...`);
    
    // Responde rapidamente para não travar a rede
    res.status(202).json({ message: 'Preparo iniciado' });

    // Simula o tempo de processamento distribuído (ex: 10 segundos)
    setTimeout(async () => {
        try {
            await axios.post(`${ORDER_SERVICE_URL}/api/orders/update`, {
                orderId: orderId,
                status: 'Pronto para Retirada'
            });
            console.log(`[Kitchen Service] Pedido ${orderId} finalizado e notificado.`);
        } catch (error) {
            console.error(`[Kitchen Service] Falha ao notificar o Order Service.`);
        }
    }, 10000);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`👨‍🍳 Kitchen Service rodando na porta ${PORT}`));