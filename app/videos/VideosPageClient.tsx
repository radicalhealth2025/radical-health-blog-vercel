'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { VideoGallery } from '@/components/video/VideoGallery';
import { LoadingSpinner } from '@/components/ui';
import type { Video } from '@/lib/supabase/types';

const VideoPlayer = dynamic(
  () => import('@/components/video/VideoPlayer').then(mod => ({ default: mod.VideoPlayer })),
  {
    loading: () => (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    ),
    ssr: false
  }
);

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
};

export default function VideosPageClient() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Use SWR for data fetching with caching
  const url = selectedCategory 
    ? `/api/videos?category=${encodeURIComponent(selectedCategory)}`
    : '/api/videos';
  
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
  });

  const videos = data?.videos || [];
  
  // Extract unique categories
  const categories = useMemo(() => {
    if (!data?.videos) return [];
    return Array.from(
      new Set(data.videos.map((v: Video) => v.category).filter(Boolean))
    ) as string[];
  }, [data]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleRetry = () => {
    mutate();
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedVideo]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
            Healing Videos
          </h1>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Explore guided meditations, healing practices, and transformative teachings
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-primary text-white'
                  : 'bg-white text-text hover:bg-primary/10'
              }`}
            >
              All Videos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-text hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Video Gallery */}
        <VideoGallery
          videos={videos}
          isLoading={isLoading}
          error={error ? error.message : null}
          onVideoClick={handleVideoClick}
          onRetry={handleRetry}
        />

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <div
              className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white transition-all"
                aria-label="Close video"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Video Player */}
              <div className="p-4 md:p-6">
                <VideoPlayer url={selectedVideo.url} title={selectedVideo.title} autoplay />
                
                {/* Video Info */}
                <div className="mt-4">
                  <h2 id="video-modal-title" className="text-2xl font-heading font-bold text-text mb-2">
                    {selectedVideo.title}
                  </h2>
                  {selectedVideo.description && (
                    <p className="text-text-light mb-3">
                      {selectedVideo.description}
                    </p>
                  )}
                  {selectedVideo.category && (
                    <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary bg-opacity-10 rounded-full">
                      {selectedVideo.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
