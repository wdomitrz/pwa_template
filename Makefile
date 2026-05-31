.PHONY: all format check serve

APP_FILES := index.html style.css app.js sw.js icon.svg manifest.json
DOC_FILES := README.md INSTRUCTIONS.md

all: format check

format:
	@command -v sponge >/dev/null 2>&1 || { printf 'sponge is required. Install moreutils.\n'; exit 1; }
	python3 -m json.tool --indent 2 manifest.json | sponge manifest.json
	@if command -v prettier >/dev/null 2>&1; then prettier --write $(APP_FILES) $(DOC_FILES); else printf 'prettier not found; formatted JSON only\n'; fi

check:
	@missing=0; for file in $(APP_FILES); do if [ ! -f "$$file" ]; then printf 'Missing required file: %s\n' "$$file"; missing=1; fi; done; exit $$missing
	python3 -m json.tool manifest.json >/dev/null
	@if command -v node >/dev/null 2>&1; then node --check app.js && node --check sw.js; else printf 'node not found; skipping JavaScript syntax check\n'; fi
	@for file in $(APP_FILES); do grep -q "\"./$$file\"" sw.js || { printf 'sw.js does not list %s\n' "$$file"; exit 1; }; done
	@grep -q '"./"' sw.js || { printf 'sw.js does not list ./\n'; exit 1; }

serve:
	python3 -m http.server 8000
