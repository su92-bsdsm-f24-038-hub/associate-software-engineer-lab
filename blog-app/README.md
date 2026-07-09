# DownLabs Workboard App (Lab 7)

Integrated Next.js workboard combining:

- Todo management
- Blog browsing
- Product CRUD operations
- Prisma database layer (users, tasks, posts, comments)
- Mock login/session auth with protected dashboard route
- Clean architecture layering: domain, application, infrastructure, presentation

## Branch

- feature/day-10-clean-architecture-basics

## Tech Stack

- Next.js 15
- React 18
- TypeScript (strict)
- Tailwind CSS
- Vitest (unit tests)
- Prisma + SQLite
- Mock auth (cookie-based session)

## Project Structure

```text
app/
  dashboard/
  login/
  layout.tsx
  page.tsx
  blog/
  products/
components/
  auth/SessionNav.tsx
  BlogList.tsx
  ProductForm.tsx
  workboard/Workboard.tsx
lib/
  auth/
  db/
    client.ts
    repositories/
modules/
  blog/
  products/
  tasks/
prisma/
  schema.prisma
  seed.ts
src/
  domain/
  application/
  infrastructure/
  presentation/
tests/
  modules/
```

## Clean Architecture Notes

- domain: business entities and business rules only.
- application: use-case services orchestrating domain operations.
- infrastructure: data access implementations and external gateways.
- presentation: UI and hooks consuming application services.

## Setup (Fresh Clone)

1. Install dependencies:
   npm install
2. Start development server:
   npm run dev
3. Open:
  <http://localhost:3000>

## Environment Variables

No secret environment variables are required for this lab.

Use .env.example as the only environment file template.

Required variable:

- DATABASE_URL="file:./dev.db"

## Auth Flow (Mock)

- Login page: /login
- Protected page: /dashboard
- Middleware protects /dashboard and redirects unauthenticated users to /login.
- Session is stored in an httpOnly cookie.
- Mock password for lab testing: downlabs123

## Prisma Workflows

- Generate Prisma client: npm run prisma:generate
- Create/apply migration: npm run prisma:migrate -- --name init_day08
- Seed database: npm run db:seed

## Quality Checks

Run all checks before submission:

- npm run typecheck
- npm run lint
- npm run test
- npm run build

## Screenshots

Add screenshots to docs/screenshots and list them in docs/screenshots.md.

Recommended captures:

- Workboard home view with Todo + Product + Blog preview
- Blog listing page
- Product CRUD action (create and edit)

## Known Limitations

- Todo and Product records are stored in in-memory client state and reset on page refresh.
- Blog module depends on JSONPlaceholder availability.
- Product CRUD is local only (no persistent backend API in this lab).

## Manual QA Checklist

- Workboard loads successfully on desktop and mobile widths.
- Navigation links route between Workboard, Blog, and Products.
- Todo tasks can be added, updated, filtered, and deleted.
- Product entries can be created, edited, and deleted with validation.
- Blog preview appears on Workboard and full posts load in Blog page.
