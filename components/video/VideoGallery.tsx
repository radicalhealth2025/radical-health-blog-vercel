'use client';

import React from 'react';
import { VideoCard } from './VideoCard';
import { ErrorMessage, VideoCardSkeleton } from '@/components/ui';
import type { Video } from '@/lib/supabase/types';

export interface VideoGalleryProps {
  videos: Video[];
  isLoading?: boolean;
  error?: string | null;
  onVideoClick: (video: Video) => void;
  onRetry?: () => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  isLoading = false,
  error = null,
  onVideoClick,
  onRetry,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <ErrorMessage
          title="Failed to load videos"
          message={error}
          onRetry={onRetry}
        />
      </div>
    );
  }

  // Empty state
  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <svg
          className="w-16 h-16 text-text-light mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-xl font-heading font-semibold text-text mb-2">
          No videos found
        </h3>
        <p className="text-text-light max-w-md">
          There are no videos available at the moment. Please check back later.
        </p>
      </div>
    );
  }

  // Videos grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onClick={onVideoClick} />
      ))}
    </div>
  );
};

VideoGallery.displayName = 'VideoGallery';
