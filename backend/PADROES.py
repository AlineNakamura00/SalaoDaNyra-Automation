"""
Guia Prático: Como Expandir o Backend
Este arquivo mostra padrões e exemplos práticos.
"""

# ============================================================================
# 1. CRIANDO UM NOVO ROUTER
# ============================================================================

"""
Passo 1: Criar arquivo em routers/clientes.py
"""

exemplo_novo_router = """
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/clientes", tags=["clientes"])

class ClienteRequest(BaseModel):
    nome: str
    telefone: str
    email: str = None

@router.post("", status_code=201)
async def criar_cliente(request: ClienteRequest):
    # Implementar lógica
    return {"id": 1, **request.dict()}

@router.get("/{cliente_id}")
async def obter_cliente(cliente_id: int):
    return {"id": cliente_id, "nome": "João"}
"""

# Passo 2: Registrar em main.py
main_py_adicionar = """
from routers.clientes import router as clientes_router

# No setup de routers:
app.include_router(clientes_router, prefix=settings.API_V1_PREFIX)
"""


# ============================================================================
# 2. USANDO O CLIENTE OPENROUTER
# ============================================================================

exemplo_usando_openrouter = """
from fastapi import APIRouter, Depends
from services.openrouter_client import OpenRouterClient
from config import get_openrouter_client

router = APIRouter()

@router.post("/gerar-descricao")
async def gerar_descricao(
    servico: str,
    client: OpenRouterClient = Depends(get_openrouter_client)
):
    '''Usa OpenRouter para gerar descrição de serviço'''
    
    prompt = f"Gere uma descrição atrativa para o serviço: {servico}"
    resposta = await client.generate_response(
        user_message=prompt,
        model="openai/gpt-4o-mini",
        temperature=0.7,
    )
    
    return {"descricao": resposta}


@router.post("/chat-stream")
async def chat_stream(
    pergunta: str,
    client: OpenRouterClient = Depends(get_openrouter_client)
):
    '''Retorna resposta em streaming'''
    
    async def event_generator():
        async for chunk in client.chat_stream(
            user_message=pergunta,
            system_message="Você é um assistente de salão de beleza",
        ):
            yield f"data: {chunk}\\n\\n"
    
    return StreamingResponse(event_generator(), media_type="text/event-stream")
"""


# ============================================================================
# 3. TRATAMENTO DE ERROS CONSISTENTE
# ============================================================================

exemplo_error_handling = """
from fastapi import HTTPException

# Bad - Genérico
def ruim():
    raise Exception("Algo deu errado")

# Good - Específico
def bom():
    raise HTTPException(
        status_code=404,
        detail="Cliente não encontrado",
    )

# Very Good - Com logging
import logging
logger = logging.getLogger(__name__)

def excelente():
    try:
        # operação
        pass
    except ValueError as e:
        logger.error(f"Erro de validação: {e}")
        raise HTTPException(
            status_code=400,
            detail="Dados inválidos fornecidos",
        )
    except Exception as e:
        logger.exception(f"Erro inesperado: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erro interno do servidor",
        )
"""


# ============================================================================
# 4. VALIDAÇÃO COM PYDANTIC
# ============================================================================

exemplo_validacao = """
from pydantic import BaseModel, Field, validator, EmailStr
from datetime import datetime
from typing import Optional

class ClienteRequest(BaseModel):
    nome: str = Field(
        ..., 
        min_length=3, 
        max_length=100,
        description="Nome do cliente",
    )
    email: Optional[EmailStr] = None
    telefone: str = Field(..., regex=r"^\d{10,11}$")
    data_nascimento: Optional[datetime] = None
    
    @validator("nome")
    def nome_maiusculo(cls, v):
        return v.upper()
    
    @validator("data_nascimento")
    def data_nao_futura(cls, v):
        if v > datetime.now():
            raise ValueError("Data de nascimento não pode ser no futuro")
        return v

# Uso:
# cliente = ClienteRequest(nome="João", telefone="11999999999")
# Automaticamente valida!
"""


# ============================================================================
# 5. DEPENDENCY INJECTION
# ============================================================================

exemplo_dependency_injection = """
from fastapi import Depends

# Dependência simples
def get_query(q: str = "") -> str:
    return q

# Dependência com classe (para banco de dados)
class Database:
    def __init__(self):
        self.conexao = "conectado"

def get_database() -> Database:
    db = Database()
    try:
        yield db
    finally:
        pass  # fechar conexão

# Usando em endpoint
@router.get("/items")
async def listar(
    db: Database = Depends(get_database),
    q: str = Depends(get_query),
):
    return {"items": [], "query": q}
"""


# ============================================================================
# 6. PAGINAÇÃO
# ============================================================================

exemplo_paginacao = """
from typing import List, Generic, TypeVar
from pydantic import BaseModel

T = TypeVar('T')

class PaginatedResponse(BaseModel, Generic[T]):
    total: int
    page: int
    page_size: int
    items: List[T]

@router.get("/clientes", response_model=PaginatedResponse)
async def listar_clientes(
    page: int = 1,
    page_size: int = 10,
):
    # Simular banco de dados
    todos_clientes = [{"id": i, "nome": f"Cliente {i}"} for i in range(1, 101)]
    
    total = len(todos_clientes)
    inicio = (page - 1) * page_size
    fim = inicio + page_size
    
    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        items=todos_clientes[inicio:fim],
    )
"""


# ============================================================================
# 7. AUTENTICAÇÃO COM JWT
# ============================================================================

exemplo_jwt = """
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthCredentials

security = HTTPBearer()
SECRET_KEY = "sua-chave-secreta-aqui"

def criar_token(gerente_id: int) -> str:
    payload = {
        "sub": str(gerente_id),
        "exp": datetime.utcnow() + timedelta(hours=24),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verificar_token(credentials: HTTPAuthCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        gerente_id = payload.get("sub")
        if gerente_id is None:
            raise HTTPException(status_code=401)
        return gerente_id
    except JWTError:
        raise HTTPException(status_code=401)

@router.post("/login")
async def login(email: str, senha: str):
    # Validar credenciais
    gerente_id = 1  # Do banco de dados
    token = criar_token(gerente_id)
    return {"access_token": token, "token_type": "bearer"}

@router.get("/perfil")
async def meu_perfil(gerente_id: str = Depends(verificar_token)):
    return {"gerente_id": gerente_id}
"""


# ============================================================================
# 8. BACKGROUND TASKS
# ============================================================================

exemplo_background_tasks = """
from fastapi import BackgroundTasks

@router.post("/enviar-email")
async def enviar_email(email: str, background_tasks: BackgroundTasks):
    # Retorna imediatamente
    background_tasks.add_task(enviar_email_background, email)
    return {"status": "E-mail será enviado"}

async def enviar_email_background(email: str):
    # Executa em background
    import asyncio
    await asyncio.sleep(2)
    print(f"E-mail enviado para {email}")
"""


# ============================================================================
# 9. TESTANDO ENDPOINTS
# ============================================================================

exemplo_testes = """
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_criar_cliente():
    response = client.post(
        "/api/v1/clientes",
        json={
            "nome": "João",
            "telefone": "11999999999",
        }
    )
    assert response.status_code == 201
    assert response.json()["nome"] == "João"

def test_cliente_nao_encontrado():
    response = client.get("/api/v1/clientes/99999")
    assert response.status_code == 404
"""


# ============================================================================
# 10. VARIÁVEIS DE AMBIENTE
# ============================================================================

exemplo_env = """
# .env
OPENROUTER_API_KEY=sk-xxx
DATABASE_URL=postgresql://user:pass@localhost/db
DEBUG=True
LOG_LEVEL=INFO

# Em config.py:
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openrouter_api_key: str
    database_url: str
    debug: bool = False
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"

settings = Settings()
"""

print(__doc__)
print("\n✅ Todos os padrões estão documentados acima!")
