"""
Módulo principal da aplicação FastAPI.
Configure CORS, middlewares, routers e melhorias de segurança aqui.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from config import settings
from routers import chat_router, clientes_router, servicos_router, agendamentos_router, planos_router
from models import init_db

# Configurar logging
logging.basicConfig(
    level=logging.DEBUG if settings.APP_DEBUG else logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gerenciador do ciclo de vida da aplicação.
    Executado na inicialização e encerramento.
    """
    logger.info(f"🚀 Iniciando API do Salão da Nyra em {settings.APP_ENV}")
    
    # Inicializar banco de dados
    logger.info(f"📊 Banco de dados: {settings.DATABASE_URL}")
    init_db()
    logger.info("✅ Banco de dados inicializado")
    
    yield
    logger.info("🛑 Encerrando API")


# Criar aplicação FastAPI
app = FastAPI(
    title="Salão da Nyra - Automation API",
    description="API backend para sistema de agendamento e gestão de salão de beleza com IA",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)


# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Middleware para logging de requisições
@app.middleware("http")
async def log_requests(request, call_next):
    """Log de requisições HTTP."""
    logger.debug(f"{request.method} {request.url.path}")
    response = await call_next(request)
    logger.debug(f"Response: {response.status_code}")
    return response


# Health check
@app.get("/")
async def root():
    """Endpoint raiz."""
    return {
        "message": "Bem-vindo à API do Salão da Nyra",
        "version": "0.1.0",
        "environment": settings.APP_ENV,
        "docs": "/api/docs",
    }


@app.get("/health")
async def health_check():
    """Endpoint de health check."""
    return {
        "status": "healthy",
        "environment": settings.APP_ENV,
    }


# Registrar routers
app.include_router(chat_router, prefix=settings.API_V1_PREFIX)
app.include_router(clientes_router, prefix=settings.API_V1_PREFIX)
app.include_router(servicos_router, prefix=settings.API_V1_PREFIX)
app.include_router(agendamentos_router, prefix=settings.API_V1_PREFIX)
app.include_router(planos_router, prefix=settings.API_V1_PREFIX)


# Tratamento de exceções personalizadas
@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    """Handler para erros de validação."""
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)},
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handler geral para exceções não tratadas."""
    logger.error(f"Erro não tratado: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Erro interno do servidor"},
    )


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.APP_HOST,
        port=settings.APP_PORT,
        reload=settings.APP_DEBUG,
        log_level="debug" if settings.APP_DEBUG else "info",
    )
