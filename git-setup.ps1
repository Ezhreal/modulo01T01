# Script para configurar Git e fazer push inicial
# Execute este script no PowerShell

$ErrorActionPreference = "Stop"

# Remover lock file se existir
if (Test-Path ".git\index.lock") {
    Remove-Item -Force ".git\index.lock"
    Write-Host "Arquivo lock removido"
}

# Reset staging area
git reset
Write-Host "Staging area resetado"

# Adicionar arquivos (respeitando .gitignore)
git add .
Write-Host "Arquivos adicionados"

# Fazer commit
git commit -m "Initial commit"
Write-Host "Commit criado com sucesso!"

# Fazer push
Write-Host "Fazendo push para o repositório..."
git push -u origin main
Write-Host "Push concluído!"

Write-Host "`n✅ Pronto! Agora configure o GitHub Pages:"
Write-Host "1. Vá em Settings > Pages"
Write-Host "2. Selecione branch: gh-pages"
Write-Host "3. O workflow fará o deploy automaticamente"
