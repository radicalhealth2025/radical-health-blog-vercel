'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogCard } from '@/components/blog';
import { QuoteCard } from '@/components/quotes';
import { VideoCard } from '@/components/video';
import { Button } from '@/components/ui';
import type { BlogPost } from '@/types/blog';
import type { Quote, Video } from '@/lib/supabase/types';

interface FeaturedContentProps {
  featuredPosts: BlogPost[];
  featuredQuotes: Quote[];
  featuredVideos: Video[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function FeaturedContent({
  featuredPosts,
  featuredQuotes,
  featuredVideos,
}: FeaturedContentProps) {
  const handleVideoClick = () => {
    // Navigate to videos page - in a real app, this could open a modal
    window.location.href = '/videos';
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Featured Blog Posts */}
        {featuredPosts.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">
                Featured Articles
              </h2>
              <Link href="/blog">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredPosts.slice(0, 3).map((post) => (
                <motion.div key={post.slug} variants={itemVariants}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Featured Quotes */}
        {featuredQuotes.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">
                Healing Wisdom
              </h2>
              <Link href="/quotes">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {featuredQuotes.slice(0, 2).map((quote) => (
                <motion.div key={quote.id} variants={itemVariants}>
                  <QuoteCard quote={quote} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Featured Videos */}
        {featuredVideos.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">
                Video Resources
              </h2>
              <Link href="/videos">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredVideos.slice(0, 3).map((video) => (
                <motion.div key={video.id} variants={itemVariants}>
                  <VideoCard video={video} onClick={handleVideoClick} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
