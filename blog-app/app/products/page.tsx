import Workboard from "@/components/workboard/Workboard";
import { BlogQueryService } from "@/src/application/blog/BlogQueryService";
import { JsonPlaceholderBlogPostRepository } from "@/src/infrastructure/blog/JsonPlaceholderBlogPostRepository";

export default async function ProductsPage() {
  const blogQueryService = new BlogQueryService(new JsonPlaceholderBlogPostRepository());
  const posts = await blogQueryService.getPosts(12);

  return (
    <Workboard initialPosts={posts} />
 
  );
}