"""
Configuração de banco de dados com SQLAlchemy.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import settings

# URL do banco de dados
DATABASE_URL = settings.DATABASE_URL

# Engine SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=settings.APP_DEBUG,  # Log SQL queries em debug mode
)

# Session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base para modelos
Base = declarative_base()


def get_db():
    """Dependência para injetar sessão do BD em endpoints."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Cria todas as tabelas."""
    Base.metadata.create_all(bind=engine)


def drop_db():
    """Deleta todas as tabelas (USE COM CUIDADO!)."""
    Base.metadata.drop_all(bind=engine)
