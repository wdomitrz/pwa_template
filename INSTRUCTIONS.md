# Simple PWA Template Instructions

Use this repository as a starting point for a small progressive web app that runs directly in the browser. The app must stay static: no build step, bundler, transpiler, framework, or generated assets are required to develop or deploy it.

## Files

Keep the app surface small and explicit:

- `index.html`: document structure, metadata, links to the manifest, icon, stylesheet, and script.
- `style.css`: all application styling.
- `app.js`: browser logic, state, rendering, and service worker registration.
- `sw.js`: offline cache behavior for the app shell.
- `icon.svg`: install icon and browser favicon.
- `manifest.json`: PWA install metadata.
- `README.md`: short project summary or deployed app link.
- `INSTRUCTIONS.md`: project-specific guidance for future work.
- `Makefile`: local validation and helper commands.

Do not add a package manager, dependency lockfile, compiler output, or generated CSS unless the app has outgrown this template and the decision is deliberate.

## Development Workflow

1. Replace the placeholder app name, description, colors, and icon.
2. Build the real application in the existing files instead of adding a framework.
3. Keep domain state in plain objects and arrays.
4. Keep pure calculations separate from DOM rendering.
5. Keep DOM lookups, event binding, state updates, and rendering easy to find.
6. Update `manifest.json` and `sw.js` whenever the file list or app identity changes.
7. Run `make` before committing.

Serve the app locally with:

```sh
make serve
```

Open `http://localhost:8000/`. Service workers require `localhost` or HTTPS; opening `index.html` through `file://` will not exercise install or offline behavior.

## Coding Standards

- Write clear, boring JavaScript. Avoid clever shortcuts that make later changes harder.
- Structure the app intentionally even when it is small: named constants, small functions, explicit state, and one obvious startup path.
- Validate user input at the boundary before it reaches application state.
- Prefer event delegation only when it reduces duplicated listeners without hiding behavior.
- Render from state instead of letting scattered event handlers become the source of truth.
- Keep CSS selectors purposeful and stable. Prefer classes for styling and IDs for single DOM hooks.
- Make responsive layout decisions explicit with `min()`, `max-width`, `grid`, `flex`, and media queries.
- Keep accessibility in the normal implementation path: labels, focus states, button elements for actions, and useful status text for dynamic updates.
- Do not cut corners on offline behavior. If a file is needed for first load, include it in the service worker app shell cache.

## PWA Checklist

- `manifest.json` has a correct `name`, `short_name`, `start_url`, `scope`, `display`, `theme_color`, `background_color`, and icon entry.
- `index.html` includes the manifest, icon, theme color, viewport, stylesheet, and deferred script.
- `sw.js` caches the complete app shell and removes old caches in `activate`.
- `app.js` registers the service worker and reports registration failures without breaking the app.
- The app works offline after one successful load from `localhost` or HTTPS.
- The installed app opens to the right route on desktop and mobile.

## Validation

Run:

```sh
make
```

The default target checks that the expected static files exist, validates `manifest.json`, checks JavaScript syntax when `node` is available, and confirms that `sw.js` mentions every app shell file.

Run:

```sh
make format
```

This formats JSON with Python's standard library and uses `prettier` for HTML, CSS, JS, SVG, and Markdown when `prettier` is already installed. Formatting is optional tooling, not part of the runtime app.
