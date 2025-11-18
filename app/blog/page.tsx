import { Suspense } from 'react';
import { getAllPostPreviews, getAllCategories, getAllTags } from '@/lib/blog';
import { BlogList } from '@/components/blog/BlogList';
import BlogFilters from '@/components/blog/BlogFilters';
import type { Metadata } from 'next';
import { generateBlogListingMetadata } from '@/lib/seo';

export const metadata: Metadata = generateBlogListingMetadata();

interface BlogPageProps {
  searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const [allPosts, categories, tags] = await Promise.all([
    getAllPostPreviews(),
    getAllCategories(),
    getAllTags(),
  ]);

  // Filter posts based on search params
  let filteredPosts = allPosts;

  if (params.category) {
    filteredPosts = filteredPosts.filter(
      post => post.category.toLowerCase() === params.category?.toLowerCase()
    );
  }

  if (params.tag) {
    filteredPosts = filteredPosts.filter(
      post => post.tags.some(t => t.toLowerCase() === params.tag?.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights on healing, personal growth, and transformation
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-32 bg-white rounded-lg shadow-sm animate-pulse" />}>
          <BlogFilters categories={categories} tags={tags} />
        </Suspense>

        {/* Blog Posts */}
        {filteredPosts.length > 0 ? (
          <BlogList posts={filteredPosts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts found matching your filters.
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or clearing them to see all posts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
