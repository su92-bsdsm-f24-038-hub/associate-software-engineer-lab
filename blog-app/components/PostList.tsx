'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '@/types/post';

// Simple In-Memory Cache Object
const apiCache: { data: Post[] | null } = { data: null };

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // 1. Check Cache Notes/Logic
    if (!forceRefresh && apiCache.data) {
      setPosts(apiCache.data);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const rawData = await response.json();
      
      // 2. Map Raw Response to Typed Domain Objects
      const typedData: Post[] = rawData.map((item: any) => ({
        userId: item.userId,
        id: item.id,
        title: item.title,
        body: item.body,
      }));

      // 3. Save to Cache
      apiCache.data = typedData;
      
      setPosts(typedData);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle Loading State
  if (loading) return <div className="p-4 text-blue-500 animate-pulse">Loading posts...</div>;

  // Handle Error & Retry State
  if (error) {
    return (
      <div className="p-4 border border-red-500 bg-red-50 rounded-md">
        <p className="text-red-700 font-semibold">Error: {error}</p>
        <button 
          onClick={() => fetchPosts(true)} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          🔄 Retry Fetching
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Typed API Posts</h1>
        <button 
          onClick={() => fetchPosts(true)} 
          className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
        >
          Force Refresh (Bypass Cache)
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="font-semibold text-lg capitalize">{post.title}</h2>
            <p className="text-gray-600 mt-1">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}