# Sample Content Guide

This document provides an overview of the sample content added to the Radical Healing Blog and instructions for using it.

## 📝 Blog Posts Created

Five new blog posts have been added to `content/blog/`:

### 1. Healing Through Movement - The Body's Wisdom
- **File:** `healing-through-movement.md`
- **Category:** Body-Based Healing
- **Tags:** somatic healing, movement, embodiment, trauma release
- **Featured:** Yes
- **Has Video:** Yes
- **Topics:** Somatic healing, movement practices, trauma release, nervous system regulation

### 2. Understanding Your Trauma Responses
- **File:** `understanding-trauma-responses.md`
- **Category:** Trauma Healing
- **Tags:** trauma, nervous system, self-awareness, healing
- **Has Video:** Yes
- **Topics:** Fight/flight/freeze/fawn responses, trauma education, nervous system

### 3. The Transformative Power of Self-Compassion
- **File:** `self-compassion-practice.md`
- **Category:** Personal Growth
- **Tags:** self-compassion, inner critic, healing, mindfulness
- **Featured:** Yes
- **Topics:** Self-compassion practices, inner critic work, self-kindness

### 4. Nervous System Regulation - Your Foundation for Healing
- **File:** `nervous-system-regulation.md`
- **Category:** Trauma Healing
- **Tags:** nervous system, polyvagal theory, regulation, somatic healing
- **Topics:** Polyvagal theory, regulation tools, grounding techniques

### 5. Mindfulness for Beginners - A Gentle Introduction
- **File:** `mindfulness-for-beginners.md`
- **Category:** Mindfulness
- **Tags:** mindfulness, meditation, beginners, daily practice
- **Topics:** Mindfulness basics, simple practices, getting started

## 🗄️ Database Seed Data

A comprehensive seed script has been created at `supabase/seed.ts` with:

### Quotes (15 total)
- **Categories:** Healing, Trauma, Self-Acceptance, Self-Love, Mindfulness, Self-Compassion, Resilience, Acceptance, Nervous System
- **Featured:** 6 quotes marked as featured for homepage
- **Authors:** Rumi, Bessel van der Kolk, Carl Rogers, Viktor Frankl, Buddha, and more

### Videos (8 total)
- **Categories:** Somatic Healing, Meditation, Trauma Education, Self-Compassion, Breathwork, Movement, Mindfulness
- **All videos:** Real YouTube URLs with healing and mindfulness content
- **Metadata:** Includes titles, descriptions, durations, and thumbnail URLs

## 🎵 Audio Setup

### Documentation Created
- **`public/audio/README.md`** - Instructions for adding audio files
- **`docs/AUDIO_SETUP.md`** - Comprehensive setup guide

### Footer Attribution
- Updated `components/layout/Footer.tsx` with audio attribution section
- Includes placeholder for Pixabay attribution
- Comments showing how to format different license types

### What You Need to Do
1. Download a royalty-free healing music track (see AUDIO_SETUP.md)
2. Optimize it for web (< 5MB, 128 kbps)
3. Save as `public/audio/healing-music.mp3`
4. Update the attribution in Footer.tsx
5. Test the audio player

## 🚀 Using the Sample Content

### Running the Seed Script

1. **Install tsx** (if not already installed):
   ```bash
   npm install -D tsx
   ```

2. **Set up environment variables** in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Run the seed script**:
   ```bash
   npm run seed
   # or
   npx tsx supabase/seed.ts
   ```

4. **Verify the data** in your Supabase dashboard

### Viewing Blog Posts

The blog posts are automatically available at:
- http://localhost:3000/blog - See all posts
- http://localhost:3000/blog/healing-through-movement
- http://localhost:3000/blog/understanding-trauma-responses
- http://localhost:3000/blog/self-compassion-practice
- http://localhost:3000/blog/nervous-system-regulation
- http://localhost:3000/blog/mindfulness-for-beginners

### Testing Filters

The blog posts have varied categories and tags to test the filtering system:

**Categories:**
- Body-Based Healing
- Trauma Healing
- Personal Growth
- Mindfulness

**Tags:**
- somatic healing, movement, embodiment, trauma release
- trauma, nervous system, self-awareness, healing
- self-compassion, inner critic, mindfulness
- polyvagal theory, regulation
- meditation, beginners, daily practice

## 📊 Content Statistics

### Blog Posts
- **Total:** 6 posts (including original welcome post)
- **Featured:** 2 posts
- **With Videos:** 2 posts
- **Categories:** 4 unique categories
- **Tags:** 20+ unique tags

### Database Content
- **Quotes:** 15 quotes across 9 categories
- **Videos:** 8 videos across 7 categories
- **Featured Items:** 6 featured quotes

## 🎨 Content Themes

The sample content covers key healing topics:

1. **Trauma Healing**
   - Understanding trauma responses
   - Nervous system regulation
   - Somatic approaches

2. **Mindfulness & Meditation**
   - Beginner practices
   - Body awareness
   - Present moment focus

3. **Self-Compassion**
   - Inner critic work
   - Self-kindness practices
   - Acceptance

4. **Embodiment**
   - Movement practices
   - Body-based healing
   - Somatic awareness

## 🔄 Updating Content

### Adding More Blog Posts

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: Your Title
   excerpt: Brief description
   date: YYYY-MM-DD
   author: Author Name
   category: Category Name
   tags: [tag1, tag2, tag3]
   image: /images/blog/your-image.jpg
   published: true
   featured: false
   videoUrl: https://youtube.com/... (optional)
   ---
   ```
3. Write your content in Markdown
4. The post will automatically appear on the blog page

### Adding More Quotes/Videos

1. Update `supabase/seed.ts` with new data
2. Run the seed script again, or
3. Add directly via Supabase dashboard

### Re-seeding the Database

To clear and re-seed:

```sql
-- In Supabase SQL Editor
DELETE FROM quotes;
DELETE FROM videos;
```

Then run: `npm run seed`

## 📚 Additional Resources

- **Audio Setup:** See `docs/AUDIO_SETUP.md`
- **Database Schema:** See `supabase/migrations/001_initial_schema.sql`
- **Seed Script:** See `supabase/seed.ts`
- **Migration Docs:** See `supabase/migrations/README.md`

## ✅ Checklist

- [x] 5 new blog posts created
- [x] Blog posts have varied categories and tags
- [x] Blog posts include featured flags
- [x] Some posts include video URLs
- [x] Database seed script created
- [x] 15 quotes added to seed data
- [x] 8 videos added to seed data
- [x] Audio setup documentation created
- [x] Footer attribution section added
- [ ] Audio file added (requires manual download)
- [ ] Seed script executed (requires Supabase setup)

## 🎯 Next Steps

1. **Set up Supabase** (if not already done)
2. **Run the seed script** to populate quotes and videos
3. **Download and add audio file** following AUDIO_SETUP.md
4. **Test all content** on the site
5. **Customize** the sample content as needed

---

**Note:** The sample content is designed to be realistic and useful for testing all features of the blog, including filtering, featured content, video embeds, and various content types.
