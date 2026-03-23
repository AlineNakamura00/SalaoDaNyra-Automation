"""
Router para operações CRUD de Agendamentos
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import logging

from models import Agendamento, Cliente, Servico, get_db, StatusAgendamento
from schemas import AgendamentoCreate, AgendamentoUpdate, AgendamentoResponse

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/agendamentos",
    tags=["agendamentos"],
    responses={404: {"description": "Agendamento não encontrado"}}
)


@router.post("", response_model=AgendamentoResponse, status_code=201)
async def criar_agendamento(
    agendamento: AgendamentoCreate,
    db: Session = Depends(get_db),
):
    """Criar novo agendamento."""
    # Validar cliente
    cliente = db.query(Cliente).filter(Cliente.id == agendamento.cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=400, detail="Cliente não encontrado")
    
    # Validar serviço
    servico = db.query(Servico).filter(Servico.id == agendamento.servico_id).first()
    if not servico:
        raise HTTPException(status_code=400, detail="Serviço não encontrado")
    
    # Validar data/hora (não pode ser no passado)
    if agendamento.data_hora <= datetime.now():
        raise HTTPException(status_code=400, detail="Data e hora devem ser no futuro")
    
    # Criar agendamento
    novo_agendamento = Agendamento(
        **agendamento.dict(),
        duracao_minutos=servico.duracao_minutos,
        status=StatusAgendamento.PENDENTE,
    )
    db.add(novo_agendamento)
    db.commit()
    db.refresh(novo_agendamento)
    
    logger.info(f"Agendamento {novo_agendamento.id} criado")
    return novo_agendamento


@router.get("", response_model=List[AgendamentoResponse])
async def listar_agendamentos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    cliente_id: Optional[int] = None,
    status: Optional[StatusAgendamento] = None,
    db: Session = Depends(get_db),
):
    """Listar agendamentos."""
    query = db.query(Agendamento)
    
    if cliente_id:
        query = query.filter(Agendamento.cliente_id == cliente_id)
    
    if status:
        query = query.filter(Agendamento.status == status)
    
    agendamentos = query.order_by(Agendamento.data_hora).offset(skip).limit(limit).all()
    return agendamentos


@router.get("/{agendamento_id}", response_model=AgendamentoResponse)
async def obter_agendamento(
    agendamento_id: int,
    db: Session = Depends(get_db),
):
    """Obter agendamento por ID."""
    agendamento = db.query(Agendamento).filter(Agendamento.id == agendamento_id).first()
    if not agendamento:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    return agendamento


@router.put("/{agendamento_id}", response_model=AgendamentoResponse)
async def atualizar_agendamento(
    agendamento_id: int,
    agendamento_update: AgendamentoUpdate,
    db: Session = Depends(get_db),
):
    """Atualizar agendamento."""
    agendamento = db.query(Agendamento).filter(Agendamento.id == agendamento_id).first()
    if not agendamento:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    
    update_data = agendamento_update.dict(exclude_unset=True)
    
    # Validar nova data/hora se fornecida
    if "data_hora" in update_data and update_data["data_hora"] <= datetime.now():
        raise HTTPException(status_code=400, detail="Data e hora devem ser no futuro")
    
    for field, value in update_data.items():
        setattr(agendamento, field, value)
    
    db.commit()
    db.refresh(agendamento)
    
    logger.info(f"Agendamento {agendamento_id} atualizado")
    return agendamento


@router.post("/{agendamento_id}/confirmar", response_model=AgendamentoResponse)
async def confirmar_agendamento(
    agendamento_id: int,
    db: Session = Depends(get_db),
):
    """Confirmar agendamento."""
    agendamento = db.query(Agendamento).filter(Agendamento.id == agendamento_id).first()
    if not agendamento:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    
    agendamento.status = StatusAgendamento.CONFIRMADO
    agendamento.confirmado = True
    db.commit()
    db.refresh(agendamento)
    
    logger.info(f"Agendamento {agendamento_id} confirmado")
    return agendamento


@router.delete("/{agendamento_id}", status_code=204)
async def cancelar_agendamento(
    agendamento_id: int,
    db: Session = Depends(get_db),
):
    """Cancelar agendamento."""
    agendamento = db.query(Agendamento).filter(Agendamento.id == agendamento_id).first()
    if not agendamento:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    
    agendamento.status = StatusAgendamento.CANCELADO
    db.commit()
    
    logger.info(f"Agendamento {agendamento_id} cancelado")
