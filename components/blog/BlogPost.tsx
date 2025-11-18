'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost as BlogPostType } from '@/types/blog';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 text-sm font-heading font-medium bg-primary/10 text-primary rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-text-light font-body">
            {post.readingTime} min read
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-text-light font-body">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.publishedDate}>{formattedDate}</time>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs font-heading bg-accent text-text-light rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Video Embed */}
      {post.videoUrl && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden bg-accent">
          <iframe
            src={post.videoUrl}
            title={`Video for ${post.title}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none font-body
          prose-headings:font-heading prose-headings:text-text
          prose-p:text-text prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-text prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
          prose-code:text-primary prose-code:bg-accent prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-text prose-pre:text-accent
          prose-ul:list-disc prose-ol:list-decimal
          prose-li:text-text
          prose-img:rounded-lg prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </motion.article>
  );
};
