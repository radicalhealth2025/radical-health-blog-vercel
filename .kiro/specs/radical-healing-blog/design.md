# Design Document: Radical Healing Blog

## Overview

The Radical Healing Blog is a Next.js 14+ application using the App Router architecture, TypeScript, and Tailwind CSS. The platform provides a server-rendered, SEO-optimized experience for consuming healing-focused content with integrated audio playback and user feedback capabilities.

### Technology Stack

- **Frontend Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+ with custom design tokens
- **Database**: Supabase (PostgreSQL) - chosen for real-time capabilities, built-in auth, and generous free tier
- **Content Management**: Markdown files with frontmatter for blog posts (git-based workflow)
- **Animation**: Framer Motion
- **Deployment**: Vercel
- **Media Storage**: Cloudinary for images and video thumbnails
- **Audio**: HTML5 Audio API with custom React hooks

### Architecture Decision Rationale

1. **Next.js 14 App Router**: Provides server components for optimal performance, built-in API routes, and excellent SEO
2. **Supabase**: Offers PostgreSQL with real-time subscriptions, perfect for feedback system and future features
3. **Markdown + Frontmatter**: Simple content management for blog posts, version-controlled, no CMS complexity
4. **Cloudinary**: Free tier sufficient for media needs, automatic optimization and transformations

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │    Audio     │  │   Framer     │      │
│  │  Components  │  │    Player    │  │   Motion     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App (Vercel)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Server Components (RSC)                  │   │
│  │  • Page rendering  • Data fetching  • SEO metadata   │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   API Routes                          │   │
│  │  • /api/feedback  • /api/quotes  • /api/videos      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ↓                       ↓
┌──────────────────────────┐  ┌──────────────────────┐
│   Supabase (PostgreSQL)  │  │     Cloudinary       │
│  • User feedback         │  │  • Images            │
│  • Quotes                │  │  • Video thumbnails  │
│  • Videos metadata       │  │                      │
└──────────────────────────┘  └──────────────────────┘
                ↓
┌──────────────────────────┐
│   File System (Git)      │
│  • Blog posts (MD)       │
│  • Audio files (public)  │
└──────────────────────────┘
```

### Directory Structure

```
radical-healing-blog/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with audio provider
│   │   ├── page.tsx                   # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual blog post
│   │   ├── videos/
│   │   │   └── page.tsx              # Video gallery
│   │   ├── quotes/
│   │   │   └── page.tsx              # Quotes collection
│   │   ├── feedback/
│   │   │   └── page.tsx              # Feedback submission
│   │   ├── about/
│   │   │   └── page.tsx              # About/Mission
│   │   └── api/
│   │       ├── feedback/
│   │       │   └── route.ts          # POST feedback
│   │       ├── quotes/
│   │       │   └── route.ts          # GET quotes
│   │       └── videos/
│   │           └── route.ts          # GET videos
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── audio/
│   │   │   ├── AudioPlayer.tsx
│   │   │   └── AudioControls.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogList.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   └── BlogFilters.tsx
│   │   ├── video/
│   │   │   ├── VideoCard.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── VideoGallery.tsx
│   │   ├── quotes/
│   │   │   ├── QuoteCard.tsx
│   │   │   └── QuotesList.tsx
│   │   ├── feedback/
│   │   │   └── FeedbackForm.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   └── home/
│   │       ├── Hero.tsx
│   │       └── MissionStatement.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts            # Supabase client
│   │   │   ├── queries.ts           # Database queries
│   │   │   └── types.ts             # Database types
│   │   ├── content/
│   │   │   ├── blog.ts              # Blog post utilities
│   │   │   └── markdown.ts          # Markdown parsing
│   │   ├── hooks/
│   │   │   ├── useAudio.ts          # Audio player hook
│   │   │   ├── useLocalStorage.ts   # Persistence hook
│   │   │   └── useFilters.ts        # Filtering logic
│   │   ├── utils/
│   │   │   ├── validation.ts        # Form validation
│   │   │   └── formatting.ts        # Date/text formatting
│   │   └── constants.ts             # App constants
│   ├── types/
│   │   ├── blog.ts
│   │   ├── quote.ts
│   │   ├── video.ts
│   │   └── feedback.ts
│   └── styles/
│       └── globals.css              # Tailwind + custom styles
├── content/
│   └── blog/
│       ├── post-1.md
│       └── post-2.md
├── public/
│   ├── audio/
│   │   └── healing-music.mp3
│   └── images/
│       └── hero-bg.jpg
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Components and Interfaces

### Core Components

#### 1. Audio Player System

**AudioProvider (Context)**
```typescript
interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}
```

**Implementation Details**:
- Uses React Context for global audio state
- HTML5 Audio API for playback
- localStorage for persisting user preferences
- Continues playback across page navigation
- Preloads audio file on mount

#### 2. Blog System

**BlogCard Component**
- Displays blog post preview with image, title, excerpt, date
- Hover animations using Framer Motion
- Responsive grid layout
- Click navigates to full post

**BlogFilters Component**
- Category dropdown/pills
- Tag multi-select
- Clear filters button
- URL query params for shareable filtered views

**BlogPost Component**
- Server-rendered markdown content
- Optional embedded video player
- Reading time estimate
- Social sharing buttons
- Related posts section

#### 3. Video Gallery

**VideoPlayer Component**
- YouTube/Vimeo embed support via iframe
- Responsive aspect ratio (16:9)
- Loading state with skeleton
- Error handling for invalid URLs

**VideoCard Component**
- Thumbnail image from Cloudinary
- Play icon overlay
- Video title and duration
- Modal or inline player on click

#### 4. Quotes System

**QuoteCard Component**
- Quote text with decorative quotation marks
- Author attribution
- Category badge
- Fade-in animation on scroll
- Share quote functionality

#### 5. Feedback Form

**FeedbackForm Component**
- Controlled form inputs with validation
- Real-time validation feedback
- Loading state during submission
- Success/error messages
- Optional email field with format validation
- Textarea with character count
- Related content selector (dropdown)

### Layout Components

**Header**
- Sticky navigation
- Logo/site title
- Main navigation links
- Mobile hamburger menu
- Audio player controls (compact)

**Footer**
- Mission statement snippet
- Navigation links
- Social media links
- Copyright notice

## Data Models

### Database Schema (Supabase/PostgreSQL)

#### quotes Table
```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quotes_category ON quotes(category);
CREATE INDEX idx_quotes_featured ON quotes(featured);
```

#### videos Table
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  duration INTEGER, -- in seconds
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_videos_category ON videos(category);
```

#### user_feedback Table
```sql
CREATE TABLE user_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  experience TEXT NOT NULL,
  related_content_type VARCHAR(50), -- 'blog', 'quote', 'video'
  related_content_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_feedback_status ON user_feedback(status);
CREATE INDEX idx_feedback_submitted_at ON user_feedback(submitted_at);
```

### File-Based Content (Markdown)

#### Blog Post Frontmatter
```yaml
---
title: "Understanding the Root Causes of Suffering"
excerpt: "Explore the deeper patterns that keep us stuck..."
author: "Radical Healing Team"
publishedDate: "2024-01-15"
category: "Healing Foundations"
tags: ["mindfulness", "transformation", "awareness"]
featured: true
videoUrl: "https://youtube.com/watch?v=..."
coverImage: "/images/blog/post-1.jpg"
---
```

### TypeScript Types

```typescript
// types/blog.ts
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

// types/quote.ts
export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

// types/video.ts
export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  category: string;
  duration?: number;
  description?: string;
  createdAt: string;
}

// types/feedback.ts
export interface UserFeedback {
  name: string;
  email?: string;
  experience: string;
  relatedContentType?: 'blog' | 'quote' | 'video';
  relatedContentId?: string;
}

export interface FeedbackFormErrors {
  name?: string;
  email?: string;
  experience?: string;
}
```

## Error Handling

### Client-Side Error Handling

1. **Form Validation Errors**
   - Display inline error messages below each field
   - Highlight invalid fields with red border
   - Prevent submission until all errors resolved

2. **Network Errors**
   - Show toast notification for failed API calls
   - Provide retry button
   - Log errors to console in development

3. **Content Loading Errors**
   - Display ErrorBoundary fallback UI
   - Show friendly error message
   - Provide navigation back to home

4. **Audio Playback Errors**
   - Gracefully handle unsupported formats
   - Show error state in audio controls
   - Allow user to dismiss and continue browsing

### Server-Side Error Handling

1. **API Route Errors**
   - Return appropriate HTTP status codes
   - Include error messages in JSON response
   - Log errors for monitoring

2. **Database Errors**
   - Catch and handle connection errors
   - Retry transient failures
   - Return 500 status with generic message

3. **Content Not Found**
   - Return 404 status
   - Render custom 404 page
   - Suggest related content

### Error Response Format

```typescript
interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}
```

## Testing Strategy

### Unit Testing
- **Framework**: Vitest
- **Coverage Target**: 70%+ for utility functions and hooks
- **Focus Areas**:
  - Form validation logic
  - Data formatting utilities
  - Custom hooks (useAudio, useFilters)
  - Markdown parsing functions

### Component Testing
- **Framework**: React Testing Library
- **Focus Areas**:
  - Form submission flows
  - Filter interactions
  - Audio player controls
  - Loading and error states

### Integration Testing
- **Framework**: Playwright
- **Focus Areas**:
  - End-to-end user flows (browse → read → submit feedback)
  - Navigation between pages
  - Audio playback persistence
  - Form submission with validation

### Accessibility Testing
- **Tools**: axe-core, Lighthouse
- **Focus Areas**:
  - Keyboard navigation
  - Screen reader compatibility
  - Color contrast ratios
  - ARIA labels and roles

### Performance Testing
- **Tools**: Lighthouse, WebPageTest
- **Metrics**:
  - First Contentful Paint < 1.5s
  - Largest Contentful Paint < 2.5s
  - Time to Interactive < 3.5s
  - Cumulative Layout Shift < 0.1

## Design System Implementation

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A8C5A7', // Sage green
          light: '#C5DCC4',
          dark: '#8BAF8A',
        },
        secondary: {
          DEFAULT: '#D5C6E6', // Soft lavender
          light: '#E8DFF3',
          dark: '#BFA8D9',
        },
        accent: {
          DEFAULT: '#F5F1E8', // Warm cream
          light: '#FAF8F3',
          dark: '#E8E1D3',
        },
        background: '#F0F4F8', // Gentle blue-gray
        text: {
          DEFAULT: '#3A3A3A', // Charcoal gray
          light: '#6B6B6B',
        },
      },
      fontFamily: {
        heading: ['Inter', 'Manrope', 'sans-serif'],
        body: ['Georgia', 'Merriweather', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

### Component Styling Patterns

1. **Cards**: Soft shadows, rounded corners (8px), hover lift effect
2. **Buttons**: Primary (sage green), secondary (lavender), ghost variants
3. **Inputs**: Subtle borders, focus ring in primary color
4. **Typography**: Heading hierarchy with consistent spacing
5. **Spacing**: 4px base unit, consistent padding/margin scale

## Performance Optimizations

1. **Image Optimization**
   - Next.js Image component for automatic optimization
   - Cloudinary transformations for responsive images
   - Lazy loading for below-fold images

2. **Code Splitting**
   - Dynamic imports for heavy components (video player, feedback form)
   - Route-based code splitting via Next.js

3. **Caching Strategy**
   - Static generation for blog posts
   - Incremental Static Regeneration (ISR) for quotes/videos
   - Client-side caching with SWR for API data

4. **Bundle Optimization**
   - Tree shaking for unused code
   - Minimize dependencies
   - Use lightweight alternatives (date-fns over moment)

## Security Considerations

1. **Input Validation**
   - Sanitize all user inputs
   - Validate email format
   - Limit text field lengths

2. **API Security**
   - Rate limiting on feedback endpoint
   - CORS configuration
   - Environment variable protection

3. **Database Security**
   - Row Level Security (RLS) in Supabase
   - Prepared statements for queries
   - No sensitive data in client-side code

4. **Content Security**
   - Content Security Policy headers
   - Sanitize markdown content
   - Validate video URLs before embedding

## Deployment Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_SITE_URL=https://radicalhealing.blog
```

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### Build Process

1. Install dependencies
2. Run TypeScript type checking
3. Build Next.js application
4. Generate static pages
5. Deploy to Vercel edge network

### Post-Deployment

1. Configure custom domain (radicalhealing.blog)
2. Set up SSL certificate (automatic via Vercel)
3. Configure DNS records
4. Test all functionality in production
5. Set up monitoring and analytics

## Future Enhancements

1. **User Accounts**: Allow visitors to save favorite content
2. **Comments**: Enable discussion on blog posts
3. **Newsletter**: Email subscription for new content
4. **Search**: Full-text search across all content
5. **Admin Dashboard**: Web-based content management
6. **Analytics**: Track popular content and user engagement
7. **Multilingual**: Support for multiple languages
8. **Progressive Web App**: Offline support and installability
