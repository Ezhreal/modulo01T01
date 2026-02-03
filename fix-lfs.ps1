# Script: corrigir push rejeitado por arquivos grandes (vídeos)
# Remove os .mp4 do historico e re-adiciona com Git LFS.
# Execute na pasta do repositorio: .\fix-lfs.ps1

Write-Host "=== Corrigindo videos para Git LFS ===" -ForegroundColor Cyan

# 1. Verificar se Git LFS esta instalado
try {
    git lfs version | Out-Null
} catch {
    Write-Host "ERRO: Git LFS nao esta instalado." -ForegroundColor Red
    Write-Host "Instale em: https://git-lfs.github.com" -ForegroundColor Yellow
    Write-Host "Ou no Windows: winget install GitHub.GitLfs" -ForegroundColor Yellow
    exit 1
}

# 2. Ativar LFS no repositorio
Write-Host "`nAtivando Git LFS no repo..." -ForegroundColor Green
git lfs install

# 3. Remover os videos de TODO o historico (assim o push aceita)
Write-Host "`nRemovendo videos do historico (pode demorar)..." -ForegroundColor Green
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch src/assets/videos/P03_JOVEM.mp4 src/assets/videos/P1_JOVEM.mp4 src/assets/videos/P2_JOVEM.mp4 src/assets/videos/P1_CRIANCA.mp4 src/assets/videos/P1_IDOSO.mp4" --prune-empty --tag-name-filter cat -- --all

# 4. Adicionar .gitattributes e videos com LFS
Write-Host "`nAdicionando .gitattributes e videos com LFS..." -ForegroundColor Green
git add .gitattributes
git add src/assets/videos/
git add .
git status

# 5. Commit com os videos em LFS
Write-Host "`nCriando commit com videos em LFS..." -ForegroundColor Green
git commit -m "Adiciona videos com Git LFS"

Write-Host "`n=== Pronto. Agora rode: git push ===" -ForegroundColor Cyan
