import Link from "next/link";
import { Post } from "@/types/blog";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  const post: Post = await res.json();

  if (!post.id) {
    throw new Error("Post not found");
  }

  return post;
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  try {
    const { id } = await params;
    const post = await getPost(id);

    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-8 transition"
          >
            <span className="mr-1">←</span> Back to Blogs
          </Link>

          <article className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="mb-6">
              <span className="inline-block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-4">
                Post #{post.id} • User {post.userId}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {post.title}
              </h1>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.body}
              </p>
            </div>

            <hr className="my-8 border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Published by User {post.userId}
              </span>
              <Link
                href="/blog"
                className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Back to All Posts
              </Link>
            </div>
          </article>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Blog detail page error:", error);
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md border border-red-200">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              Sorry, the blog post you&apos;re looking for doesn&apos;t exist or could not
              be loaded.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Back to All Posts
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
