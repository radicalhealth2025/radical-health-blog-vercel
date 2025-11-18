import { describe, it, expect } from 'vitest';
import {
  calculateReadingTime,
  parseMarkdown,
  extractFrontmatter,
  validateFrontmatter,
  type FrontMatter,
} from '../markdown';

describe('Markdown Utilities', () => {
  describe('calculateReadingTime', () => {
    it('should calculate reading time for short text', () => {
      const text = 'This is a short text with ten words here.';
      const readingTime = calculateReadingTime(text);
      expect(readingTime).toBe(1); // 10 words / 200 wpm = 0.05 min, rounded up to 1
    });

    it('should calculate reading time for longer text', () => {
      const words = Array(400).fill('word').join(' ');
      const readingTime = calculateReadingTime(words);
      expect(readingTime).toBe(2); // 400 words / 200 wpm = 2 min
    });

    it('should handle empty text', () => {
      const readingTime = calculateReadingTime('');
      expect(readingTime).toBe(1); // Minimum 1 minute
    });

    it('should handle text with multiple spaces', () => {
      const text = 'Word    word    word    word    word';
      const readingTime = calculateReadingTime(text);
      expect(readingTime).toBe(1);
    });
  });

  describe('extractFrontmatter', () => {
    it('should extract frontmatter from markdown', () => {
      const markdown = `---
title: Test Post
excerpt: This is a test
date: 2024-01-01
author: Test Author
category: Testing
tags: [test, example]
---

Content here`;

      const frontmatter = extractFrontmatter(markdown);
      expect(frontmatter.title).toBe('Test Post');
      expect(frontmatter.excerpt).toBe('This is a test');
      expect(frontmatter.date).toBeTruthy(); // gray-matter may parse dates
      expect(frontmatter.author).toBe('Test Author');
      expect(frontmatter.category).toBe('Testing');
      expect(frontmatter.tags).toEqual(['test', 'example']);
    });

    it('should extract optional fields', () => {
      const markdown = `---
title: Test Post
excerpt: This is a test
date: 2024-01-01
author: Test Author
category: Testing
tags: [test]
image: /images/test.jpg
published: true
featured: true
---

Content`;

      const frontmatter = extractFrontmatter(markdown);
      expect(frontmatter.image).toBe('/images/test.jpg');
      expect(frontmatter.published).toBe(true);
      expect(frontmatter.featured).toBe(true);
    });
  });

  describe('validateFrontmatter', () => {
    it('should validate complete frontmatter', () => {
      const frontmatter: FrontMatter = {
        title: 'Test',
        excerpt: 'Test excerpt',
        date: '2024-01-01',
        author: 'Author',
        category: 'Category',
        tags: ['tag1', 'tag2'],
      };

      expect(validateFrontmatter(frontmatter)).toBe(true);
    });

    it('should reject frontmatter missing title', () => {
      const frontmatter = {
        excerpt: 'Test excerpt',
        date: '2024-01-01',
        author: 'Author',
        category: 'Category',
        tags: ['tag1'],
      };

      expect(validateFrontmatter(frontmatter)).toBe(false);
    });

    it('should reject frontmatter missing excerpt', () => {
      const frontmatter = {
        title: 'Test',
        date: '2024-01-01',
        author: 'Author',
        category: 'Category',
        tags: ['tag1'],
      };

      expect(validateFrontmatter(frontmatter)).toBe(false);
    });

    it('should reject frontmatter with non-array tags', () => {
      const frontmatter = {
        title: 'Test',
        excerpt: 'Test excerpt',
        date: '2024-01-01',
        author: 'Author',
        category: 'Category',
        tags: 'not-an-array',
      };

      expect(validateFrontmatter(frontmatter as any)).toBe(false);
    });
  });

  describe('parseMarkdown', () => {
    it('should parse markdown with frontmatter', async () => {
      const markdown = `---
title: Test Post
excerpt: This is a test
date: 2024-01-01
author: Test Author
category: Testing
tags: [test, example]
---

# Heading

This is **bold** text.`;

      const parsed = await parseMarkdown(markdown);
      
      expect(parsed.frontmatter.title).toBe('Test Post');
      expect(parsed.content).toContain('# Heading');
      expect(parsed.content).toContain('This is **bold** text.');
      expect(parsed.html).toBeTruthy();
      expect(parsed.readingTime).toBeGreaterThan(0);
    });

    it('should throw error for missing required frontmatter', async () => {
      const markdown = `---
title: Test Post
---

Content`;

      await expect(parseMarkdown(markdown)).rejects.toThrow(
        'Missing required frontmatter fields'
      );
    });

    it('should calculate reading time correctly', async () => {
      const words = Array(200).fill('word').join(' ');
      const markdown = `---
title: Test Post
excerpt: Test excerpt
date: 2024-01-01
author: Author
category: Category
tags: [test]
---

${words}`;

      const parsed = await parseMarkdown(markdown);
      expect(parsed.readingTime).toBe(1); // 200 words = 1 minute
    });
  });
});
