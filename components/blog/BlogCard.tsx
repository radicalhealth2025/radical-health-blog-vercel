'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { Card, OptimizedImage } from '@/components/ui';
import { formatDate, getISODate } from '@/lib/utils/date';

export interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = formatDate(post.publishedDate);

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full" aria-label={`Read article: ${post.title}`}>
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <Card hover padding="none" className="overflow-hidden h-full flex flex-col">
          {post.coverImage && (
            <div className="relative w-full h-48 bg-accent">
              <OptimizedImage
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                cloudinaryOptions={{ quality: 'auto', format: 'auto' }}
              />
            </div>
          )}
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block px-3 py-1 text-xs font-heading font-medium bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-text-light">
                {post.readingTime} min read
              </span>
            </div>
            
            <h3 className="text-xl font-heading font-semibold text-text mb-2 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-text-light font-body mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-accent">
              <span className="text-sm text-text-light font-body">
                {post.author}
              </span>
              <time className="text-sm text-text-light font-body" dateTime={getISODate(post.publishedDate)}>
                {formattedDate}
              </time>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
};
