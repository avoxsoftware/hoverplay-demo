docker-compose up --build -d
Hoverplay Demo
===============

A playful, secure-by-default Flask playground to exercise public and signed-in areas.

Features
- Public pages: Home, About, Status
- Simple auth: single demo user from env vars
- Protected playroom with localStorage notes and a JSON sandbox
- All interactive elements have unique IDs prefixed with `hp-`
- Docker Compose ready

Quick start

```bash
cp .env.example .env   # edit if you want to change credentials
docker-compose up --build -d
# Visit the mapped host port shown by `docker compose ps` (e.g. http://localhost:8087)
```

Default credentials (from `.env.example`):
- user: `demo`
- pass: `demo`

Files of interest
- [docker-compose.yml](docker-compose.yml)
- [app/Dockerfile](app/Dockerfile)
- [app/app.py](app/app.py)
- [app/templates/index.html](app/templates/index.html)
- [app/static/js/main.js](app/static/js/main.js)
- [README.md](README.md)
- [copilot-instructions.md](copilot-instructions.md)

Security notes
- This playground uses server-side password hashing and cookie session flags.
- Do not use `SECRET_KEY=change-me` in production.
- Add a TLS reverse proxy for public exposure (Caddy/Traefik) and set `SESSION_COOKIE_SECURE=True`.
