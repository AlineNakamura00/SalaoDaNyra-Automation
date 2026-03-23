"""
Modelo de Plano de Assinatura
"""

from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean
from sqlalchemy.sql import func
from models.database import Base


class Plano(Base):
    """Modelo de plano de assinatura/pacote."""
    
    __tablename__ = "planos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False, unique=True, index=True)
    descricao = Column(Text, nullable=True)
    preco_mensal = Column(Float, nullable=False)
    sessoes_incluidas = Column(Integer, default=0)
    desconto_percentual = Column(Float, default=0.0)
    ativo = Column(Boolean, default=True, index=True)
    
    # Timestamps
    criado_em = Column(DateTime, server_default=func.now(), nullable=False)
    atualizado_em = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<Plano(id={self.id}, nome={self.nome}, preco_mensal={self.preco_mensal})>"
