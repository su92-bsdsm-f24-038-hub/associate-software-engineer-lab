# Day 09 Authentication and Protected Routes Plan

## Assumptions

- The Next.js app in blog-app is the target for authentication work.
- External OAuth credentials are unavailable for this lab environment.
- A mock credentials flow with secure httpOnly cookie session is acceptable.

## Selected Approach

- Implement a typed mock authentication module with login, logout, and session read helpers.
- Add a role field on the User model and update seed data to include USER and ADMIN roles.
- Protect dashboard routes via middleware and server-side session checks.
- Create login page and dashboard page with role-aware content.
- Keep implementation compatible with current App Router architecture.

## Risks

- Existing dirty workspace state can accidentally pollute commits.
- Build/test can be blocked by local application-control policy on native binaries.
- Session mismatch bugs if client and middleware logic diverge.

## Mitigations

- Stage only Day 09 files plus required schema/migration updates.
- Run available checks and report blocked checks transparently.
- Centralize session parsing/validation in one typed auth module.
