# AdmEdif - Infraestructura Base

Esta base de infraestructura está pensada para acelerar el desarrollo del producto de:

- Administración de edificios
- Corretaje de propiedades

Incluye servicios de soporte para desarrollo, pruebas funcionales y observabilidad inicial.

> Si no puedes instalar Docker en tu máquina, usa el modo **sin Docker** descrito en `docs/infra-no-docker.md`.

## Servicios incluidos

- **PostgreSQL**: base de datos principal
- **Redis**: caché/colas y sesiones
- **MinIO**: almacenamiento tipo S3 para documentos/contratos
- **Mailpit**: SMTP local para pruebas de email
- **Prometheus + Grafana**: monitoreo inicial
- **Postgres Exporter + cAdvisor**: métricas técnicas

## Requisitos

- Docker Desktop (Windows)
- Docker Compose v2

## Alternativa recomendada sin Docker

Cuando Docker no está disponible, utiliza servicios gestionados y desarrolla localmente con variables cloud:

1. Copiar `.env.cloud.example` a `.env.cloud`
2. Completar credenciales de PostgreSQL/Redis/S3/SMTP
3. Validar configuración:

   `powershell -ExecutionPolicy Bypass -File .\scripts\check-infra-cloud.ps1`

4. Configurar backend/frontend para leer `.env.cloud`

Guía detallada: `docs/infra-no-docker.md`.

## Arranque rápido

1. Revisar y ajustar secretos en `.env`
2. Levantar servicios:

   `docker compose up -d`

3. Verificar estado:

   `docker compose ps`

## Endpoints locales

- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- MinIO API: `http://localhost:9000`
- MinIO Console: `http://localhost:9001`
- Mailpit UI: `http://localhost:8025`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000`

## Entornos sugeridos

- **dev**: compose local + datos de prueba
- **staging**: nube administrada (DB y storage gestionados)
- **prod**: nube administrada + backup + alertas + seguridad reforzada

## Siguiente iteración recomendada

1. Añadir servicio backend (API) y frontend
2. Agregar migraciones de base de datos
3. Incorporar pruebas automáticas y escaneo de seguridad
4. Crear IaC para staging/prod (Terraform/Bicep según nube)
