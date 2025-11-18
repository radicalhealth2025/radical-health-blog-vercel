# Quick Start Guide - Sample Content

This guide will help you quickly set up and use the sample content for the Radical Healing Blog.

## ✅ What's Been Added

### 📝 5 New Blog Posts
All posts are ready to view at `/blog`:
- Healing Through Movement (featured, with video)
- Understanding Your Trauma Responses (with video)
- The Transformative Power of Self-Compassion (featured)
- Nervous System Regulation
- Mindfulness for Beginners

### 🗄️ Database Seed Script
Ready to populate your database with:
- 15 healing quotes (6 featured)
- 8 healing videos with real YouTube URLs

### 📚 Documentation
- `SAMPLE_CONTENT_GUIDE.md` - Complete overview
- `docs/AUDIO_SETUP.md` - Audio setup instructions
- `supabase/migrations/README.md` - Database instructions

## 🚀 Quick Setup (3 Steps)

### Step 1: Seed the Database

```bash
# Make sure you have environment variables set in .env.local
npm run seed
```

This populates your Supabase database with quotes and videos.

### Step 2: Add Audio (Optional)

```bash
# 1. Download a track from Pixabay Music
# 2. Optimize it to < 5MB
# 3. Save as public/audio/healing-music.mp3
# 4. Update Footer.tsx with attribution
```

See `docs/AUDIO_SETUP.md` for detailed instructions.

### Step 3: Start the Dev Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your content!

## 📍 Where to Find Things

### Blog Posts
- **Location:** `content/blog/*.md`
- **View at:** http://localhost:3000/blog
- **Individual posts:** http://localhost:3000/blog/[slug]

### Quotes
- **Seed data:** `supabase/seed.ts` (lines 20-100)
- **View at:** http://localhost:3000/quotes
- **API:** http://localhost:3000/api/quotes

### Videos
- **Seed data:** `supabase/seed.ts` (lines 102-180)
- **View at:** http://localhost:3000/videos
- **API:** http://localhost:3000/api/videos

### Audio
- **Should be at:** `public/audio/healing-music.mp3`
- **Setup guide:** `docs/AUDIO_SETUP.md`
- **Attribution:** `components/layout/Footer.tsx`

## 🎯 Testing the Content

### Test Blog Filters
1. Go to http://localhost:3000/blog
2. Try filtering by category:
   - Body-Based Healing
   - Trauma Healing
   - Personal Growth
   - Mindfulness
3. Try filtering by tags
4. Test the "Clear Filters" button

### Test Featured Content
1. Go to http://localhost:3000 (homepage)
2. You should see featured blog posts
3. After seeding, you'll see featured quotes

### Test Video Embeds
1. Go to http://localhost:3000/blog/healing-through-movement
2. Scroll down to see the embedded YouTube video
3. Click play to test the video player

### Test Audio Player
1. Look for the audio controls in the header
2. Click play (if you've added an audio file)
3. Navigate between pages - music should continue
4. Test volume and mute controls

## 🔧 Customizing the Content

### Add More Blog Posts
1. Create a new `.md` file in `content/blog/`
2. Copy the frontmatter from an existing post
3. Update the fields and write your content
4. It will automatically appear on the blog page

### Add More Quotes/Videos
Option 1: Update the seed script and re-run it
Option 2: Add directly in Supabase dashboard

### Change Featured Items
Edit the `featured: true/false` flag in:
- Blog post frontmatter
- Seed script for quotes/videos

## 📊 Content Overview

| Type | Count | Categories | Featured |
|------|-------|------------|----------|
| Blog Posts | 6 | 4 | 2 |
| Quotes | 15 | 9 | 6 |
| Videos | 8 | 7 | 0 |

## 🆘 Troubleshooting

### Blog posts not showing?
- Check files are in `content/blog/`
- Verify frontmatter is valid YAML
- Check `published: true` in frontmatter
- Restart dev server

### Seed script fails?
- Check environment variables in `.env.local`
- Verify Supabase credentials
- Check database migrations are applied
- See error message for specific issue

### Audio not playing?
- Check file exists at `public/audio/healing-music.mp3`
- Verify file is valid MP3 format
- Check browser console for errors
- Try a different browser

### Quotes/Videos not showing?
- Run the seed script first: `npm run seed`
- Check Supabase dashboard for data
- Verify API routes are working
- Check browser console for errors

## 📖 Next Steps

1. ✅ Run the seed script
2. ✅ Test all the sample content
3. ✅ Add your own audio file
4. ✅ Customize the content as needed
5. ✅ Deploy to Vercel

## 📚 Full Documentation

For complete details, see:
- `SAMPLE_CONTENT_GUIDE.md` - Complete content overview
- `docs/AUDIO_SETUP.md` - Audio setup guide
- `README.md` - Main project documentation

---

**Ready to go!** Run `npm run seed` and `npm run dev` to see your content.
