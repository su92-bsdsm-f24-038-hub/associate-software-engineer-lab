import { BlogPost, RawBlogPost } from "@/src/domain/blog/types";

const BLOG_TAGS = ["tech", "react", "nextjs", "webdev", "javascript"];

function pickTags(tags: string[], randomizer: () => number): string[] {
  return [...tags].sort(() => randomizer() - 0.5).slice(0, Math.floor(randomizer() * 3) + 1);
}

export function mapRawPostsToDomain(
  rawPosts: RawBlogPost[],
  randomizer: () => number = Math.random
): BlogPost[] {
  return rawPosts.map((post) => ({
    ...post,
    tags: pickTags(BLOG_TAGS, randomizer),
  }));
}
