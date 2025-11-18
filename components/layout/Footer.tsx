import React from 'react';
import Link from 'next/link';

export interface FooterProps {
  className?: string;
}

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/videos', label: 'Videos' },
  { href: '/quotes', label: 'Quotes' },
  { href: '/feedback', label: 'Share Your Story' },
  { href: '/about', label: 'About' },
];

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-accent border-t border-text/10 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Statement */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-bold text-lg text-text mb-3">
              Radical Healing
            </h3>
            <p className="font-body text-text-light leading-relaxed max-w-2xl">
              Exploring the root causes of suffering and discovering lasting transformation 
              through curated content, videos, quotes, and shared experiences. Join us on 
              a journey toward deeper understanding and authentic healing.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-heading font-bold text-lg text-text mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-light hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Audio Attribution */}
        <div className="mt-8 pt-6 border-t border-text/10">
          <div className="text-center">
            <p className="font-body text-xs text-text-light">
              🎵 Background Music Attribution
            </p>
            <p className="font-body text-sm text-text-light mt-1">
              {/* Update this section with your specific track information */}
              Music courtesy of{' '}
              <a 
                href="https://pixabay.com/music/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Visit Pixabay Music for royalty-free music"
              >
                Pixabay Music
              </a>
              {/* Example format when you add a specific track:
                  "Track Name" by Artist Name from Pixabay
                  or for Incompetech:
                  Music by Kevin MacLeod (incompetech.com)
                  Licensed under Creative Commons: By Attribution 4.0 License
              */}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-text/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-sm text-text-light">
              © {currentYear} Radical Healing. All rights reserved.
            </p>
            <p className="font-body text-xs text-text-light">
              Made with 💚 for healing and transformation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
