"""
Arquivo para inicializar os modelos.
Local para importar todos os modelos SQLAlchemy.
"""

from models.database import Base, engine, SessionLocal, get_db, init_db, drop_db
from models.cliente import Cliente
from models.servico import Servico
from models.agendamento import Agendamento, StatusAgendamento
from models.plano import Plano

__all__ = [
    "Base",
    "engine",
    "SessionLocal",
    "get_db",
    "init_db",
    "drop_db",
    "Cliente",
    "Servico",
    "Agendamento",
    "StatusAgendamento",
    "Plano",
]
