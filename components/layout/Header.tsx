'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from './Navigation';
import { AudioPlayer } from '@/components/audio';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`sticky top-0 z-50 bg-white shadow-sm ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
              <span className="text-white font-heading font-bold text-xl" aria-hidden="true">
                RH
              </span>
            </div>
            <span className="font-heading font-bold text-xl text-text hidden sm:inline">
              Radical Healing
            </span>
          </Link>

          {/* Audio Player */}
          <div className="flex-1 flex justify-center max-w-xs">
            <AudioPlayer />
          </div>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
