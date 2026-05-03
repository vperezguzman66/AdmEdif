$ErrorActionPreference = 'Stop'

Write-Host 'Validando configuración sin Docker (cloud)...'

$requiredVars = @(
  'DATABASE_URL',
  'REDIS_URL',
  'S3_ENDPOINT',
  'S3_BUCKET',
  'S3_ACCESS_KEY',
  'S3_SECRET_KEY',
  'JWT_SECRET',
  'ENCRYPTION_KEY'
)

$envFile = '.env.cloud'
if (-not (Test-Path $envFile)) {
  Write-Error "No existe $envFile. Crea uno basado en .env.cloud.example"
}

$content = Get-Content $envFile -Raw

foreach ($name in $requiredVars) {
  $pattern = "(?m)^$name=(.+)$"
  $match = [regex]::Match($content, $pattern)

  if (-not $match.Success) {
    Write-Error "Falta variable requerida: $name"
  }

  $value = $match.Groups[1].Value.Trim()
  if ([string]::IsNullOrWhiteSpace($value) -or $value -like 'CHANGE_ME*') {
    Write-Error "Variable no configurada correctamente: $name"
  }
}

Write-Host 'Verificando formato de URLs...'

$urlChecks = @('DATABASE_URL', 'REDIS_URL', 'S3_ENDPOINT')
foreach ($name in $urlChecks) {
  $pattern = "(?m)^$name=(.+)$"
  $match = [regex]::Match($content, $pattern)
  $value = $match.Groups[1].Value.Trim()

  if ($name -eq 'DATABASE_URL' -and $value -notmatch '^postgres(ql)?://') {
    Write-Error 'DATABASE_URL debe comenzar con postgres:// o postgresql://'
  }

  if ($name -eq 'REDIS_URL' -and $value -notmatch '^redis(s)?://') {
    Write-Error 'REDIS_URL debe comenzar con redis:// o rediss://'
  }

  if ($name -eq 'S3_ENDPOINT' -and $value -notmatch '^https?://') {
    Write-Error 'S3_ENDPOINT debe comenzar con http:// o https://'
  }
}

Write-Host 'OK: configuración cloud sin Docker válida.'
