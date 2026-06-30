# Blog App - Next.js TypeScript with JSONPlaceholder

A modern, fully-typed blog application built with Next.js 15, TypeScript, and Tailwind CSS. This project demonstrates best practices for server and client components, type safety, and data fetching in Next.js.

## Features

- **Server-Side Rendering**: Efficient data fetching with automatic revalidation
- **Type-Safe**: Full TypeScript support with strict typing
- **Dynamic Routing**: Individual post pages with dynamic routes
- **Search & Filter**: Search posts by title/content and filter by tags
- **Streaming UI**: Loading skeletons for better UX
- **Responsive Design**: Mobile-first Tailwind CSS styling
- **Error Handling**: Comprehensive error states and fallbacks

## Project Structure

```
blog-app/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── blog/
│       ├── page.tsx         # Blog list (server component)
│       ├── loading.tsx      # Loading skeleton
│       └── [id]/
│           └── page.tsx     # Blog detail (server component)
├── components/
│   └── BlogList.tsx         # Blog list with filters (client component)
├── types/
│   └── blog.ts              # TypeScript interfaces
└── public/                  # Static assets
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building & Linting

```bash
npm run build
npm run lint
```

## Architecture Decisions

### Server vs Client Components

- **Server Components**: `app/blog/page.tsx` and `app/blog/[id]/page.tsx` fetch data directly from the API
- **Client Components**: `components/BlogList.tsx` handles interactivity (search, filtering)

### Caching Strategy

- Revalidation set to 1 hour (3600s) for optimal performance
- Next.js automatically handles cache invalidation

### Type Safety

- Strict TypeScript configuration
- All data fetching returns typed responses
- No use of `any` type

## API

- **Posts**: https://jsonplaceholder.typicode.com/posts
- **Single Post**: https://jsonplaceholder.typicode.com/posts/{id}

## Styling

- Tailwind CSS for utility-first styling
- Semantic HTML structure
- Accessible form controls and navigation

## Error Handling

- Try/catch blocks for API failures
- Graceful fallback UI components
- Detailed error messages in console for debugging

## Performance

- Image optimization (if used)
- Automatic code splitting
- Efficient re-renders with `useMemo`
- Static generation where possible
