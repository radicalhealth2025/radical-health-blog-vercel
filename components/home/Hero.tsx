'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-accent px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text mb-6"
        >
          Radical Healing
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-light font-body mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Explore the root causes of suffering and discover lasting transformation 
          through curated content, videos, quotes, and community experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/blog">
            <Button variant="primary" size="lg">
              Explore Blog
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg">
              Our Mission
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
