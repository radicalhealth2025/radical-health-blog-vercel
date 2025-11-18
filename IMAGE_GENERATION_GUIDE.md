# Image Generation Guide for Radical Healing Blog

## Quick Solutions for Missing Images

### Option 1: Use Unsplash Placeholder URLs (Fastest - 2 minutes)

Unsplash provides free, beautiful placeholder images via their Source API. No signup required!

**Run this command:**
```bash
cd radical-healing-blog
node scripts/generate-placeholder-images.js
```

This will update all blog posts to use Unsplash placeholder URLs like:
- `https://source.unsplash.com/1200x630/?meditation,peace`
- `https://source.unsplash.com/1200x630/?yoga,wellness`

**Pros:**
- ✅ Instant - works immediately
- ✅ Free and legal
- ✅ Beautiful, professional photos
- ✅ No API key needed

**Cons:**
- ⚠️ Random images (changes on each load)
- ⚠️ Requires internet connection
- ⚠️ Not ideal for production

---

### Option 2: Download Free Stock Photos (Recommended - 10 minutes)

Download specific images from free stock photo sites and save them locally.

**Best Free Stock Photo Sites:**

1. **Unsplash** (https://unsplash.com)
   - Search: "meditation", "healing", "wellness", "mindfulness"
   - License: Free for commercial use
   - Quality: Excellent
   - Download: High resolution

2. **Pexels** (https://pexels.com)
   - Search: "yoga", "peace", "nature", "calm"
   - License: Free for commercial use
   - Quality: Excellent
   - Download: Multiple sizes

3. **Pixabay** (https://pixabay.com)
   - Search: "zen", "healing", "meditation"
   - License: Free for commercial use
   - Quality: Good
   - Download: Various sizes

**Recommended Images for Each Post:**

| Blog Post | Search Terms | Suggested Style |
|-----------|--------------|-----------------|
| Self-Compassion Practice | "self care", "meditation", "peace" | Person meditating, peaceful scene |
| Healing Through Movement | "yoga", "dance", "movement" | Person in yoga pose, flowing movement |
| Mindfulness for Beginners | "zen", "nature", "calm" | Zen garden, peaceful nature |
| Nervous System Regulation | "breathing", "calm", "relaxation" | Person breathing, tranquil scene |
| Understanding Trauma | "growth", "healing", "support" | Sunrise, growing plant, hope |
| Welcome to Radical Healing | "journey", "path", "light" | Path through nature, sunrise |

**Steps:**
1. Visit Unsplash.com or Pexels.com
2. Search for the terms above
3. Download images (1200x630px or larger)
4. Save to `public/images/blog/` with these names:
   - `self-compassion.jpg`
   - `healing-movement.jpg`
   - `mindfulness.jpg`
   - `nervous-system.jpg`
   - `trauma-responses.jpg`
   - `welcome.jpg`
5. Images will automatically appear!

---

### Option 3: Use AI Image Generation (Creative - 15 minutes)

Generate custom images using free AI tools.

**Free AI Image Generators:**

1. **Leonardo.ai** (https://leonardo.ai)
   - Free tier: 150 credits/day
   - Quality: Excellent
   - Style: Artistic, customizable
   - Best for: Abstract healing concepts

2. **Ideogram** (https://ideogram.ai)
   - Free tier: 100 images/day
   - Quality: Very good
   - Style: Realistic or artistic
   - Best for: Text + image combinations

3. **Bing Image Creator** (https://bing.com/create)
   - Free: Unlimited with Microsoft account
   - Powered by: DALL-E 3
   - Quality: Excellent
   - Best for: Realistic scenes

**Suggested Prompts:**

```
Self-Compassion:
"Peaceful meditation scene, soft pastel colors, person sitting in lotus position, 
gentle light, calming atmosphere, photorealistic, 16:9 aspect ratio"

Healing Through Movement:
"Graceful yoga pose at sunrise, flowing movement, peaceful energy, 
warm golden light, serene expression, photorealistic, 16:9"

Mindfulness:
"Zen garden with raked sand patterns, smooth stones, bamboo, 
soft morning light, peaceful atmosphere, photorealistic, 16:9"

Nervous System:
"Person practicing deep breathing in nature, calm expression, 
soft focus background, peaceful energy, photorealistic, 16:9"

Trauma Healing:
"Sunrise over mountains, new beginning, hope and growth, 
warm colors, inspiring atmosphere, photorealistic, 16:9"

Welcome:
"Winding path through peaceful forest, dappled sunlight, 
journey ahead, hopeful atmosphere, photorealistic, 16:9"
```

**Steps:**
1. Visit one of the AI image generators
2. Sign up for free account
3. Use the prompts above (or customize them)
4. Generate images
5. Download as JPG (1200x630px or larger)
6. Save to `public/images/blog/`

---

### Option 4: Use Placeholder Service (Development Only)

For quick development testing, use placeholder image services.

**Placeholder Services:**

1. **Picsum Photos** (https://picsum.photos)
   ```
   https://picsum.photos/1200/630
   ```

2. **Placeholder.com**
   ```
   https://via.placeholder.com/1200x630/A8C5A7/FFFFFF?text=Healing+Blog
   ```

3. **DummyImage**
   ```
   https://dummyimage.com/1200x630/A8C5A7/ffffff&text=Radical+Healing
   ```

**Update blog posts manually:**
```yaml
---
title: Your Post Title
image: https://picsum.photos/1200/630
---
```

---

### Option 5: Remove Images Entirely (Simplest - 1 minute)

The blog works perfectly without images!

**Quick command to remove all image references:**

```bash
cd radical-healing-blog/content/blog

# macOS/Linux
find . -name "*.md" -exec sed -i '' '/^image:/d' {} \;

# Or manually edit each file and delete the "image:" line
```

The blog cards will simply not show images - still looks clean and professional.

---

## Recommended Workflow

### For Quick Demo/Development:
1. Run the placeholder script: `node scripts/generate-placeholder-images.js`
2. Or remove image references entirely

### For Production:
1. Download 6 images from Unsplash/Pexels (10 minutes)
2. Optimize them (see below)
3. Save to `public/images/blog/`
4. Update blog post frontmatter with local paths

---

## Image Optimization

Before adding images to production, optimize them:

### Using Online Tools:
1. **TinyPNG** (https://tinypng.com)
   - Upload your images
   - Download compressed versions
   - Reduces file size by 50-70%

2. **Squoosh** (https://squoosh.app)
   - Google's image optimizer
   - Compare before/after
   - Multiple format options

### Using Command Line:
```bash
# Install ImageMagick
brew install imagemagick  # macOS
apt-get install imagemagick  # Linux

# Optimize images
cd public/images/blog
mogrify -resize 1200x630^ -gravity center -extent 1200x630 -quality 85 *.jpg
```

### Target Specs:
- **Dimensions**: 1200x630px (optimal for social sharing)
- **Format**: JPG (photos) or WebP (modern browsers)
- **File Size**: < 200KB per image
- **Quality**: 80-85% (good balance)

---

## Image Attribution

If using free stock photos, consider adding attribution (though not required):

**In Footer or About Page:**
```
Images courtesy of Unsplash photographers:
- [Photographer Name](https://unsplash.com/@username)
```

---

## Future: Cloudinary Integration

For production, consider Cloudinary for automatic optimization:

1. Sign up for free Cloudinary account
2. Upload images to Cloudinary
3. Update `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`
4. Images automatically optimized and served via CDN

See `docs/IMAGE_OPTIMIZATION.md` for details.

---

## Quick Start Commands

```bash
# Option 1: Generate Unsplash placeholders
node scripts/generate-placeholder-images.js

# Option 2: Remove all image references
find content/blog -name "*.md" -exec sed -i '' '/^image:/d' {} \;

# Option 3: Create images directory
mkdir -p public/images/blog
# Then download images from Unsplash/Pexels

# Option 4: Check current image status
grep -r "image:" content/blog/
```

---

## Need Help?

- **Can't decide?** → Use Option 1 (Unsplash placeholders) for now
- **Want quality?** → Use Option 2 (Download from Unsplash)
- **Want unique?** → Use Option 3 (AI generation)
- **Want simple?** → Use Option 5 (Remove images)

All options work great! Choose based on your time and needs.
