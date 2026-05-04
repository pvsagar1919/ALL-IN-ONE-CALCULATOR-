# BrightCalc

A fast static calculator website with SEO-friendly directory URLs, shared calculator logic, search suggestions, recent calculations, shareable results, articles, sitemap, robots file, and responsive UI.

Calculator links include `#calculator`, so users land directly on the working calculator form after clicking a tool.

## Run locally

Serve the folder with the included static server so clean URLs like `/emi-calculator/` resolve correctly.

```bash
node scripts/serve.js
```

The server writes the local preview URL to `.server-port`.

## Rebuild pages

```bash
node scripts/build-site.js
```

Set `SITE_URL` before rebuilding if you want production canonical and sitemap URLs for a specific domain.

## Upload to Netlify

1. Go to `https://app.netlify.com/drop` and sign in.
2. Drag this whole project folder into the upload area.
3. Netlify will publish it at a `netlify.app` URL.
4. In Netlify, select `Customize` near the preview URL and choose `brightcalc-pvsagar-20260504` as the site name if it is available.
5. Your free website URL will be `https://brightcalc-pvsagar-20260504.netlify.app/`.
6. If Netlify says the name is taken, choose another unique name, then rebuild with `SITE_URL` set to that final URL before uploading again.
