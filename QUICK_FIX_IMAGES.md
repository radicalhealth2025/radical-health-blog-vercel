# Quick Fix for Broken Images

## Problem
Sample blog posts reference images that don't exist yet, causing 404 errors.

## Solution Options

### Option 1: Remove Image References (Quickest)
Edit each blog post in `content/blog/` and remove or comment out the `image:` line:

```yaml
---
title: Your Post Title
excerpt: Your excerpt
date: 2024-02-17
author: Author Name
category: Category
tags: [tag1, tag2]
# image: /images/blog/post-image.jpg  ← Comment out or remove this line
published: true
featured: true
---
```

### Option 2: Use Placeholder Images
1. Create simple placeholder images or download free stock photos
2. Save them in `public/images/blog/` with the correct filenames:
   - `self-compassion.jpg`
   - `healing-movement.jpg`
   - `mindfulness.jpg`
   - `nervous-system.jpg`
   - `trauma-responses.jpg`
   - `welcome.jpg`

**Free Stock Photo Sources:**
- [Unsplash](https://unsplash.com) - Search "meditation", "healing", "wellness"
- [Pexels](https://pexels.com) - Free high-quality images
- [Pixabay](https://pixabay.com) - Free images and videos

### Option 3: Use Cloudinary (Production Setup)
1. Sign up for free Cloudinary account
2. Upload images to Cloudinary
3. Update `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`
4. Images will be automatically optimized

## Recommended: Option 1 (Remove Images)
The site works perfectly without images. They're optional and can be added later when you have proper images ready.

## Quick Command to Remove All Image References

Run this in your terminal from the `radical-healing-blog` directory:

```bash
# macOS/Linux
find content/blog -name "*.md" -exec sed -i '' '/^image:/d' {} \;

# Or manually edit each file and remove the image: line
```

## After Fixing
1. Save the files
2. Refresh your browser
3. The 404 errors will be gone
4. Blog posts will display without cover images

## Adding Images Later
When you're ready to add images:
1. Add image files to `public/images/blog/`
2. Add `image: /images/blog/filename.jpg` to frontmatter
3. Images will automatically appear on blog cards and posts
