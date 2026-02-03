# Script: corrigir push rejeitado por arquivos grandes (videos)
# Converte os .mp4 em public/videos/ para Git LFS e reescreve o historico.
# Execute na pasta do repositorio: .\fix-lfs.ps1
# Antes: copie os .mp4 de src/assets/videos/ para public/videos/

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

# 3. Converter videos no historico para LFS (reescreve commits)
Write-Host "`nConvertendo videos para LFS no historico (pode demorar)..." -ForegroundColor Green
git lfs migrate import --include="public/videos/*.mp4" --everything

Write-Host "`n=== Pronto. Agora rode: git push --force origin main ===" -ForegroundColor Cyan
