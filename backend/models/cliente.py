"""
Modelo de Cliente
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from datetime import datetime
from models.database import Base


class Cliente(Base):
    """Modelo de cliente do salão."""
    
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False, index=True)
    telefone = Column(String(20), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=True)
    data_nascimento = Column(DateTime, nullable=True)
    endereco = Column(Text, nullable=True)
    notas = Column(Text, nullable=True)
    ativo = Column(Boolean, default=True, index=True)
    
    # Timestamps
    criado_em = Column(DateTime, server_default=func.now(), nullable=False)
    atualizado_em = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Cliente(id={self.id}, nome={self.nome}, telefone={self.telefone})>"
