'use client';

import { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { QuotesList } from '@/components/quotes/QuotesList';
import type { Quote } from '@/lib/supabase/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  return response.json();
};

export default function QuotesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Build URL with query params
  const params = new URLSearchParams();
  if (selectedCategory) {
    params.append('category', selectedCategory);
  }
  params.append('page', currentPage.toString());
  params.append('limit', '12');
  const url = `/api/quotes?${params.toString()}`;

  // Use SWR for data fetching with caching
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
  });

  // Fetch all quotes for categories (cached separately)
  const { data: allQuotesData } = useSWR('/api/quotes?limit=1000', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes
  });

  const quotes = data?.quotes || [];
  const totalPages = data?.pagination?.totalPages || 1;

  // Extract unique categories
  const categories = useMemo(() => {
    if (!allQuotesData?.quotes) return [];
    return Array.from(
      new Set(allQuotesData.quotes.map((q: Quote) => q.category).filter(Boolean))
    ) as string[];
  }, [allQuotesData]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleRetry = () => {
    mutate();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of quotes section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-light/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
            Healing Quotes
          </h1>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Find inspiration and wisdom in these carefully curated quotes about healing, transformation, and growth
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-secondary text-white'
                  : 'bg-white text-text hover:bg-secondary/10'
              }`}
            >
              All Quotes
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-secondary text-white'
                    : 'bg-white text-text hover:bg-secondary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Quotes List */}
        <QuotesList
          quotes={quotes}
          isLoading={isLoading}
          error={error ? error.message : null}
          onRetry={handleRetry}
        />

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-text hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 py-2 text-text-light">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-secondary text-white'
                        : 'bg-white text-text hover:bg-secondary/10'
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-text hover:bg-secondary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
