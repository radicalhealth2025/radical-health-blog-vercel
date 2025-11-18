# Radical Healing Blog

A Next.js 14+ web application for exploring healing-focused content through blog posts, videos, quotes, and community experiences.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database)
- Cloudinary account (for media storage)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables template:

```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local`

### Database Setup

1. Apply the database migrations in Supabase (see `supabase/migrations/README.md`)

2. Seed the database with sample content:

```bash
npm run seed
```

This will populate your database with:
- 15 curated healing quotes
- 8 healing and mindfulness videos

See `SAMPLE_CONTENT_GUIDE.md` for details about the sample content.

### Audio Setup

The application includes a background audio player. To add healing music:

1. Download a royalty-free track (see `docs/AUDIO_SETUP.md`)
2. Optimize it for web (< 5MB, 128 kbps)
3. Save as `public/audio/healing-music.mp3`
4. Update attribution in `components/layout/Footer.tsx`

See the comprehensive guide at `docs/AUDIO_SETUP.md` for detailed instructions.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:

```bash
npm run build
```

### Testing

Run tests:

```bash
npm test
```

Run tests once (CI mode):

```bash
npm run test:run
```

### Lint

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
radical-healing-blog/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── layout/            # Header, Footer, Navigation
│   ├── audio/             # Audio player components
│   ├── blog/              # Blog-related components
│   ├── video/             # Video gallery components
│   ├── quotes/            # Quote components
│   ├── feedback/          # Feedback form
│   ├── ui/                # Reusable UI components
│   └── home/              # Homepage components
├── lib/                   # Utilities and helpers
│   ├── supabase/          # Database client and queries
│   ├── content/           # Content management utilities
│   ├── hooks/             # Custom React hooks
│   └── utils/             # General utilities
├── types/                 # TypeScript type definitions
├── styles/                # Global styles
├── content/               # Markdown blog posts
├── public/                # Static assets
└── supabase/              # Database migrations

```

## Sample Content

The project includes sample content to help you get started:

### Blog Posts (6 total)
- Welcome to Radical Healing
- Healing Through Movement
- Understanding Your Trauma Responses
- The Transformative Power of Self-Compassion
- Nervous System Regulation
- Mindfulness for Beginners

All posts are located in `content/blog/` and include proper frontmatter with categories, tags, and metadata.

### Database Content
- 15 healing quotes across 9 categories
- 8 healing videos with real YouTube URLs
- Featured items marked for homepage display

See `SAMPLE_CONTENT_GUIDE.md` for complete details.

## Content Management

### Adding Blog Posts

Blog posts are stored as Markdown files in the `content/blog/` directory.

1. **Create a new Markdown file**:
   ```bash
   touch content/blog/my-new-post.md
   ```

2. **Add frontmatter** at the top of the file:
   ```yaml
   ---
   title: "Your Post Title"
   excerpt: "A brief description of your post"
   author: "Author Name"
   publishedDate: "2024-01-15"
   category: "Healing Foundations"
   tags: ["mindfulness", "transformation"]
   featured: false
   coverImage: "/images/blog/my-post.jpg"
   videoUrl: "https://youtube.com/watch?v=..."
   ---
   ```

3. **Write your content** below the frontmatter using Markdown syntax

4. **Add images** to `public/images/blog/` and reference them in your post

5. **Preview locally** by running `npm run dev` and visiting `/blog`

### Managing Quotes and Videos

Quotes and videos are stored in Supabase. To add new content:

1. **Using the seed script** (for bulk additions):
   - Edit `supabase/seed.ts`
   - Add your quotes/videos to the arrays
   - Run `npm run seed`

2. **Using Supabase dashboard**:
   - Log in to your Supabase project
   - Navigate to the Table Editor
   - Select `quotes` or `videos` table
   - Click "Insert row" and fill in the fields

3. **Using SQL**:
   ```sql
   -- Add a quote
   INSERT INTO quotes (text, author, category, featured)
   VALUES ('Your quote text', 'Author Name', 'Mindfulness', false);
   
   -- Add a video
   INSERT INTO videos (title, url, category, description)
   VALUES ('Video Title', 'https://youtube.com/watch?v=...', 'Meditation', 'Description');
   ```

## Documentation

### Setup & Configuration
- **`QUICK_START.md`** - Quick start guide for getting up and running
- **`DEPLOYMENT.md`** - Complete deployment guide for Vercel
- **`DNS_CONFIGURATION.md`** - Detailed DNS setup for custom domain
- **`ENVIRONMENT_VARIABLES.md`** - Comprehensive guide to all environment variables
- **`.env.example`** - Environment variables template

### Content & Features
- **`CONTENT_MANAGEMENT.md`** - Complete guide to managing blog posts, quotes, and videos
- **`SAMPLE_CONTENT_GUIDE.md`** - Overview of sample content and how to use it
- **`docs/AUDIO_SETUP.md`** - Complete guide for adding background music
- **`docs/IMAGE_OPTIMIZATION.md`** - Image optimization with Cloudinary
- **`supabase/migrations/README.md`** - Database migration and seeding instructions

### Development & Quality
- **`ACCESSIBILITY.md`** - Accessibility overview and compliance
- **`docs/ACCESSIBILITY_IMPLEMENTATION.md`** - Detailed accessibility implementation
- **`.kiro/specs/radical-healing-blog/`** - Complete specification documents

## Environment Variables

See `.env.example` for required environment variables:

### Required Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SITE_URL` | Your production site URL | `https://radicalhealing.blog` |

### Optional Variables (for Cloudinary)

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Cloudinary Dashboard |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep sensitive keys (like `SUPABASE_SERVICE_ROLE_KEY`) server-side only.

## Deployment

### Deploy to Vercel

The easiest way to deploy this application is using Vercel:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure environment variables (see `.env.example`)
   - Click "Deploy"

3. **Configure custom domain** (optional)
   - Add your domain in Vercel dashboard
   - Update DNS records at your registrar
   - Wait for SSL certificate provisioning

For detailed deployment instructions, see **`DEPLOYMENT.md`**.

For DNS configuration help, see **`DNS_CONFIGURATION.md`**.

### Post-Deployment Checklist

After deploying, make sure to:

- [ ] Verify all environment variables are set in Vercel
- [ ] Run database migrations in Supabase
- [ ] Seed the database with initial content (`npm run seed`)
- [ ] Test all features on the production site
- [ ] Configure custom domain and verify SSL
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Test on multiple devices and browsers
- [ ] Set up monitoring and analytics (optional)

## Features

- 📝 **Blog System** - Markdown-based blog with frontmatter
- 🎥 **Video Gallery** - Curated healing videos with YouTube/Vimeo embeds
- 💬 **Quotes Collection** - Inspirational healing quotes by category
- 🎵 **Audio Player** - Background healing music with persistent controls
- 📬 **Feedback System** - User testimonials and experience sharing
- 🎨 **Design System** - Calming color palette with Tailwind CSS
- ♿ **Accessibility** - WCAG 2.1 Level AA compliant
- 🚀 **Performance** - Optimized for speed with Next.js 14
- 📱 **Responsive** - Works on all devices (320px to 2560px)
- 🔍 **SEO Optimized** - Meta tags, Open Graph, structured data

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
```bash
# Check for type errors
npx tsc --noEmit

# Fix any reported errors
```

**Database connection fails**
- Verify Supabase credentials in `.env.local`
- Check that your Supabase project is active
- Ensure Row Level Security policies allow public access where needed

**Images not loading**
- Verify image paths are correct
- Check that images exist in `public/` directory
- For Cloudinary images, verify credentials are set

**Audio not playing**
- Ensure audio file exists at `public/audio/healing-music.mp3`
- Check file size (should be < 5MB)
- Verify browser supports MP3 format

For more help, see the documentation files listed above.

## Contributing

This is a private project. If you have access and want to contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For questions or issues:
- Check the documentation in the `docs/` directory
- Review the specification in `.kiro/specs/radical-healing-blog/`
- Contact the project maintainer

## License

Private - All rights reserved
