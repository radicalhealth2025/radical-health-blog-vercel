'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
  audioSrc: string;
}

export function AudioProvider({ children, audioSrc }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useLocalStorage<number>('audio-volume', 0.5);
  const [isMuted, setIsMutedState] = useLocalStorage<boolean>('audio-muted', false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Set initial volume and mute state
    audio.volume = volume;
    audio.muted = isMuted;

    // Handle loading events
    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = () => {
      setIsLoading(false);
      setError('Failed to load audio file');
      // Audio file not found - this is expected in development
      // See public/audio/README.md for setup instructions
      if (process.env.NODE_ENV === 'development') {
        console.warn('Audio file not found. See public/audio/README.md for setup instructions.');
      }
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    // Cleanup
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc, volume, isMuted]);

  const play = () => {
    if (audioRef.current && !error) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Error playing audio:', err);
          setError('Failed to play audio');
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMutedState(newMutedState);
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
  };

  const value: AudioContextType = {
    isPlaying,
    volume,
    isMuted,
    isLoading,
    error,
    play,
    pause,
    setVolume,
    toggleMute,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextType {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
