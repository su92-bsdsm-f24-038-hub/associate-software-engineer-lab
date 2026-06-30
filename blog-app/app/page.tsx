import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Blog App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing stories and insights from our community
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition text-lg"
        >
          Read Our Blog
        </Link>
      </div>
    </main>
  );
}
