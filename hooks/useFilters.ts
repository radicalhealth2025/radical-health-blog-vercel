'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface FilterState {
  category: string | null;
  tag: string | null;
}

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filter state from URL
  const filters: FilterState = useMemo(() => ({
    category: searchParams.get('category'),
    tag: searchParams.get('tag'),
  }), [searchParams]);

  // Update URL with new filter parameters
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove category
    if (newFilters.category !== undefined) {
      if (newFilters.category) {
        params.set('category', newFilters.category);
      } else {
        params.delete('category');
      }
    }

    // Update or remove tag
    if (newFilters.tag !== undefined) {
      if (newFilters.tag) {
        params.set('tag', newFilters.tag);
      } else {
        params.delete('tag');
      }
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(url);
  }, [searchParams, pathname, router]);

  // Set category filter
  const setCategory = useCallback((category: string | null) => {
    updateFilters({ category });
  }, [updateFilters]);

  // Set tag filter
  const setTag = useCallback((tag: string | null) => {
    updateFilters({ tag });
  }, [updateFilters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return !!(filters.category || filters.tag);
  }, [filters]);

  return {
    filters,
    setCategory,
    setTag,
    clearFilters,
    hasActiveFilters,
  };
}
