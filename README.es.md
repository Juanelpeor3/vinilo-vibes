<div align="center">

# Vinilo Vibes

### El Sonido Original Vive en el Vinilo.

![Angular](https://img.shields.io/badge/Angular-v21-dd0031?style=for-the-badge&logo=angular&logoColor=white)
![.NET](https://img.shields.io/badge/.NET_10-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-3F51B5?style=for-the-badge&logo=angular&logoColor=white)
<br />
![TypeDoc](https://img.shields.io/badge/TypeDoc-406C59?style=for-the-badge&logo=typedoc&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
<br />
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)

[![CI](https://github.com/Juanelpeor3/vinilo-vibes/actions/workflows/ci.yml/badge.svg)](https://github.com/Juanelpeor3/vinilo-vibes/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Juanelpeor3/vinilo-vibes/blob/master/LICENSE.md)

---

[Demo en vivo](https://vinilo-vibes.vercel.app/) | [API (Swagger)](https://vinilo-vibes-api.onrender.com/swagger) |
[TypeDoc](https://vinilo-vibes.vercel.app/documentation/index.html)

**Español** | [English](README.md)

</div>

## Sobre el proyecto

Vinilo Vibes es una tienda online de vinilos con un frontend en Angular y un backend propio en ASP.NET Core. El proyecto demuestra un flujo completo de e-commerce: catálogo con filtros por género, carrito persistido en base de datos, checkout con control de stock, autenticación JWT con roles y panel de administración.

### Arquitectura

```
┌─────────┐ HTTP/JSON ┌──────────┐ EF Core ┌────────────┐
│ Angular ├──────────>│ .NET API ├────────>│ PostgreSQL │
└─────────┘           └──────────┘         └────────────┘
```

El usuario navega al frontend en Vercel, que hace peticiones HTTP/JSON a la API en Render. La API accede a PostgreSQL mediante Entity Framework Core.

El frontend es una SPA en Angular que consume una API REST. El backend sigue una arquitectura por capas:

```
Controllers  ->  Services  ->  Repositories  ->  DbContext (EF Core)  ->  PostgreSQL
```

### Funcionalidades

- Catálogo de vinilos con filtrado por género y buscador
- Fichas de producto con valoraciones (rating con estrellas)
- Carrito de compra persistido por usuario
- Checkout con validación de stock y generación de pedidos
- Historial de pedidos en el perfil del usuario
- Panel de administración (CRUD de vinilos)
- Autenticación con JWT y roles (admin / user)
- Renderizado eficiente con Angular Signals

## Stack tecnologico

| Capa | Tecnologia |
|---|---|
| Frontend | Angular 21, Angular Material, TypeScript 5.9, RxJS |
| Backend | ASP.NET Core 10, Entity Framework Core 10, ASP.NET Identity |
| Base de datos | PostgreSQL (Npgsql) |
| Autenticacion | JWT Bearer tokens con roles |
| Testing backend | xUnit + Moq (37 tests) |
| Documentacion frontend | TypeDoc |
| CI/CD | GitHub Actions |
| Deploy frontend | Vercel |
| Deploy backend | Render (Docker) |
| Contenedores | Docker + docker-compose |

## Estructura del repositorio

```
vinilo-vibes/
├── frontend/                          # Angular SPA
│   └── src/
│       ├── app/
│       │   ├── pages/                 # Home, catálogo, detalle, carrito, perfil, admin
│       │   ├── services/              # Auth, Vinyl, Cart, Order, Profile
│       │   ├── guards/                # authGuard, roleGuard
│       │   ├── interceptors/          # JWT auth interceptor
│       │   └── shared/                # Componentes, modelos, pipes
│       └── environments/
├── backend/
│   ├── ViniloVibes.Api/               # ASP.NET Core Web API
│   │   ├── Controllers/               # Auth, Vinyls, Genres, Cart, Orders
│   │   ├── Services/                  # Lógica de negocio
│   │   ├── Repositories/              # Acceso a datos
│   │   ├── Models/                    # Entidades EF Core
│   │   ├── DTOs/                      # Data Transfer Objects
│   │   ├── Data/                      # DbContext, migraciones, seed
│   │   └── Program.cs
│   ├── ViniloVibes.Tests/             # Tests unitarios (xUnit + Moq)
│   └── Dockerfile
├── .github/workflows/ci.yml          # CI pipeline
├── docker-compose.yml
└── PLAN.md
```

## Instalacion local

### Prerrequisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org/) con [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (para PostgreSQL local)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Juanelpeor3/vinilo-vibes.git
cd vinilo-vibes
```

### 2. Levantar PostgreSQL con Docker

```bash
docker-compose up -d db
```

### 3. Iniciar el backend

```bash
cd backend/ViniloVibes.Api
dotnet run
```

La API arranca en `http://localhost:5196` con Swagger UI disponible en `/swagger`.
Las migraciones se aplican automaticamente al iniciar.

### 4. Iniciar el frontend

```bash
cd frontend
pnpm install
pnpm start
```

Navega a `http://localhost:4200`.

### Alternativa: backend con Docker

```bash
docker-compose up
```

Levantamos el frontend y navegaremos a `http://localhost:4200`.
```bash
cd frontend
pnpm install
pnpm start
```

## API Endpoints

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesion | No |
| GET | `/api/vinyls` | Listar vinilos | No |
| GET | `/api/vinyls/{id}` | Detalle de vinilo | No |
| GET | `/api/vinyls/genre/{genreId}` | Filtrar por genero | No |
| POST | `/api/vinyls` | Crear vinilo | Admin |
| PUT | `/api/vinyls/{id}` | Actualizar vinilo | Admin |
| DELETE | `/api/vinyls/{id}` | Eliminar vinilo | Admin |
| GET | `/api/genres` | Listar generos | No |
| GET | `/api/cart` | Ver carrito | User |
| POST | `/api/cart` | Anadir al carrito | User |
| PUT | `/api/cart/{vinylId}` | Actualizar cantidad | User |
| DELETE | `/api/cart/{vinylId}` | Eliminar item | User |
| DELETE | `/api/cart` | Vaciar carrito | User |
| POST | `/api/orders/checkout` | Realizar pedido | User |
| GET | `/api/orders` | Historial de pedidos | User |
| GET | `/api/orders/{id}` | Detalle de pedido | User |

## Variables de entorno (backend)

| Variable | Descripcion |
|---|---|
| `ConnectionStrings__DefaultConnection` | Cadena de conexion PostgreSQL (formato ADO.NET) |
| `Jwt__Key` | Clave secreta para firmar tokens JWT |
| `Jwt__Issuer` | Emisor del token (ej. `ViniloVibes`) |
| `Jwt__Audience` | Audiencia del token (ej. `ViniloVibes`) |
| `Admin__Email` | Email del administrador |
| `Admin__Password` | Password del administrador |
| `User__Email` | Email del usuario de prueba |
| `User__Password` | Password del usuario de prueba |

## Cuentas de prueba

| Rol  |      Email       | Password |
|------|------------------|----------|
| User | user@example.com | User123  |

## Tests

```bash
# Backend (37 tests)
cd backend
dotnet test
```

## Documentacion (TypeDoc)

La documentacion del frontend se genera automaticamente a partir de los comentarios TSDoc del codigo TypeScript.

```bash
cd frontend
pnpm run docs
```

Los archivos generados se almacenan en `dist/vinilo-vibes/browser/documentation` y se despliegan junto al frontend en Vercel.

## Despliegue

| Servicio | Plataforma | URL |
|---|---|---|
| Frontend | Vercel | https://vinilo-vibes.vercel.app |
| Backend API | Render | https://vinilo-vibes-api.onrender.com |
| TypeDoc | Vercel | https://vinilo-vibes.vercel.app/documentation/index.html |
| Base de datos | Render PostgreSQL | (interna) |

Ambos servicios se despliegan automaticamente con cada push a `master`.

## Licencia

[MIT](LICENSE.md)