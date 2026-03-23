@echo off
REM Script para setup inicial do backend (Windows)

echo.
echo 🚀 Configurando Backend - Salao da Nyra
echo.

REM Criar arquivo .env
if not exist .env (
    echo 📝 Criando arquivo .env...
    copy .env.example .env
    echo ✅ .env criado! Edite com suas configuracoes.
) else (
    echo ⚠️  Arquivo .env ja existe.
)

echo.
echo 🐍 Criando ambiente virtual Python...

REM Criar venv
if not exist venv (
    python -m venv venv
    echo ✅ Ambiente virtual criado!
) else (
    echo ⚠️  Ambiente virtual ja existe.
)

echo.
echo 📦 Ativando ambiente virtual e instalando dependencias...

REM Ativar venv e instalar dependências
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt

echo.
echo.
echo ✨ Setup concluido!
echo.
echo Para executar o servidor:
echo   1. venv\Scripts\activate.bat
echo   2. uvicorn main:app --reload
echo.
echo Ou acesse http://localhost:8000/api/docs
echo.
pause
