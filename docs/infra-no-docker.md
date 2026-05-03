# Infraestructura alternativa sin Docker

Si no puedes instalar Docker en la máquina de desarrollo, puedes operar con servicios gestionados en la nube y mantener el código local.

## Arquitectura recomendada (dev/staging)

- **PostgreSQL gestionado** (Neon / Supabase / Azure Database for PostgreSQL)
- **Redis gestionado** (Upstash / Redis Cloud / Azure Cache for Redis)
- **Storage S3-compatible** (Cloudflare R2 / AWS S3 / B2 S3)
- **SMTP sandbox** (Mailtrap)
- **Observabilidad** (Sentry o Grafana Cloud)

## Flujo de setup

1. Copiar `.env.cloud.example` a `.env.cloud`
2. Completar credenciales reales
3. Ejecutar validación:
   - `powershell -ExecutionPolicy Bypass -File .\scripts\check-infra-cloud.ps1`
4. Levantar backend/frontend local apuntando a `.env.cloud`

## Buenas prácticas mínimas

- Usar credenciales separadas por entorno (`dev`, `staging`, `prod`)
- Forzar TLS en DB/Redis/Storage
- Rotar secretos cada 90 días
- Activar backups automáticos en DB
- Configurar alertas de disponibilidad y errores 5xx

## Costos controlados (modo MVP)

- Empezar con tiers gratuitos o básicos
- Limitar retención de logs/metrics
- Evitar alta disponibilidad en `dev` (sí en `prod`)
