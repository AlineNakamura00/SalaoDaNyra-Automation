# FastAPI Cheat Sheet - Salão da Nyra

## Quick Reference para o Backend

### Estrutura de Projeto
```
backend/
├── main.py              # Entrada principal
├── config.py            # Configurações
├── routers/             # Rotas da API
├── services/            # Lógica de negócio
├── schemas/             # Validação Pydantic
├── models/              # Modelos DB (SQLAlchemy)
└── utils/               # Helpers
```

### Criar novo router

```python
# routers/agendamentos.py
from fastapi import APIRouter, HTTPException
from schemas.agendamentos import AgendamentoRequest, AgendamentoResponse

router = APIRouter(prefix="/agendamentos", tags=["agendamentos"])

@router.get("/{id}", response_model=AgendamentoResponse)
async def get_agendamento(id: int):
    # Lógica aqui
    return {"id": id}

# Em main.py:
from routers import agendamentos
app.include_router(agendamentos.router, prefix=settings.API_V1_PREFIX)
```

### Criar schema Pydantic

```python
# schemas/agendamentos.py
from pydantic import BaseModel, Field
from datetime import datetime

class AgendamentoRequest(BaseModel):
    cliente_id: int
    barbeiro_id: int
    data: datetime
    servico: str

class AgendamentoResponse(BaseModel):
    id: int
    cliente_id: int
    barbeiro_id: int
    data: datetime
    servico: str
```

### Usar variáveis de ambiente

```python
# Em config.py - já está configurado!
# Em qualquer arquivo:
from config import settings

api_key = settings.OPENROUTER_API_KEY
model = settings.DEFAULT_MODEL
```

### Dependency Injection

```python
# Definir dependência
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Usar em router
@router.get("/")
async def endpoint(db: Session = Depends(get_db)):
    # db está disponível
    pass
```

### Tratamento de Erros

```python
from fastapi import HTTPException

@router.get("/{id}")
async def get_item(id: int):
    if id < 0:
        raise HTTPException(status_code=400, detail="ID inválido")
    if id not in items:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return items[id]
```

### Chamadas Async

```python
import httpx

# Cliente HTTP async
async def call_external_api():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.exemplo.com")
        return response.json()
```

### CORS (já configurado!)

```python
# Já em main.py:
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Logging

```python
import logging

logger = logging.getLogger(__name__)

@router.get("/")
async def endpoint():
    logger.info("Requisição recebida")
    logger.error("Algo deu errado!")
    logger.debug("Informações de debug")
```

### Validação de Entrada

```python
from pydantic import BaseModel, Field, validator

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    temperature: float = Field(0.7, ge=0.0, le=1.0)
    
    @validator('message')
    def message_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Mensagem não pode estar vazia')
        return v
```

### Query Parameters

```python
@router.get("/search")
async def search(
    q: str,  # Obrigatório
    skip: int = 0,  # Opcional com padrão
    limit: int = 10,
    sort: str = "asc"
):
    return {
        "query": q,
        "skip": skip,
        "limit": limit,
        "sort": sort
    }
```

### Path Parameters

```python
@router.get("/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id}

@router.delete("/{item_id}")
async def delete_item(item_id: int, force: bool = False):
    return {"deleted": item_id, "force": force}
```

### POST com Body

```python
@router.post("/items")
async def create_item(item: ItemSchema):
    return item

# Múltiplos parâmetros
@router.post("/items2")
async def create_item2(
    item: ItemSchema,
    query_param: str = None,
    path_id: int = None
):
    pass
```

### File Upload

```python
from fastapi import UploadFile, File

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    return {
        "filename": file.filename,
        "size": len(contents)
    }
```

### Métodos HTTP

```python
@router.get("/items")      # GET - Obter
@router.post("/items")     # POST - Criar
@router.put("/items/{id}") # PUT - Substituir
@router.patch("/items/{id}") # PATCH - Atualizar parcial
@router.delete("/items/{id}") # DELETE - Deletar
```

### Response Models

```python
# Sempre especificar para documentação automática
@router.get("/items/{id}", response_model=ItemResponse, status_code=200)
async def get_item(id: int):
    return {"id": id, "name": "Item"}

# List de items
@router.get("/items", response_model=List[ItemResponse])
async def get_items():
    return [{"id": 1, "name": "Item1"}]
```

### Health Check (já implementado!)

```bash
# Verificar se API está rodando:
curl http://localhost:8000/health
# Resposta: {"status": "healthy", "environment": "development"}
```

### Teste com Python

```python
import httpx
import asyncio

async def test_api():
    async with httpx.AsyncClient() as client:
        response = await client.get("http://localhost:8000/health")
        print(response.json())

asyncio.run(test_api())
```
