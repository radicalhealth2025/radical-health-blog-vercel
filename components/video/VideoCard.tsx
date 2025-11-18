'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { Video } from '@/lib/supabase/types';

export interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const handleClick = () => {
    onClick(video);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(video);
    }
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card
      hover
      padding="none"
      className="overflow-hidden group"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${video.title}`}
    >
      <div className="relative aspect-video bg-background">
        {video.thumbnail_url ? (
          <OptimizedImage
            src={video.thumbnail_url}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            cloudinaryOptions={{ quality: 'auto', format: 'auto' }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary-light to-secondary-light">
            <svg
              className="w-16 h-16 text-white opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-90 group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-200 shadow-lg">
            <svg
              className="w-8 h-8 text-primary ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-black bg-opacity-75 rounded">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-text mb-2 line-clamp-2">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="text-sm text-text-light line-clamp-2 mb-3">
            {video.description}
          </p>
        )}

        {video.category && (
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary bg-opacity-10 rounded-full">
            {video.category}
          </span>
        )}
      </div>
    </Card>
  );
};

VideoCard.displayName = 'VideoCard';
