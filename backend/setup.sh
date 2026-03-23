#!/bin/bash
# Script para setup inicial do backend

echo "🚀 Configurando Backend - Salão da Nyra"
echo ""

# Criar arquivo .env
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "✅ .env criado! Edite com suas configurações."
else
    echo "⚠️  Arquivo .env já existe."
fi

echo ""
echo "🐍 Criando ambiente virtual Python..."

# Criar venv
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Ambiente virtual criado!"
else
    echo "⚠️  Ambiente virtual já existe."
fi

echo ""
echo "📦 Ativando ambiente virtual e instalando dependências..."

# Ativar venv e instalar dependências
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo ""
echo "✨ Setup concluído!"
echo ""
echo "Para executar o servidor:"
echo "  1. source venv/bin/activate"
echo "  2. uvicorn main:app --reload"
echo ""
echo "Ou acesse http://localhost:8000/api/docs"
