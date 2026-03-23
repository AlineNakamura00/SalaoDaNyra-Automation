"""
Schemas Pydantic para Planos
"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class PlanoCreate(BaseModel):
    """Schema para criar plano."""
    nome: str = Field(..., min_length=3, max_length=255, description="Nome do plano")
    descricao: Optional[str] = None
    preco_mensal: float = Field(..., gt=0, description="Preço mensal em R$")
    sessoes_incluidas: int = Field(default=0, ge=0, description="Número de sessões incluídas")
    desconto_percentual: float = Field(default=0.0, ge=0, le=100, description="Desconto em %")


class PlanoUpdate(BaseModel):
    """Schema para atualizar plano."""
    nome: Optional[str] = Field(None, min_length=3, max_length=255)
    descricao: Optional[str] = None
    preco_mensal: Optional[float] = Field(None, gt=0)
    sessoes_incluidas: Optional[int] = Field(None, ge=0)
    desconto_percentual: Optional[float] = Field(None, ge=0, le=100)
    ativo: Optional[bool] = None


class PlanoResponse(BaseModel):
    """Schema de resposta - Plano."""
    id: int
    nome: str
    descricao: Optional[str]
    preco_mensal: float
    sessoes_incluidas: int
    desconto_percentual: float
    ativo: bool
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True
