import { BlogPost, RawBlogPost } from "./types";

const MOCK_TAGS = ["tech", "react", "nextjs", "webdev", "javascript"];

function pickTags(tags: string[], randomizer: () => number): string[] {
  return [...tags].sort(() => randomizer() - 0.5).slice(0, Math.floor(randomizer() * 3) + 1);
}

export function mapRawPosts(rawPosts: RawBlogPost[], randomizer: () => number = Math.random): BlogPost[] {
  return rawPosts.map((post) => ({
    ...post,
    tags: pickTags(MOCK_TAGS, randomizer),
  }));
}

export async function fetchBlogPosts(limit = 12): Promise<BlogPost[]> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.status}`);
  }

  const rawPosts = (await response.json()) as RawBlogPost[];
  return mapRawPosts(rawPosts);
}
