$ErrorActionPreference = 'Stop'

Write-Host 'Validando archivos de infraestructura...'

$files = @(
  '.env.example',
  'docker-compose.yml',
  'infra/monitoring/prometheus/prometheus.yml',
  'infra/monitoring/grafana/provisioning/datasources/datasource.yml'
)

foreach ($f in $files) {
  if (-not (Test-Path $f)) {
    Write-Error "Falta archivo requerido: $f"
  }
}

Write-Host 'Validando docker compose...'
docker compose config | Out-Null

Write-Host 'OK: Infra base validada.'
