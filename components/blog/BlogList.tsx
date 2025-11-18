'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { BlogCard } from './BlogCard';
import { BlogCardSkeleton } from '@/components/ui';

export interface BlogListProps {
  posts: BlogPost[];
  emptyMessage?: string;
  isLoading?: boolean;
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
    transition: {
      duration: 0.3,
    },
  },
};

export const BlogList: React.FC<BlogListProps> = ({ 
  posts, 
  emptyMessage = 'No blog posts found.',
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-light font-body text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={itemVariants}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
};
