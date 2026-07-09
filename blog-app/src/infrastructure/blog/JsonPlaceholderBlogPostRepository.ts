import { BlogPostRepository } from "@/src/application/blog/ports/BlogPostRepository";
import { mapRawPostsToDomain } from "@/src/domain/blog/blogRules";
import { BlogPost, RawBlogPost } from "@/src/domain/blog/types";

export class JsonPlaceholderBlogPostRepository implements BlogPostRepository {
  async fetchPosts(limit: number): Promise<BlogPost[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`);
    }

    const rawPosts = (await response.json()) as RawBlogPost[];
    return mapRawPostsToDomain(rawPosts);
  }
}
