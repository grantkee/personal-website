# grantkee.com

Personal site for Grant Kee, Director of Blockchain, Telcoin.
Static Next.js export, served from GitHub Pages at the apex of `grantkee.com`.

One long-scroll page, six sections, no client-side routing. Two client components in the
whole tree (`Nav`, `RevealObserver`); everything else renders to static HTML at build time.

```
make preview       # build, then serve out/ at localhost:3000
make check         # lint, typecheck, build, and the three deploy assertions
make phone         # same as preview, on the LAN, for a real device
make               # list every target
```

`make preview` serves `out/`, which is literally what GitHub Pages publishes. Use it for
anything you want to trust. `make dev` runs `next dev` and is for fast copy iteration only -
the two differ in metadata routes, `metadataBase`, and anything depending on the file layout
Pages sees, which is exactly where this project's bugs have turned up.

Override the port anywhere with `PORT=8080`.

---

## Deploying

Push to `main`. The workflow lints, typechecks, builds, asserts `out/CNAME`, `out/.nojekyll`
and the absence of `localhost` in the built metadata, then publishes.

### Manual GitHub setup - do this once

These are not in code, and skipping them is the usual reason the site 404s.

1. **Settings → Pages → Source: GitHub Actions.** Not "Deploy from a branch". If this is
   wrong, the workflow succeeds and nothing is ever published.
2. **Settings → Pages → Custom domain: `grantkee.com`.** Wait for the certificate, then tick
   **Enforce HTTPS**.
3. **DNS.** Apex `grantkee.com` → the four GitHub Pages `A` records, plus the `AAAA` records:

   ```
   A     185.199.108.153   AAAA  2606:50c0:8000::153
   A     185.199.109.153   AAAA  2606:50c0:8001::153
   A     185.199.110.153   AAAA  2606:50c0:8002::153
   A     185.199.111.153   AAAA  2606:50c0:8003::153
   CNAME www  ->  <username>.github.io
   ```

### Cloudflare in front of Pages - for security headers

GitHub Pages serves no custom HTTP headers. No CSP, no HSTS, no `X-Frame-Options`. For most
personal sites that is a shrug; for this one it is not, because the page argues that its
author runs security for a blockchain protocol, and it takes a skeptical reader thirty
seconds to run securityheaders.com against the domain. Cloudflare is the actual fix, and it
is free.

**Order matters.** GitHub has to issue its certificate before the proxy goes on, or issuance
fails:

1. Add `grantkee.com` to Cloudflare and move the nameservers at the registrar.
2. Recreate the DNS records above in Cloudflare, **DNS only (grey cloud)** for now.
3. Wait for GitHub to issue the certificate and enable **Enforce HTTPS**.
4. Only then switch the apex and `www` records to **Proxied (orange cloud)**.
5. **SSL/TLS → Full (strict).** Not Flexible: Flexible plus Pages' own HTTPS produces a
   redirect loop.
6. **Rules → Transform Rules → Modify Response Header**, adding, for all requests:

   ```
   Content-Security-Policy: default-src 'none'; script-src 'self' 'unsafe-inline';
     style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';
     connect-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none';
     object-src 'none'; upgrade-insecure-requests
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
   X-Frame-Options: DENY
   ```

   The build references no external origins at all - fonts, CSS and JS are self-hosted, so
   every directive can stay on `'self'`. The one weak point is `script-src 'unsafe-inline'`,
   which Next's inline flight payload requires. A nonce would need middleware, and middleware
   does not run under `output: 'export'`. Hashes would have to be recomputed every build.

---

## Editing content

All copy is typed data under `content/`. No JSX, no markup in strings.

| File | Holds |
| --- | --- |
| `site.ts` | Domain, titles, `sameAs` links, JSON-LD inputs, structured-data employers |
| `sections.ts` | Section order - **this drives numbering and the nav** |
| `hero.ts` | Name, title, lede, the four meta cells |
| `numbers.ts` | The seven ledger rows |
| `work.ts` | The six selected-work articles |
| `source.ts` | Open-source rows, including the repository list |
| `now.ts` | The six Now cards |
| `contact.ts` | The six contact cells and the colophon |

Three things are deliberately absent, and they are what make edits cheap:

- **No index fields.** Section numbers and work-item numbers are the array position. Reorder
  `work.items` and every numeral renumbers itself.
- **No nav array.** The nav is `sections.filter(s => !s.hiddenFromNav)`. Adding one entry to
  `sections.ts` creates the nav link, the rail heading, the scroll-spy target and the number.
- **No markup in strings.** A link is a `Proof { label, href }`, and `lib/format` weaves it
  into the prose by matching `label` inside the text. You cannot add a link without naming
  the phrase it proves, and an unmatched label appends rather than vanishing.

### Grid counts are not arbitrary

Adding a card or a contact cell changes the grid arithmetic. Item counts are chosen so no
grid ever leaves an orphan row, because a 2+1 row leaves a dangling vertical rule, and in a
design whose entire language is a visible grid drawn in 2px rules that reads as a bug.

| Grid | Items | Columns |
| --- | --- | --- |
| Hero meta | 4 | 4 → 2 → 1 |
| Now cards | 6 | 3 → 2 → 1 |
| Contact | 6 | 3 → 2 → 1 |
| Work body | 2 | 2 → 1 |

Six divides by three and by two. Four divides by four and by two. **Three-item grids go
3 → 1 and never 3 → 2.** If you add a seventh Now card, either add an eighth or move one
somewhere else.

### Voice rules

Third person, subject elided - never "I", never "we". Past tense for completed and dated
work, present for standing responsibilities, future only with a date and the word
"targeted". Verb-first openers by default. Adjectives may describe kind ("regulated
stablecoin"), never quality. Numbers exact or explicitly bounded. Hyphens only, never an em
dash; at most one spaced hyphen per paragraph.

Banned outright: *world-class, best-in-class, cutting-edge, robust, seamless, leverage,
future-proof, industry-leading, next-generation, unlock, empower, proven track record, some
of the best, high-caliber, hard decisions.*

Naming is mechanical. **Telcoin** is the employer line. **Telcoin Platform** is what the role
owns: mandate and description. **Telcoin Holdings** and **Telcoin Autonomous Operations**
appear only in structured data (JSON-LD `worksFor`), never in copy. **Telcoin Association**
only for governance, the council and the GitHub org, never as employer. **Telcoin Network**
is only ever the chain. "Telcoin Application Network" is retired and must not come back.

### Links are evidence

Every link attaches to the claim it proves. No "Learn more". **Never link a claim the target
does not support** - a diligence reader who follows a link, finds nothing, and comes back
revises their read of the entire page. No URL appears more than twice.

---

## Architecture notes

### Why not Tailwind

The design's values - `14.5px`, `0.18em`, `clamp(48px, 8vw, 108px)`, 2px rules everywhere -
do not map to Tailwind's scale. Every element would carry `text-[14.5px] tracking-[0.18em]`,
which is worse than CSS and trips the design system's oxlint adherence rules on every class
string. CSS Modules are built into Next with zero config and zero runtime, and the raw values
live in `.css` files. `var(--token)` stays the interface.

### The split rule

`styles/type.css` owns type. `*.module.css` owns layout. Nothing sets `font-size` in a
module. A copy retune touches one global file; a layout change touches one module.

### Tone aliases

Components reference semantic aliases (`--text`, `--text-muted`, `--rule`, `--focus-ring`)
which are redefined inside `.tone-dark`. That is what lets the dark hero and dark contact
footer work without duplicating a single rule, and it is where the accessibility fixes live.

### What the canvas runtime did, and what replaced it

The original was a Claude Design artboard rendered through a 69KB proprietary runtime. All
three of its behaviours were reimplemented:

- **`alignGrids()` → pure CSS.** It walked the DOM on every resize comparing `offsetTop`
  values, because `repeat(auto-fit, minmax(Npx, 1fr))` yields an unknown column count.
  Explicit column counts per breakpoint make `:nth-child()` an exact first-in-row test. The
  CSS is correct on first paint, needs no `document.fonts.ready` recompute, works with
  JavaScript off, and is deterministic - the `offsetTop` grouping misbehaved under zoom.
- **Scroll reveal → one IntersectionObserver.** Reveal is an attribute, not a wrapper; a
  wrapper component would drag the whole content tree across the server boundary. An inline
  script adds `.js-reveal` to `<html>` before first paint and the hiding CSS is scoped to it,
  so a JavaScript failure leaves the content **visible**.
- **Scroll-spy → `aria-current="location"`**, coloured from CSS, with `setState` only on an
  actual change rather than every animation frame.

### Two things not ported from the design system

- **`:focus { outline: none }`.** Removed. Only `:focus-visible`, with a ring that inverts
  with the tone.
- **The accent red `#ec3013`.** The palette is deliberately pure monochrome and the accent
  appears zero times, including on the focus ring. This is a choice, not an oversight.

### `_source/`

Reference material: the original artboard, the design system token sheet, and the raw content
corpus. Excluded from `tsconfig.json`, never imported, never shipped.

### Generated assets

| File | Source | How |
| --- | --- | --- |
| `app/icon.png`, `app/apple-icon.png` | anime portrait (untracked) | 192 and 180 px; Next's file convention emits the `<link>` tags, `layout.tsx` names nothing |
| `public/og.png` | `scripts/og.mjs` | `make og`; renders from `content/site.ts` through `next/og`, byte-deterministic |
| `assets/fonts/` | Archivo static TTFs, OFL 1.1 | satori needs TTF; the site itself self-hosts Archivo through `next/font` |

`og.png` is committed rather than served from a file-based `opengraph-image` route because
that route exports extensionless under `output: 'export'`, Pages then serves it as
`application/octet-stream`, and scrapers refuse it. Re-run `make og` after any change to
`site.name`, `site.domain`, `site.jobTitle`, `site.organization`, or the Status cell in
`content/hero.ts`; the footer labels are constants in the script, not imports. The source image stays
untracked on purpose: the derived files are committed, so nothing in the build reaches for
the original.

### Pinned versions

Exact, no carets. This site is touched a few times a year and a surprise minor bump breaking
`output: 'export'` costs more than the freshness is worth. ESLint is held at 9.x because
`eslint-plugin-react`, `eslint-plugin-import` and `eslint-plugin-jsx-a11y` (pulled in by
`eslint-config-next`) still cap their peer at 9.

---

## Verification

Everything runs against the built `out/`, served statically - never `next dev`.

```
make preview
```

Checked before the first deploy, and worth repeating after content changes:

- `out/` contains `index.html`, `404.html`, `sitemap.xml`, `robots.txt`, `CNAME`,
  `.nojekyll`, `_next/static/`
- `grep -o localhost out/sitemap.xml out/index.html` returns nothing
- **JavaScript disabled** - every `[data-reveal]` element visible, all grid rules correct,
  desktop nav links visible, anchors still land below the pill
- Layout at 1440 / 1280 / 1024 / 1023 / 900 / 768 / 767 / 640 / 560 / 559 / 414 / 375 / 320,
  asserting `document.documentElement.scrollWidth === window.innerWidth` at each
- No dangling vertical rule on any single-column grid, no orphan rows
- Tab from a fresh load: skip link first, every stop shows a ring
- `npx @axe-core/cli` zero violations
- 200% browser zoom - display ramps grow rather than shrink
- JSON-LD through validator.schema.org and the Rich Results Test
- After deploy: LinkedIn Post Inspector and the X Card Validator. Both cache aggressively,
  so get it right before sharing the link anywhere.
- A real phone on the LAN (`make phone`). Emulators lie about iOS Safari viewport units and
  about Archivo at 10px with 0.2em tracking, which is a lot of this design's text.

### Contrast

Three pairs in the original artboard failed WCAG AA at 10–11px, with no large-text exemption
available. Fixed in the semantic aliases:

| Pair | Was | Now |
| --- | --- | --- |
| Muted on dark - hero meta labels, colophon | `#7d7979` 3.86:1 | `#9b9797` 5.75:1 |
| Muted on light - rail sublabels, work kickers | `#7d7979` 3.85:1 | `#605d5d` 5.83:1 |
| Work index numerals | `#9b9797` 2.59:1 | `#605d5d` 5.83:1 |

The numeral change flattens a hierarchy the design intended. They stay differentiated by
weight and size (11px/700 against 10px/600). Declaring them decorative and `aria-hidden`
would not have been honest - they are ordinal wayfinding.

---

## Follow-ups

- Audit reports: the security article names four firms and links three - Cantina (the
  competition and a published report), Hacken (their public audits page) and Trail of Bits
  (the Solana peg stability vault review, linked from the settlement article). Spearbit is
  named but has no public report. If one becomes publishable, add it to `work.ts`.
- `telscan.xyz` is slow to first byte (~20s observed). If that persists, consider pointing the
  "producing blocks today" proof at a faster target.
