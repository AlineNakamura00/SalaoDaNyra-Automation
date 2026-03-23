# 🔒 SEGURANÇA DO PROJETO

## ⚠️ Arquivos Sensíveis

Os seguintes arquivos **NÃO** devem ser commitados:

### ❌ NÃO COMMITAR:
```
.env                 # Contém suas chaves de API
.env.local          # Variáveis locais
salao_nyra.db       # Banco de dados com dados reais
venv/               # Ambiente virtual Python
node_modules/       # Pacotes Node.js
.idea/              # IDE settings
.vscode/            # VS Code settings
```

### ✅ SEGURO COMMITAR:
```
.env.example        # Template (sem chaves reais)
requirements.txt    # Dependências Python
package.json        # Dependências Node.js
src/                # Código-fonte
```

---

## 🔐 Protegido pelo .gitignore

O projeto inclui `.gitignore` completo que protege:
- ✅ Arquivos `.env`
- ✅ Diretórios `venv/` e `node_modules/`
- ✅ Bancos de dados (`.db`, `.sqlite`)
- ✅ Arquivos temporários e caches
- ✅ Configurações de IDE

---

## 📋 Checklist Antes de Fazer Push

```
☑️ Nem suas APIs vão vazar (arquivo .env ignorado)
☑️ Banco de dados local não vai ser commitado
☑️ node_modules e venv não vão sujar o repo
☑️ Apenas código-fonte e documentação no Git
```

---

## 🚀 Como Configurar Localmente

```bash
# 1. Clonar
git clone seu-repositorio

# 2. Backend
cd backend
cp .env.example .env
# Editar .env e colocar OPENROUTER_API_KEY

# 3. Frontend  
cd ../frontend
npm install
```

---

## ✅ Deixe Seguro Agora

Se ainda não commitou:

```bash
# Verificar o que vai ser commitado
git status

# Se .env está lá, remover do git
git rm --cached .env

# Confirmar .gitignore está correto
git status

# Fazer commit
git add .
git commit -m "feat: setup inicial com FastAPI, SQLite e Next.js"
git push
```

---

## 🛡️ Proteções Implementadas

✅ `.gitignore` com 60+ padrões de proteção
✅ `.env.example` como template seguro
✅ Banco de dados local não versionado
✅ Chaves de API sempre no template (não no código)

**Repositório 100% seguro!** 🎉
