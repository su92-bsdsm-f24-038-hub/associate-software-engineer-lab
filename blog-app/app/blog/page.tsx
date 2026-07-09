import BlogList from "@/components/BlogList";
import { fetchBlogPosts } from "@/modules/blog/blogService";

export default async function BlogPage() {
  try {
    const posts = await fetchBlogPosts(30);

    if (!posts || posts.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              No Posts Found
            </h1>
            <p className="text-gray-600">
              There are currently no blog posts available.
            </p>
          </div>
        </div>
      );
    }

    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog</h1>
            <p className="text-gray-600">
              Discover insights and stories from our community
            </p>
          </div>
          <BlogList posts={posts} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Blog page error:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Posts
          </h1>
          <p className="text-gray-600">
            Failed to load blog posts. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
