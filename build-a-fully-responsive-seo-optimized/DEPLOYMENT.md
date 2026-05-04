# BrightCalc Deployment Guide

## What changed for calculator clicks

All calculator links now go directly to the working form section using URLs like:

```text
/emi-calculator/#calculator
```

The generated `index.html` files are still required for static hosting, but visitors see clean URLs such as `/emi-calculator/` and land directly on the calculator form.

## Recommended free domain

Use this Netlify site name if it is available:

```text
brightcalc-pvsagar-20260504
```

Your website URL will be:

```text
https://brightcalc-pvsagar-20260504.netlify.app/
```

If Netlify says the name is already taken, choose another unique site name. Before uploading the final version again, rebuild the site with your final URL:

```powershell
$env:SITE_URL="https://your-final-site-name.netlify.app"
node scripts/build-site.js
node scripts/verify-site.js
```

## Upload with Netlify Drop

1. Open `https://app.netlify.com/drop`.
2. Sign in or create a free Netlify account.
3. Drag this whole project folder into the upload area.
4. Wait for Netlify to publish the website.
5. Click `Customize` near the preview URL.
6. Set the site name to `brightcalc-pvsagar-20260504` if available.
7. Open `https://brightcalc-pvsagar-20260504.netlify.app/`.
8. Test one calculator link, for example EMI Calculator. It should jump directly to the calculation form.

## Updating later

After any code change:

```powershell
node scripts/build-site.js
node scripts/verify-site.js
```

Then drag the updated project folder to the Netlify site's Deploys page.
