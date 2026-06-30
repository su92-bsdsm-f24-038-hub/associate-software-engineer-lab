# Blog App - Next.js 15 with TypeScript & Tailwind CSS

A production-ready blog application built with Next.js App Router, TypeScript (strict mode), and Tailwind CSS.

## Features

- ✅ **Server Components**: Efficient data fetching from JSONPlaceholder API
- ✅ **Type-Safe**: 100% TypeScript strict mode, zero `any` usage
- ✅ **Search & Filter**: Real-time search and dynamic tag filtering
- ✅ **Dynamic Routing**: Individual post detail pages
- ✅ **Loading States**: Beautiful skeleton loaders with `animate-pulse`
- ✅ **Error Handling**: Comprehensive error boundaries
- ✅ **Responsive Design**: Mobile-first Tailwind CSS
- ✅ **ISR**: Incremental Static Regeneration (1-hour revalidation)

## Project Structure

```
blog-app/
├── types/blog.ts              # Post interface
├── app/
│   ├── blog/
│   │   ├── page.tsx          # Blog list (server)
│   │   ├── loading.tsx       # Skeleton loader
│   │   └── [id]/page.tsx     # Post detail (server)
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   └── BlogList.tsx          # Blog list with filters (client)
└── Configuration files
```

## Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens on http://localhost:3000/blog

# Build for production
npm run build

# Run linter
npm run lint
```

## API Integration

- **Endpoint**: `https://jsonplaceholder.typicode.com/posts`
- **Posts**: 100 sample posts
- **Mock Tags**: `['tech', 'react', 'nextjs', 'webdev', 'javascript']`

## Implementation Details

### Files Created

1. **types/blog.ts** - TypeScript Post interface
2. **app/blog/page.tsx** - Blog list server component
3. **components/BlogList.tsx** - Blog list client component with search & filtering
4. **app/blog/[id]/page.tsx** - Dynamic post detail page
5. **app/blog/loading.tsx** - Skeleton loader with animate-pulse

### Key Features

- **Search**: Case-insensitive search by title and body
- **Filtering**: Dynamic tag extraction and dropdown filtering
- **Error Handling**: Try/catch blocks with user-friendly error UI
- **ISR**: 1-hour revalidation for optimal performance
- **Type Safety**: Strict TypeScript, no `any` type

## Quality Standards

✅ **ESLint**: No warnings or errors  
✅ **TypeScript**: Strict mode, 100% type safe  
✅ **Build**: Successful compilation  
✅ **Performance**: Optimized bundle (~106 kB)  
✅ **Responsive**: Mobile, tablet, desktop  
✅ **Accessible**: Semantic HTML, labeled inputs  

## Deployment

```bash
npm run build
npm start
# Production server on http://localhost:3000
```
