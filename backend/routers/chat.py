"""
Router para endpoints de chat e inovações com IA.
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import AsyncGenerator
from schemas.chat import ChatRequest, ChatResponse, ConversationRequest, ConversationResponse
from services.openrouter_client import OpenRouterClient
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["chat"])


def get_openrouter_client() -> OpenRouterClient:
    """Dependency para obter cliente OpenRouter."""
    return OpenRouterClient()


@router.post("/simple", response_model=ChatResponse)
async def simple_chat(
    request: ChatRequest,
    client: OpenRouterClient = Depends(get_openrouter_client),
):
    """
    Endpoint simples para conversar com o assistente.
    
    **Parâmetros:**
    - `user_message`: Mensagem do usuário
    - `model`: Modelo a usar (opcional, padrão: gpt-4o)
    - `temperature`: Criatividade (0-1)
    - `max_tokens`: Tokens máximos
    """
    try:
        system_message = """Você é Nyra, uma assistente inteligente para o Salão de Beleza Nyra.
Você ajuda clientes a:
- Agendar horários de corte, barba e outros serviços
- Entender os planos de assinaturas
- Responder dúvidas sobre serviços e preços
- Remarcar ou cancelar agendamentos
- Sugerir serviços baseado nas preferências do cliente

Sempre seja educada, profissional e atenciosa. Tenha em mente que está representando um salão de beleza de alta qualidade."""
        
        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": request.user_message},
        ]
        
        response_text = await client.generate_response(
            messages=messages,
            model=request.model,
            temperature=request.temperature,
            max_tokens=request.max_tokens,
        )
        
        return ChatResponse(
            response=response_text,
            model=request.model or "openai/gpt-4o",
            tokens_used=None,
        )
    
    except Exception as e:
        logger.error(f"Erro ao processar chat simples: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao processar requisição: {str(e)}")


@router.post("/conversation", response_model=ConversationResponse)
async def conversation_chat(
    request: ConversationRequest,
    client: OpenRouterClient = Depends(get_openrouter_client),
):
    """
    Endpoint para conversa com histórico completo.
    Permite manter contexto entre múltiplas mensagens.
    
    **Parâmetros:**
    - `messages`: Lista de mensagens anterior (com role: 'system', 'user', 'assistant')
    - `model`: Modelo a usar (opcional)
    - `temperature`: Criatividade (0-1)
    - `max_tokens`: Tokens máximos
    """
    try:
        # Validar que há pelo menos uma mensagem de usuário
        if not any(msg.role == "user" for msg in request.messages):
            raise HTTPException(
                status_code=400,
                detail="Deve haver pelo menos uma mensagem de usuário",
            )
        
        # Converter Pydantic models para dicts
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        response_text = await client.generate_response(
            messages=messages,
            model=request.model,
            temperature=request.temperature,
            max_tokens=request.max_tokens,
        )
        
        return ConversationResponse(
            response=response_text,
            model=request.model or "openai/gpt-4o",
            tokens_used=None,
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao processar conversa: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao processar requisição: {str(e)}")


@router.get("/available-models")
async def available_models(
    client: OpenRouterClient = Depends(get_openrouter_client),
):
    """
    Lista os modelos disponíveis na OpenRouter.
    Útil para o frontend exibir opções.
    """
    try:
        models = await client.list_models()
        return {
            "models": models,
            "count": len(models),
            "default_model": "openai/gpt-4o",
        }
    except Exception as e:
        logger.error(f"Erro ao listar modelos: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao listar modelos disponíveis",
        )
