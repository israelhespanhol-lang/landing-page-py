# Script de Empacotamento para Deploy - HostGator
$ErrorActionPreference = "Stop"

$currentDir = Get-Location
$tempDir = Join-Path $env:TEMP ("hostgator_deploy_" + (Get-Random))
$zipOutput = Join-Path $currentDir "site-pronto-hostgator.zip"

Write-Host "Preparando arquivos para deploy na HostGator..." -ForegroundColor Cyan

# Cria diretorio temporario
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempDir "assets") -Force | Out-Null

# Copia arquivos estaticos
$filesToCopy = @(
    "index.html",
    "styles.css",
    "experience.css",
    "experience.js",
    "gatekeeper.css",
    "gatekeeper.js",
    "script.js",
    ".htaccess"
)

foreach ($file in $filesToCopy) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination $tempDir -Force
        Write-Host "  OK: $file" -ForegroundColor Green
    }
}

# Copia assets
if (Test-Path "assets") {
    Copy-Item -Path "assets\*" -Destination (Join-Path $tempDir "assets") -Recurse -Force
    Write-Host "  OK: assets/" -ForegroundColor Green
}

# Remove zip antigo
if (Test-Path $zipOutput) {
    Remove-Item $zipOutput -Force
}

# Compacta tudo
Write-Host "Compactando arquivos para site-pronto-hostgator.zip..." -ForegroundColor Cyan
Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $zipOutput -Force

# Limpa diretorio temporario
Remove-Item -Path $tempDir -Recurse -Force

$zipSize = (Get-Item $zipOutput).Length / 1KB
Write-Host "Pacote gerado com sucesso!" -ForegroundColor Green
Write-Host "Arquivo: site-pronto-hostgator.zip ($([math]::Round($zipSize, 1)) KB)" -ForegroundColor White
