# Viviora — Phase Log

A running record of what has been built in each phase, what is still placeholder, and what comes next.
Updated at the end of every phase.

| Phase                                                       | Status                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| 0 — Planning & repository setup                             | ✅ Done (2026-11-03)                                         |
| 1 — Design system & public website                          | ✅ Done (2026-11-03)                                         |
| 2 — Frontend UI development (your Phase 2 brief)            | ✅ Done (2026-11-03)                                         |
| 3 — Backend foundation (MongoDB, public APIs) + photography | ✅ Built & tested (2026-11-03), waiting for your MongoDB URI |
| 4 — Authentication & user dashboard                         | ⏳ Recommended next                                          |
| 5 — AI Diet Generator                                       | —                                                            |
| 6 — Programs, orders & Razorpay                             | —                                                            |
| 7 — Reports & consultations                                 | —                                                            |
| 8 — Progress & notifications                                | —                                                            |
| 9 — Admin panel                                             | —                                                            |
| 10 — Quality & deployment                                   | —                                                            |

> Numbering note: your Phase 2 brief was a frontend refinement phase, so the README's later phases
> each move down one number (the README's "Phase 2 — Backend foundation" is now Phase 3).

---

## Phase 0 — Planning & repository setup ✅

**Goal:** a clean, runnable MERN skeleton with architecture notes.

### Built

- npm-workspaces monorepo: `client/` (React 19 + Vite 6) and `server/` (Express 5 + Mongoose 8)
- One command to run both: `npm run dev`
- ESLint (client + server), Prettier, `.editorconfig`, `.gitignore`, git repository initialised (`main`, nothing committed yet)
- `.env.example` at the root, in `server/` and in `client/` (placeholders only)
- Server:
  - Zod-validated environment config (`server/src/config/env.js`)
  - MongoDB connection that is optional in development (`server/src/config/db.js`)
  - Helmet security headers, CORS allowlist from `CLIENT_URL`, 100 kb JSON limit, rate limiting (300 req / 15 min on `/api`)
  - `GET /api/v1/health` → status, uptime, database state
  - Consistent JSON 404 and central error handler (hides 5xx details in production)
  - Graceful shutdown; clear message if the port is already in use
- Architecture, route map, data model and security checklist: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

### Decisions

- **JavaScript** everywhere (no TypeScript), with Zod for runtime validation
- **API port 5050**: port 5000 is used by macOS AirPlay Receiver
- **Zod 4**: Zod 3 has a high-severity advisory (GHSA-mrhx-c7xc-m3w5); production dependencies audit clean
- **CSS Modules + design tokens** for styling

### Verified

- Health check works directly and through the Vite proxy
- Unknown route → JSON 404; disallowed origin → rejected by CORS; security and rate-limit headers present

---

## Phase 1 — Design system & public website ✅

> Superseded in places by Phase 2 (navigation, homepage content, program structure, contact form).

**Goal:** a complete, responsive public website on mock data, matching the approved screenshots.

### Design system

- Tokens in `client/src/styles/tokens.css`: README colour palette, Playfair Display (headings) + Inter (body), type scale, 4px spacing scale, radii, two soft shadows, 1200px container, motion
- `prefers-reduced-motion` respected; visible focus rings; skip-to-content link
- Reusable components: `Button`, `Container`, `Section`, `SectionHeading`, `MediaCard`, `CardGrid`, `Accordion`, `SmartImage`, `Logo`, `StateMessage`, `PageMeta`, `Navbar`, `Footer`, `NewsletterForm`, `PageHero`, `CtaBanner`
- **One card component (`MediaCard`) for every program, category and blog card**: image → title → description → button, so all cards have identical structure. No category icons.

### Pages

| Route                           | Contents                                                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                             | Hero (new tagline) → Nutrition Solutions (exactly 3 cards: Gut Health, Weight Loss, Muscle Building) → FAQ (two-column accordion) → Final CTA → Footer |
| `/about`                        | Hero → My Story → My Academic Background (**Vinni Kapoor Sharma**) → Qualifications → Certifications → Mission & Vision → Our Philosophy               |
| `/programs`                     | Minimal hero → all **7** category cards (the 7th is centred on desktop)                                                                                |
| `/programs?category=gut-health` | That category's programs (all 32 programs from the README)                                                                                             |
| `/programs/:slug`               | One dynamic template: name, description, duration, price, Buy Now, who it's for, benefits, what's included, FAQ                                        |
| `/blog`, `/blog/:slug`          | Category filter chips, article cards; article pages rendered from structured blocks (never raw HTML)                                                   |
| `/testimonials`                 | Review grid (placeholders); video and transformation sections appear automatically once real content exists                                            |
| `/contact`                      | Validated form (React Hook Form + Zod); "Buy Now" pre-fills the program; contact methods appear once configured                                        |
| `/terms`, `/privacy`, 404       | Simple placeholder pages                                                                                                                               |

### Content you supplied

- Hero heading: **"Your Body Is Unique. Your Nutrition Should Be Too."**
- Hero description: **"Personalized nutrition for your body, your goals, and your lifestyle."**
- Mission, Vision and Our Philosophy text, word for word
- Instructor name: **Vinni Kapoor Sharma**

### Deliberately left out (per README removals)

- The four feature tiles under the hero (shown in the first screenshot, but on the README's removed list)
- "Join thousands of happy clients" in the CTA (an unverified claim); it reads "Take the first step toward a healthier lifestyle."
- Category icons on program cards (shown in one Programs screenshot; the README forbids them)
- Search icon: optional in the README, and it would do nothing until search exists
- Social icons: hidden until real URLs are added to `client/src/config/site.js`

### Architecture notes

- Pages never import mock data directly. They read through **hooks → services**, e.g. `features/programs/hooks/usePrograms.js` → `features/programs/services/programs.service.js`. Phase 2 only rewrites the service functions to call the API.
- Mock data shapes match the planned Mongoose models, so they become the Phase 2 seed data.
- Route-level code splitting: main bundle ≈ 125 kB gzipped; form libraries load only on `/contact`.

### Verified

- `npm run lint`: no errors · `npm run build`: succeeds
- Visually checked in Chrome at desktop (1440px) and mobile (390px): Home, About, Programs, Program detail
- **Not yet checked:** real devices, Safari/Firefox, screen readers

---

## Phase 2 — Frontend UI development ✅

**Goal (your brief):** a polished, working public frontend with a finished homepage and a reusable
structure. It built on the Phase 1 code rather than starting over: no new dependencies, and the backend was not touched.

### Your decisions applied

- Hero keeps **your** tagline ("Your Body Is Unique. Your Nutrition Should Be Too.") but uses the new layout: two buttons and a yellow highlight
- About page keeps **Our Philosophy** after Mission & Vision

### What changed

| Area                     | Change                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navbar                   | Home · Programs · About · Blog · Contact (Testimonials removed); **Get Started → /programs**; compact mobile menu (closes with Escape, focus returns to the menu button)                                                                                                                                               |
| Hero                     | Eyebrow "NUTRITION & WELLNESS"; yellow marker highlight on _Unique_ and _Nutrition_ (dark text stays readable); **Explore Programs → /programs**, **Learn About Us → /about**                                                                                                                                          |
| Nutrition Solutions      | Heading "Nutrition Solutions"; exactly 3 cards with your new descriptions; **Explore Program → /programs/gut-health** (etc.); "View All Programs" link removed                                                                                                                                                         |
| FAQ                      | Your 5 new questions; accessible accordion with only one item open at a time                                                                                                                                                                                                                                           |
| Final CTA                | "Start Your Health Journey Today" on a light-yellow panel; decorative leaf removed                                                                                                                                                                                                                                     |
| Footer                   | Brand + short description + Quick Links + copyright only; newsletter, support and programs columns removed                                                                                                                                                                                                             |
| Programs page            | "Explore Our Programs" + intro; the 7 programs as cards linking to their own detail pages; old `?category=` links redirect                                                                                                                                                                                             |
| Program detail           | Two-column layout: content on the left, a sticky summary on the right (duration, price, **Get Started → /contact**, "online enrolment coming soon"). On mobile the summary appears first. Sections: description, who it's for, benefits, what's included, focused programs, FAQ. Unknown slug shows the Not Found page |
| Program data             | Restructured around the **7 main programs** (`id, slug, title, shortDescription, description, category, image, duration, audience, benefits, included, price, faqs`). The 32 README sub-programs are listed as "focused programs" inside each one and keep their own pages                                             |
| Pricing                  | Centralized in **`PROGRAM_PRICING`** at the top of `client/src/features/programs/data/programs.mock.js` (`null` shows "Pricing coming soon")                                                                                                                                                                           |
| About                    | My Story is now the page opening (with portrait); then Academic Background, Qualifications, Certifications, Mission, Vision, Philosophy. No icons, statistics or extra sections                                                                                                                                        |
| Blog                     | Cards now say **Read More**; category filter kept                                                                                                                                                                                                                                                                      |
| Contact                  | Fields: **Name, Email, Subject, Message** with client-side validation. A valid submit shows "Online contact submission will be available soon — your message has **not** been sent yet" and keeps the typed text. "Get Started" on a program pre-fills the Subject                                                     |
| Typography               | Headings use a bolder Playfair Display (600)                                                                                                                                                                                                                                                                           |
| Removed (no longer used) | `NewsletterForm`, `CategoryCard`, mock `contact.service`                                                                                                                                                                                                                                                               |

### Routes

| Route                                 | Page                                                                             |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `/`                                   | Home                                                                             |
| `/programs`                           | Programs listing (7 programs)                                                    |
| `/programs/:slug`                     | Program detail: the 7 main programs + 32 focused programs                        |
| `/about`                              | About                                                                            |
| `/blog`, `/blog/:slug`                | Blog listing and article                                                         |
| `/contact`                            | Contact (`?subject=` pre-fills the form)                                         |
| `*`                                   | Not Found (also shown for unknown program and article slugs)                     |
| `/testimonials`, `/terms`, `/privacy` | Still exist from Phase 1 but are **not linked** anywhere, per the new navigation |

### Testing (actual results)

- `npm run lint`: 0 errors, 0 warnings
- `npm run build`: succeeds; main bundle 125 kB gzipped, other pages load on demand
- **Automated browser checks in headless Chrome: 44/44 passed.** They cover:
  - every route, including invalid slugs
  - navbar links and the Get Started button
  - hero buttons and card navigation (real clicks)
  - FAQ: opens one item, only one open at a time, closes again
  - the 7 program cards and the redirect from old program links
  - detail page sections, price and duration, and the Get Started link
  - contact form: required-field errors, invalid email, the "not sent" notice, typed text kept
  - no horizontal scrolling at 360, 390, 768, 1024 and 1440px, on six pages
  - mobile menu: opens, closes with Escape, returns focus
  - basic accessibility on four pages: one h1, image alt text, form labels, named buttons and links
- **Browser console: no errors or warnings.** One router warning about the fallback shown while a page first loads was found and fixed during testing.
- Screenshots checked at desktop and mobile widths
- **Not yet tested:** Safari, Firefox, real phones, a screen reader, or an automated contrast audit

### ⚠️ Placeholders to replace before launch

| What                                                                     | Where                                                                     |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| **Photography** (every image currently shows a soft branded placeholder) | `client/public/images/` (see list below)                                  |
| Academic background (degree, institution) and qualifications             | `client/src/features/about/about.data.js` (shown faded and italic)        |
| Certification issuing bodies                                             | same file                                                                 |
| Program prices                                                           | `PROGRAM_PRICING` in `client/src/features/programs/data/programs.mock.js` |
| Program durations, audience, benefits and inclusions (draft copy)        | same file                                                                 |
| FAQ answers (draft)                                                      | `client/src/features/faq/faq.data.js`                                     |
| Blog articles (4 drafts)                                                 | `client/src/features/blog/data/blog.mock.js`                              |
| Email, phone and WhatsApp (shown on Contact once set)                    | `client/src/config/site.js`                                               |

### Not functional yet (by design)

- Contact form submission (needs the backend)
- Online enrolment and payment (Get Started leads to Contact)
- Login and sign-up

### Images to supply

JPGs, landscape (about 1600px wide) unless noted:

```
client/public/images/
  home/hero.jpg                    hero photo
  about/portrait.jpg               portrait of Vinni Kapoor Sharma (portrait 4:5)
  programs/hero.jpg                Programs page hero
  programs/<slug>.jpg              gut-health, weight-loss, muscle-building, womens-health,
                                   lifestyle-disorders, kids-nutrition, sports-nutrition
                                   (optional: one per focused program, e.g. ibs-support.jpg;
                                   falls back to the parent program's image)
  blog/<image>.jpg                 personalized-nutrition, digestion-habits, balanced-plate, sleep-stress
```

---

## Phase 3 — Backend foundation + photography ✅

**Goal:** serve the public content from MongoDB through a REST API, make the contact form really send, and replace the image placeholders.

### Database & seed

- Mongoose models: **Program** (focused options and FAQs embedded), **BlogPost**, **Faq**, **ContactMessage**
- Content moved out of the website code into `server/src/seed/data/` and loaded with **`npm run seed -w server`**
  (replaces programs, blog posts and FAQs; never touches contact messages; refuses to run in production without `--force`)
- **Prices** are now set in `PROGRAM_PRICING` in `server/src/seed/data/programs.data.js`, then re-seeded

### API (`/api/v1`)

| Endpoint                                                                          | Notes                                                                                                            |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `GET /programs` (`?featured=true`)                                                | 7 programs / the 3 homepage programs                                                                             |
| `GET /programs/:slug`                                                             | Main program or focused option; 404 if unknown, 400 if malformed                                                 |
| `GET /blog/categories`, `GET /blog/posts` (`?category=`), `GET /blog/posts/:slug` |                                                                                                                  |
| `GET /faqs`                                                                       | Homepage FAQs                                                                                                    |
| `POST /contact`                                                                   | Zod-validated; stores the message; hidden honeypot field drops bot submissions silently; **5 per 15 min per IP** |

Architecture: route → Zod validation → thin controller → service → Mongoose model. Responses never expose MongoDB internals.
Errors: `400 VALIDATION_ERROR` (with per-field details), `400 INVALID_JSON`, `404 NOT_FOUND`, `429 RATE_LIMITED`,
`503 DATABASE_UNAVAILABLE` (returned immediately when MongoDB is down, instead of hanging).

### Website changes

- Pages now load programs, blog and FAQs from the API (through the existing services — pages unchanged in structure)
- Loading **skeleton cards** and friendly **error messages with "Try again"** on every data section
- Unknown program and article slugs show the Not Found page (API 404)
- **Contact form now really sends**: shows "Thank you — your message has been received" only after the server confirms;
  server-side field errors appear under the matching fields; rate-limit and network errors are shown clearly

### Photography

- 13 free-licence photos from Unsplash (commercial use allowed) downloaded into `client/public/images/`,
  resized for the web (2.6 MB total). Sources listed in `client/public/images/CREDITS.md`
- Covered: home hero, Programs hero, all 7 programs, all 4 blog articles
- About page: a nutrition still-life photo (`about/story.jpg`, no person) until a real photo of Vinni Kapoor Sharma is supplied

### Testing (actual results)

- `npm test -w server`: **20/20 API tests pass** against a throwaway in-memory MongoDB. They cover:
  - listing and ordering, the featured filter, detail pages and focused-option inheritance, 404 and 400 cases
  - blog filtering and structured bodies, FAQs
  - contact form: stored, email normalised, field errors, malformed JSON, honeypot, rate limit
  - 503 when the database is down
- Full stack run (website → API → seeded temporary MongoDB): **47/47 browser checks pass** in headless Chrome. They add:
  - a contact message submitted in the browser and confirmed stored in the database
  - every photo loading on Home, Programs and Blog
- `npm run lint`: clean; `npm run build`: succeeds (main bundle 144 kB gzipped; axios added 19 kB)
- Browser console: no JavaScript errors. The browser itself logs the expected 404 network response when you open a non-existent program address.
- **Not yet done:** running against _your_ MongoDB. It needs your connection string, see below.

### ▶ What you need to do

1. Open `server/.env` and set `MONGO_URI=` to your connection string (database name `viviora`, e.g. `…mongodb.net/viviora?retryWrites=true&w=majority`)
2. Atlas only: allow your IP under **Network Access**
3. Run `npm run seed -w server`, then `npm run dev`
4. Check http://localhost:5050/api/v1/health shows `"database": "connected"`

### Notes

- Contact messages are stored but **no email notification** is sent yet (needs an email provider), and there is no admin screen to read them yet (admin panel phase). Until then, view them in MongoDB Atlas → Browse Collections → `contactmessages`.
- Behind a hosting proxy in production, the rate limiter will need Express `trust proxy` configured (deployment phase).

### GitHub & client preview (2026-11-03)

- Code pushed to https://github.com/Vanshii2/Viviora
- **Client preview on GitHub Pages:** https://vanshii2.github.io/Viviora/ (deployed automatically on every push to `main`)
  - Pages can only host static files, so the preview uses a **demo mode** (`VITE_DEMO_MODE=true`): content comes from the seed data bundled into the page, and the contact form clearly says the message was **not** sent
  - The site works under the `/Viviora/` sub-path, including direct links (a `404.html` fallback) and images
  - Normal builds never include the demo code or data
- Verified locally against the exact Pages build: **25/25 browser checks pass**, including:
  - every page opened by direct link, and photos loading
  - your Mission, Vision and Philosophy text present word for word on the About page
  - the preview contact notice
- The Not Found page now has a proper top-level heading (accessibility)
- `server/.env` is pre-filled with your cluster address. Only the password needs adding; the file is never committed

---

## Recommended next: Phase 4 — Authentication & user dashboard

- Phone OTP sign-in behind an SMS-provider adapter (with a development mock), hashed OTPs, expiry and attempt limits
- Secure sessions (httpOnly cookies), roles (user / nutritionist / admin), protected routes
- Dashboard shell and account settings; "Get Started" leads to sign-up
- **Needs from you:** which SMS/OTP provider to use (e.g. MSG91, Twilio). A mock works until then.
