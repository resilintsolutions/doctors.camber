# Doctors Chamber SaaS (MVP Implementation)

End-to-end MVP aligned to `docs/SRS.md`:

- **`backend/`** — Laravel 12 API (Sanctum tokens, tenant-scoped routes, SQLite by default).
- **`frontend/`** — Next.js 15 portal (Tailwind UI: landing, register, login, dashboard, patients, appointments, prescriptions).

## Backend quickstart

From the nested project folder (the one that contains `backend/` and `frontend/`):

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

API base URL: `http://localhost:8000/api`. Set `CORS_ALLOWED_ORIGINS` in `.env` if the frontend runs on a non-default host/port (defaults include `http://localhost:3000`).

If `composer` is not on your PATH, use the Composer PHAR in the parent directory: `php ../composer.phar install`.

## Frontend quickstart

```bash
cd frontend
npm install
set NEXT_PUBLIC_API_URL=http://localhost:8000/api
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Create practice** to register a tenant, then use Patients → Appointments → Prescriptions.

## Notes

- Architecture can extend toward RBAC, billing, documents, notifications, and audit trails as in the SRS.
