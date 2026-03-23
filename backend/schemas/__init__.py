"""
Arquivo para inicializar os schemas do Pydantic.
"""

from .chat import ChatRequest, ChatResponse, ConversationRequest, ConversationResponse, Message
from .cliente import ClienteCreate, ClienteUpdate, ClienteResponse
from .servico import ServicoCreate, ServicoUpdate, ServicoResponse
from .agendamento import AgendamentoCreate, AgendamentoUpdate, AgendamentoResponse
from .plano import PlanoCreate, PlanoUpdate, PlanoResponse

__all__ = [
    # Chat
    "ChatRequest",
    "ChatResponse",
    "ConversationRequest",
    "ConversationResponse",
    "Message",
    # Cliente
    "ClienteCreate",
    "ClienteUpdate",
    "ClienteResponse",
    # Serviço
    "ServicoCreate",
    "ServicoUpdate",
    "ServicoResponse",
    # Agendamento
    "AgendamentoCreate",
    "AgendamentoUpdate",
    "AgendamentoResponse",
    # Plano
    "PlanoCreate",
    "PlanoUpdate",
    "PlanoResponse",
]
