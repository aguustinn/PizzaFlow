# 🍕 PizzaFlow - Sistema Distribuído Acadêmico

O **PizzaFlow** é uma prova de conceito (PoC) desenvolvida para a disciplina de Sistemas Distribuídos. O objetivo do projeto é demonstrar, na prática, o funcionamento de microsserviços tolerantes a falhas, comunicação assíncrona, abstração de rotas e arquitetura poliglota.

## 🏗️ Arquitetura do Sistema

O sistema foi desenhado sem estado global (bancos em memória) e é composto por 5 peças fundamentais:

1. **Frontend (Vue.js + Tailwind):** Interface do usuário (SPA).
2. **API Gateway (Node.js):** Ponto único de entrada. Roteia requisições e oculta a topologia da rede interna.
3. **Order Service (Node.js):** Recebe e gerencia os pedidos.
4. **Kitchen Service (Node.js):** Processa os pedidos de forma assíncrona (simulando tempo de preparo).
5. **Inventory Service (C# .NET 8):** Gerencia o estoque de ingredientes, demonstrando uma **arquitetura poliglota**.

## 🚀 Acesso ao Projeto (Live Demo)

O sistema está publicado utilizando infraestrutura 100% em nuvem (Render e Vercel):
- **Frontend (Acesse aqui para testar):** https://pizzaflow-frontend.vercel.app/
- **API Gateway Base URL:** https://pizzaflow-gateway.onrender.com

## 💻 Como rodar localmente

Certifique-se de ter o **Node.js** e o **.NET 8 SDK** instalados na sua máquina.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/pizzaflow.git](https://github.com/seu-usuario/pizzaflow.git)
   cd pizzaflow
