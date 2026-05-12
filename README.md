# Life Skills, Summer Thrills — Winter Park Landing Page

Single-file static landing page for the Winter Park 2026 summer camp run by Heal Grow Thrive.

## Live site
Deployed via GitHub Pages from this branch.

## Stack
- Plain HTML + CSS + JS — no build step, no framework, no dependencies.
- Bilingual EN / ES (toggle in nav, persists in localStorage).
- Responsive (mobile-first).

## Editing
- Copy lives inline in `index.html` — every translatable string has a `<span class="en">` and `<span class="es">` pair.
- Photos in `assets/photos/`. Logos in `assets/logos/`.
- Brand colors at the top of the `<style>` block.

## Lead form
The form posts to `FORM_ENDPOINT` defined in the inline `<script>` near the bottom of `index.html`.
- **Currently empty** — the form shows the success state for testing but does not deliver leads anywhere.
- To wire it: paste a Formspree URL, webhook URL (Virtual Scale, GoHighLevel, Zapier), or any endpoint that accepts a JSON POST.

```js
const FORM_ENDPOINT = 'https://formspree.io/f/XXXXXXXX'; // <-- paste here
```

## Positioning rules — IMPORTANT
This page is for underserved Latino + Afro-American families. **Do not** add language about:
- "mental health", "clinical program", "therapy", "treatment plans", "evidence-based therapy"
- diagnoses (ADHD, autism, anxiety, behavioral challenges)

Lead with: **(1) it's free** and **(2) it's a fun summer camp.** AHCA / Level-2 / professional staff are credibility — never the headline.
