<div align="center">

# Vinilo Vibes

### The Original Sound Lives on Vinyl.

![Angular](https://img.shields.io/badge/Angular-v21-dd0031?style=for-the-badge&logo=angular&logoColor=white)
![.NET](https://img.shields.io/badge/.NET_10-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-3F51B5?style=for-the-badge&logo=angular&logoColor=white)
<br />
![TypeDoc](https://img.shields.io/badge/TypeDoc-406C59?style=for-the-badge&logo=typedoc&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)

[![CI](https://github.com/Juanelpeor3/vinilo-vibes/actions/workflows/ci.yml/badge.svg)](https://github.com/Juanelpeor3/vinilo-vibes/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Juanelpeor3/vinilo-vibes/blob/master/LICENSE.md)

---

[Live Demo](https://vinilo-vibes.vercel.app/) | [API (Swagger)](https://vinilo-vibes-api.onrender.com/swagger) |
[TypeDoc](https://vinilo-vibes.vercel.app/documentation/index.html)

[Español](README.es.md) | **English**

</div>

## About the project

Vinilo Vibes is an online vinyl record store built with an Angular frontend and an ASP.NET Core backend. The project showcases a full e-commerce flow: catalog with genre filters, database-persisted shopping cart, checkout with stock control, JWT authentication with roles and an admin panel.

### Architecture

```
┌─────────┐ HTTP/JSON ┌──────────┐ EF Core ┌────────────┐
│ Angular ├---------->│ .NET API ├-------->│ PostgreSQL │
└─────────┘           └──────────┘         └────────────┘
```

The user browses the frontend on Vercel, which sends HTTP/JSON requests to the API on Render. The API accesses PostgreSQL through Entity Framework Core.

The backend follows a layered architecture:

```
Controllers  ->  Services  ->  Repositories  ->  DbContext (EF Core)  ->  PostgreSQL
```

### Features

- Vinyl catalog with genre filtering and search
- Product pages with average star ratings
- Per-user persistent shopping cart
- Checkout with stock validation and order generation
- Order history in user profile
- Admin panel (vinyl CRUD)
- JWT authentication with roles (admin / user)
- Efficient rendering with Angular Signals

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, Angular Material, TypeScript 5.9, RxJS |
| Backend | ASP.NET Core 10, Entity Framework Core 10, ASP.NET Identity |
| Database | PostgreSQL (Npgsql) |
| Authentication | JWT Bearer tokens with roles |
| Backend testing | xUnit + Moq (37 tests) |
| Frontend docs | TypeDoc |
| CI/CD | GitHub Actions |
| Frontend deploy | Vercel |
| Backend deploy | Render (Docker) |
| Containers | Docker + docker-compose |

## Repository structure

```
vinilo-vibes/
├── frontend/                          # Angular SPA
│   └── src/
│       ├── app/
│       │   ├── pages/                 # Home, catalog, details, cart, profile, admin
│       │   ├── services/              # Auth, Vinyl, Cart, Order, Profile
│       │   ├── guards/                # authGuard, roleGuard
│       │   ├── interceptors/          # JWT auth interceptor
│       │   └── shared/                # Components, models, pipes
│       └── environments/
├── backend/
│   ├── ViniloVibes.Api/               # ASP.NET Core Web API
│   │   ├── Controllers/               # Auth, Vinyls, Genres, Cart, Orders
│   │   ├── Services/                  # Business logic
│   │   ├── Repositories/              # Data access
│   │   ├── Models/                    # EF Core entities
│   │   ├── DTOs/                      # Data Transfer Objects
│   │   ├── Data/                      # DbContext, migrations, seed
│   │   └── Program.cs
│   ├── ViniloVibes.Tests/             # Unit tests (xUnit + Moq)
│   └── Dockerfile
├── .github/workflows/ci.yml          # CI pipeline
├── docker-compose.yml
└── PLAN.md
```

## Local setup

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org/) with [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (for local PostgreSQL)

### 1. Clone the repository

```bash
git clone https://github.com/Juanelpeor3/vinilo-vibes.git
cd vinilo-vibes
```

### 2. Start PostgreSQL with Docker

```bash
docker-compose up -d db
```

### 3. Start the backend

```bash
cd backend/ViniloVibes.Api
dotnet run
```

The API starts at `http://localhost:5196` with Swagger UI available at `/swagger`.
Migrations are applied automatically on startup.

### 4. Start the frontend

```bash
cd frontend
pnpm install
pnpm start
```

Navigate to `http://localhost:4200`.

### Alternative: backend with Docker

```bash
docker-compose up
```

Then start the frontend and navigate to `http://localhost:4200`.
```bash
cd frontend
pnpm install
pnpm start
```

## API Endpoints

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/vinyls` | List vinyls | No |
| GET | `/api/vinyls/{id}` | Vinyl details | No |
| GET | `/api/vinyls/genre/{genreId}` | Filter by genre | No |
| POST | `/api/vinyls` | Create vinyl | Admin |
| PUT | `/api/vinyls/{id}` | Update vinyl | Admin |
| DELETE | `/api/vinyls/{id}` | Delete vinyl | Admin |
| GET | `/api/genres` | List genres | No |
| GET | `/api/cart` | View cart | User |
| POST | `/api/cart` | Add to cart | User |
| PUT | `/api/cart/{vinylId}` | Update quantity | User |
| DELETE | `/api/cart/{vinylId}` | Remove item | User |
| DELETE | `/api/cart` | Clear cart | User |
| POST | `/api/orders/checkout` | Place order | User |
| GET | `/api/orders` | Order history | User |
| GET | `/api/orders/{id}` | Order details | User |

## Environment variables (backend)

| Variable | Description |
|---|---|
| `ConnectionStrings__DefaultConnection` | PostgreSQL connection string (ADO.NET format) |
| `Jwt__Key` | Secret key for signing JWT tokens |
| `Jwt__Issuer` | Token issuer (e.g. `ViniloVibes`) |
| `Jwt__Audience` | Token audience (e.g. `ViniloVibes`) |
| `Admin__Email` | Admin email |
| `Admin__Password` | Admin password |
| `User__Email` | Optional - defaults to `user@example.com` |
| `User__Password` | Optional - defaults to `User123` |

## Test account

| Role |      Email       | Password |
|------|------------------|----------|
| User | user@example.com | User123  |

## Tests

```bash
# Backend (37 tests)
cd backend
dotnet test
```

## Documentation (TypeDoc)

Frontend documentation is automatically generated from TSDoc comments in the TypeScript source code.

```bash
cd frontend
pnpm run docs
```

Generated files are stored in `dist/vinilo-vibes/browser/documentation` and deployed alongside the frontend on Vercel.

## Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://vinilo-vibes.vercel.app |
| Backend API | Render | https://vinilo-vibes-api.onrender.com |
| TypeDoc | Vercel | https://vinilo-vibes.vercel.app/documentation/index.html |
| Database | Render PostgreSQL | (internal) |

The services are deployed automatically on every push to `master`.

## License

[MIT](LICENSE.md)