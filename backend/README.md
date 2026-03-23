# Salão da Nyra - Backend

Backend em Python com FastAPI e integração com OpenRouter para IA.

## 🚀 Início Rápido

### 1. Criar ambiente virtual e instalar dependências

```bash
# Linux/Mac
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Windows
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e preencha com suas chaves:

```bash
cp .env.example .env
```

Ou crie um arquivo `.env` com:

```env
OPENROUTER_API_KEY=sua-chave-aqui
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
DEFAULT_MODEL=openai/gpt-4o
APP_ENV=development
```

### 3. Executar servidor

```bash
# Com recarga automática
uvicorn main:app --reload

# Ou executar main.py
python main.py
```

Acesse: `http://localhost:8000`
- API Docs: `http://localhost:8000/api/docs`
- ReDoc: `http://localhost:8000/api/redoc`

## 📁 Estrutura

```
backend/
├── .env                    # Variáveis de ambiente
├── .gitignore             # Arquivos ignorados pelo git
├── requirements.txt       # Dependências Python
├── config.py              # Configurações centralizadas
├── main.py               # Aplicação FastAPI principal
│
├── models/               # Modelos SQLAlchemy (futura DB)
├── schemas/              # Pydantic schemas (validação)
│   └── chat.py          # Schemas de chat
├── routers/              # FastAPI routers
│   └── chat.py          # Router de chat
├── services/             # Lógica de negócio
│   └── openrouter_client.py  # Cliente OpenRouter
└── utils/               # Funções auxiliares
```

## 🔌 Endpoints Principais

### POST `/api/v1/chat/simple`

Chat simples com IA, sem contexto de histórico.

**Request:**
```json
{
  "user_message": "Quero agendar um corte para amanhã",
  "temperature": 0.7,
  "max_tokens": 500
}
```

**Response:**
```json
{
  "response": "Ótimo! Posso ajudar você a agendar...",
  "model": "openai/gpt-4o"
}
```

### POST `/api/v1/chat/conversation`

Chat com histórico completo, permitindo contexto entre mensagens.

**Request:**
```json
{
  "messages": [
    {
      "role": "system",
      "content": "Você é um assistente de barbearia"
    },
    {
      "role": "user",
      "content": "Olá!"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

### GET `/api/v1/chat/available-models`

Lista modelos disponíveis na OpenRouter.

## 🧪 Testar com cURL

```bash
# Chat simples
curl -X POST "http://localhost:8000/api/v1/chat/simple" \
     -H "Content-Type: application/json" \
     -d '{"user_message": "Quero agendar um corte"}'

# Health check
curl http://localhost:8000/health

# Listar modelos
curl http://localhost:8000/api/v1/chat/available-models
```

## 🧠 Modelos Disponíveis na OpenRouter

```python
# OpenAI
"openai/gpt-4o"
"openai/gpt-4-turbo"
"openai/gpt-3.5-turbo"

# Anthropic Claude
"anthropic/claude-3.5-sonnet"
"anthropic/claude-3-opus"
"anthropic/claude-3-sonnet"
"anthropic/claude-3-haiku"

# Google
"google/gemini-2.0-flash"
"google/gemini-exp-1206"

# Meta Llama
"meta-llama/llama-3.1-405b"
"meta-llama/llama-3-70b"

# Mistral
"mistralai/mistral-large"
"mistralai/mistral-medium"
"mistralai/mistral-small"
```

## 🔐 Obtendo Chave de API

1. Acesse [openrouter.ai](https://openrouter.ai)
2. Sign up/Login
3. Vá para "Keys" → "Create Key"
4. Copie a chave e coloque no `.env`

## 📝 Próximos Passos

- [ ] Adicionar autenticação JWT
- [ ] Integrar com banco de dados (PostgreSQL)
- [ ] Criar modelos SQLAlchemy para Agendamentos, Clientes, etc.
- [ ] Implementar webhooks do WhatsApp
- [ ] Integração com Google Calendar
- [ ] Testes unitários com pytest
- [ ] Documentação Swagger melhorada

## 🐛 Debugging

### Ver logs detalhados

```bash
# O servidor já loga em DEBUG por padrão (APP_DEBUG=True no .env)
# Verifique o terminal onde está rodando uvicorn
```

### Verificar variáveis de ambiente

```python
# No Python:
from config import settings
print(settings.OPENROUTER_API_KEY)
print(settings.DEFAULT_MODEL)
```

## 📚 Referências

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Uvicorn Documentation](https://www.uvicorn.org/)

## 📄 Licença

Propriedade do Salão da Nyra
