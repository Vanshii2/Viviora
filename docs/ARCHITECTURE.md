# Viviora — Architecture

## Stack decisions

| Area         | Choice                                                                                | Why                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Language     | JavaScript (ES modules) everywhere                                                    | README preference; Zod gives runtime validation at the boundaries, which matters more than static types here    |
| Frontend     | React 19 + Vite 6, React Router 7                                                     | Required stack; data router enables per-route code splitting                                                    |
| Server state | TanStack Query                                                                        | Pages already read data through hooks → swapping mock data for REST calls in Phase 2 touches only service files |
| Forms        | React Hook Form + Zod 4                                                               | Same schema library on client and server                                                                        |
| Styling      | CSS Modules + CSS custom-property tokens                                              | Scoped styles, no runtime cost, tokens in one file                                                              |
| Icons        | lucide-react (sparingly)                                                              | README: icons only where they aid clarity                                                                       |
| Backend      | Express 5, Mongoose 8, Helmet, CORS allowlist, express-rate-limit, Zod env validation |                                                                                                                 |
| Monorepo     | npm workspaces + concurrently                                                         | One `npm install`, one `npm run dev`                                                                            |

## Request flow

```
React page → feature hook (TanStack Query) → feature service → apiClient (axios) → /api/v1
  → Express route → controller (thin) → service (business logic) → model/repository → MongoDB
```

AI Diet (Phase 4):
`form → POST /api/v1/ai-diet → controller → request validation → aiDiet.service → AI provider adapter → output schema validation + safety checks → persist → response`

External providers (SMS/OTP, payments, AI, storage, email) are always behind an adapter interface with a mock
implementation for development.

## Client structure

```
client/src/
  app/            App providers, router, query client
  config/         site.js — brand, nav, contact/social placeholders
  styles/         tokens.css (design tokens), global.css
  utils/          cx, formatters
  components/
    common/       Button, Container, Section, SectionHeading, MediaCard, CardGrid, Accordion,
                  SmartImage, Logo, StateMessage, PageMeta
    public/       Navbar, Footer, NewsletterForm, PageHero, CtaBanner
  layouts/        PublicLayout   (DashboardLayout, AdminLayout added in Phases 3 / 8)
  features/
    programs/     data (mock) · services · hooks · ProgramCard, CategoryCard
    blog/         data (mock) · services · hooks · BlogCard, ArticleBody
    about/, faq/, testimonials/, contact/
  pages/          One file per route; composes components, no business logic
```

## Server structure

```
server/src/
  server.js       Boot: connect DB (optional in dev) → listen → graceful shutdown
  app.js          Express app: helmet, CORS allowlist, JSON limit, rate limit, routes, 404, error handler
  config/         env.js (Zod-validated env), db.js
  routes/         index.js → /api/v1/*
  middleware/     notFound, errorHandler
  models/         Program (options + FAQs embedded), BlogPost, Faq, ContactMessage
  validators/     Zod schemas for params, query and body
  controllers/    Thin: read validated input, call service, send response
  services/       Queries + mapping to public response shapes (no Mongo internals leak)
  seed/           seed.js + data/ (starting content)
  utils/          HttpError
server/test/      API integration tests (node:test + supertest + mongodb-memory-server)
```

### API endpoints (Phase 3)

| Method & path                               | Purpose                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| `GET /api/v1/health`                        | Status, uptime, database state                                         |
| `GET /api/v1/programs` (`?featured=true`)   | Program cards, ordered                                                 |
| `GET /api/v1/programs/:slug`                | Program detail (main program, or focused option inheriting its parent) |
| `GET /api/v1/blog/categories`               | Blog categories in use                                                 |
| `GET /api/v1/blog/posts` (`?category=slug`) | Article summaries, newest first                                        |
| `GET /api/v1/blog/posts/:slug`              | Article with structured body blocks                                    |
| `GET /api/v1/faqs` (`?scope=home`)          | FAQs                                                                   |
| `POST /api/v1/contact`                      | Store a contact message (validated, honeypot, 5 per 15 min per IP)     |

All content routes return **503 `DATABASE_UNAVAILABLE`** immediately when MongoDB is down (instead of hanging).
Validation errors return **400 `VALIDATION_ERROR`** with per-field `details`.

### API conventions

- Base path `/api/v1`
- Success: `{ "success": true, "data": … }` (lists add `meta` for pagination)
- Error: `{ "success": false, "error": { "code": "NOT_FOUND", "message": "…" } }`
- 5xx messages are hidden in production

## Route map

**Public (built):** `/`, `/programs`, `/programs/:slug` (7 main programs + 32 focused programs), `/about`, `/blog`, `/blog/:slug`, `/contact` (`?subject=` prefills the form), `*` (404). Unlinked but present: `/testimonials`, `/terms`, `/privacy`
`/blog?category=:slug`, `/blog/:slug`, `/testimonials`, `/contact` (`?program=` prefills the form), `/terms`, `/privacy`, `*` (404)

**Dashboard (Phase 3+):** `/login`, `/dashboard`, `/dashboard/programs`, `/dashboard/ai-diet`, `/dashboard/ai-diet/history`,
`/dashboard/reports`, `/dashboard/consultations`, `/dashboard/consultations/book`, `/dashboard/progress`,
`/dashboard/notifications`, `/dashboard/settings`

**Admin (Phase 8):** `/admin`, `/admin/users`, `/admin/programs`, `/admin/orders`, `/admin/appointments`,
`/admin/reports`, `/admin/blogs`, `/admin/coupons`, `/admin/testimonials`

## Data model

**Built (Phase 3)**

| Model          | Key fields                                                                                                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Program        | slug (unique), title, shortDescription, description, category, image, duration, audience[], benefits[], included[], price (₹, nullable), faqs[{key, question, answer}], options[{slug (unique), title, shortDescription}], featured, order, isPublished |
| BlogPost       | slug (unique), title, excerpt, category{slug, name}, author, publishedAt, readingMinutes, image, body[{type: p/h2/ul, text, items}], isPublished                                                                                                        |
| Faq            | key, scope (home), question, answer, order, isPublished                                                                                                                                                                                                 |
| ContactMessage | name, email, subject, message, status (new/read/archived), timestamps                                                                                                                                                                                   |

**Later:** User (phone, role: user/nutritionist/admin), OtpChallenge, Order, Payment, DietPlan, Report, Appointment,
ProgressEntry, Notification, Coupon, Testimonial, AuditLog.

## Security checklist by module

- **OTP (Phase 3):** hash OTPs, 5-min expiry, max attempts per challenge, rate limit per phone and per IP, generic responses (no account enumeration), provider behind adapter.
- **Sessions:** short-lived access JWT + rotating refresh token in `httpOnly`, `Secure`, `SameSite` cookies; role checks server-side on every protected route.
- **Payments (Phase 5):** server creates Razorpay orders; verify HMAC signature server-side; webhook signature verification; idempotent order activation; never trust client "success".
- **Reports (Phase 6):** private storage only, short-lived signed URLs, magic-byte MIME check + size limit, owner/assigned-nutritionist authorization, admin access audit-logged.
- **AI diet (Phase 4):** key server-side only; structured JSON validated by schema before saving or rendering; calorie floors and refusal of extreme plans; no diagnosis/medication advice; visible disclaimer; professional-review prompt for medical conditions.
- **General:** Helmet, explicit CORS allowlist, JSON body limit, rate limiting, Zod-validated env and request bodies, no secrets in git, no health data in logs.
