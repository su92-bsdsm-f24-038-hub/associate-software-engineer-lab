# DownLabs Workboard App (Lab 7)

Integrated Next.js workboard combining:

- Todo management
- Blog browsing
- Product CRUD operations

## Branch

- feature/day-07-week-1-integration-review

## Tech Stack

- Next.js 15
- React 18
- TypeScript (strict)
- Tailwind CSS
- Vitest (unit tests)

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  blog/
  products/
components/
  BlogList.tsx
  ProductForm.tsx
  workboard/Workboard.tsx
modules/
  blog/
  products/
  tasks/
tests/
  modules/
```

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
