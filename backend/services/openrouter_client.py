"""
Cliente para integração com a API OpenRouter.
Fornece métodos para comunicação com modelos de IA.
"""

import httpx
import logging
from typing import List, Dict, Optional
from config import settings

logger = logging.getLogger(__name__)


class OpenRouterClient:
    """Cliente para comunicação com a OpenRouter API."""
    
    def __init__(self):
        """Inicializa o cliente com as credenciais e configurações."""
        if not settings.OPENROUTER_API_KEY:
            raise ValueError("OPENROUTER_API_KEY não configurada em .env")
        
        self.api_key = settings.OPENROUTER_API_KEY
        self.base_url = settings.OPENROUTER_BASE_URL
        self.default_model = settings.DEFAULT_MODEL
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://salao-da-nyra.local",
            "X-Title": "Salão da Nyra - Automation",
        }
    
    async def generate_response(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 500,
    ) -> str:
        """
        Envia uma conversa para a OpenRouter e retorna a resposta gerada.
        
        Args:
            messages: Lista de dicts com 'role' ('system', 'user', 'assistant') e 'content'
            model: Modelo a usar (padrão: settings.DEFAULT_MODEL)
            temperature: Criatividade da resposta (0-1)
            max_tokens: Número máximo de tokens na resposta
            
        Returns:
            str: Conteúdo da resposta gerada
            
        Raises:
            httpx.HTTPError: Se houver erro na chamada à API
            ValueError: Se a resposta estiver malformada
        """
        model = model or self.default_model
        url = f"{self.base_url}/chat/completions"
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    url,
                    json=payload,
                    headers=self.headers,
                )
                response.raise_for_status()
                data = response.json()
                
                logger.info(f"OpenRouter response received for model: {model}")
                return data["choices"][0]["message"]["content"]
        
        except httpx.HTTPError as e:
            logger.error(f"Erro ao chamar OpenRouter API: {str(e)}")
            raise
        except (KeyError, IndexError) as e:
            logger.error(f"Formato de resposta inválido: {str(e)}")
            raise ValueError("Formato de resposta da API inválido")
    
    async def chat_stream(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 500,
    ):
        """
        Envia uma conversa para a OpenRouter com streaming de resposta.
        
        Args:
            messages: Lista de dicts com 'role' e 'content'
            model: Modelo a usar
            temperature: Criatividade da resposta
            max_tokens: Número máximo de tokens
            
        Yields:
            str: Chunks de texto conforme são recebidos
        """
        model = model or self.default_model
        url = f"{self.base_url}/chat/completions"
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": True,
        }
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                async with client.stream(
                    "POST",
                    url,
                    json=payload,
                    headers=self.headers,
                ) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if line.startswith("data: "):
                            data_str = line[6:]  # Remove "data: "
                            if data_str == "[DONE]":
                                break
                            try:
                                import json
                                data = json.loads(data_str)
                                delta = data.get("choices", [{}])[0].get("delta", {})
                                if "content" in delta:
                                    yield delta["content"]
                            except Exception as e:
                                logger.warning(f"Erro ao parsear stream: {str(e)}")
                                continue
        
        except httpx.HTTPError as e:
            logger.error(f"Erro ao fazer streaming: {str(e)}")
            raise
    
    async def list_models(self) -> List[str]:
        """
        Lista modelos disponíveis na OpenRouter.
        
        Returns:
            List[str]: Lista de nomes de modelos disponíveis
        """
        url = f"{self.base_url}/models"
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(url, headers=self.headers)
                response.raise_for_status()
                data = response.json()
                models = [model["id"] for model in data.get("data", [])]
                logger.info(f"Retrieved {len(models)} models from OpenRouter")
                return models
        
        except httpx.HTTPError as e:
            logger.error(f"Erro ao listar modelos: {str(e)}")
            raise
