Hoverplay Demo — Copilot Instructions

Purpose: small Flask demo used for external integration testing. Keep the code minimal and stable.

Guidelines for edits:
- Keep the stack to Flask + Vanilla JS + plain CSS.
- All interactive elements (buttons, links, inputs) must use unique IDs that start with `hp-`.
- Don't add heavy JS frameworks or build steps.
- Keep `SECRET_KEY` and demo credentials configurable via environment variables.
- Keep the Docker Compose setup simple: one `web` service. Optional TLS should be via reverse proxy.
