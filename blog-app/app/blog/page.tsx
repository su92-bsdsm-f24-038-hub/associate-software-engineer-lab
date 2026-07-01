import { Post } from "@/types/blog";
import BlogList from "@/components/BlogList";

const MOCK_TAGS = ["tech", "react", "nextjs", "webdev", "javascript"];

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    ...post,
    tags: MOCK_TAGS.sort(() => Math.random() - 0.5).slice(
      0,
      Math.floor(Math.random() * 3) + 1
    ),
  }));
}

export default async function BlogPage() {
  try {
    const posts = await getPosts();

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
