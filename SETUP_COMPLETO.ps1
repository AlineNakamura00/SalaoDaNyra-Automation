param(
    [switch]$Backend,
    [switch]$Frontend,
    [switch]$All
)

# Se nenhuma opção for escolhida, fazer ambas
if (-not $Backend -and -not $Frontend -and -not $All) {
    $All = $true
}

Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🚀 SETUP COMPLETO - SALÃO DA NYRA AUTOMATION" -ForegroundColor Cyan
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# BACKEND SETUP (Python + FastAPI)
# ============================================================================

if ($Backend -or $All) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "  🐍 CONFIGURANDO BACKEND (Python)" -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""

    Set-Location "$PSScriptRoot\backend"

    # 1. Verificar se venv já existe
    if (Test-Path "venv") {
        Write-Host "✅ venv já existe, pulando criação..." -ForegroundColor Yellow
    } else {
        Write-Host "📦 Criando ambiente virtual Python..." -ForegroundColor Yellow
        python -m venv venv
        Write-Host "✅ venv criado com sucesso!" -ForegroundColor Green
    }

    Write-Host ""

    # 2. Ativar venv
    Write-Host "🔌 Ativando venv..." -ForegroundColor Yellow
    & ".\venv\Scripts\Activate.ps1"
    Write-Host "✅ venv ativado!" -ForegroundColor Green

    Write-Host ""

    # 3. Instalar requirements
    Write-Host "📥 Instalando dependências Python..." -ForegroundColor Yellow
    pip install -r requirements.txt -q
    Write-Host "✅ Dependências instaladas!" -ForegroundColor Green

    Write-Host ""

    # 4. Verificar .env
    if (Test-Path ".env") {
        Write-Host "⚠️  .env já existe. Verifique se tem OPENROUTER_API_KEY preenchida!" -ForegroundColor Yellow
    } else {
        Write-Host "📝 Criando arquivo .env..." -ForegroundColor Yellow
        if (Test-Path ".env.example") {
            Copy-Item ".env.example" ".env"
            Write-Host "✅ .env criado a partir de .env.example" -ForegroundColor Green
        }
    }

    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "  ✅ Backend configurado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Para iniciar o servidor:" -ForegroundColor Cyan
    Write-Host "  cd backend" -ForegroundColor Yellow
    Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor Yellow
    Write-Host "  uvicorn main:app --reload" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Acesse: http://localhost:8000/api/docs" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""
}

# ============================================================================
# FRONTEND SETUP (Node.js + Next.js)
# ============================================================================

if ($Frontend -or $All) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "  ⚛️  CONFIGURANDO FRONTEND (Next.js)" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""

    Set-Location "$PSScriptRoot\frontend"

    # 1. Verificar se pnpm está instalado
    $pnpmCheck = Get-Command pnpm -ErrorAction SilentlyContinue
    if (-not $pnpmCheck) {
        Write-Host "⚠️  pnpm não está instalado globalmente" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Opções:" -ForegroundColor Cyan
        Write-Host "1️⃣  Usar npm (padrão do Node.js):" -ForegroundColor Yellow
        Write-Host "    npm install" -ForegroundColor White
        Write-Host ""
        Write-Host "2️⃣  Instalar pnpm globalmente:" -ForegroundColor Yellow
        Write-Host "    npm install -g pnpm" -ForegroundColor White
        Write-Host "    pnpm install" -ForegroundColor White
        Write-Host ""

        # Usar npm por padrão
        $packageManager = "npm"
        Write-Host "➡️  Usando npm como gerenciador padrão..." -ForegroundColor Cyan
    } else {
        $packageManager = "pnpm"
    }

    Write-Host ""

    # 2. Instalar dependências
    Write-Host "📥 Instalando dependências Node.js..." -ForegroundColor Yellow
    & $packageManager install -q
    Write-Host "✅ Dependências instaladas!" -ForegroundColor Green

    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "  ✅ Frontend configurado com sucesso!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Para iniciar o servidor:" -ForegroundColor Cyan
    Write-Host "  cd frontend" -ForegroundColor Yellow
    Write-Host "  $packageManager run dev" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Acesse: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
}

# ============================================================================
# RESUMO FINAL
# ============================================================================

if ($Backend -or $Frontend -or $All) {
    Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "  ✨ SETUP COMPLETO!" -ForegroundColor Magenta
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""
Write-Host "📋 Próximos Passos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Terminal 1: Rodar Backend" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "   uvicorn main:app --reload" -ForegroundColor White
Write-Host ""
Write-Host "2️⃣  Terminal 2: Rodar Frontend" -ForegroundColor Yellow
Write-Host "   cd frontend" -ForegroundColor White
Write-Host "   npm run dev        (ou: pnpm run dev)" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs de Acesso:" -ForegroundColor Green
Write-Host "   Frontend:     http://localhost:3000" -ForegroundColor White
Write-Host "   Backend API:  http://localhost:8000" -ForegroundColor White
Write-Host "   Documentação: http://localhost:8000/api/docs" -ForegroundColor White
Write-Host ""
Write-Host "══════════════════════════════════════════════════════════" -ForegroundColor Magenta
}
