"""
Modelo de Agendamento
"""

from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Enum as SQLEnum, Text
from sqlalchemy.sql import func
from datetime import datetime
from enum import Enum
from models.database import Base


class StatusAgendamento(str, Enum):
    """Status possíveis de um agendamento."""
    PENDENTE = "pendente"
    CONFIRMADO = "confirmado"
    CANCELADO = "cancelado"
    CONCLUIDO = "concluido"


class Agendamento(Base):
    """Modelo de agendamento no salão."""
    
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False, index=True)
    servico_id = Column(Integer, ForeignKey("servicos.id"), nullable=False, index=True)
    data_hora = Column(DateTime, nullable=False, index=True)
    duracao_minutos = Column(Integer, default=30, nullable=False)
    status = Column(SQLEnum(StatusAgendamento), default=StatusAgendamento.PENDENTE, index=True)
    notas = Column(Text, nullable=True)
    confirmado = Column(Boolean, default=False)
    
    # Timestamps
    criado_em = Column(DateTime, server_default=func.now(), nullable=False)
    atualizado_em = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Agendamento(id={self.id}, cliente_id={self.cliente_id}, data_hora={self.data_hora}, status={self.status})>"
