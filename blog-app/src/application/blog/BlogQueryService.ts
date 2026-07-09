import { BlogPostRepository } from "@/src/application/blog/ports/BlogPostRepository";
import { BlogPost } from "@/src/domain/blog/types";

export class BlogQueryService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  async getPosts(limit = 12): Promise<BlogPost[]> {
    return this.blogPostRepository.fetchPosts(limit);
  }

  async getPreview(limit = 4): Promise<BlogPost[]> {
    return this.blogPostRepository.fetchPosts(limit);
  }
}
