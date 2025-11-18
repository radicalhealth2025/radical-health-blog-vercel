import { Metadata } from 'next';
import QuotesPageClient from '@/app/quotes/QuotesPageClient';
import { generateQuotesMetadata } from '@/lib/seo';

export const metadata: Metadata = generateQuotesMetadata();

export default function QuotesPage() {
  return <QuotesPageClient />;
}
