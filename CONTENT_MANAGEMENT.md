# Content Management Guide

This guide explains how to create, edit, and manage content for the Radical Healing Blog.

## Table of Contents

- [Blog Posts](#blog-posts)
- [Quotes](#quotes)
- [Videos](#videos)
- [Images](#images)
- [Audio](#audio)
- [Best Practices](#best-practices)

## Blog Posts

Blog posts are stored as Markdown files in the `content/blog/` directory. This git-based approach makes content version-controlled and easy to manage.

### Creating a New Blog Post

1. **Create a new Markdown file**:
   ```bash
   cd content/blog
   touch my-new-post.md
   ```

2. **Add frontmatter** at the top of the file:
   ```yaml
   ---
   title: "Your Post Title"
   excerpt: "A brief 1-2 sentence description that appears in listings"
   author: "Author Name"
   publishedDate: "2024-01-15"
   category: "Healing Foundations"
   tags: ["mindfulness", "transformation", "awareness"]
   featured: false
   coverImage: "/images/blog/my-post.jpg"
   videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ"
   ---
   ```

3. **Write your content** below the frontmatter using Markdown:
   ```markdown
   ## Introduction
   
   Your introduction paragraph here...
   
   ## Main Content
   
   Your main content with **bold**, *italic*, and [links](https://example.com).
   
   ### Subsection
   
   More content...
   
   ## Conclusion
   
   Wrap up your post...
   ```

4. **Preview locally**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000/blog` to see your post

### Frontmatter Fields

| Field | Required | Type | Description | Example |
|-------|----------|------|-------------|---------|
| `title` | Yes | String | Post title (50-60 chars for SEO) | "Understanding Trauma Responses" |
| `excerpt` | Yes | String | Brief description (150-160 chars) | "Explore the deeper patterns..." |
| `author` | Yes | String | Author name | "Radical Healing Team" |
| `publishedDate` | Yes | String | Publication date (YYYY-MM-DD) | "2024-01-15" |
| `category` | Yes | String | Primary category | "Healing Foundations" |
| `tags` | Yes | Array | Related tags (3-5 recommended) | ["mindfulness", "trauma"] |
| `featured` | No | Boolean | Show on homepage | `true` or `false` |
| `coverImage` | No | String | Cover image path | "/images/blog/post.jpg" |
| `videoUrl` | No | String | Embedded video URL | "https://youtube.com/watch?v=..." |

### Available Categories

- Healing Foundations
- Mindfulness & Meditation
- Trauma & Recovery
- Self-Compassion
- Movement & Embodiment
- Nervous System Regulation
- Personal Growth
- Community & Connection

### Markdown Syntax

**Basic Formatting**:
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
***Bold and italic***

[Link text](https://example.com)
![Image alt text](/images/blog/image.jpg)
```

**Lists**:
```markdown
- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2
```

**Quotes**:
```markdown
> This is a blockquote
> It can span multiple lines
```

**Code**:
```markdown
Inline `code` with backticks

```javascript
// Code block with syntax highlighting
function example() {
  return "Hello, world!";
}
```
```

### Adding Images to Blog Posts

1. **Add image to public directory**:
   ```bash
   cp my-image.jpg public/images/blog/
   ```

2. **Reference in Markdown**:
   ```markdown
   ![Descriptive alt text](/images/blog/my-image.jpg)
   ```

3. **Image guidelines**:
   - Use descriptive alt text for accessibility
   - Optimize images before uploading (< 500KB recommended)
   - Use JPG for photos, PNG for graphics with transparency
   - Recommended dimensions: 1200x630px for cover images

### Embedding Videos

Add a YouTube or Vimeo URL to the `videoUrl` frontmatter field:

```yaml
videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ"
```

Or:

```yaml
videoUrl: "https://vimeo.com/123456789"
```

The video will be embedded at the top of the blog post.

### Editing Existing Posts

1. **Find the post** in `content/blog/`
2. **Edit the Markdown file** with your changes
3. **Save the file**
4. **Commit and push** (if using git):
   ```bash
   git add content/blog/my-post.md
   git commit -m "Update blog post"
   git push
   ```
5. **Redeploy** (Vercel auto-deploys on push to main branch)

### Deleting Posts

1. **Delete the Markdown file**:
   ```bash
   rm content/blog/old-post.md
   ```

2. **Commit and push**:
   ```bash
   git add content/blog/old-post.md
   git commit -m "Remove old blog post"
   git push
   ```

## Quotes

Quotes are stored in the Supabase `quotes` table.

### Adding Quotes via Seed Script

1. **Edit the seed script**:
   ```bash
   nano supabase/seed.ts
   ```

2. **Add your quote to the `quotes` array**:
   ```typescript
   {
     text: "Your quote text here",
     author: "Author Name",
     category: "Mindfulness",
     featured: false
   }
   ```

3. **Run the seed script**:
   ```bash
   npm run seed
   ```

### Adding Quotes via Supabase Dashboard

1. **Log in to Supabase**
2. **Navigate to Table Editor** → `quotes`
3. **Click "Insert row"**
4. **Fill in the fields**:
   - `text`: The quote text
   - `author`: Author name
   - `category`: Category (see list below)
   - `featured`: Check to show on homepage
5. **Click "Save"**

### Adding Quotes via SQL

```sql
INSERT INTO quotes (text, author, category, featured)
VALUES (
  'Your quote text here',
  'Author Name',
  'Mindfulness',
  false
);
```

### Quote Categories

- Mindfulness
- Healing
- Self-Compassion
- Transformation
- Awareness
- Resilience
- Growth
- Connection
- Peace

### Editing Quotes

**Via Supabase Dashboard**:
1. Navigate to Table Editor → `quotes`
2. Find the quote
3. Click the row to edit
4. Make changes and save

**Via SQL**:
```sql
UPDATE quotes
SET text = 'Updated quote text',
    author = 'Updated Author'
WHERE id = 'quote-uuid-here';
```

### Deleting Quotes

**Via Supabase Dashboard**:
1. Navigate to Table Editor → `quotes`
2. Find the quote
3. Click the trash icon
4. Confirm deletion

**Via SQL**:
```sql
DELETE FROM quotes
WHERE id = 'quote-uuid-here';
```

## Videos

Videos are stored in the Supabase `videos` table. The actual video files are hosted on YouTube or Vimeo.

### Adding Videos via Seed Script

1. **Edit the seed script**:
   ```bash
   nano supabase/seed.ts
   ```

2. **Add your video to the `videos` array**:
   ```typescript
   {
     title: "Video Title",
     url: "https://youtube.com/watch?v=VIDEO_ID",
     category: "Meditation",
     description: "Brief description of the video",
     thumbnail_url: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
     duration: 600 // duration in seconds (optional)
   }
   ```

3. **Run the seed script**:
   ```bash
   npm run seed
   ```

### Adding Videos via Supabase Dashboard

1. **Log in to Supabase**
2. **Navigate to Table Editor** → `videos`
3. **Click "Insert row"**
4. **Fill in the fields**:
   - `title`: Video title
   - `url`: YouTube or Vimeo URL
   - `category`: Category (see list below)
   - `description`: Brief description
   - `thumbnail_url`: Thumbnail image URL (optional)
   - `duration`: Duration in seconds (optional)
5. **Click "Save"**

### Video Categories

- Meditation
- Breathwork
- Movement
- Healing Practices
- Mindfulness
- Trauma Recovery
- Self-Compassion
- Nervous System

### Getting YouTube Thumbnail URLs

For a YouTube video with ID `VIDEO_ID`:

- **Default**: `https://i.ytimg.com/vi/VIDEO_ID/default.jpg` (120x90)
- **Medium**: `https://i.ytimg.com/vi/VIDEO_ID/mqdefault.jpg` (320x180)
- **High**: `https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg` (480x360)
- **Max**: `https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg` (1280x720)

### Supported Video Platforms

- **YouTube**: `https://youtube.com/watch?v=VIDEO_ID`
- **Vimeo**: `https://vimeo.com/VIDEO_ID`

## Images

### Blog Post Images

Store in `public/images/blog/`:

```bash
cp my-image.jpg public/images/blog/
```

Reference in Markdown:
```markdown
![Alt text](/images/blog/my-image.jpg)
```

### General Images

Store in `public/images/`:

```bash
cp hero-bg.jpg public/images/
```

### Image Optimization

**Before uploading**:
1. Resize to appropriate dimensions
2. Compress using tools like:
   - [TinyPNG](https://tinypng.com)
   - [ImageOptim](https://imageoptim.com)
   - [Squoosh](https://squoosh.app)
3. Target file size: < 500KB for blog images

**Using Cloudinary** (optional):
- Upload images to Cloudinary
- Use Cloudinary URLs in your content
- Automatic optimization and transformations

See `docs/IMAGE_OPTIMIZATION.md` for details.

### Image Guidelines

- **Format**: JPG for photos, PNG for graphics, WebP for modern browsers
- **Dimensions**: 
  - Blog cover images: 1200x630px
  - Blog inline images: 800-1200px wide
  - Thumbnails: 400x300px
- **Alt text**: Always include descriptive alt text for accessibility
- **File naming**: Use descriptive, lowercase, hyphenated names (e.g., `healing-through-movement.jpg`)

## Audio

Background music is stored in `public/audio/`.

### Adding Background Music

1. **Find royalty-free music**:
   - [Pixabay Music](https://pixabay.com/music/)
   - [Incompetech](https://incompetech.com)
   - [Free Music Archive](https://freemusicarchive.org)

2. **Download and optimize**:
   - Format: MP3
   - Bitrate: 128 kbps (good quality, small size)
   - File size: < 5MB
   - Duration: 3-5 minutes (will loop)

3. **Add to project**:
   ```bash
   cp healing-music.mp3 public/audio/
   ```

4. **Update attribution** in `components/layout/Footer.tsx`:
   ```tsx
   <p className="text-sm text-text-light">
     Music: "Track Name" by Artist Name from Pixabay
   </p>
   ```

See `docs/AUDIO_SETUP.md` for detailed instructions.

## Best Practices

### Content Writing

1. **Be authentic**: Write from personal experience and genuine insight
2. **Be clear**: Use simple language, avoid jargon
3. **Be compassionate**: Approach sensitive topics with care
4. **Be actionable**: Provide practical takeaways
5. **Be inclusive**: Use inclusive language and examples

### SEO Optimization

1. **Title**: 50-60 characters, include main keyword
2. **Excerpt**: 150-160 characters, compelling description
3. **Headings**: Use proper hierarchy (H1 → H2 → H3)
4. **Images**: Include descriptive alt text
5. **Links**: Link to related content, use descriptive anchor text
6. **Keywords**: Use naturally, don't stuff

### Accessibility

1. **Alt text**: Describe images for screen readers
2. **Headings**: Use semantic heading structure
3. **Links**: Use descriptive link text (not "click here")
4. **Contrast**: Ensure text is readable
5. **Video**: Include captions or transcripts when possible

### Content Calendar

Plan content in advance:

1. **Weekly**: 1-2 blog posts
2. **Monthly**: Review and update existing content
3. **Quarterly**: Add new quotes and videos
4. **Annually**: Audit all content for relevance

### Version Control

Use git for content management:

```bash
# Create a feature branch for new content
git checkout -b content/new-blog-post

# Add your content
git add content/blog/new-post.md

# Commit with descriptive message
git commit -m "Add blog post: Understanding Trauma"

# Push and create pull request
git push origin content/new-blog-post
```

### Testing Content

Before publishing:

1. **Preview locally**: Run `npm run dev` and review
2. **Check formatting**: Ensure Markdown renders correctly
3. **Test links**: Verify all links work
4. **Check images**: Ensure images load and have alt text
5. **Proofread**: Check spelling and grammar
6. **Mobile test**: View on mobile device

## Troubleshooting

### Blog post not appearing

- Check frontmatter is valid YAML
- Ensure `publishedDate` is not in the future
- Verify file is in `content/blog/` directory
- Check file extension is `.md`

### Images not loading

- Verify image path is correct
- Check image exists in `public/` directory
- Ensure path starts with `/` (e.g., `/images/blog/image.jpg`)

### Video not embedding

- Verify URL format is correct
- Check video is public (not private)
- Test URL in browser first

### Quotes/Videos not appearing

- Check database connection
- Verify data was inserted successfully
- Check Supabase dashboard for errors
- Review Row Level Security policies

## Support

For questions or issues:
- Review this guide
- Check the main `README.md`
- See `DEPLOYMENT.md` for deployment issues
- Contact the project maintainer
