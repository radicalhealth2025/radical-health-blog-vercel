import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs, getAllPostPreviews } from '@/lib/blog';
import { BlogPost } from '@/components/blog/BlogPost';
import { BlogCard } from '@/components/blog/BlogCard';
import type { Metadata } from 'next';
import type { BlogPost as BlogPostType } from '@/types/blog';
import { generateBlogPostMetadata, generateBlogPostSchema, generateBreadcrumbSchema, renderStructuredData } from '@/lib/seo';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const postData = await getPostBySlug(slug);
    
    // Convert to BlogPost type for metadata generation
    const post: BlogPostType = {
      slug: postData.slug,
      title: postData.frontmatter.title,
      excerpt: postData.frontmatter.excerpt,
      content: postData.html,
      author: postData.frontmatter.author,
      publishedDate: postData.frontmatter.date,
      category: postData.frontmatter.category,
      tags: postData.frontmatter.tags,
      featured: false,
      coverImage: postData.frontmatter.image,
      readingTime: postData.readingTime,
    };
    
    return generateBlogPostMetadata(post);
  } catch {
    return {
      title: 'Post Not Found | Radical Healing',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  let postData;
  try {
    postData = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  // Convert to BlogPost type with HTML content
  const post: BlogPostType = {
    slug: postData.slug,
    title: postData.frontmatter.title,
    excerpt: postData.frontmatter.excerpt,
    content: postData.html, // Use HTML for rendering
    author: postData.frontmatter.author,
    publishedDate: postData.frontmatter.date,
    category: postData.frontmatter.category,
    tags: postData.frontmatter.tags,
    featured: false,
    coverImage: postData.frontmatter.image,
    readingTime: postData.readingTime,
  };

  // Get related posts (same category, excluding current post)
  const allPosts = await getAllPostPreviews();
  const relatedPosts = allPosts
    .filter(p => 
      p.slug !== slug && 
      p.category === postData.frontmatter.category
    )
    .slice(0, 3);

  // Generate structured data
  const blogPostSchema = generateBlogPostSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  return (
    <>
      {renderStructuredData([blogPostSchema, breadcrumbSchema])}
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BlogPost post={post} />
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
