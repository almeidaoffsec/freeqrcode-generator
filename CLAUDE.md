# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Locally

This is a zero-build static project. Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 5500
# then open http://localhost:5500
```

No package manager, no build step, no dependencies to install.

## Architecture

Two files contain all logic:

- **`index.html`** — markup, Tailwind config, and CDN script tags. UI strings are driven by `data-i18n` and `data-i18n-placeholder` attributes; `script.js` populates them at runtime.
- **`script.js`** — all application logic in vanilla JS. No modules, no bundler.

### Key design decisions in `script.js`

**i18n** is self-contained: `TRANSLATIONS` and `SEO_TRANSLATIONS` objects hold all UI and SEO strings for `pt-BR` and `en-US`. `applyLanguage()` walks every `[data-i18n]` element and rewrites text content. Language priority: URL `?lang=` param → `localStorage` → `navigator.language` → default (`pt-BR`).

**QR library loading** uses a waterfall: `QR_CODE_SCRIPT_SOURCES` lists sources tried in order — first the local `./qrcode.min.js` (bundled copy of qrcode@1.5.1), then two CDN fallbacks, then the legacy qrcodejs as last resort. The library exposes two incompatible APIs (`QRCode.toCanvas` vs the legacy `new QRCode(container, ...)` constructor); `getQrCodeRenderer()` detects which one is present and returns a unified `{ render }` adapter.

**Error handling** uses a convention of throwing `new Error("i18n:<statusKey>")` to carry localizable error keys through async call stacks without a custom error class. `getStatusKeyFromError()` unpacks these; unrecognized errors fall back to a default key.

**State** is a single plain object (`state`) with `hasGenerated`, `isGenerating`, `logoDataUrl`, `currentLanguage`, `lastStatusKey`, and `lastStatusType`. Mutate it and call the appropriate render helpers — there is no reactive framework.

## Adding a New Language

1. Add a key to `TRANSLATIONS` and `SEO_TRANSLATIONS` in `script.js`.
2. Add a `<button data-language-button="<locale>">` with an inline SVG flag to `index.html`.
3. Add `<link rel="alternate" hreflang="<locale>">` tags in `<head>`.
4. Update `buildLanguageUrl()` if the new locale needs a non-default URL shape.

## Deployment

Static files only — deploy by copying `index.html`, `script.js`, `qrcode.min.js`, `favicon.svg`, `sitemap.xml`, and `robots.txt`. The `.nojekyll` file is present for GitHub Pages hosting.
