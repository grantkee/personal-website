/* ============================================================================
   og.mjs - renders public/og.png, the Open Graph card.

   The PNG is generated, not hand-made, and it is committed anyway: Pages
   serves plain files, and a file-based `opengraph-image` route exports without
   an extension under `output: 'export'`, which social scrapers then refuse.
   Rendering goes through `next/og.js` (satori) so no extra dependency is
   added; the `.js` suffix matters because `next` has no exports map and bare
   Node ESM cannot resolve `next/og` without it.

   Regenerate with `make og`, or `node scripts/og.mjs [out.png]`.
   ========================================================================= */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ImageResponse } from 'next/og.js';
import { site } from '../content/site.ts';

/* Mirrors styles/tokens.css, .tone-dark aliases. A .mjs cannot import CSS, so
   the four values are copied; keep them in step with the token sheet. */
const INK = '#201e1d';   /* --ink, the ground */
const GROUND = '#f3f2f2'; /* --ground, the text */
const MUTED = '#9b9797';  /* --n-500, --text-muted on dark */
const RULE = '#444141';   /* --n-800, --rule on dark */

/* Label row. Deliberately not imported: the Status cell in content/hero.ts is
   the source of truth, but it is prose, and this is a row of labels. Update
   both together. */
const FOOTER = ['TELCOIN NETWORK', 'TESTNET LIVE', 'MAINNET TARGETED Q4 2026'];

const WIDTH = 1200;
const HEIGHT = 630;
const MARGIN = 64;
const COLUMN = 506; /* the subtitle's measure; the short rule marks it */

const font = (file, weight) => ({
  name: 'Archivo',
  data: readFileSync(new URL(`../assets/fonts/${file}`, import.meta.url)),
  weight,
  style: 'normal',
});

/* Satori lays out with flexbox only: the root and every element with more
   than one child must declare display: flex. A leaf div must not carry an
   empty children array either; satori treats any array as "many". */
const el = (type, style, ...children) => ({
  type,
  props: { style, children: children.length ? children : undefined },
});
const text = (content, style) => ({ type: 'div', props: { style, children: content } });
/* 2px: the design system's rule weight (_source/ds/readme.md), not a hairline. */
const rule = (style) => el('div', { height: 2, background: RULE, ...style });
/* Uppercase, muted, tracked. Tracking is an em ratio, read off the shipped card. */
const label = (content, size, tracking = 0.16) =>
  text(content, {
    color: MUTED,
    fontSize: size,
    fontWeight: 600,
    letterSpacing: size * tracking,
    lineHeight: 1,
  });

const tree = el(
  'div',
  { display: 'flex', width: WIDTH, height: HEIGHT, background: INK, color: GROUND, fontFamily: 'Archivo' },
  el(
    'div',
    {
      display: 'flex',
      position: 'absolute',
      top: 62,
      left: MARGIN,
      right: MARGIN,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    el(
      'div',
      { display: 'flex', alignItems: 'center' },
      text('GK', { fontSize: 22, fontWeight: 800, letterSpacing: 22 * 0.15, lineHeight: 1 }),
      el('div', { width: 10, height: 10, background: GROUND, marginLeft: 11 }),
    ),
    label(site.domain.toUpperCase(), 17, 0.18),
  ),
  rule({ position: 'absolute', top: 110, left: MARGIN, right: MARGIN }),
  el(
    'div',
    { display: 'flex', flexDirection: 'column', position: 'absolute', top: 156, left: MARGIN },
    text(site.name, { fontSize: 132, fontWeight: 800, letterSpacing: 132 * -0.04, lineHeight: 1 }),
    rule({ width: COLUMN, marginTop: 22 }),
    text(`${site.jobTitle} - ${site.organization}`, {
      fontSize: 27,
      fontWeight: 600,
      lineHeight: 31 / 27,
      width: COLUMN,
      marginTop: 22,
    }),
  ),
  rule({ position: 'absolute', top: 525, left: MARGIN, right: MARGIN }),
  el(
    'div',
    { display: 'flex', position: 'absolute', top: 553, left: MARGIN, gap: 40 },
    ...FOOTER.map((s) => label(s, 16)),
  ),
);

const fonts = [
  font('Archivo-SemiBold.ttf', 600),
  font('Archivo-ExtraBold.ttf', 800),
];

const out = process.argv[2] ?? fileURLToPath(new URL('../public/og.png', import.meta.url));
const res = new ImageResponse(tree, { width: WIDTH, height: HEIGHT, fonts });
const png = Buffer.from(await res.arrayBuffer());
writeFileSync(out, png);
console.log(`wrote ${out} (${png.length} bytes)`);
