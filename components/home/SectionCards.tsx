'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui';

interface SectionCard {
  title: string;
  description: string;
  href: string;
  icon: string;
}

const sections: SectionCard[] = [
  {
    title: 'Blog',
    description: 'Explore in-depth articles on healing, transformation, and self-discovery.',
    href: '/blog',
    icon: '📝',
  },
  {
    title: 'Videos',
    description: 'Watch guided meditations, teachings, and healing practices.',
    href: '/videos',
    icon: '🎥',
  },
  {
    title: 'Quotes',
    description: 'Find inspiration in curated wisdom from healing traditions.',
    href: '/quotes',
    icon: '💭',
  },
  {
    title: 'Share Your Story',
    description: 'Connect with our community by sharing your healing journey.',
    href: '/feedback',
    icon: '✨',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function SectionCards() {
  return (
    <section className="py-16 px-4 bg-accent">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-heading font-bold text-text text-center mb-12"
        >
          Explore Our Resources
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sections.map((section) => (
            <motion.div key={section.href} variants={cardVariants}>
              <Link href={section.href} className="block h-full">
                <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div className="text-4xl mb-4">{section.icon}</div>
                  <h3 className="text-xl font-heading font-bold text-text mb-2">
                    {section.title}
                  </h3>
                  <p className="text-text-light font-body">
                    {section.description}
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
