"""
Testes básicos para a API.
Execute com: pytest tests/
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealthCheck:
    """Testes para health check."""
    
    def test_health_endpoint(self):
        """Verifica se health check está respondendo."""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"
    
    def test_root_endpoint(self):
        """Verifica se root endpoint está respondendo."""
        response = client.get("/")
        assert response.status_code == 200
        assert "message" in response.json()


class TestChatEndpoints:
    """Testes para endpoints de chat."""
    
    def test_simple_chat_missing_message(self):
        """Verifica validação de mensagem obrigatória."""
        response = client.post(
            "/api/v1/chat/simple",
            json={}
        )
        assert response.status_code == 422  # Validation Error
    
    def test_simple_chat_invalid_temperature(self):
        """Verifica validação de temperatura."""
        response = client.post(
            "/api/v1/chat/simple",
            json={
                "user_message": "Olá",
                "temperature": 2.0  # Inválido, máx é 1.0
            }
        )
        assert response.status_code == 422
    
    def test_conversation_without_messages(self):
        """Verifica se conversa sem mensagens é rejeitada."""
        response = client.post(
            "/api/v1/chat/conversation",
            json={
                "messages": []
            }
        )
        # Vai tentar fazer a chamada, mas não há usuário
        assert response.status_code in [400, 422]


class TestDocumentation:
    """Testes para documentação automática."""
    
    def test_swagger_docs(self):
        """Verifica se Swagger está disponível."""
        response = client.get("/api/docs")
        assert response.status_code == 200
    
    def test_redoc_docs(self):
        """Verifica se ReDoc está disponível."""
        response = client.get("/api/redoc")
        assert response.status_code == 200
    
    def test_openapi_schema(self):
        """Verifica se OpenAPI schema está disponível."""
        response = client.get("/api/openapi.json")
        assert response.status_code == 200
        assert "openapi" in response.json()


@pytest.mark.asyncio
async def test_openrouter_client_import():
    """Verifica se cliente OpenRouter pode ser importado."""
    from services.openrouter_client import OpenRouterClient
    assert OpenRouterClient is not None


class TestValidation:
    """Testes para validação de dados."""
    
    def test_chat_request_validation(self):
        """Verifica validação de ChatRequest."""
        response = client.post(
            "/api/v1/chat/simple",
            json={
                "user_message": "x" * 10000,  # Muito longo
            }
        )
        # Pode falhar por validação ou por ser muito longo
        assert response.status_code in [400, 422, 500]
    
    def test_conversation_requires_user_message(self):
        """Verifica se conversa requer pelo menos uma mensagem de usuário."""
        response = client.post(
            "/api/v1/chat/conversation",
            json={
                "messages": [
                    {
                        "role": "system",
                        "content": "Você é um assistente"
                    }
                ]
            }
        )
        assert response.status_code == 400
