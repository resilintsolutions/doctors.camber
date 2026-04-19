# Backend (Laravel API)

Laravel 12 application with:

- **Sanctum** bearer-token auth (`POST /api/auth/login`, `POST /api/auth/register-tenant`).
- **`tenant.scope` middleware** — sets `tenant_id` from the authenticated user for all protected routes.
- **Resources** — patients, appointments, prescriptions (tenant-isolated), dashboard summary, tenant profile.

## Main endpoints

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/register-tenant` | No |
| POST | `/api/auth/login` | No |
| POST | `/api/auth/logout` | Yes |
| GET | `/api/me` | Yes |
| GET | `/api/dashboard/summary` | Yes |
| REST | `/api/patients`, `/api/appointments`, `/api/prescriptions` | Yes |
| GET/PUT | `/api/tenant` | Yes |

## Configuration

- **CORS:** `config/cors.php` — override origins with `CORS_ALLOWED_ORIGINS` in `.env` (comma-separated).
- **Database:** default `.env` uses SQLite (`database/database.sqlite`).
