"""
Exemplo de novo router: Agendamentos
Use como referência para criar novos endpoints.
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List
from pydantic import BaseModel, Field
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/agendamentos", tags=["agendamentos"])


# Schemas (modelos de validação)
class AgendamentoRequest(BaseModel):
    """Modelo para criar um agendamento."""
    cliente_id: int = Field(..., description="ID do cliente")
    barbeiro_id: int = Field(..., description="ID do barbeiro")
    servico: str = Field(..., description="Tipo de serviço")
    data_hora: datetime = Field(..., description="Data e hora do agendamento")
    notas: str = Field("", description="Notas adicionais")


class AgendamentoResponse(BaseModel):
    """Modelo de resposta de agendamento."""
    id: int
    cliente_id: int
    barbeiro_id: int
    servico: str
    data_hora: datetime
    notas: str
    status: str = "confirmed"


class AgendamentoUpdateRequest(BaseModel):
    """Modelo para atualizar um agendamento."""
    servico: str = None
    data_hora: datetime = None
    status: str = None


# Banco de dados fake (em produção usar SQLAlchemy)
fake_agendamentos = {
    1: {
        "id": 1,
        "cliente_id": 1,
        "barbeiro_id": 1,
        "servico": "Corte",
        "data_hora": datetime.now(),
        "notas": "",
        "status": "confirmed",
    }
}


# Endpoints
@router.get("", response_model=List[AgendamentoResponse])
async def listar_agendamentos(
    barbeiro_id: int = None,
    status: str = None,
):
    """
    Lista todos os agendamentos.
    
    **Filtros opcionais:**
    - `barbeiro_id`: Filtrar por barbeiro
    - `status`: Filtrar por status (confirmed, cancelled, completed)
    """
    agendamentos = list(fake_agendamentos.values())
    
    if barbeiro_id:
        agendamentos = [a for a in agendamentos if a["barbeiro_id"] == barbeiro_id]
    
    if status:
        agendamentos = [a for a in agendamentos if a["status"] == status]
    
    logger.info(f"Listados {len(agendamentos)} agendamentos")
    return agendamentos


@router.get("/{agendamento_id}", response_model=AgendamentoResponse)
async def obter_agendamento(agendamento_id: int):
    """Obtém detalhes de um agendamento específico."""
    if agendamento_id not in fake_agendamentos:
        raise HTTPException(
            status_code=404,
            detail="Agendamento não encontrado",
        )
    
    return fake_agendamentos[agendamento_id]


@router.post("", response_model=AgendamentoResponse, status_code=201)
async def criar_agendamento(request: AgendamentoRequest):
    """
    Cria um novo agendamento.
    
    Valida:
    - Se cliente existe
    - Se barbeiro existe
    - Se data_hora é no futuro
    - Se não há conflito de horário
    """
    # Validações (em produção, seria com BD)
    if request.data_hora <= datetime.now():
        raise HTTPException(
            status_code=400,
            detail="Data e hora devem ser no futuro",
        )
    
    # Simular criação
    novo_id = max(fake_agendamentos.keys()) + 1 if fake_agendamentos else 1
    novo_agendamento = {
        "id": novo_id,
        "cliente_id": request.cliente_id,
        "barbeiro_id": request.barbeiro_id,
        "servico": request.servico,
        "data_hora": request.data_hora,
        "notas": request.notas,
        "status": "confirmed",
    }
    
    fake_agendamentos[novo_id] = novo_agendamento
    logger.info(f"Agendamento {novo_id} criado")
    
    return novo_agendamento


@router.put("/{agendamento_id}", response_model=AgendamentoResponse)
async def atualizar_agendamento(
    agendamento_id: int,
    request: AgendamentoUpdateRequest,
):
    """Atualiza um agendamento existente."""
    if agendamento_id not in fake_agendamentos:
        raise HTTPException(
            status_code=404,
            detail="Agendamento não encontrado",
        )
    
    agendamento = fake_agendamentos[agendamento_id]
    
    # Atualizar apenas campos fornecidos
    if request.servico:
        agendamento["servico"] = request.servico
    
    if request.data_hora:
        if request.data_hora <= datetime.now():
            raise HTTPException(
                status_code=400,
                detail="Data e hora devem ser no futuro",
            )
        agendamento["data_hora"] = request.data_hora
    
    if request.status:
        if request.status not in ["confirmed", "cancelled", "completed"]:
            raise HTTPException(
                status_code=400,
                detail="Status inválido",
            )
        agendamento["status"] = request.status
    
    logger.info(f"Agendamento {agendamento_id} atualizado")
    return agendamento


@router.delete("/{agendamento_id}", status_code=204)
async def deletar_agendamento(agendamento_id: int):
    """Deleta um agendamento (muda status para cancelled)."""
    if agendamento_id not in fake_agendamentos:
        raise HTTPException(
            status_code=404,
            detail="Agendamento não encontrado",
        )
    
    fake_agendamentos[agendamento_id]["status"] = "cancelled"
    logger.info(f"Agendamento {agendamento_id} cancelado")


@router.post("/{agendamento_id}/confirm", response_model=AgendamentoResponse)
async def confirmar_agendamento(agendamento_id: int):
    """Confirma um agendamento pendente."""
    if agendamento_id not in fake_agendamentos:
        raise HTTPException(
            status_code=404,
            detail="Agendamento não encontrado",
        )
    
    agendamento = fake_agendamentos[agendamento_id]
    agendamento["status"] = "confirmed"
    logger.info(f"Agendamento {agendamento_id} confirmado")
    
    return agendamento


# Para usar este router, adicione em main.py:
# from routers.agendamentos_exemplo import router as agendamentos_router
# app.include_router(agendamentos_router, prefix=settings.API_V1_PREFIX)
