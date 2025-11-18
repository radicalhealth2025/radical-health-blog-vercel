import { Metadata } from 'next';
import VideosPageClient from '@/app/videos/VideosPageClient';
import { generateVideosMetadata } from '@/lib/seo';

export const metadata: Metadata = generateVideosMetadata();

export default function VideosPage() {
  return <VideosPageClient />;
}

