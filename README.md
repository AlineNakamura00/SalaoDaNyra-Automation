# Salão da Nyra - Sistema de Automação

Automação *cabulosa* de salão de beleza com front-end no React, back-end Node.js, n8n para workflows inteligentes e MySQL, tudo orquestrado pela sua *divina* Nyra! 💅✨

## 📁 Estrutura do Projeto

```
Salão da Nyra/
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── public/
│   └── package.json
├── backend/               # API Node.js/Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── config/
│   ├── .env
│   └── package.json
├── n8n/                   # Workflows de automação
│   ├── workflows/
│   │   ├── whatsapp_agent.json
│   │   └── booking_flow.json
│   └── credentials/
├── database/              # Scripts SQL e Docker
│   ├── migrations/
│   │   ├── 001_create_tables.sql
│   │   └── 002_add_appointments.sql
│   ├── seed/
│   └── docker-compose.yml
├── docs/                  # Documentação
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Docker & Docker Compose
- MySQL (ou use Docker)

### Setup Backend
```bash
cd backend
npm install
npm run dev
```

### Setup Frontend
```bash
cd frontend
npm install
npm start
```

### Setup Database
```bash
cd database
docker-compose up -d
```

## 📋 Features
- 💅 Dashboard para gerenciamento de agendamentos
- 📱 Integração com WhatsApp via n8n
- 👥 Gerenciamento de clientes e profissionais
- ⭐ Sistema de avaliações de serviços
- 📊 Histórico completo de agendamentos
- 🔐 Autenticação segura
- 🗓️ Agendamento inteligente com validação

## 🔧 Technology Stack
- **Frontend**: React 18, CSS3
- **Backend**: Node.js + Express
- **Database**: MySQL 8.0 com Docker
- **Automation**: n8n
- **Containerization**: Docker & Docker Compose
- **API**: RESTful

## 📝 License
MIT
