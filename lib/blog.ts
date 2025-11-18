import fs from 'fs';
import path from 'path';
import { parseMarkdown, extractFrontmatter, type FrontMatter, type ParsedMarkdown } from './markdown';
import type { BlogPost } from '@/types/blog';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

export interface BlogPostFull {
  slug: string;
  frontmatter: FrontMatter;
  content: string;
  html: string;
  readingTime: number;
}

/**
 * Get all blog post slugs for static path generation
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIRECTORY);
  return files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => file.replace(/\.(md|mdx)$/, ''));
}

/**
 * Get all blog posts with full content, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPostFull[]> {
  const slugs = getAllPostSlugs();
  
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  // Filter out unpublished posts and sort by date (newest first)
  return posts
    .filter(post => post.frontmatter.published !== false)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });
}

/**
 * Get all blog post previews (without full HTML content)
 * Returns BlogPost type compatible with existing components
 */
export async function getAllPostPreviews(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs();
  
  const previews: BlogPost[] = [];
  
  for (const slug of slugs) {
    const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = await parseMarkdown(fileContent);
    
    if (parsed.frontmatter.published === false) {
      continue;
    }

    previews.push({
      slug,
      title: parsed.frontmatter.title,
      excerpt: parsed.frontmatter.excerpt,
      content: parsed.content,
      author: parsed.frontmatter.author,
      publishedDate: parsed.frontmatter.date,
      category: parsed.frontmatter.category,
      tags: parsed.frontmatter.tags,
      featured: false,
      coverImage: parsed.frontmatter.image,
      readingTime: parsed.readingTime,
    });
  }

  // Sort by date (newest first)
  return previews.sort((a, b) => {
    const dateA = new Date(a.publishedDate).getTime();
    const dateB = new Date(b.publishedDate).getTime();
    return dateB - dateA;
  });
}

/**
 * Get a single blog post by slug with full content
 */
export async function getPostBySlug(slug: string): Promise<BlogPostFull> {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = await parseMarkdown(fileContent);

  return {
    slug,
    frontmatter: parsed.frontmatter,
    content: parsed.content,
    html: parsed.html,
    readingTime: parsed.readingTime,
  };
}

/**
 * Get posts filtered by category
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPostPreviews();
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPostPreviews();
  return allPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique categories from all posts
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPostPreviews();
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPostPreviews();
  const tags = new Set(allPosts.flatMap(post => post.tags));
  return Array.from(tags).sort();
}

/**
 * Get featured blog posts (based on frontmatter featured flag)
 */
export async function getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs();
  
  const previews: BlogPost[] = [];
  
  for (const slug of slugs) {
    const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = await parseMarkdown(fileContent);
    
    if (parsed.frontmatter.published === false || !parsed.frontmatter.featured) {
      continue;
    }

    previews.push({
      slug,
      title: parsed.frontmatter.title,
      excerpt: parsed.frontmatter.excerpt,
      content: parsed.content,
      author: parsed.frontmatter.author,
      publishedDate: parsed.frontmatter.date,
      category: parsed.frontmatter.category,
      tags: parsed.frontmatter.tags,
      featured: true,
      coverImage: parsed.frontmatter.image,
      readingTime: parsed.readingTime,
    });
  }

  // Sort by date (newest first)
  const sorted = previews.sort((a, b) => {
    const dateA = new Date(a.publishedDate).getTime();
    const dateB = new Date(b.publishedDate).getTime();
    return dateB - dateA;
  });

  return limit ? sorted.slice(0, limit) : sorted;
}
