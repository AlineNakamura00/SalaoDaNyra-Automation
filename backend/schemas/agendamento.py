"""
Schemas Pydantic para Agendamentos
"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from models.agendamento import StatusAgendamento


class AgendamentoCreate(BaseModel):
    """Schema para criar agendamento."""
    cliente_id: int = Field(..., description="ID do cliente")
    servico_id: int = Field(..., description="ID do serviço")
    data_hora: datetime = Field(..., description="Data e hora do agendamento")
    notas: Optional[str] = None


class AgendamentoUpdate(BaseModel):
    """Schema para atualizar agendamento."""
    servico_id: Optional[int] = None
    data_hora: Optional[datetime] = None
    status: Optional[StatusAgendamento] = None
    confirmado: Optional[bool] = None
    notas: Optional[str] = None


class AgendamentoResponse(BaseModel):
    """Schema de resposta - Agendamento."""
    id: int
    cliente_id: int
    servico_id: int
    data_hora: datetime
    duracao_minutos: int
    status: StatusAgendamento
    confirmado: bool
    notas: Optional[str]
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True
