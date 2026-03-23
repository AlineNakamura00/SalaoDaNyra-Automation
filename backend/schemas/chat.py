"""
Schemas (modelos Pydantic) para validação de dados do chat.
"""

from pydantic import BaseModel, Field
from typing import List, Optional


class Message(BaseModel):
    """Modelo para uma mensagem."""
    role: str = Field(..., description="Papel: 'system', 'user', ou 'assistant'")
    content: str = Field(..., description="Conteúdo da mensagem")


class ChatRequest(BaseModel):
    """Modelo para requisição de chat."""
    user_message: str = Field(..., description="Mensagem do usuário")
    model: Optional[str] = Field(None, description="Modelo a usar (opcional)")
    temperature: float = Field(0.7, ge=0.0, le=1.0, description="Criatividade (0-1)")
    max_tokens: int = Field(500, ge=1, le=4000, description="Tokens máximos")


class ChatResponse(BaseModel):
    """Modelo para resposta de chat."""
    response: str = Field(..., description="Resposta gerada")
    model: str = Field(..., description="Modelo utilisé")
    tokens_used: Optional[int] = Field(None, description="Tokens utilizados")


class ConversationRequest(BaseModel):
    """Modelo para requisição de conversa com histórico."""
    messages: List[Message] = Field(..., description="Histórico de mensagens")
    model: Optional[str] = Field(None, description="Modelo a usar (opcional)")
    temperature: float = Field(0.7, ge=0.0, le=1.0)
    max_tokens: int = Field(500, ge=1, le=4000)


class ConversationResponse(BaseModel):
    """Modelo para resposta de conversa."""
    response: str
    model: str
    tokens_used: Optional[int] = None
