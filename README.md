# AdmEdif

Plataforma para **administración de edificios** y **corretaje de propiedades**.

El proyecto está diseñado como una base sólida para operar dos dominios relacionados en una sola solución:

- **Administración de comunidades y edificios**: usuarios, edificios, unidades y residentes.
- **Gestión comercial inmobiliaria**: propiedades, leads y seguimiento comercial.

Actualmente el repositorio incluye una **API backend en NestJS**, un **modelo de datos Prisma/PostgreSQL**, soporte para **modo cloud sin Docker** y una base de **infraestructura local con Docker Compose**.

## Estado actual

### Implementado

- API backend con **NestJS 11** + **TypeScript 5**
- ORM con **Prisma 5** sobre **PostgreSQL**
- Autenticación con **JWT**
- Control de acceso por roles
- Módulos funcionales:
  - `auth`
  - `users`
  - `buildings`
  - `units`
  - `properties`
  - `leads`
- Infraestructura local con `docker-compose.yml`
- Modo alternativo **sin Docker** con servicios gestionados
- CI inicial con GitHub Actions
- Migración inicial de base de datos
- Seed de usuario `SUPER_ADMIN`

### Pendiente / siguiente fase

- Frontend web
- Documentación OpenAPI / Swagger
- Seeds adicionales por entorno
- Pruebas automatizadas de negocio
- Carga de documentos a storage S3-compatible
- Observabilidad operativa integrada en backend

## Stack técnico

### Backend

- **NestJS 11**
- **TypeScript 5**
- **Prisma 5**
- **PostgreSQL**
- **Passport + JWT**
- **class-validator / class-transformer**

### Infraestructura y soporte

- **Docker Compose** para entorno local completo
- **Redis** para caché/colas (preparado a nivel de entorno)
- **MinIO / S3-compatible** para documentos
- **Mailpit / SMTP sandbox** para correo en desarrollo
- **Prometheus + Grafana** para observabilidad base

### Modo cloud sin Docker

Recomendado cuando no se puede usar Docker en la máquina local:

- **Neon / Supabase / Azure Database for PostgreSQL** para base de datos
- **Upstash / Redis Cloud** para Redis
- **Cloudflare R2 / AWS S3 / B2 S3** para documentos
- **Mailtrap / Resend / SendGrid** para correo

Más detalle en `docs/infra-no-docker.md`.

## Estructura del repositorio

```text
AdmEdif/
├─ backend/                  # API NestJS + Prisma
├─ docs/                     # Documentación funcional y técnica
├─ infra/                    # Configuración de observabilidad
├─ scripts/                  # Scripts de validación de entorno
├─ docker-compose.yml        # Stack local con Docker
├─ .env.example              # Variables para modo local
└─ .env.cloud.example        # Variables para modo cloud
```

## Dominios funcionales

### Administración de edificios

- **Users**: gestión de usuarios internos y residentes
- **Buildings**: edificios/comunidades administradas
- **Units**: unidades asociadas a edificios
- **Residents**: ocupación histórica y vigente por unidad

### Corretaje inmobiliario

- **Properties**: catálogo de propiedades en venta o arriendo
- **Leads**: interesados, seguimiento y cambio de etapa comercial

## Roles del sistema

Los roles definidos actualmente en la base de datos son:

- `SUPER_ADMIN`
- `BUILDING_ADMIN`
- `AGENT`
- `CONCIERGE`
- `OWNER`
- `RESIDENT`

## Modelo de datos actual

Las entidades principales son:

- `User`
- `Building`
- `Unit`
- `Resident`
- `Property`
- `Lead`

Resumen conceptual:

- Un **Building** tiene muchas **Unit**.
- Una **Unit** puede tener un **owner** (`User`) y múltiples **Resident**.
- Un **Resident** relaciona un **User** con una **Unit** durante un periodo.
- Una **Property** puede tener múltiples **Lead**.
- Un **Lead** puede estar asignado a un agente (`User`).

## API backend

- Prefijo global: `api/v1`
- Puerto por defecto: `4000`
- Base URL local: `http://localhost:4000/api/v1`

Consulta el detalle de endpoints y reglas de acceso en `docs/backend-api.md`.

## Puesta en marcha

### Opción A: modo cloud sin Docker

Esta es la opción recomendada actualmente para este proyecto.

1. Copiar `.env.cloud.example` a `.env.cloud`
2. Completar variables reales de entorno
3. Validar configuración:

   `powershell -ExecutionPolicy Bypass -File .\scripts\check-infra-cloud.ps1`

4. Instalar dependencias del backend:

   `cd backend && npm install`

5. Ejecutar migraciones:

   `cd backend && npx prisma migrate dev`

6. Ejecutar seed inicial:

   `cd backend && npm run db:seed`

7. Levantar backend:

   `cd backend && npm run start:dev`

### Opción B: modo local con Docker

Si tu máquina sí soporta Docker:

1. Revisar `.env`
2. Levantar servicios:

   `docker compose up -d`

3. Verificar estado:

   `docker compose ps`

## Variables de entorno importantes

### Requeridas para backend

- `DATABASE_URL`
- `JWT_SECRET`
- `ENCRYPTION_KEY`
- `CORS_ORIGIN`

### Requeridas para entorno cloud completo

- `REDIS_URL`
- `S3_ENDPOINT`
- `S3_REGION`
- `S3_BUCKET`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`

## Usuario inicial

El proyecto incluye un seed base con un usuario administrador inicial:

- **Email**: `admin@admedif.local`
- **Password inicial**: `Admin1234!`

> Cambia esta contraseña apenas exista flujo de administración o recovery. La contraseña por defecto es útil para arrancar; para seguridad real, da más miedo que una reunión sin agenda.

## Endpoints de servicios locales con Docker

- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- MinIO API: `http://localhost:9000`
- MinIO Console: `http://localhost:9001`
- Mailpit UI: `http://localhost:8025`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000`

## Calidad y validaciones

### Scripts útiles del backend

- `npm run build`
- `npm run start:dev`
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:migrate:prod`
- `npm run db:seed`
- `npm run db:studio`

### Scripts de soporte del repositorio

- `scripts/check-infra.ps1`
- `scripts/check-infra-cloud.ps1`

## CI

La pipeline de GitHub Actions valida dos escenarios:

- **infra-lint-docker**: presencia de archivos y consistencia del entorno Docker
- **infra-lint-cloud**: consistencia de variables requeridas para modo cloud

## Documentación relacionada

- `docs/backend-api.md` — endpoints, autenticación y ejemplos
- `docs/infra-no-docker.md` — guía para operar sin Docker

## Roadmap sugerido

1. Crear frontend en Next.js
2. Agregar Swagger/OpenAPI
3. Implementar refresh tokens / sesiones robustas
4. Incorporar módulos de pagos, gastos comunes y documentos
5. Añadir auditoría y trazabilidad operativa
6. Preparar despliegue de staging y producción
