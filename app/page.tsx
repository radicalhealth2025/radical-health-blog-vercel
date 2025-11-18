import { Metadata } from 'next';
import { Hero, FeaturedContent, SectionCards } from '@/components/home';
import { getFeaturedPosts } from '@/lib/blog';
import { getQuotes, getVideos } from '@/lib/supabase/queries';
import { generateHomeMetadata, generateOrganizationSchema, generateWebsiteSchema, renderStructuredData } from '@/lib/seo';

export const metadata: Metadata = generateHomeMetadata();

export default async function Home() {
  // Fetch featured content
  const featuredPosts = await getFeaturedPosts(3);
  
  const { data: featuredQuotes } = await getQuotes(undefined, true);
  const { data: allVideos } = await getVideos();
  
  // Since videos don't have a featured flag, take the most recent ones
  const featuredVideos = allVideos?.slice(0, 3) || [];

  // Generate structured data
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      {renderStructuredData([organizationSchema, websiteSchema])}
      <div className="min-h-screen">
        <Hero />
        <SectionCards />
        <FeaturedContent
          featuredPosts={featuredPosts}
          featuredQuotes={featuredQuotes || []}
          featuredVideos={featuredVideos}
        />
      </div>
    </>
  );
}
