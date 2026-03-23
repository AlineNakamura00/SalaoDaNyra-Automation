"""
Modelo de Serviço
"""

from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean
from sqlalchemy.sql import func
from models.database import Base


class Servico(Base):
    """Modelo de serviço oferecido pelo salão."""
    
    __tablename__ = "servicos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False, unique=True, index=True)
    descricao = Column(Text, nullable=True)
    preco = Column(Float, nullable=False)
    duracao_minutos = Column(Integer, default=30, nullable=False)
    ativo = Column(Boolean, default=True, index=True)
    
    # Timestamps
    criado_em = Column(DateTime, server_default=func.now(), nullable=False)
    atualizado_em = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Servico(id={self.id}, nome={self.nome}, preco={self.preco})>"
