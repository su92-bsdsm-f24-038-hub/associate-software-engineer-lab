export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
          <div className="h-6 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="mb-3">
                  <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-blue-200 rounded-full animate-pulse"></div>
                  <div className="h-6 w-20 bg-blue-200 rounded-full animate-pulse"></div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
