'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface NavigationProps {
  className?: string;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/videos', label: 'Videos' },
  { href: '/quotes', label: 'Quotes' },
  { href: '/feedback', label: 'Share Your Story' },
  { href: '/about', label: 'About' },
];

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={className} aria-label="Main navigation">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-heading text-text hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-text hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-text/10 animate-slide-up">
          <ul className="py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-3 font-heading text-text hover:bg-accent hover:text-primary transition-colors duration-200 focus:outline-none focus:bg-accent focus:text-primary"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

Navigation.displayName = 'Navigation';
