"""
Schemas Pydantic para Clientes
"""

from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional


class ClienteCreate(BaseModel):
    """Schema para criar cliente."""
    nome: str = Field(..., min_length=3, max_length=255, description="Nome do cliente")
    telefone: str = Field(..., min_length=10, description="Telefone com DDD")
    email: Optional[EmailStr] = None
    data_nascimento: Optional[datetime] = None
    endereco: Optional[str] = None
    notas: Optional[str] = None


class ClienteUpdate(BaseModel):
    """Schema para atualizar cliente."""
    nome: Optional[str] = Field(None, min_length=3, max_length=255)
    telefone: Optional[str] = None
    email: Optional[EmailStr] = None
    data_nascimento: Optional[datetime] = None
    endereco: Optional[str] = None
    notas: Optional[str] = None
    ativo: Optional[bool] = None


class ClienteResponse(BaseModel):
    """Schema de resposta - Cliente."""
    id: int
    nome: str
    telefone: str
    email: Optional[str]
    data_nascimento: Optional[datetime]
    endereco: Optional[str]
    notas: Optional[str]
    ativo: bool
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True
