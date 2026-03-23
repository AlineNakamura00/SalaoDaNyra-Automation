"""
Router para operações CRUD de Serviços
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from models import Servico, get_db
from schemas import ServicoCreate, ServicoUpdate, ServicoResponse

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/servicos",
    tags=["servicos"],
    responses={404: {"description": "Serviço não encontrado"}}
)


@router.post("", response_model=ServicoResponse, status_code=201)
async def criar_servico(
    servico: ServicoCreate,
    db: Session = Depends(get_db),
):
    """Criar novo serviço."""
    # Verificar se nome já existe
    db_servico = db.query(Servico).filter(Servico.nome == servico.nome).first()
    if db_servico:
        raise HTTPException(
            status_code=400,
            detail="Serviço com este nome já existe",
        )
    
    novo_servico = Servico(**servico.dict())
    db.add(novo_servico)
    db.commit()
    db.refresh(novo_servico)
    
    logger.info(f"Serviço {novo_servico.id} criado: {novo_servico.nome}")
    return novo_servico


@router.get("", response_model=List[ServicoResponse])
async def listar_servicos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    ativo: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    """Listar serviços."""
    query = db.query(Servico)
    
    if ativo is not None:
        query = query.filter(Servico.ativo == ativo)
    
    servicos = query.offset(skip).limit(limit).all()
    return servicos


@router.get("/{servico_id}", response_model=ServicoResponse)
async def obter_servico(
    servico_id: int,
    db: Session = Depends(get_db),
):
    """Obter serviço por ID."""
    servico = db.query(Servico).filter(Servico.id == servico_id).first()
    if not servico:
        raise HTTPException(
            status_code=404,
            detail="Serviço não encontrado",
        )
    return servico


@router.put("/{servico_id}", response_model=ServicoResponse)
async def atualizar_servico(
    servico_id: int,
    servico_update: ServicoUpdate,
    db: Session = Depends(get_db),
):
    """Atualizar serviço."""
    servico = db.query(Servico).filter(Servico.id == servico_id).first()
    if not servico:
        raise HTTPException(
            status_code=404,
            detail="Serviço não encontrado",
        )
    
    update_data = servico_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(servico, field, value)
    
    db.commit()
    db.refresh(servico)
    
    logger.info(f"Serviço {servico_id} atualizado")
    return servico


@router.delete("/{servico_id}", status_code=204)
async def deletar_servico(
    servico_id: int,
    db: Session = Depends(get_db),
):
    """Deletar serviço (marcado como inativo)."""
    servico = db.query(Servico).filter(Servico.id == servico_id).first()
    if not servico:
        raise HTTPException(
            status_code=404,
            detail="Serviço não encontrado",
        )
    
    servico.ativo = False
    db.commit()
    
    logger.info(f"Serviço {servico_id} deletado (marcado como inativo)")
