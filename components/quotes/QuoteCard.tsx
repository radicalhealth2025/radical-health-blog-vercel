'use client';

import { motion } from 'framer-motion';
import { Quote } from '@/lib/supabase/types';
import { Card } from '@/components/ui/Card';

interface QuoteCardProps {
  quote: Quote;
  index?: number;
}

export function QuoteCard({ quote, index = 0 }: QuoteCardProps) {
  const handleShare = async () => {
    const shareText = `"${quote.text}" - ${quote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Healing Quote',
          text: shareText,
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Quote copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy quote:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col h-full">
          {/* Decorative opening quotation mark */}
          <div className="text-5xl text-primary leading-none mb-3" aria-hidden="true">
            "
          </div>

          {/* Quote text */}
          <blockquote className="flex-1 mb-4">
            <p className="text-lg font-body text-text leading-relaxed">
              {quote.text}
            </p>
          </blockquote>

          {/* Author and metadata */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
            <cite className="not-italic">
              <p className="text-sm font-heading font-medium text-text">
                — {quote.author}
              </p>
            </cite>

            {/* Category badge */}
            {quote.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-text">
                {quote.category}
              </span>
            )}
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="mt-4 w-full py-2 px-4 text-sm font-medium text-primary hover:text-primary-dark border border-primary/30 hover:border-primary rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Share quote by ${quote.author}`}
          >
            Share Quote
          </button>

          {/* Decorative closing quotation mark */}
          <div className="text-5xl text-primary leading-none text-right mt-2" aria-hidden="true">
            "
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
