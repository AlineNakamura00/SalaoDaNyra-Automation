"""
Router para operações CRUD de Planos
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from models import Plano, get_db
from schemas import PlanoCreate, PlanoUpdate, PlanoResponse

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/planos",
    tags=["planos"],
    responses={404: {"description": "Plano não encontrado"}}
)


@router.post("", response_model=PlanoResponse, status_code=201)
async def criar_plano(
    plano: PlanoCreate,
    db: Session = Depends(get_db),
):
    """Criar novo plano."""
    # Verificar se nome já existe
    db_plano = db.query(Plano).filter(Plano.nome == plano.nome).first()
    if db_plano:
        raise HTTPException(
            status_code=400,
            detail="Plano com este nome já existe",
        )
    
    novo_plano = Plano(**plano.dict())
    db.add(novo_plano)
    db.commit()
    db.refresh(novo_plano)
    
    logger.info(f"Plano {novo_plano.id} criado: {novo_plano.nome}")
    return novo_plano


@router.get("", response_model=List[PlanoResponse])
async def listar_planos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    ativo: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    """Listar planos."""
    query = db.query(Plano)
    
    if ativo is not None:
        query = query.filter(Plano.ativo == ativo)
    
    planos = query.offset(skip).limit(limit).all()
    return planos


@router.get("/{plano_id}", response_model=PlanoResponse)
async def obter_plano(
    plano_id: int,
    db: Session = Depends(get_db),
):
    """Obter plano por ID."""
    plano = db.query(Plano).filter(Plano.id == plano_id).first()
    if not plano:
        raise HTTPException(
            status_code=404,
            detail="Plano não encontrado",
        )
    return plano


@router.put("/{plano_id}", response_model=PlanoResponse)
async def atualizar_plano(
    plano_id: int,
    plano_update: PlanoUpdate,
    db: Session = Depends(get_db),
):
    """Atualizar plano."""
    plano = db.query(Plano).filter(Plano.id == plano_id).first()
    if not plano:
        raise HTTPException(
            status_code=404,
            detail="Plano não encontrado",
        )
    
    update_data = plano_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(plano, field, value)
    
    db.commit()
    db.refresh(plano)
    
    logger.info(f"Plano {plano_id} atualizado")
    return plano


@router.delete("/{plano_id}", status_code=204)
async def deletar_plano(
    plano_id: int,
    db: Session = Depends(get_db),
):
    """Deletar plano (marcado como inativo)."""
    plano = db.query(Plano).filter(Plano.id == plano_id).first()
    if not plano:
        raise HTTPException(
            status_code=404,
            detail="Plano não encontrado",
        )
    
    plano.ativo = False
    db.commit()
    
    logger.info(f"Plano {plano_id} deletado (marcado como inativo)")
