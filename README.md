# 🎨 Salão da Nyra - Sistema de Automação

Sistema completo de agendamento e gestão para salão de beleza com IA integrada via OpenRouter.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológico](#stack-tecnológico)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Rodar](#como-rodar)
- [API Endpoints](#api-endpoints)
- [Banco de Dados](#banco-de-dados)
- [Documentação](#documentação)

---

## 🎯 Visão Geral

Plataforma integrada para gerenciar:
- ✅ **Clientes** - Cadastra e gerencia clientes
- ✅ **Serviços** - Cadastro de serviços oferecidos
- ✅ **Agendamentos** - Sistema de agendamento com inteligência
- ✅ **Planos** - Pacotes e planos de assinatura
- ✅ **Chat IA** - Assistente com OpenRouter (GPT-4o, Claude, etc)

---

## 🛠 Stack Tecnológico

### Backend
- **FastAPI 0.115.6** - Framework web moderno e rápido
- **Uvicorn 0.34.0** - ASGI server
- **SQLAlchemy 2.0.31** - ORM para banco de dados
- **Pydantic 2.8.2** - Validação de dados
- **httpx 0.28.1** - Cliente HTTP assíncrono
- **SQLite** - Banco de dados relacional

### Frontend
- **Next.js 15** - React framework full-stack
- **React 19** - UI library moderna
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 3.4** - Estilização utilitária
- **Recharts** - Gráficos e dados

---

## 📁 Estrutura do Projeto

```
SalaoDaNyra-Automation/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py          # Configuração do banco
│   │   ├── cliente.py           # Modelo de cliente
│   │   ├── servico.py           # Modelo de serviço
│   │   ├── agendamento.py       # Modelo de agendamento
│   │   └── plano.py             # Modelo de plano
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── chat.py              # Schemas de chat
│   │   ├── cliente.py           # Request/Response schemas
│   │   ├── servico.py
│   │   ├── agendamento.py
│   │   └── plano.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── chat.py              # Endpoints de chat com IA
│   │   ├── clientes.py          # CRUD de clientes
│   │   ├── servicos.py          # CRUD de serviços
│   │   ├── agendamentos.py      # CRUD de agendamentos
│   │   └── planos.py            # CRUD de planos
│   ├── services/
│   │   ├── __init__.py
│   │   └── openrouter_client.py # Cliente OpenRouter
│   ├── main.py                  # Aplicação FastAPI
│   ├── config.py                # Configurações
│   ├── requirements.txt          # Dependências core
│   ├── salao_nyra.db            # Banco de dados SQLite
│   ├── tests.py                 # Testes unitários
│   ├── README.md                # Documentação
│   └── CHEATSHEET.md            # Referência rápida
├── frontend/
│   ├── app/
│   │   ├── page.tsx             # Home/Dashboard
│   │   ├── layout.tsx           # Layout principal
│   │   ├── globals.css          # Estilos globais
│   │   ├── agenda/
│   │   ├── clientes/
│   │   ├── servicos/
│   │   ├── planos/
│   │   ├── relatorios/
│   │   └── configuracoes/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   ├── package.json
│   └── next.config.ts
├── README.md                    # Este arquivo
└── SETUP_COMPLETO.ps1          # Setup automatizado
```

---

## ⚙️ Instalação

### Pré-requisitos
- Python 3.10+
- Node.js 18+

### 1️⃣ Backend

```bash
cd backend

# Criar venv
python -m venv venv

# Ativar (Windows)
.\venv\Scripts\Activate.ps1

# Ativar (Mac/Linux)
source venv/bin/activate

# Instalar
pip install -r requirements.txt
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
```

---

## 🔧 Configuração

### Backend `.env`

```env
# OpenRouter (Obrigatório)
OPENROUTER_API_KEY=seu-api-key-aqui
DEFAULT_MODEL=openai/gpt-4o

# Application
APP_ENV=development
APP_DEBUG=True

# Database
DATABASE_URL=sqlite:///./salao_nyra.db

# CORS
CORS_ORIGINS=["http://localhost:3000", "http://localhost:8000"]
```

**Como obter chave:** https://openrouter.ai

---

## 🚀 Como Rodar

### Backend
```bash
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload
```
→ **http://localhost:8000/api/docs**

### Frontend
```bash
cd frontend
npm run dev
```
→ **http://localhost:3000**

---

## 📡 API Endpoints

### 🗣️ Chat
- `POST /api/v1/chat/simple` - Chat simples
- `POST /api/v1/chat/conversation` - Com histórico
- `GET /api/v1/chat/available-models` - Listar modelos

### 👥 Clientes
- `POST /api/v1/clientes` - Criar
- `GET /api/v1/clientes` - Listar
- `GET /api/v1/clientes/{id}` - Obter
- `PUT /api/v1/clientes/{id}` - Atualizar
- `DELETE /api/v1/clientes/{id}` - Deletar

### 💇 Serviços
- `POST /api/v1/servicos` - Criar
- `GET /api/v1/servicos` - Listar
- `GET /api/v1/servicos/{id}` - Obter
- `PUT /api/v1/servicos/{id}` - Atualizar
- `DELETE /api/v1/servicos/{id}` - Deletar

### 📅 Agendamentos
- `POST /api/v1/agendamentos` - Criar
- `GET /api/v1/agendamentos` - Listar
- `POST /api/v1/agendamentos/{id}/confirmar` - Confirmar
- `DELETE /api/v1/agendamentos/{id}` - Cancelar

### 💰 Planos
- `POST /api/v1/planos` - Criar
- `GET /api/v1/planos` - Listar
- `PUT /api/v1/planos/{id}` - Atualizar
- `DELETE /api/v1/planos/{id}` - Deletar

---

## 🗄️ Banco de Dados

**Tipo:** SQLite (relacional, sem servidor)

**Arquivo:** `backend/salao_nyra.db`

**Tabelas:**
- ✅ clientes (nome, telefone, email, etc)
- ✅ servicos (nome, preco, duracao)
- ✅ agendamentos (cliente, servico, data, status)
- ✅ planos (nome, preco_mensal, desconto)

**Migrar para PostgreSQL:**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/salao_nyra
```

---

## 📚 Documentação

- **Swagger UI:** http://localhost:8000/api/docs
- **ReDoc:** http://localhost:8000/api/redoc
- **[backend/README.md](backend/README.md)** - Full docs

---

## 🧪 Testes

```bash
cd backend
pytest tests.py -v
```

---

## 🎉 Status

🟢 **Sistema 100% funcional!**
- ✅ Backend rodando
- ✅ Frontend rodando
- ✅ BD criado
- ✅ Todos endpoints disponíveis
