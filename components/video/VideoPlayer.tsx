'use client';

import React, { useState, useEffect } from 'react';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export interface VideoPlayerProps {
  url: string;
  title: string;
  autoplay?: boolean;
}

/**
 * Extract video ID and platform from URL
 */
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo' | null; videoId: string | null } {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return { platform: 'youtube', videoId: match[1] };
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      return { platform: 'vimeo', videoId: match[1] };
    }
  }

  return { platform: null, videoId: null };
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, autoplay = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  useEffect(() => {
    const { platform, videoId } = parseVideoUrl(url);

    if (!platform || !videoId) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    let embed = '';
    const autoplayParam = autoplay ? '1' : '0';

    if (platform === 'youtube') {
      embed = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&rel=0`;
    } else if (platform === 'vimeo') {
      embed = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}`;
    }

    setEmbedUrl(embed);
    setIsLoading(false);
  }, [url, autoplay]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    // Re-trigger the effect
    const { platform, videoId } = parseVideoUrl(url);
    if (platform && videoId) {
      setEmbedUrl(null);
      setTimeout(() => {
        const autoplayParam = autoplay ? '1' : '0';
        if (platform === 'youtube') {
          setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=${autoplayParam}&rel=0`);
        } else if (platform === 'vimeo') {
          setEmbedUrl(`https://player.vimeo.com/video/${videoId}?autoplay=${autoplayParam}`);
        }
        setIsLoading(false);
      }, 100);
    }
  };

  if (hasError || !embedUrl) {
    return (
      <div className="w-full aspect-video bg-background rounded-lg flex items-center justify-center">
        <ErrorMessage
          title="Unable to load video"
          message="This video URL is not supported or is invalid. Please check the URL and try again."
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-background rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="lg" label="Loading video..." />
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        onLoad={handleIframeLoad}
        loading="lazy"
      />
    </div>
  );
};

VideoPlayer.displayName = 'VideoPlayer';
