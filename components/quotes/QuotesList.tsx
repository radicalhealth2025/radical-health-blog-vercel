'use client';

import { Quote } from '@/lib/supabase/types';
import { QuoteCard } from './QuoteCard';
import { ErrorMessage, QuoteCardSkeleton } from '@/components/ui';

interface QuotesListProps {
  quotes: Quote[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function QuotesList({ quotes, isLoading, error, onRetry }: QuotesListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <QuoteCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-text-light font-body">
          No quotes found. Check back soon for inspiring words of wisdom.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((quote, index) => (
        <QuoteCard key={quote.id} quote={quote} index={index} />
      ))}
    </div>
  );
}
