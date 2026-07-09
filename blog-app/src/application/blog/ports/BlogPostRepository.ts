import { BlogPost } from "@/src/domain/blog/types";

export interface BlogPostRepository {
  fetchPosts(limit: number): Promise<BlogPost[]>;
}
