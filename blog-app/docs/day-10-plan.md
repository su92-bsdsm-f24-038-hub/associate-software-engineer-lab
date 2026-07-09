# Day 10 Clean Architecture Basics Plan

## Assumptions

- The target is the Next.js app in blog-app.
- Existing app behavior should remain functionally equivalent after refactor.
- Day 10 scope is a foundational layer split, not a full rewrite of every feature.

## Selected Approach

- Introduce layered folders under src for domain, application, infrastructure, and presentation.
- Move core task/product business rules into domain and application services.
- Use infrastructure in-memory repositories to isolate data storage concerns from UI.
- Keep UI in presentation components/hooks and remove business logic from Workboard component.
- Route-level blog fetching will use an application service abstraction over infrastructure gateway.

## Risks

- Existing dirty workspace artifacts (.next, node_modules) may confuse commits.
- Refactor can break imports if path boundaries are inconsistent.
- Build/test checks may fail due local policy restrictions on native modules.

## Mitigations

- Stage and commit only Day 10 implementation files.
- Keep public interfaces stable and update imports incrementally.
- Run available checks and report any environment-blocked checks transparently.
