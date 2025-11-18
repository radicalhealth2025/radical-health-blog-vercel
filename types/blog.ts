export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  featured: boolean;
  videoUrl?: string;
  coverImage?: string;
  readingTime: number;
}

export interface BlogFilters {
  category?: string;
  tags?: string[];
}
