# Jiel Restaurant Website

A modern, mobile-first, and secure static website for **Jiel**, built with DeepSeek Harness.

## Description

This is a single-page restaurant website featuring a warm, minimal aesthetic. It presents the Jiel brand, a live text-based menu, the restaurant's story, location and hours, and a reservation request form. The site is built with plain HTML, CSS, and JavaScript — no frameworks or build step required.

## Features

- **Mobile-first design** — responsive layout from 320px up through tablet (768px) and desktop (1024px+).
- **Live text menu** — six categories (Snacks, Mains, Drinks, Herbal Teas, Fresh Juice, Fruits) with multiple items each, rendered as semantic HTML (no PDFs).
- **Photography** — each menu category is marked with a circular photo from the printed menu, and a "From Our Kitchen" band on the brand green shows a twelve-photo gallery. All images are self-hosted, lazy-loaded, and credited in `images/CREDITS.md`.
- **Shopping cart & WhatsApp ordering** — add items to a cart, review them in a sidebar, and send the order to the restaurant via WhatsApp.
- **Reservation form** — sends reservation requests to the restaurant via WhatsApp, with client-side validation.
- **Sticky call-to-action bar** — fixed bottom bar with "Order Online Now" and "View Menu" buttons and a glassmorphism blur effect.
- **Google Maps** — embedded map pinned to the JIEL business location.
- **Smooth scrolling** — internal anchor navigation scrolls smoothly.
- **WhatsApp "Ask Jiel" button** — a floating button that opens a WhatsApp chat with the restaurant.

## File Structure

```
index.html          — page markup
css/style.css       — Warm Minimalism styling (+ brand green photo band)
js/main.js          — cart, ordering, reservations, smooth scroll
images/             — category and gallery photographs, plus CREDITS.md
robots.txt          — search-engine crawl rules
sitemap.xml         — sitemap for search engines
README.md           — this file
```

## Deployment

The site is plain static files — there is no build step, and every host below
serves this repository root as-is.

### Cloudflare Pages (primary — https://jiel.pages.dev)

Connected through Cloudflare's Git integration, so every push to `main`
redeploys automatically. One-time dashboard setup:

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorise GitHub and select `maikoemmanuel50-dev/Jiel`, branch `main`.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. **Project name:** `jiel` — this decides the free address, `https://jiel.pages.dev`.
5. **Save and Deploy.**

Cloudflare Pages honours `_headers`, so the security headers in that file
(HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) and the
`frame-ancestors` CSP directive are applied to every response.

### GitHub Pages (mirror — https://maikoemmanuel50-dev.github.io/Jiel/)

Published from `main` / root; `.nojekyll` stops Jekyll from processing the files.
GitHub Pages **ignores `_headers`**, so it sends none of the security headers
above, and it carries a soft 100 GB/month bandwidth limit.

### Netlify (configured but blocked)

`jiel.netlify.app` is still linked to this repository, but the account refuses
every deploy with `Account credit usage exceeded - new deploys are blocked until
credits are added`. Its published copy is stuck on an older menu, and its QR
poster still points there — regenerate that QR for `jiel.pages.dev`.

### Local preview

Open `index.html` directly in a browser, or serve the folder with any static server (for example, `npx serve`).

## Security Notes

- **Security headers** are declared in `_headers` (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy). They only take effect on hosts that read that file — Cloudflare Pages does; GitHub Pages does not.
- A **Content Security Policy (CSP)** is also defined in a `<meta>` tag, so the policy still applies on hosts that ignore `_headers`. Note `frame-ancestors` is only honoured when delivered as a header.
- Only local (`self`), data, and explicitly-allowed HTTPS resources are permitted; no third-party scripts are used.
- In production, ensure the hosting provider serves the site over **HTTPS** (Cloudflare Pages and GitHub Pages do this automatically) so the CSP and secure defaults remain effective.
