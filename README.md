# Heal Grow Thrive — Winter Park Landing Page

High-converting landing page for HGT's Winter Park summer program launch.
Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

---

## Quick Start

```bash
# 1. Install dependencies
cd landing-page
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local — add your Meta Pixel ID and webhook URL

# 3. Run dev server
npm run dev
# Open http://localhost:3000
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Required for Meta Pixel tracking
NEXT_PUBLIC_META_PIXEL_ID=1234567890

# Required for lead form to forward to your CRM (e.g., GoHighLevel webhook)
NEXT_PUBLIC_WEBHOOK_URL=https://your-crm-webhook-url.com/lead
```

If `NEXT_PUBLIC_WEBHOOK_URL` is not set, form submissions are logged to the server console (useful for testing). The form will still show success to the user.

---

## Project Structure

```
landing-page/
├── app/
│   ├── api/lead/route.ts      # API route — receives form, forwards to webhook
│   ├── globals.css            # Tailwind base + custom utilities
│   ├── layout.tsx             # Root layout, fonts, Meta Pixel script
│   └── page.tsx               # Main landing page (all 9 sections)
├── components/
│   └── LeadForm.tsx           # 5-field form with validation + UTM + Meta Pixel Lead event
├── lib/
│   ├── translations.ts        # All copy in EN + ES
│   └── utm.ts                 # UTM capture from URL → sessionStorage
├── public/photos/             # Optimized HGT photos
├── tailwind.config.ts         # Brand colors (teal, cream, coral, charcoal, sage)
└── next.config.js
```

---

## Where to Swap In Real Content

### Photos
All photos in `public/photos/`. Replace any of these with new HGT photos (keep filenames OR update references in `app/page.tsx`):

- `hero-beach-fieldtrip.jpg` → Hero image
- `group-activity-1.jpg` → Day Schedule section
- `fieldtrip-beach-2.jpg`, `fieldtrip-art-exhibit.jpg`, `group-portrait-1.jpg`, `group-activity-2.jpg` → Field Trips Gallery

Recommended: 1600px wide, JPEG quality 80, under 600KB each.

### Copy
All English + Spanish copy in `lib/translations.ts`. Edit any string there — both languages stay in sync via the structured object.

### Meta Pixel ID
1. Set `NEXT_PUBLIC_META_PIXEL_ID` in `.env.local`
2. PageView fires automatically on load
3. Lead event fires automatically on successful form submission

### Webhook URL (CRM Integration)
1. Create a webhook in GoHighLevel (or your CRM) that accepts POST with JSON body
2. Set the URL in `.env.local` as `NEXT_PUBLIC_WEBHOOK_URL`
3. The form posts these fields:
   ```json
   {
     "name": "...",
     "phone": "...",
     "email": "...",
     "age": "...",
     "medicaid": "yes|no|unsure",
     "language": "en|es",
     "utm_source": "...", "utm_medium": "...", "utm_campaign": "...",
     "utm_content": "...", "utm_term": "...",
     "fbclid": "...", "gclid": "...",
     "referrer": "...", "landing_page": "...",
     "submitted_at": "ISO timestamp",
     "source": "HGT Winter Park Landing Page",
     "ip": "...", "user_agent": "..."
   }
   ```

---

## Bilingual Toggle

Top-right corner. State is local (no persistence between page loads). To make the language sticky across visits, use cookies or localStorage in `app/page.tsx`.

To add a new language:
1. Add a third entry to `translations` object in `lib/translations.ts`
2. Update `Lang` type to `'en' | 'es' | 'pt'`
3. Update toggle in `app/page.tsx` to cycle through languages

---

## Deployment

### Vercel (recommended — zero config)
```bash
npm install -g vercel
vercel
```
Set the env vars in the Vercel dashboard. Connect to `winter-park.healgrowthrive.com` (or whichever subdomain) under Domains.

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --build --prod
```
Set env vars in Netlify dashboard → Site settings → Environment variables.

### Static Export (GitHub Pages)
Add to `next.config.js`:
```js
output: 'export',
images: { unoptimized: true },
```
Then `npm run build` and deploy the `out/` directory. Note: this disables the API route — you'll need to use a third-party form handler (Formspree, Web3Forms, or a Cloudflare Worker) for submissions.

---

## Performance

- Inline critical CSS via Tailwind
- `next/image` with AVIF/WebP, lazy loading by default
- Hero image preloaded with `priority`
- Photos optimized (max 1600px, JPEG q82, under 600KB)
- Edge runtime on API route for low latency
- Target: **<2s first contentful paint on 4G mobile**

---

## Accessibility

- Semantic HTML (h1, h2, nav, section, footer)
- ARIA labels on all icon-only buttons
- ARIA `aria-invalid` and `aria-describedby` on form errors
- Keyboard navigable (FAQ accordion, language toggle, sticky CTA)
- Focus visible on all interactive elements (default Tailwind ring)
- Alt text on all images

---

## QA Checklist Before Going Live

- [ ] `.env.local` has real Meta Pixel ID
- [ ] `.env.local` has real webhook URL
- [ ] Test form submission end-to-end (data lands in CRM)
- [ ] Test on iPhone Safari (375px width)
- [ ] Test on Android Chrome
- [ ] Spanish toggle works on every section
- [ ] Sticky CTA appears after scroll past hero
- [ ] FAQ accordion opens/closes
- [ ] All 4 CTAs scroll smoothly to form
- [ ] Page loads in <2s on Lighthouse mobile
- [ ] Meta Pixel "Lead" event fires (check Pixel Helper extension)
- [ ] UTM parameters captured in CRM payload
