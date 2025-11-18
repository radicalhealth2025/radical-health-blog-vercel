# Implementation Plan

- [x] 1. Initialize Next.js project and configure development environment
  - Create Next.js 14 project with TypeScript and App Router
  - Install and configure Tailwind CSS with custom design tokens
  - Set up project directory structure according to design
  - Configure TypeScript with strict mode and path aliases
  - Create environment variables template file
  - _Requirements: 9.1, 9.2, 10.5_

- [x] 2. Set up design system and core UI components
  - [x] 2.1 Configure Tailwind with custom color palette and fonts
    - Implement tailwind.config.ts with healing color palette (sage green, lavender, cream, blue-gray)
    - Add custom font families (Inter/Manrope for headings, Georgia/Merriweather for body)
    - Define animation keyframes for fade-in and slide-up effects
    - Configure spacing scale and responsive breakpoints
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 2.2 Create base UI components
    - Implement Button component with primary, secondary, and ghost variants
    - Create Input component with validation states and focus styling
    - Build Textarea component with character count support
    - Implement Card component with hover effects
    - Create LoadingSpinner component with accessible labels
    - Build ErrorMessage component with icon and retry option
    - _Requirements: 9.5, 5.2, 5.3_

  - [x] 2.3 Build layout components
    - Create Header component with sticky navigation and logo
    - Implement Navigation component with mobile hamburger menu
    - Build Footer component with links and mission statement
    - Add responsive behavior for all layout components
    - Implement keyboard navigation support
    - _Requirements: 1.1, 5.1, 5.3_

- [x] 3. Implement audio player system
  - [x] 3.1 Create audio context and custom hook
    - Build AudioContext with play, pause, volume, and mute state
    - Implement useAudio hook with HTML5 Audio API integration
    - Create useLocalStorage hook for persisting audio preferences
    - Add audio preloading on mount
    - _Requirements: 3.1, 3.2_

  - [x] 3.2 Build audio player UI components
    - Create AudioPlayer component with play/pause button
    - Implement AudioControls with volume slider and mute toggle
    - Add visual feedback for all control interactions (100ms response)
    - Style components to match design system
    - _Requirements: 3.1, 3.5, 9.5_

  - [x] 3.3 Integrate audio player into root layout
    - Wrap app with AudioProvider in root layout
    - Add AudioPlayer component to header
    - Ensure audio continues across page navigation
    - Implement 2-second load time requirement
    - _Requirements: 3.3, 3.4_

- [x] 4. Set up Supabase database and connection
  - [x] 4.1 Create Supabase project and configure connection
    - Set up Supabase project and obtain credentials
    - Create Supabase client utility with environment variables
    - Configure Row Level Security policies
    - Add connection error handling
    - _Requirements: 10.1, 10.5_

  - [x] 4.2 Create database schema and migrations
    - Write migration for quotes table with indexes
    - Create migration for videos table with category index
    - Implement user_feedback table with status tracking
    - Add timestamps and UUID generation
    - _Requirements: 4.5, 7.2, 7.3_

  - [x] 4.3 Build database query utilities
    - Create queries.ts with functions for fetching quotes
    - Implement video fetching with category filtering
    - Build feedback submission function with validation
    - Add TypeScript types for all database operations
    - Generate types from Supabase schema
    - _Requirements: 4.1, 4.5, 7.4_

- [x] 5. Implement blog post system with markdown
  - [x] 5.1 Set up markdown processing utilities
    - Install and configure markdown parser (remark/rehype)
    - Create markdown.ts utility for parsing frontmatter
    - Implement reading time calculation
    - Add syntax highlighting for code blocks
    - _Requirements: 1.3, 7.1_

  - [x] 5.2 Build blog content utilities
    - Create blog.ts with functions to read markdown files
    - Implement getAllPosts function with sorting by date
    - Build getPostBySlug function with content parsing
    - Add getPostsByCategory and getPostsByTag filters
    - Generate static paths for all blog posts
    - _Requirements: 1.2, 2.1, 7.1_

  - [x] 5.3 Create blog UI components
    - Build BlogCard component with image, title, excerpt, and date
    - Implement BlogList component with responsive grid layout
    - Create BlogPost component for rendering markdown content
    - Add Framer Motion animations for card hover effects
    - Implement lazy loading for blog post images
    - _Requirements: 1.2, 1.3, 5.1, 6.5, 9.3_

  - [x] 5.4 Build blog filtering system
    - Create BlogFilters component with category and tag selectors
    - Implement useFilters hook for managing filter state
    - Add URL query params for shareable filtered views
    - Build clear filters functionality
    - Display "no results" message when filters match nothing
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 5.5 Implement blog pages
    - Create blog listing page at /blog with filters
    - Build dynamic blog post page at /blog/[slug]
    - Add SEO metadata for all blog pages
    - Implement related posts section
    - Add loading states for content fetching
    - _Requirements: 1.2, 1.3, 6.3, 8.1, 8.4_

- [x] 6. Build video gallery system
  - [x] 6.1 Create video API route
    - Implement GET /api/videos route to fetch from Supabase
    - Add category filtering support
    - Include error handling and status codes
    - Return videos sorted by creation date
    - _Requirements: 1.4, 7.3_

  - [x] 6.2 Build video UI components
    - Create VideoCard component with thumbnail and play icon
    - Implement VideoPlayer component with YouTube/Vimeo embed support
    - Build VideoGallery component with responsive grid
    - Add loading skeleton for video thumbnails
    - Implement error handling for invalid video URLs
    - _Requirements: 1.4, 6.3, 6.4_

  - [x] 6.3 Create video gallery page
    - Build /videos page with VideoGallery component
    - Fetch videos from API route
    - Add modal or inline player for video playback
    - Implement SEO metadata for video page
    - Add loading and error states
    - _Requirements: 1.4, 6.3, 8.1_

- [x] 7. Implement quotes system
  - [x] 7.1 Create quotes API route
    - Implement GET /api/quotes route to fetch from Supabase
    - Add category filtering and featured flag support
    - Include pagination for large quote collections
    - Add error handling
    - _Requirements: 1.5, 7.2_

  - [x] 7.2 Build quote UI components
    - Create QuoteCard component with decorative quotation marks
    - Add author attribution and category badge
    - Implement fade-in animation on scroll using Framer Motion
    - Build QuotesList component with masonry or grid layout
    - Add share quote functionality
    - _Requirements: 1.5, 9.3_

  - [x] 7.3 Create quotes page
    - Build /quotes page with QuotesList component
    - Fetch quotes from API route
    - Add category filtering
    - Implement SEO metadata
    - Add loading and error states
    - _Requirements: 1.5, 6.3, 8.1_

- [x] 8. Build user feedback system
  - [x] 8.1 Create feedback API route
    - Implement POST /api/feedback route
    - Add input validation for name, email, and experience fields
    - Sanitize user inputs to prevent XSS
    - Insert feedback into Supabase with pending status
    - Return appropriate success/error responses
    - Implement rate limiting to prevent spam
    - _Requirements: 4.1, 4.2, 4.4, 4.5_

  - [x] 8.2 Build feedback form component
    - Create FeedbackForm with controlled inputs
    - Implement real-time validation with error messages
    - Add character count for experience textarea
    - Build related content selector dropdown
    - Add loading state during submission
    - Display success message and clear form on successful submission
    - Show error message with retry option on failure
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.3, 6.4_

  - [x] 8.3 Create feedback submission page
    - Build /feedback page with FeedbackForm component
    - Add introductory text explaining feedback purpose
    - Implement SEO metadata
    - Ensure form is keyboard accessible
    - _Requirements: 4.1, 5.3, 8.1_

  - [ ] 8.4 Write tests for feedback system
    - Test form validation logic
    - Test API route with valid and invalid inputs
    - Test error handling and success states
    - _Requirements: 4.1, 4.2_

- [x] 9. Create homepage and about page
  - [ ] 9.1 Build homepage components
    - Create Hero component with mission statement
    - Implement FeaturedContent component for blog posts, quotes, and videos
    - Build call-to-action buttons for main sections
    - Add Framer Motion animations for page elements
    - _Requirements: 1.1, 9.3_

  - [x] 9.2 Implement homepage
    - Update homepage at / with Hero and featured content
    - Fetch featured blog posts, quotes, and videos
    - Add navigation cards to all main sections
    - Implement SEO metadata with Open Graph tags
    - _Requirements: 1.1, 6.1, 8.1, 8.2_

  - [ ] 9.3 Create about/mission page
    - Build /about page with detailed mission statement
    - Add team information or founder story
    - Include values and approach to healing
    - Implement SEO metadata
    - _Requirements: 1.1, 8.1_

- [x] 10. Implement SEO and metadata
  - [x] 10.1 Create SEO utilities and metadata generation
    - Build metadata generation functions for all page types
    - Implement Open Graph tags for social sharing
    - Add Twitter Card metadata
    - Create structured data (JSON-LD) for blog posts
    - _Requirements: 8.1, 8.3_

  - [x] 10.2 Generate sitemap and robots.txt
    - Create dynamic sitemap.xml with all pages and blog posts
    - Implement robots.txt with proper crawling rules
    - Add canonical URLs for all pages
    - _Requirements: 8.2_

  - [x] 10.3 Optimize semantic HTML and accessibility
    - Ensure proper heading hierarchy on all pages
    - Add ARIA labels for interactive elements
    - Implement skip-to-content link
    - Verify keyboard navigation works throughout site
    - Test with screen reader
    - _Requirements: 5.2, 5.3, 8.4_

- [x] 11. Implement performance optimizations
  - [x] 11.1 Configure image optimization
    - Set up Cloudinary integration for image hosting
    - Use Next.js Image component throughout application
    - Implement responsive images with srcset
    - Add lazy loading for below-fold images
    - _Requirements: 6.5_

  - [x] 11.2 Optimize code splitting and caching
    - Add dynamic imports for heavy components (VideoPlayer, FeedbackForm)
    - Configure Incremental Static Regeneration for quotes and videos
    - Implement client-side caching with SWR for API data
    - Optimize bundle size by analyzing and removing unused dependencies
    - _Requirements: 6.1, 6.2_

  - [x] 11.3 Implement loading states and error boundaries
    - Add loading skeletons for all async content
    - Create ErrorBoundary component for graceful error handling
    - Implement retry logic for failed API calls
    - Ensure all loading states appear within 100ms
    - _Requirements: 6.3, 6.4_

- [x] 12. Add sample content and seed database
  - [x] 12.1 Create sample blog posts
    - Write 3-5 additional sample blog posts in markdown format
    - Add frontmatter with all required fields
    - Include cover images and optional video URLs
    - Vary categories and tags for testing filters
    - _Requirements: 1.2, 7.1_

  - [x] 12.2 Seed database with quotes and videos
    - Create seed script for Supabase
    - Add 10-15 sample quotes across different categories
    - Insert 5-10 sample videos with valid YouTube/Vimeo URLs
    - Mark some items as featured for homepage
    - _Requirements: 1.4, 1.5, 7.2, 7.3_

  - [x] 12.3 Add audio file and attribution
    - Source royalty-free healing music from Pixabay or Incompetech
    - Add audio file to public/audio directory
    - Create attribution text in footer
    - Optimize audio file size for web delivery
    - _Requirements: 3.1_

- [x] 13. Configure deployment and environment setup
  - [x] 13.1 Set up Vercel project
    - Connect GitHub repository to Vercel
    - Configure environment variables in Vercel dashboard
    - Set up production and preview environments
    - Configure build settings and output directory
    - _Requirements: 10.1, 10.2, 10.5_

  - [x] 13.2 Configure custom domain
    - Add radicalhealing.blog domain to Vercel
    - Configure DNS records (A and CNAME)
    - Verify SSL certificate is active
    - Test HTTPS redirect
    - _Requirements: 10.4, 8.5_

  - [x] 13.3 Create deployment documentation
    - Update README with local development setup instructions
    - Document environment variables and their purposes
    - Create deployment guide with step-by-step instructions
    - Add content management instructions for blog posts
    - Document database seeding process
    - _Requirements: 10.5_

- [x] 14. Testing and quality assurance
  - [x] 14.1 Write unit tests for utilities
    - Test form validation functions
    - Test markdown parsing and frontmatter extraction
    - Test date formatting utilities
    - Test audio player hook logic
    - _Requirements: 4.2, 6.1_

  - [x] 14.2 Write component tests
    - Test FeedbackForm submission flow
    - Test BlogFilters interaction
    - Test AudioControls state changes
    - Test error states and loading states
    - _Requirements: 4.1, 4.3, 6.3_

  - [x] 14.3 Run accessibility audit
    - Run axe-core on all pages
    - Test keyboard navigation throughout site
    - Verify color contrast ratios meet WCAG AA
    - Test with screen reader (VoiceOver or NVDA)
    - Fix any identified issues
    - _Requirements: 5.2, 5.3, 5.4, 5.5_

  - [x] 14.4 Run performance audit
    - Run Lighthouse on all pages
    - Verify performance score is 90+
    - Check First Contentful Paint < 1.5s
    - Verify Largest Contentful Paint < 2.5s
    - Optimize any identified bottlenecks
    - _Requirements: 6.1, 6.2_

  - [x] 14.5 Cross-browser and device testing
    - Test on Chrome, Firefox, Safari, and Edge
    - Test on mobile devices (iOS and Android)
    - Verify responsive design at various breakpoints (320px to 2560px)
    - Test audio playback across browsers
    - Fix any browser-specific issues
    - _Requirements: 5.1_
