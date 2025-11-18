'use client';

import { useFilters } from '@/hooks/useFilters';

interface BlogFiltersProps {
  categories: string[];
  tags: string[];
}

export default function BlogFilters({ categories, tags }: BlogFiltersProps) {
  const { filters, setCategory, setTag, clearFilters, hasActiveFilters } = useFilters();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category || ''}
            onChange={(e) => setCategory(e.target.value || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div className="flex-1">
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-2">
            Tag
          </label>
          <select
            id="tag"
            value={filters.tag || ''}
            onChange={(e) => setTag(e.target.value || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-6 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Category: {filters.category}
              <button
                onClick={() => setCategory(null)}
                className="ml-1 hover:text-purple-900"
                aria-label="Remove category filter"
              >
                ×
              </button>
            </span>
          )}
          {filters.tag && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Tag: {filters.tag}
              <button
                onClick={() => setTag(null)}
                className="ml-1 hover:text-purple-900"
                aria-label="Remove tag filter"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
