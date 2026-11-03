# Viviora --- Project README & Claude Development Guide

**Project:** Viviora\
**Product:** Premium nutrition and wellness platform\
**Stack:** MERN --- React + Vite, Node.js + Express, MongoDB + Mongoose\
**Purpose:** This README is the starting specification for building
Viviora from scratch with Claude. It defines the product, finalized UI
direction, architecture, development order, and prompts to use phase by
phase.

------------------------------------------------------------------------

## 1. Project Overview

Viviora is a premium nutrition and wellness platform that helps users
explore nutrition programs, access personalized nutrition support,
generate AI-assisted diet plans, book consultations, upload health
reports, and track progress.

This is not only a marketing website. It will grow into a health-tech
application with:

-   Public website and program marketplace
-   Phone OTP authentication
-   Program purchases and Razorpay payments
-   User dashboard
-   AI Diet Generator and saved diet-plan history
-   Consultation booking
-   Secure report uploads
-   Progress tracking and notifications
-   Admin dashboard and content management
-   Blog, testimonials, coupons, and analytics

Build the application in phases. **Do not generate the entire
application in one giant step.** First inspect the requirements,
establish architecture and design tokens, then implement one module at a
time.

## 2. Important Product Decisions

-   Use **MERN only**. Do not use Next.js.
-   Frontend: React + Vite.
-   Backend: Node.js + Express.
-   Database: MongoDB + Mongoose.
-   Use REST APIs between frontend and backend.
-   Keep frontend and backend separated in `client/` and `server/`.
-   Follow SOLID principles, separation of concerns, reusable
    components, and clean code.
-   Keep AI Diet Generator as an independent feature module.
-   Keep program and blog content database-driven; do not hardcode every
    detail into page components.
-   Do not invent extra UI sections that were removed from the approved
    design.
-   Treat supplied final screenshots as visual references. Preserve the
    explicitly listed removals below.

## 3. Brand and UI Design System

### Brand personality

Viviora should feel premium, minimal, modern, calm, warm, trustworthy,
professional, and wellness-focused. Design quality should come from
spacing, typography, photography, and composition---not excessive
decoration.

### Color palette

  -----------------------------------------------------------------------
  Token                   Hex                     Usage
  ----------------------- ----------------------- -----------------------
  `brand-yellow`          `#F8C94A`               Main accent, CTA
                                                  highlights, active
                                                  states

  `brand-yellow-light`    `#FFE59A`               Soft highlights and
                                                  subtle backgrounds

  `background`            `#FFFDF7`               Main warm ivory page
                                                  background

  `background-soft`       `#FFF8E7`               Alternate section
                                                  background

  `text-primary`          `#172A2F`               Main headings and body
                                                  text

  `text-secondary`        `#5F6868`               Supporting text

  `surface`               `#FFFFFF`               Cards and form surfaces

  `border`                `#E8E5DC`               Borders and dividers

  `cta-dark`              `#172A2F`               Dark CTA buttons where
                                                  appropriate
  -----------------------------------------------------------------------

**Color rule:** Yellow is an accent, not the whole page. Most surfaces
should be ivory, cream, or white. Avoid a fully yellow background.

### Typography

Use a premium serif for display headings and a clean sans-serif for
body/UI text.

Suggested pairing: - Headings: `Playfair Display` or
`Cormorant Garamond` - Body/UI: `Inter` or `Manrope`

Use a consistent typography scale. Headings should feel elegant and
spacious, not oversized or excessively bold.

### Layout and spacing

-   Mobile-first responsive design
-   Generous whitespace
-   Consistent max-width containers
-   Clean grid layouts
-   Subtle borders and restrained shadows
-   Rounded cards, used consistently
-   Clear visual hierarchy
-   Proper spacing between hero and the next section
-   High-quality, appropriately cropped images
-   All program cards in the same collection must share identical
    structure and visual dimensions

### Icons and animation

-   Use icons only when they improve clarity.
-   Do not place large category icons in program cards.
-   Avoid decorative icon clutter.
-   Animations should be subtle: fade, small slide, or gentle hover.
-   Respect `prefers-reduced-motion`.
-   Avoid excessive gradients, glassmorphism, parallax, or motion.

## 4. Finalized Public Website UI Requirements

### Navbar

Desktop navigation: - Viviora logo - Home - About - Programs - Blog -
Testimonials - Contact - Search icon (optional) - Get Started CTA

Mobile navigation should use a simple menu button and accessible
drawer/menu. Keep the navbar lightweight and consistent with the
reference screenshots.

### Home page --- `/`

The homepage must be clean and intentionally minimal.

Required content: 1. Navbar 2. Hero 3. Nutrition Solutions 4. FAQ 5.
Final CTA 6. Footer

Hero copy:

**Eyebrow:** `NUTRITION • WELLNESS • A HEALTHIER YOU`

**Heading:**\
`Real Nutrition`\
`Real Change`

**Description:**\
`Personalized nutrition programs, expert guidance and sustainable habits for a healthier, happier you.`

**CTA:** `Explore Programs`

Hero image: premium nutrition/wellness lifestyle photography. Avoid
floating feature cards or unnecessary decorative elements around the
image.

#### Homepage sections explicitly removed

Do not add: - Top 20% OFF promotional banner - "10,000+ happy clients"
section - "Watch Our Story" - Vogue, Healthline, Forbes, NDTV, or other
media-logo strip - Real Transformations section - Testimonials section -
"2 Simple Steps" section - Four feature tiles such as Personalized
Plans, Expert Guidance, Science Based, Sustainable Results - Heart
decoration around the hero - Sustainable / Expert / Personalized
floating tiles - Yellow underline below the word "Change" - Extra hero
badges or clutter - Unnecessary subheadings

#### Nutrition Solutions

Show **exactly three programs on the homepage**, in one row on
desktop: 1. Gut Health 2. Weight Loss 3. Muscle Building

Every card must use the same structure: - Image - Program name - Short
description - Learn More link/button

Do not add category icons. Cards must be aligned, consistent, and
responsive. On smaller screens, stack or use a sensible responsive grid
without changing card structure.

#### FAQ

Use a minimal accessible accordion. Example questions: - Are the
programs personalized? - How long does a program last? - Are vegetarian
plans available? - How do I receive my diet plan? - Can I book a
consultation?

#### Final CTA

Example:

**Ready to start your health journey?**\
Take the first step toward a healthier lifestyle.

Button: `Explore Programs`

#### Footer

Use the approved logo/footer style. Keep it organized and not
over-decorated.

Suggested groups: - Quick Links: Home, About, Programs, Blog,
Testimonials, Contact - Programs: Gut Health, Weight Loss, Muscle
Building, Women's Health, Lifestyle Disorders, Kids Nutrition, Sports
Nutrition - Support: FAQs, Terms & Conditions, Privacy Policy, Refund
Policy (only if applicable) - Newsletter/email signup - Social links:
Instagram, LinkedIn, YouTube, Pinterest (only if accounts exist) -
Copyright

Do not invent real contact details or social URLs. Use clearly marked
configuration placeholders until provided.

### Programs page --- `/programs`

Keep the page clean and premium. - Minimal hero, no unnecessary
subheading - Show all 7 categories - Do not add the four "Personalized
Plans / Expert Guidance / Science Based / Sustainable Results" feature
tiles - No large category icons - Consistent card structure throughout

Categories and program items:

**Gut Health** - Gut Reset Program - Gut Balance Routine - IBS Support -
Constipation Support - Acidity Relief - Bloating Relief

**Weight Loss** - Wedding Weight Loss - Fat Loss Program - Belly Fat
Reduction - PCOS Weight Loss - Post Pregnancy Weight Loss

**Muscle Building** - Lean Muscle Gain - Gym Nutrition - Home Workout
Nutrition - Abs Nutrition - Strength Building

**Women's Health** - PCOS - Thyroid - Hormonal Balance - Perimenopause -
Menopause

**Lifestyle Disorders** - Diabetes Nutrition - Cholesterol Management -
Fatty Liver - High Blood Pressure

**Kids Nutrition** - Healthy Growth - Immunity - Sports Nutrition

**Sports Nutrition** - Swimming Nutrition - Gymnastics Nutrition -
Martial Arts Nutrition - Athlete Nutrition

Each program card should have consistent content hierarchy and no
unnecessary icons.

### Program detail --- `/programs/:slug`

Use one reusable dynamic template for every program. Include: - Program
name - Description - Who it is for - Benefits - Duration - What is
included - Price - FAQ - Buy Now

Program data must come from MongoDB/API, not repeated hardcoded JSX.

### About page --- `/about`

Only include: 1. My Story 2. My Academic Background 3. Qualifications 4.
Certifications 5. Mission 6. Vision 7. Footer

Keep this page simple. Academic background should display relevant
name/institution text only. Do not add decorative icons to academic or
certification areas. Do not add unrelated statistics, extra cards, or
additional sections.

### Other public pages

-   `/blog` --- SEO-friendly blog listing and categories
-   `/blog/:slug` --- dynamic article
-   `/testimonials` --- reviews, video testimonials, transformations
    (not on homepage)
-   `/contact` --- contact form, WhatsApp/email/social links when
    supplied, optional map

## 5. Full Application Scope

### Authentication

-   Phone number + OTP login
-   OTP expiry and retry/rate limits
-   Secure session/JWT handling
-   User, Admin, and Nutritionist roles
-   Protected routes and role-based authorization

### User dashboard

Suggested routes: - `/dashboard` - `/dashboard/programs` -
`/dashboard/ai-diet` - `/dashboard/ai-diet/history` -
`/dashboard/reports` - `/dashboard/consultations` -
`/dashboard/consultations/book` - `/dashboard/progress` -
`/dashboard/notifications` - `/dashboard/settings`

### AI Diet Generator

Independent feature module. Inputs may include: - Age - Gender -
Height - Weight - Goal - Activity level - Diet preference - Meals per
day - Allergies - Food preferences - Relevant health conditions -
Workout frequency - Sleep/lifestyle context

The AI should produce validated structured data: - Summary - Daily
energy estimate (when appropriate) - Macro estimates (when
appropriate) - Meals and portions - Food alternatives - Hydration
guidance - Notes and warnings

Do not let the AI return arbitrary HTML. Validate the response against a
schema before saving or rendering.

Health safety: - Do not diagnose diseases. - Do not prescribe or change
medication. - Do not claim to replace a clinician or qualified nutrition
professional. - Do not generate extreme or unsafe restrictive plans. -
Include a clear informational-use disclaimer. - Provide
professional-review guidance for users with relevant medical
conditions. - Treat health data as sensitive and restrict access.

### Reports

Users may upload PDF, JPG, or PNG reports. Use secure cloud storage and
store metadata in MongoDB. Validate MIME type, size, user authorization,
and access controls. Do not expose private report files publicly.

### Consultations

Types: - Initial Consultation - Follow-up Consultation - Report Review -
Diet Revision

Support appointment date/time selection, availability, booking
confirmation, and prevention of double booking.

### Payments

Use Razorpay. Create orders on the server and verify payment signatures
server-side. Never trust client-side payment success alone. Keep payment
provider code behind a service abstraction.

### Admin

Modules: - Dashboard/analytics - Users - Programs - Orders -
Appointments - Reports (authorized access only) - Blogs - Coupons -
Testimonials

Use role-based access control and audit sensitive administrative
actions.

## 6. Recommended MERN Stack

### Frontend

-   React
-   Vite
-   React Router DOM
-   JavaScript (or TypeScript if initialized that way; use one language
    consistently)
-   Axios
-   TanStack Query for server-state where useful
-   React Hook Form
-   Zod
-   CSS modules or a consistent styling approach
-   Lucide React for minimal icons

### Backend

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   REST API
-   Zod or equivalent request validation
-   Helmet
-   CORS with explicit allowed origins
-   Rate limiting
-   Central error middleware

### Integrations

-   Razorpay --- payments
-   Cloudinary/private object storage --- uploaded reports and images
-   AI provider abstraction --- Gemini/OpenAI/other provider can be
    changed
-   OTP/SMS provider abstraction
-   Email provider abstraction

### Deployment direction

-   Frontend: Vercel or Netlify
-   Backend: Render, Railway, AWS, or another Node hosting provider
-   Database: MongoDB Atlas
-   Storage: Cloudinary or private object storage

Do not bind the architecture to one hosting provider.

## 7. Architecture and SOLID Rules

Use modular architecture and separate concerns.

Suggested request flow:

`React UI → API client → Express route → Controller → Service → Repository/Model → MongoDB`

For AI:

`React form → AI Diet API → Controller → validation → Diet service → AI provider → output validation → persistence → response`

Rules: - Controllers should be thin. - Business logic belongs in
services. - Database access should be isolated where it improves
clarity/testability. - External providers should be behind
interfaces/adapters. - Components should not contain business logic or
direct database concerns. - Do not create abstractions without a real
purpose. - Avoid giant files and giant components. - Reuse existing
modules rather than duplicating code. - Keep public, dashboard, and
admin layouts separate. - Keep AI Diet Generator independent from the
dashboard shell.

Suggested future AI structure:

``` text
server/src/features/
  ai-diet/
  ai-report/
  ai-assistant/
```

The first module should not depend on the later modules.

## 8. Suggested Repository Structure

``` text
viviora/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── public/
│   │   │   ├── dashboard/
│   │   │   └── admin/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── programs/
│   │   │   ├── ai-diet/
│   │   │   ├── reports/
│   │   │   ├── consultations/
│   │   │   └── progress/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── features/
│   │   │   └── ai-diet/
│   │   │       ├── aiDiet.routes.js
│   │   │       ├── aiDiet.controller.js
│   │   │       ├── aiDiet.service.js
│   │   │       ├── aiDiet.validator.js
│   │   │       ├── aiDiet.model.js
│   │   │       └── providers/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
│
├── .env.example
├── README.md
└── package.json
```

This is a starting point, not a reason to create empty files for every
folder. Add folders when their functionality is implemented.

## 9. Development Roadmap

Build and verify one phase at a time.

### Phase 0 --- Planning and repository setup

-   Review this README and all UI reference screenshots.
-   Confirm requirements and removed sections.
-   Choose JavaScript or TypeScript and use it consistently.
-   Create `client/` and `server/`.
-   Configure Vite, Express, environment variables, linting, formatting,
    and Git.
-   Create a root README and `.env.example`.
-   Document architecture, route map, and initial data model.
-   Do not build every page yet.

**Deliverable:** clean runnable MERN skeleton and architecture notes.

### Phase 1 --- Design system and public shell

-   Define color, typography, spacing, radius, shadow, and container
    tokens.
-   Build reusable navbar, footer, button, card, section heading, and
    layout components.
-   Implement responsive behavior.
-   Build Home, About, Programs listing, Program detail template, Blog
    listing/detail, Testimonials, and Contact.
-   Match reference screenshots and removed-section list.
-   Use placeholder content only where real content has not been
    provided.

**Deliverable:** complete responsive public website using mock/local
data, with finalized visual direction.

### Phase 2 --- Backend foundation

-   Configure Express, MongoDB, Mongoose, environment validation, and
    central error handling.
-   Establish API response conventions.
-   Add request validation, CORS, Helmet, and rate limiting.
-   Create initial models and seed data.
-   Implement public program/blog APIs.
-   Connect frontend to backend.

**Deliverable:** public content is served through REST APIs and MongoDB.

### Phase 3 --- Authentication and user dashboard

-   Implement phone OTP provider abstraction.
-   Add OTP expiry, throttling, and verification.
-   Implement secure session/JWT handling.
-   Add roles and protected routes.
-   Build dashboard shell and account settings.

**Deliverable:** authenticated users can access their dashboard
securely.

### Phase 4 --- AI Diet Generator

-   Implement independent `ai-diet` feature.
-   Create request schema and validation.
-   Add AI provider abstraction and development mock provider.
-   Generate structured JSON only.
-   Validate AI output.
-   Add safety checks and disclaimer.
-   Save diet plans in MongoDB.
-   Build React questionnaire, loading/error states, results, and
    history.
-   Connect frontend to backend.

**Deliverable:** working AI diet-generation flow with persisted history
and safe failure states.

### Phase 5 --- Programs, orders, and payments

-   Implement program purchase flow.
-   Create server-side Razorpay order.
-   Verify payment signature on backend.
-   Store order/payment records.
-   Activate purchased program only after verified payment.
-   Add order history.

**Deliverable:** secure program checkout and purchase history.

### Phase 6 --- Reports and consultations

-   Implement private report upload and metadata.
-   Enforce file validation and access control.
-   Implement consultation types, slots, booking, and appointment
    history.
-   Prevent double booking.

**Deliverable:** report and consultation modules.

### Phase 7 --- Progress and notifications

-   Add progress records and simple charts.
-   Add notification list and read/unread state.
-   Add notification provider abstraction for future push notifications.

**Deliverable:** progress and notification functionality.

### Phase 8 --- Admin panel

-   Admin authorization.
-   User management.
-   Program CRUD.
-   Orders.
-   Appointments.
-   Authorized reports.
-   Blog CRUD.
-   Coupons.
-   Testimonials.
-   Analytics.

**Deliverable:** functional admin dashboard.

### Phase 9 --- Quality and deployment

-   Add unit and API tests for critical services.
-   Test auth, payment verification, AI output validation, upload
    authorization, and booking conflicts.
-   Review accessibility, responsive behavior, SEO, performance, and
    security.
-   Configure production environment and deployment.
-   Document setup and operational procedures.

**Deliverable:** deployment-ready application with documented
limitations and test results.

## 10. How to Work with Claude

Do not ask Claude to build all phases at once.

For every phase: 1. Give Claude this README. 2. Give it the relevant
reference screenshots. 3. Ask it to inspect the current codebase before
editing. 4. Ask for a concise implementation plan and list of files to
create/change. 5. Review the plan. 6. Ask it to implement only the
approved phase. 7. Ask it to run lint/build/tests and fix errors. 8.
Review the result in the browser. 9. Commit the working phase before
moving on.

Claude should preserve working code and avoid unrelated refactoring.

### First prompt to Claude

``` text
You are the senior MERN architect and UI engineer for Viviora.

Read the attached README.md completely and inspect all provided UI reference screenshots.

We are starting from scratch. Do not generate the whole application in one response and do not begin implementing all features immediately.

First perform Phase 0 only.

Tasks:
1. Summarize the product and key requirements.
2. Identify the approved public pages and explicitly removed homepage sections.
3. Propose a practical MERN architecture.
4. Propose the initial folder structure.
5. Define the design tokens from the README.
6. Define the route map.
7. Identify the first database models and APIs needed.
8. List setup commands and dependencies.
9. Identify security concerns, especially health reports, OTP, payments, and AI-generated diet plans.
10. Create a phased implementation checklist.

Then initialize the project skeleton only:
- React + Vite client
- Node + Express server
- MongoDB/Mongoose configuration
- environment variable examples
- basic health-check endpoint
- root scripts if appropriate
- README/setup documentation

Do not build the full UI, authentication, payment, admin, or AI feature in this phase.

Use JavaScript consistently unless there is a strong reason to choose TypeScript; explain the decision before changing it.

Before editing files, show the proposed plan and files. After implementation, run the available checks and report what works, what is incomplete, and how to run the project locally.
```

### Prompt for Phase 1

``` text
Now implement Phase 1 from README.md only.

Build the Viviora design system and public website shell:
- Navbar
- Footer
- Home
- About
- Programs listing
- Dynamic program detail template
- Blog listing and detail templates
- Testimonials
- Contact

Use the supplied screenshots as visual references.

Important:
- Keep the ivory/cream background and yellow accent palette.
- Use yellow as an accent, not a full-page background.
- Keep the homepage minimal.
- Show exactly 3 program cards on Home in one desktop row.
- All program cards must have the same structure.
- Do not use large category icons.
- Do not reintroduce any homepage sections listed as removed in README.md.
- About page must contain only My Story, Academic Background, Qualifications, Certifications, Mission, Vision, and footer.
- Programs page should show all 7 categories without unnecessary feature tiles or subheadings.
- Use responsive layouts and reusable components.
- Use temporary/mock data only for this phase, but keep data separate from UI components so it can later be replaced with API calls.

First inspect the existing code and present the files you plan to change. Implement only after that. Run the build and report the results.
```

### Prompt for AI Diet Generator later

``` text
Implement Phase 4: AI Diet Generator only.

Keep it independent from the dashboard and other features.

Use:
- React feature module in client/src/features/ai-diet
- Express feature module in server/src/features/ai-diet
- Controller → Service → Provider architecture
- Request and response validation
- AI provider abstraction
- Development mock provider if credentials are absent
- MongoDB persistence for generated plans
- Structured JSON output
- Loading, empty, success, and error states
- Health safety checks and visible disclaimer

Do not expose AI credentials to the frontend.
Do not implement medical diagnosis or medication advice.
Do not modify unrelated modules.

First inspect the codebase and propose the files/API contract. Then implement the module, run tests/build, and report what is complete.
```

## 11. Environment Variables

Create `.env.example` with placeholders only. Never commit actual
credentials.

``` env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB
MONGO_URI=

# Authentication
JWT_SECRET=
OTP_PROVIDER_API_KEY=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# AI provider
AI_PROVIDER=mock
AI_API_KEY=

# Cloud storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email
EMAIL_PROVIDER=
EMAIL_API_KEY=
```

Use a mock AI provider during initial development so the UI and API can
be tested before real AI credentials are configured.

## 12. Definition of Done

A phase is complete only when: - Its functionality works locally. - The
UI matches the approved design direction. - Responsive behavior has been
checked. - Validation and error states exist. - No secrets are
exposed. - Available build/lint/tests have been run. - README/setup
notes are updated. - No unrelated features were changed. - Remaining
limitations are clearly documented.

## 13. Final Instruction

Start with **Phase 0: planning and repository setup**.

Do not jump directly into generating the entire Viviora website.

Use this README as the product and design source of truth, use the
screenshots as the visual reference, and implement the platform
incrementally with a clean MERN architecture.
