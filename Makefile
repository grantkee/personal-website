# grantkee.com - local preview and checks.
#
# The site is a static export: what GitHub Pages serves is literally the
# contents of out/. So `make preview` builds and serves exactly that, and it
# is the target to use for anything you actually want to trust.
#
# `make dev` exists for fast copy iteration only. next dev and the export
# differ in metadata routes, metadataBase and file layout - which is precisely
# where this project's bugs have turned up. Never sign off on dev.
#
#   make preview            build, then serve out/ at localhost:3000
#   make preview PORT=8080  same, on another port
#   make phone              same, with the LAN URL for a real device

PORT ?= 3000

.DEFAULT_GOAL := help

.PHONY: help preview build serve dev phone check lint typecheck clean install reinstall

help: ## Show this help
	@echo ""
	@echo "  grantkee.com"
	@echo ""
	@grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[1m%-11s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "  Override the port with PORT=8080."
	@echo ""

## ---------------------------------------------------------------- preview --

preview: build ## Build, then serve out/ - what Pages actually serves
	@echo ""
	@echo "  Serving the static export. This is the build Pages will publish."
	@echo ""
	@npx --yes serve out --listen $(PORT)

serve: node_modules ## Serve the existing out/ without rebuilding
	@test -d out || { echo "  out/ does not exist - run 'make build' first."; exit 1; }
	@npx --yes serve out --listen $(PORT)

phone: build ## Serve on the LAN so you can open it on a real device
	@echo ""
	@ip=$$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null); \
		if [ -n "$$ip" ]; then \
			echo "  Open on your phone:  http://$$ip:$(PORT)"; \
		else \
			echo "  Could not find a LAN address; use the Network URL printed below."; \
		fi
	@echo ""
	@echo "  Emulators lie about iOS Safari viewport units and about Archivo at"
	@echo "  10px with 0.2em tracking, which is a lot of this design's text."
	@echo ""
	@npx --yes serve out --listen tcp://0.0.0.0:$(PORT)

dev: node_modules ## Fast iteration only - NOT what Pages serves
	@echo ""
	@echo "  next dev differs from the export in metadata routes, metadataBase"
	@echo "  and file layout. Verify with 'make preview' before believing it."
	@echo ""
	@npm run dev

## ------------------------------------------------------------------ build --

build: node_modules ## Build the static export into out/
	@npm run build

check: lint typecheck build ## Everything CI runs, in the same order
	@echo ""
	@test -s out/CNAME || { echo "  FAIL  out/CNAME is missing or empty"; exit 1; }
	@test -f out/.nojekyll || { echo "  FAIL  out/.nojekyll is missing - Pages would drop _next/"; exit 1; }
	@if grep -rl 'localhost' out/sitemap.xml out/index.html out/robots.txt 2>/dev/null; then \
		echo "  FAIL  localhost leaked into the build - check metadataBase"; exit 1; \
	fi
	@echo "  ok  CNAME -> $$(cat out/CNAME)"
	@echo "  ok  .nojekyll present"
	@echo "  ok  no localhost in sitemap, index or robots"
	@echo ""
	@echo "  Ready to push."
	@echo ""

lint: node_modules ## eslint
	@npm run lint

typecheck: node_modules ## tsc --noEmit
	@npm run typecheck

## ------------------------------------------------------------------ setup --

node_modules: package.json package-lock.json
	@npm install --no-audit --no-fund
	@touch node_modules

install: ## Clean install from the lockfile, exactly as CI does
	@npm ci

reinstall: ## Delete node_modules and install from the lockfile
	@rm -rf node_modules
	@npm ci

clean: ## Remove build output
	@rm -rf .next out
	@echo "  removed .next and out"
