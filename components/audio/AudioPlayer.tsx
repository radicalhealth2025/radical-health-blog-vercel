'use client';

import React from 'react';
import { useAudio } from '@/lib/hooks';
import { AudioControls } from './AudioControls';

export function AudioPlayer() {
  const { isPlaying, isLoading, error, play, pause } = useAudio();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-text-light" title={error}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="hidden sm:inline">Audio unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        disabled={isLoading}
        className="p-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isPlaying ? 'Pause healing music' : 'Play healing music'}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      {/* Audio Controls */}
      <AudioControls />

      {/* Label - Hidden on mobile */}
      <span className="hidden lg:inline text-sm text-text-light font-body">
        Healing Music
      </span>
    </div>
  );
}
