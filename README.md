# Jiel Restaurant Website

A modern, mobile-first, and secure static website for **Jiel**, built with DeepSeek Harness.

## Description

This is a single-page restaurant website featuring a warm, minimal aesthetic. It presents the Jiel brand, a live text-based menu, the restaurant's story, location and hours, and a reservation request form. The site is built with plain HTML, CSS, and JavaScript — no frameworks or build step required.

## Features

- **Mobile-first design** — responsive layout from 320px up through tablet (768px) and desktop (1024px+).
- **Live text menu** — three categories (Snacks, Mains, Drinks) with multiple items each, rendered as semantic HTML (no PDFs).
- **Shopping cart & WhatsApp ordering** — add items to a cart, review them in a sidebar, and send the order to the restaurant via WhatsApp.
- **Reservation form** — sends reservation requests to the restaurant via WhatsApp, with client-side validation.
- **Sticky call-to-action bar** — fixed bottom bar with "Order Online Now" and "View Menu" buttons and a glassmorphism blur effect.
- **Google Maps** — embedded map pinned to the JIEL business location.
- **Smooth scrolling** — internal anchor navigation scrolls smoothly.
- **WhatsApp "Ask Jiel" button** — a floating button that opens a WhatsApp chat with the restaurant.

## File Structure

```
index.html          — page markup
css/style.css       — Warm Minimalism styling
js/main.js          — cart, ordering, reservations, smooth scroll
robots.txt          — search-engine crawl rules
sitemap.xml         — sitemap for search engines
README.md           — this file
```

## Deployment

### Netlify

1. Go to [netlify.com](https://www.netlify.com) and sign in.
2. Drag and drop this folder into the Netlify dashboard, or connect a Git repository and push it.
3. Netlify serves the static files automatically.

### Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Run `vercel` in this folder, or import the repository via the Vercel dashboard.
3. Vercel builds and deploys the static site.

### Local preview

Open `index.html` directly in a browser, or serve the folder with any static server (for example, `npx serve`).

## Security Notes

- A **Content Security Policy (CSP)** is defined in a `<meta>` tag to restrict script, style, image, font, and connection sources to trusted origins.
- Only local (`self`), data, and explicitly-allowed HTTPS resources are permitted; no third-party scripts are used.
- In production, ensure the hosting provider serves the site over **HTTPS** (Netlify and Vercel do this automatically) so the CSP and secure defaults remain effective.
