# API Backend de AdmEdif

Guía rápida de autenticación, módulos y endpoints disponibles en la API actual.

## Base URL

- Local: `http://localhost:4000/api/v1`
- Prefijo global: `api/v1`

## Autenticación

La API usa **JWT Bearer Token**.

### Flujo básico

1. Iniciar sesión en `POST /auth/login`
2. Obtener token JWT
3. Enviar encabezado:

   `Authorization: Bearer <token>`

4. Consumir endpoints protegidos según rol

## Usuario inicial de desarrollo

- Email: `admin@admedif.local`
- Password: `Admin1234!`
- Rol: `SUPER_ADMIN`

## Roles soportados

- `SUPER_ADMIN`
- `BUILDING_ADMIN`
- `AGENT`
- `CONCIERGE`
- `OWNER`
- `RESIDENT`

## Módulos y endpoints

### Auth

#### `POST /auth/login`

Inicia sesión y devuelve un JWT.

Ejemplo de body:

```json
{
  "email": "admin@admedif.local",
  "password": "Admin1234!"
}
```

#### `GET /auth/me`

Devuelve el usuario autenticado.

- Requiere JWT: Sí
- Roles: cualquier usuario autenticado

### Users

#### `POST /users`

Crea un usuario.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `BUILDING_ADMIN`

#### `GET /users`

Lista usuarios.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `BUILDING_ADMIN`

#### `GET /users/:id`

Obtiene detalle de un usuario.

- Requiere JWT: Sí
- Roles: cualquier usuario autenticado

#### `DELETE /users/:id`

Desactiva un usuario.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`

### Buildings

#### `POST /buildings`

Crea un edificio.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `BUILDING_ADMIN`

#### `GET /buildings`

Lista edificios.

- Requiere JWT: Sí
- Roles: cualquier usuario autenticado

#### `GET /buildings/:id`

Obtiene detalle de un edificio.

- Requiere JWT: Sí
- Roles: cualquier usuario autenticado

#### `PUT /buildings/:id`

Actualiza un edificio.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `BUILDING_ADMIN`

#### `DELETE /buildings/:id`

Elimina un edificio.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`

### Units

#### `POST /units`

Crea una unidad.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `BUILDING_ADMIN`

#### `GET /units/building/:buildingId`

Lista unidades de un edificio.

- Requiere JWT: Sí
- Roles: cualquier usuario autenticado

#### `GET /units/:id`

Obtiene detalle de una unidad.

- Requiere JWT: Sí
- Roles: cualquier usuario autenticado

#### `DELETE /units/:id`

Elimina una unidad.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`

### Properties

#### `POST /properties`

Crea una propiedad para corretaje.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `AGENT`

#### `GET /properties`

Lista propiedades. Soporta filtros simples por query string.

Parámetros opcionales:

- `operation`
- `city`

Ejemplo:

`GET /properties?operation=SALE&city=Santiago`

- Requiere JWT: No
- Roles: público

#### `GET /properties/:id`

Obtiene detalle de una propiedad.

- Requiere JWT: No
- Roles: público

#### `DELETE /properties/:id`

Elimina una propiedad.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`

### Leads

#### `POST /leads`

Crea un lead.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `AGENT`

#### `GET /leads`

Lista leads.

Comportamiento:

- Si el usuario es `AGENT`, solo ve sus propios leads.
- Si el usuario es `SUPER_ADMIN`, puede filtrar por `agentId`.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `AGENT`

#### `GET /leads/:id`

Obtiene detalle de un lead.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `AGENT`

#### `PATCH /leads/:id/stage`

Actualiza la etapa del lead.

- Requiere JWT: Sí
- Roles: `SUPER_ADMIN`, `AGENT`

## Validación y comportamiento global

La aplicación tiene configuración global de NestJS para:

- `ValidationPipe` con `whitelist`
- `forbidNonWhitelisted`
- `transform`
- filtro global de excepciones
- interceptor de logging
- CORS configurable por `CORS_ORIGIN`

## Ejemplo de arranque local

1. Configurar `.env.cloud` o `.env`
2. Instalar dependencias en `backend/`
3. Ejecutar migraciones
4. Ejecutar seed
5. Levantar API con `npm run start:dev`

## Próximas mejoras recomendadas de API

- Swagger / OpenAPI
- versionado formal de DTOs
- paginación en listados
- filtros avanzados en `properties` y `leads`
- refresh tokens
- auditoría de cambios