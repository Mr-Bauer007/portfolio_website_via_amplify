# Static frontend

This Next.js app exports the portfolio as static files in `out/`.

## Build locally

Start Django from the repository root first:

```bash
source .venv/bin/activate
python manage.py runserver 127.0.0.1:8000
```

Then, in `frontend/`:

```bash
npm install
npm run build
```

The build fetches published content from `http://127.0.0.1:8000/api/v2` at build time. Override that URL with `WAGTAIL_API_URL` when needed.

## AWS Amplify

This is a local-first static deployment. Amplify publishes the already-generated `frontend/out/` directory and does not run the Next.js build or connect to Wagtail.

Build the artifact locally:

```bash
# Terminal 1, from the repository root
source .venv/bin/activate
python manage.py runserver 127.0.0.1:8000

# Terminal 2
cd frontend
npm ci
npm run build
```

Deploy `frontend/out/` to Amplify using a static artifact upload. For a repository-connected Amplify app, commit the generated `out/` directory and use the root `amplify.yml`; it publishes that directory without running a cloud build.

The browser only receives flat HTML, CSS, JavaScript, and downloaded assets. It does not call Wagtail at runtime. Wagtail can remain local with SQLite and local media storage.
