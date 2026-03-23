"""
Arquivo para inicializar os routers do FastAPI.
Centraliza a importação de todos os routers.
"""

from .chat import router as chat_router
from .clientes import router as clientes_router
from .servicos import router as servicos_router
from .agendamentos import router as agendamentos_router
from .planos import router as planos_router

__all__ = [
    "chat_router",
    "clientes_router",
    "servicos_router",
    "agendamentos_router",
    "planos_router",
]
