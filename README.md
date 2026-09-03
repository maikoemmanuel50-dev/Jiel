# Jiel Restaurant Website

A modern, mobile-first, and secure static website for **Jiel**, built with DeepSeek Harness.

## Description

This is a single-page restaurant website featuring a warm, minimal aesthetic. It presents the Jiel brand, a live text-based menu, the restaurant's story, location and hours, and a reservation request form. The site is built with plain HTML, CSS, and JavaScript — no frameworks or build step required.

## Features

- **Mobile-first design** — responsive layout from 320px up through tablet (768px) and desktop (1024px+).
- **Live text menu** — three categories (Appetizers, Mains, Desserts) with three items each, rendered as semantic HTML (no PDFs).
- **Reservation form** — client-side validation for name, email, phone, date, and time, with dynamic success/error messaging.
- **Sticky call-to-action bar** — fixed bottom bar with "Book a Table" and "View Menu" buttons and a glassmorphism blur effect.
- **Smooth scrolling** — internal anchor navigation scrolls smoothly.
- **AI-ready** — a floating "Ask Jiel" button is wired to a placeholder handler that logs `Chatbot triggered` to the console; this will later connect to the local Harness AI.

## File Structure

```
index.html          — page markup
css/style.css       — Warm Minimalism styling
js/main.js          — validation, smooth scroll, chatbot placeholder
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
