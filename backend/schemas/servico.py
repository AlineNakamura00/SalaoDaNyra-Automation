"""
Schemas Pydantic para Serviços
"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ServicoCreate(BaseModel):
    """Schema para criar serviço."""
    nome: str = Field(..., min_length=3, max_length=255, description="Nome do serviço")
    descricao: Optional[str] = None
    preco: float = Field(..., gt=0, description="Preço em R$")
    duracao_minutos: int = Field(default=30, ge=5, le=240, description="Duração em minutos")


class ServicoUpdate(BaseModel):
    """Schema para atualizar serviço."""
    nome: Optional[str] = Field(None, min_length=3, max_length=255)
    descricao: Optional[str] = None
    preco: Optional[float] = Field(None, gt=0)
    duracao_minutos: Optional[int] = Field(None, ge=5, le=240)
    ativo: Optional[bool] = None


class ServicoResponse(BaseModel):
    """Schema de resposta - Serviço."""
    id: int
    nome: str
    descricao: Optional[str]
    preco: float
    duracao_minutos: int
    ativo: bool
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True
