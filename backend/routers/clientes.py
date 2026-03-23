"""
Router para operações CRUD de Clientes
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from models import Cliente, get_db
from schemas import ClienteCreate, ClienteUpdate, ClienteResponse

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/clientes",
    tags=["clientes"],
    responses={404: {"description": "Cliente não encontrado"}}
)


@router.post("", response_model=ClienteResponse, status_code=201)
async def criar_cliente(
    cliente: ClienteCreate,
    db: Session = Depends(get_db),
):
    """Criar novo cliente."""
    # Verificar se telefone já existe
    db_cliente = db.query(Cliente).filter(Cliente.telefone == cliente.telefone).first()
    if db_cliente:
        raise HTTPException(
            status_code=400,
            detail="Telefone já cadastrado",
        )
    
    # Criar novo cliente
    novo_cliente = Cliente(**cliente.dict())
    db.add(novo_cliente)
    db.commit()
    db.refresh(novo_cliente)
    
    logger.info(f"Cliente {novo_cliente.id} criado: {novo_cliente.nome}")
    return novo_cliente


@router.get("", response_model=List[ClienteResponse])
async def listar_clientes(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    ativo: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    """Listar clientes com paginação."""
    query = db.query(Cliente)
    
    if ativo is not None:
        query = query.filter(Cliente.ativo == ativo)
    
    clientes = query.offset(skip).limit(limit).all()
    return clientes


@router.get("/{cliente_id}", response_model=ClienteResponse)
async def obter_cliente(
    cliente_id: int,
    db: Session = Depends(get_db),
):
    """Obter cliente por ID."""
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado",
        )
    return cliente


@router.put("/{cliente_id}", response_model=ClienteResponse)
async def atualizar_cliente(
    cliente_id: int,
    cliente_update: ClienteUpdate,
    db: Session = Depends(get_db),
):
    """Atualizar cliente."""
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado",
        )
    
    # Atualizar apenas campos fornecidos
    update_data = cliente_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(cliente, field, value)
    
    db.commit()
    db.refresh(cliente)
    
    logger.info(f"Cliente {cliente_id} atualizado")
    return cliente


@router.delete("/{cliente_id}", status_code=204)
async def deletar_cliente(
    cliente_id: int,
    db: Session = Depends(get_db),
):
    """Deletar cliente (marcado como inativo)."""
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(
            status_code=404,
            detail="Cliente não encontrado",
        )
    
    cliente.ativo = False
    db.commit()
    
    logger.info(f"Cliente {cliente_id} deletado (marcado como inativo)")
