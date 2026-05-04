# AI Agent Guide - Watchlist App

**Quick Overview**: Node.js web app for managing personal movie/series lists. Layered MVC architecture (Routes → Controllers → Services → Repositories → Database).

---

## Getting Started

**To Run Locally:**
```bash
# 1. Copy environment template
cp .env.example .env  # See "Environment Setup" below

# 2. Start MongoDB (requires Docker)
docker-compose up -d

# 3. Install & run
npm install
npm run dev          # Runs with nodemon + --inspect debugger
```

**Server**: http://localhost:3000 (port configurable via `PUERTO` in `.env`)

**Key Entry Point**: [app.js](app.js) - Express setup, middleware order, route mounting

---

## Architecture

**Layered Design** (dependency flows downward):
```
HTTP Layer: Routes (src/routes/*.api.route.js)
    ↓ [Hand off to controller]
Business Layer: Controllers (src/controllers/*.controller.js)
    ↓ [Call business logic]
Service Layer: Services (src/services/*.service.js)
    ↓ [Delegate data access]
Data Layer: Repositories (src/repositories/*.repository.js)
    ↓ [Abstract storage]
Storage: JsonDB (src/db/jsonDb.js) → data/*.json files
```

**Why this matters**: Services throw errors with `.status` codes. Controllers catch and format HTTP responses. Repositories encapsulate file I/O.

---

## Core Patterns

### Validation (express-validator)

**Pattern**: Route chains validators → middleware checks results → controller executes

```javascript
// In route file:
router.post('/registro', registroSchema, validarResultado, registro);

// registroSchema (src/validators/*.schema.js) uses checkSchema()
// validarResultado (src/middlewares/validate.result.middleware.js) throws 400 if errors
```

✅ Always validate at the schema level before business logic.

### Authentication

**Custom Token Format**: `userId|email|role` (⚠️ NOT JWT - no expiration)

```javascript
// In middleware (src/middlewares/auth.middleware.js):
const token = req.headers['authorization'].split(' ')[1];  // "Bearer <token>"
const userId = token.split('|')[0];
req.user = { userId, userEmail };
```

✅ All watchlist routes protected by `validarToken` middleware (see [src/routes/watchlist.api.route.js](src/routes/watchlist.api.route.js#L2))

⚠️ Gotcha: Token stored in plain localStorage on client. No refresh mechanism.

### Error Handling

**Service throws custom errors**:
```javascript
const error = new Error('User not found');
error.status = 401;
throw error;
```

**Controller catches & responds**:
```javascript
catch (error) {
  res.status(error.status || 500).json({ mensaje: error.message });
}
```

✅ Use this pattern consistently across services.

### Response Format

**All endpoints return**:
```json
{
  "mensaje": "Human-readable message",
  "respuesta": { /* Actual data */ }
}
```

Or on error:
```json
{
  "mensaje": "Error description",
  "error": "Error details"
}
```

---

## File Organization

| Directory | Purpose |
|-----------|---------|
| `src/routes/` | `index.api.route.js` (mount `/api/*`), `auth.api.route.js`, `watchlist.api.route.js` |
| `src/controllers/` | Handle HTTP req/res, call services |
| `src/services/` | Business logic, throw errors with `.status` |
| `src/repositories/` | Data access (currently wraps JsonDB) |
| `src/db/` | `jsonDb.js` (abstraction), `db.js` (MongoDB setup) |
| `src/middlewares/` | `auth.middleware.js`, `validate.result.middleware.js`, `log.middleware.js` |
| `src/models/` | Factory functions: `crearUsuario()`, `crearWatchlistItem()` |
| `src/validators/` | express-validator schemas: `login.schema.js`, `registro.schema.js` |
| `data/` | JSON files: `usuarios.json`, `watchlist.json` |
| `views/` | EJS templates (served by view routes) |

---

## Environment Setup

**Required `.env` file** (create from `.env.example`):
```env
PUERTO=3000
DATABASE_URI=mongodb://admin:toor@localhost:27017/watchlist
```

**Loaded by**: [src/config/env.loader.js](src/config/env.loader.js) - exits process if `DATABASE_URI` missing.

**For local dev**: Use provided `docker-compose.yml` to spin up MongoDB.

---

## Development Workflow

### Adding a New Endpoint

1. **Define route** in `src/routes/<module>.api.route.js`
2. **Add validation schema** in `src/validators/<feature>.schema.js` (if input validation needed)
3. **Write controller** in `src/controllers/<module>.controller.js`
4. **Write service** in `src/services/<module>.service.js` (throw errors with `.status`)
5. **Write repository method** in `src/repositories/<module>.repository.js` (if data access)
6. **Test with HTTP client**: Use files in `test/` directory (`.http` format for REST Client extension)

### Modifying Data Models

**User Model**: [src/models/User.model.js](src/models/User.model.js)
**Watchlist Item Model**: [src/models/WatchlistItem.model.js](src/models/WatchlistItem.model.js)

Update models, then run migrations (if adding DB fields).

---

## Critical Issues & Gotchas

| Issue | Location | Severity | Fix |
|-------|----------|----------|-----|
| **Plaintext Passwords** | [src/services/auth.service.js](src/services/auth.service.js) | 🔴 Security | Use `bcrypt.compare()` instead of `===` |
| **Token Not JWT** | [src/services/auth.service.js](src/services/auth.service.js) | 🟡 Design | Consider `jsonwebtoken` for expiration |
| **CORS Open to All** | [app.js](app.js) | 🟡 Security | Specify allowed origins in `cors({ origin: '...' })` |
| **No Rate Limiting** | [app.js](app.js) | 🟡 Security | Add `express-rate-limit` middleware |
| **Missing .env.example** | Root dir | 🟢 Docs | Create with required env vars template |

---

## API Reference

See full details in [README.md](README.md#3-descripción-de-módulos).

**Auth Endpoints**:
- `POST /api/auth/register` - Create user (requires `nombre`, `email`, `password`)
- `POST /api/auth/login` - Get token (requires `email`, `password`)

**Watchlist Endpoints** (all protected by `validarToken`):
- `GET /api/watchlist` - List user's items
- `GET /api/watchlist/:id` - Get item detail
- `POST /api/watchlist` - Create item
- `PUT /api/watchlist/:id` - Update item
- `DELETE /api/watchlist/:id` - Remove item

**Header Required**: `Authorization: Bearer <token>` for protected routes.

---

## Testing

**Current State**: No automated tests configured.

**Test Files** (manual REST Client format): `test/auth.http`, `test/watchlist.http`

**Recommended Addition**: Jest + supertest for integration tests.

---

## Deployment

**Containerized Setup**: `docker-compose.yml` includes MongoDB service.

**To Deploy**:
```bash
docker-compose up -d      # Start MongoDB
docker build -t watchlist-app .
docker run -p 3000:3000 --env-file .env watchlist-app
```

**Dockerfile** needs to be created for containerization.

---

## Common Tasks

| Task | Files to Touch | Steps |
|------|----------------|-------|
| Add new endpoint | routes, controller, service, (repo if data access) | Follow "Adding a New Endpoint" section |
| Fix auth bug | [src/middlewares/auth.middleware.js](src/middlewares/auth.middleware.js) | Remember token format is `userId\|email\|role` |
| Change DB storage | [src/db/jsonDb.js](src/db/jsonDb.js) | Implement `leer()` and `escribir()` methods for new storage backend |
| Add input validation | [src/validators/](src/validators/) + route chain | Use `checkSchema()` from express-validator |
| Debug request flow | [app.js](app.js) logger + nodemon `--inspect` | Logs include request method, path, IP |

---

## Documentation

**Project Overview**: [README.md](README.md)  
**Student Prompts**: [docs/prompts.md](docs/prompts.md)  
**This Guide**: AGENTS.md

**Missing (good to add)**: `.env.example`, API specification, troubleshooting guide.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| **Runtime** | Node.js (ES Modules) |
| **Web Framework** | Express 5.2 |
| **Database** | MongoDB (via Mongoose) / JSON (current) |
| **Validation** | express-validator |
| **Templating** | EJS |
| **Dev Server** | nodemon |
| **CORS** | cors package |
| **Env Config** | dotenv |

---

## Helpful Commands

```bash
npm run dev              # Start with auto-reload + debugger
npm start               # (Not configured yet)

# Docker
docker-compose up -d    # Start MongoDB in background
docker-compose down     # Stop MongoDB
docker-compose logs -f  # View MongoDB logs

# Debug
# Open chrome://inspect after starting with npm run dev
# Breakpoints in VS Code Debugger via .vscode/launch.json config
```

---

**Last Updated**: 2026-04-20  
**For Questions**: Check [README.md](README.md) or review source patterns in `src/` directory.
