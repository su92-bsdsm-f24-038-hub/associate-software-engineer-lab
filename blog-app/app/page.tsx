import Workboard from "@/components/workboard/Workboard";
import { fetchBlogPosts } from "@/modules/blog/blogService";

export default async function HomePage() {
  const posts = await fetchBlogPosts(12);

  return <Workboard initialPosts={posts} />;
}
