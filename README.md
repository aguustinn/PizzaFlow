# 🍕 PizzaFlow - Arquitetura de Sistema Distribuído

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![.NET 8](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D.svg)](https://vuejs.org/)
[![Status](https://img.shields.io/badge/Status-Operacional-success.svg)]()

Projeto de prova de conceito (PoC) desenvolvido para a disciplina de Sistemas Distribuídos da Universidade Positivo. O objetivo é demonstrar, na prática, o funcionamento de microsserviços tolerantes a falhas, comunicação assíncrona, abstração de rotas e arquitetura poliglota.

## 👨‍💻 Autores
* **Agustin Floriano Penelas**
* **Agustin Lautaro Cancino**
* **Kleber Ludorf**

---

## 🏗️ Topologia e Componentes

O sistema foi desenhado para não possuir estado global (No Global State), utilizando bancos em memória independentes, e é composto por 5 componentes fundamentais:

1. **Frontend (Vue.js + Tailwind):** Interface do usuário em SPA (Single Page Application).
2. **API Gateway (Node.js):** Ponto único de entrada (Single Point of Entry). Roteia requisições e oculta a topologia da rede interna do cliente.
3. **Order Service (Node.js):** Microsserviço responsável por receber pedidos e orquestrar a fila.
4. **Kitchen Service (Node.js):** Microsserviço de processamento de pedidos. Funciona de forma assíncrona simulando tempo de preparo.
5. **Inventory Service (C# .NET 8):** Microsserviço responsável por gerenciar o estoque de ingredientes. Demonstra o pilar da **arquitetura poliglota**, onde serviços em linguagens diferentes cooperam via rede.

---

## 🚀 Acesso ao Projeto na Nuvem (Live Demo)

O sistema está implantado utilizando infraestrutura em nuvem pública (Render e Vercel), operando com recursos distribuídos.

* **Interface do Cliente (Frontend):** https://pizzaflow-frontend.vercel.app
* **API Gateway (Backend/Roteador):** https://pizzaflow-frontend.vercel.app

---

## 💻 Como rodar o ambiente localmente

Para testar a arquitetura na sua máquina, certifique-se de ter o **Node.js** e o **.NET 8 SDK** instalados.

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/pizzaflow.git](https://github.com/seu-usuario/pizzaflow.git)
cd pizzaflow
