# Viviora

Premium nutrition and wellness platform — **MERN** (React + Vite, Node.js + Express, MongoDB + Mongoose).

> Your body is unique. Your nutrition should be too.

**Live client preview:** https://vanshii2.github.io/Viviora/ (static preview, see [Hosting](#hosting))

## About Viviora

Viviora offers personalized nutrition programs and expert guidance, led by nutritionist **Vinni Kapoor Sharma**.

### Our Mission

To make personalized nutrition simple, practical, and accessible—because no single diet works for everyone.

### ✨ Our Vision

To build a trusted nutrition and wellness platform where every individual can find nutrition that is designed around their unique body, needs, goals, and lifestyle.

### Our Philosophy

**There is no one-size-fits-all diet.**

Every body is different. Our nutritional needs, lifestyle, health goals, preferences, and responses to food can be different too.

So why should everyone follow the same diet?

**Your body is unique. Your nutrition should be too.**

### Programs

Gut Health · Weight Loss · Muscle Building · Women's Health · Lifestyle Disorders · Kids Nutrition · Sports Nutrition
(with 32 focused programs such as IBS Support, PCOS, Diabetes Nutrition and Athlete Nutrition)

## Documentation

- Product & design specification: [Viviora_README_Claude_Development_Guide.md](Viviora_README_Claude_Development_Guide.md)
- What has been built, phase by phase: **[PHASES.md](PHASES.md)**
- Architecture, route map, data model, security notes: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Requirements

- Node.js **20.19+** (developed on 22.14)
- npm 10+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas)) connection string

## Getting started

```bash
npm install                                  # installs client + server (npm workspaces)
cp server/.env.example server/.env           # if server/.env doesn't exist yet
```

1. Open `server/.env` and set your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/viviora?retryWrites=true&w=majority
   ```
   The part after `.net/` (`viviora`) is the database name. On Atlas, also allow your IP under **Network Access**.
   Never commit this file (it is git-ignored).
2. Load the starting content (7 programs, blog posts, FAQs) into the database:
   ```bash
   npm run seed -w server
   ```
3. Start everything:
   ```bash
   npm run dev                                # API on :5050, web app on :5173
   ```

Open http://localhost:5173. The API health check is at http://localhost:5050/api/v1/health
(`"database": "connected"` means MongoDB is working).

> **Why port 5050?** On macOS, port 5000 is taken by the AirPlay Receiver. Change `PORT` in `server/.env` if needed
> (and the proxy target in `client/vite.config.js`).

## Scripts (run from the repo root)

| Command                                     | What it does                                        |
| ------------------------------------------- | --------------------------------------------------- |
| `npm run dev`                               | Runs API (node --watch) and web app (Vite) together |
| `npm run dev:client` / `npm run dev:server` | Run one side only                                   |
| `npm run build`                             | Production build of the web app → `client/dist`     |
| `npm run lint`                              | ESLint for client and server                        |
| `npm run format` / `format:check`           | Prettier                                            |
| `npm start -w server`                       | Start the API without file watching                 |

## Repository layout

```
client/   React + Vite web app (public site now; dashboard and admin later)
server/   Express REST API
docs/     Architecture notes
```

## Hosting

| Part                      | Where                                             | Notes                                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client preview**        | GitHub Pages: https://vanshii2.github.io/Viviora/ | Deployed automatically on every push to `main` by `.github/workflows/deploy-pages.yml`. **Static only:** content is bundled from the seed data and the contact form shows a "preview — not sent" notice. |
| Full app (API + database) | Not deployed yet                                  | Needs a Node host (e.g. Render/Railway) + MongoDB Atlas; planned for the deployment phase.                                                                                                               |

Build the preview locally: `VITE_DEMO_MODE=true VITE_BASE_PATH=/Viviora/ npm run build -w client`

## Photography

Photos live in `client/public/images/` (stock photos from Unsplash — see `client/public/images/CREDITS.md`).
Replace any of them with your own by keeping the same filename. `about/portrait.jpg` (Vinni's photo) is still needed.
