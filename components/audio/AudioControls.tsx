'use client';

import React, { useState } from 'react';
import { useAudio } from '@/lib/hooks';

export function AudioControls() {
  const { volume, isMuted, setVolume, toggleMute } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className="flex items-center gap-2">
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="p-2 rounded-lg hover:bg-accent transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-text"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : displayVolume > 0.5 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-text"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : displayVolume > 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-text"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-text"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          </svg>
        )}
      </button>

      {/* Volume Slider - Desktop */}
      <div
        className="hidden md:flex items-center gap-2"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={displayVolume}
          onChange={handleVolumeChange}
          className={`w-20 h-1 bg-accent rounded-lg appearance-none cursor-pointer transition-all duration-100
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-100
            hover:[&::-webkit-slider-thumb]:scale-110
            [&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:h-3
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:duration-100
            hover:[&::-moz-range-thumb]:scale-110
            ${showVolumeSlider ? 'opacity-100' : 'opacity-70'}
          `}
          aria-label="Volume control"
          suppressHydrationWarning
          title={`Volume: ${Math.round(displayVolume * 100)}%`}
        />
      </div>
    </div>
  );
}
