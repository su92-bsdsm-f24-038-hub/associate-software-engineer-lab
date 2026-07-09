# Day 08 Database Basics Plan

## Assumptions

- The database task applies to the Next.js app in blog-app.
- SQLite is acceptable for baseline Prisma setup in this lab.
- Existing app features can keep current UI behavior while database layer is added.

## Selected Approach

- Add Prisma with a schema containing User, Task, Post, and Comment models.
- Add seed data script to populate all four models with relational links.
- Implement a typed database access layer with reusable repository functions.
- Add npm scripts for Prisma generate, migrate, and seed workflows.

## Risks

- Local policy restrictions may block native binaries in some commands.
- Existing dirty workspace state can pollute commits if not carefully scoped.
- Schema changes can break type checks if generated client is missing.

## Mitigations

- Keep commit staged to database-focused files only.
- Run Prisma generate and seed directly and verify with typecheck/tests.
- Report blocked checks clearly if platform policies prevent execution.
