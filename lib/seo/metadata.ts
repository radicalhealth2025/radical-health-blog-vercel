import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import type { BlogPost } from '@/types/blog';

export interface SEOConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * Generate base metadata for all pages
 */
export function generateBaseMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    path = '',
    image = '/images/og-default.jpg',
    type = 'website',
  } = config;

  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate metadata for blog post pages
 */
export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.coverImage || '/images/og-default.jpg';

  const metadata: Metadata = {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

/**
 * Generate metadata for blog listing page
 */
export function generateBlogListingMetadata(
  category?: string,
  tag?: string
): Metadata {
  let title = 'Blog';
  let description = 'Explore healing-focused articles and insights on transformation, mindfulness, and self-discovery.';
  let path = '/blog';

  if (category) {
    title = `${category} Articles`;
    description = `Browse articles in the ${category} category.`;
    path = `/blog?category=${encodeURIComponent(category)}`;
  } else if (tag) {
    title = `Articles tagged with ${tag}`;
    description = `Browse articles tagged with ${tag}.`;
    path = `/blog?tag=${encodeURIComponent(tag)}`;
  }

  return generateBaseMetadata({
    title,
    description,
    path,
    type: 'website',
  });
}

/**
 * Generate metadata for quotes page
 */
export function generateQuotesMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'Healing Quotes',
    description: 'Discover inspiring quotes on healing, transformation, and wisdom from thought leaders and spiritual teachers.',
    path: '/quotes',
    type: 'website',
  });
}

/**
 * Generate metadata for videos page
 */
export function generateVideosMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'Healing Videos',
    description: 'Watch guided meditations, healing practices, and transformative teachings to support your journey.',
    path: '/videos',
    type: 'website',
  });
}

/**
 * Generate metadata for feedback page
 */
export function generateFeedbackMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'Share Your Experience',
    description: 'Share your healing journey and experiences with our community. Your story can inspire others.',
    path: '/feedback',
    type: 'website',
  });
}

/**
 * Generate metadata for about page
 */
export function generateAboutMetadata(): Metadata {
  return generateBaseMetadata({
    title: 'About Us',
    description: 'Learn about our mission to help people explore the root causes of suffering and discover lasting transformation.',
    path: '/about',
    type: 'website',
  });
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  return generateBaseMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: '/',
    type: 'website',
  });
}
