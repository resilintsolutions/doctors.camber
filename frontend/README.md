# Frontend (Next.js)

Next.js App Router UI with Tailwind CSS:

- **Marketing** — `/`
- **Auth** — `/login`, `/register` (tenant onboarding)
- **App** — `/dashboard`, `/patients`, `/appointments`, `/prescriptions`

## Configuration

Point the client at your API (include the `/api` prefix):

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_API_URL="http://localhost:8000/api"; npm run dev
```

```bash
# macOS / Linux
NEXT_PUBLIC_API_URL=http://localhost:8000/api npm run dev
```

Protected pages redirect to `/login` if there is no token in `localStorage`.
