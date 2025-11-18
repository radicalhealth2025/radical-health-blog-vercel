import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-html';
import matter from 'gray-matter';

export interface FrontMatter {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  published?: boolean;
  featured?: boolean;
}

export interface ParsedMarkdown {
  frontmatter: FrontMatter;
  content: string;
  html: string;
  readingTime: number;
}

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

/**
 * Parse markdown content with frontmatter
 */
export async function parseMarkdown(markdownContent: string): Promise<ParsedMarkdown> {
  // Parse frontmatter
  const { data, content } = matter(markdownContent);
  
  // Validate required frontmatter fields
  const frontmatter = data as FrontMatter;
  if (!frontmatter.title || !frontmatter.excerpt || !frontmatter.date) {
    throw new Error('Missing required frontmatter fields: title, excerpt, or date');
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  // Process markdown to HTML with GitHub Flavored Markdown support
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype);

  const result = await processor.process(content);
  const html = String(result);

  return {
    frontmatter,
    content,
    html,
    readingTime,
  };
}

/**
 * Extract frontmatter only without processing markdown content
 */
export function extractFrontmatter(markdownContent: string): FrontMatter {
  const { data } = matter(markdownContent);
  return data as FrontMatter;
}

/**
 * Validate markdown frontmatter structure
 */
export function validateFrontmatter(frontmatter: Partial<FrontMatter>): frontmatter is FrontMatter {
  return !!(
    frontmatter.title &&
    frontmatter.excerpt &&
    frontmatter.date &&
    frontmatter.author &&
    frontmatter.category &&
    Array.isArray(frontmatter.tags)
  );
}
