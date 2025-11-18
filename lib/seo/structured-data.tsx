import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import type { BlogPost } from '@/types/blog';
import React from 'react';

/**
 * Generate JSON-LD structured data for the organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
      // Add social media URLs when available
    ],
  };
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateBlogPostSchema(post: BlogPost) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: Math.ceil(post.content.split(/\s+/).length),
    timeRequired: `PT${post.readingTime}M`,
  } as Record<string, unknown>;

  // Add image if available
  if (post.coverImage) {
    schema.image = {
      '@type': 'ImageObject',
      url: post.coverImage,
      width: 1200,
      height: 630,
    };
  }

  // Add video if available
  if (post.videoUrl) {
    schema.video = {
      '@type': 'VideoObject',
      name: post.title,
      description: post.excerpt,
      thumbnailUrl: post.coverImage,
      contentUrl: post.videoUrl,
      uploadDate: post.publishedDate,
    };
  }

  return schema;
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Render JSON-LD script tag
 */
export function renderStructuredData(data: Record<string, unknown> | Array<Record<string, unknown>>): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
