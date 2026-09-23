# Sincroniza os commits automaticamente com o repositório remoto
Write-Host "Iniciando sincronização automática com o Git..." -ForegroundColor Cyan

git add .

$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nenhuma alteração para commitar." -ForegroundColor Yellow
    exit
}

$commitMsg = Read-Host "Digite a mensagem do commit (Pressione Enter para usar a mensagem padrão)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Atualização automática de arquivos"
}

git commit -m $commitMsg

Write-Host "Enviando alterações para o repositório remoto..." -ForegroundColor Cyan
git push

Write-Host "Sincronização concluída!" -ForegroundColor Green
