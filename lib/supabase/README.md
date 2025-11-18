# Supabase Integration

This directory contains the Supabase client configuration, database types, and query utilities for the Radical Healing Blog.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (takes ~2 minutes)
3. Note your project URL and API keys from the project settings

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Apply Database Migrations

Apply the schema migration to create the database tables:

**Option A: Using Supabase Dashboard (Easiest)**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `../../supabase/migrations/001_initial_schema.sql`
4. Paste and run the SQL

**Option B: Using Supabase CLI**
```bash
# Install CLI
npm install -g supabase

# Link project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 4. Verify Connection

You can test the connection by importing and calling the `testConnection` function:

```typescript
import { testConnection } from '@/lib/supabase';

const isConnected = await testConnection();
console.log('Supabase connected:', isConnected);
```

## File Structure

- `client.ts` - Supabase client initialization and connection utilities
- `types.ts` - TypeScript types for database tables
- `queries.ts` - Database query functions with validation
- `index.ts` - Public exports

## Usage Examples

### Fetching Quotes

```typescript
import { getQuotes, getQuoteById } from '@/lib/supabase';

// Get all quotes
const { data: quotes, error } = await getQuotes();

// Get featured quotes only
const { data: featured, error } = await getQuotes(undefined, true);

// Get quotes by category
const { data: categoryQuotes, error } = await getQuotes('Mindfulness');

// Get single quote
const { data: quote, error } = await getQuoteById('uuid-here');
```

### Fetching Videos

```typescript
import { getVideos, getVideoById } from '@/lib/supabase';

// Get all videos
const { data: videos, error } = await getVideos();

// Get videos by category
const { data: categoryVideos, error } = await getVideos('Meditation');

// Get single video
const { data: video, error } = await getVideoById('uuid-here');
```

### Submitting Feedback

```typescript
import { submitFeedback } from '@/lib/supabase';

const { data, error } = await submitFeedback({
  name: 'John Doe',
  email: 'john@example.com', // optional
  experience: 'This content has been transformative...',
  related_content_type: 'blog', // optional: 'blog', 'quote', or 'video'
  related_content_id: 'post-slug-or-uuid', // optional
});

if (error) {
  console.error('Failed to submit feedback:', error.message);
} else {
  console.log('Feedback submitted successfully:', data.id);
}
```

## Error Handling

All query functions return a `QueryResult<T>` object with the following structure:

```typescript
interface QueryResult<T> {
  data: T | null;
  error: Error | null;
}
```

Always check for errors before using the data:

```typescript
const { data, error } = await getQuotes();

if (error) {
  // Handle error
  console.error('Error:', error.message);
  return;
}

// Use data safely
console.log('Quotes:', data);
```

## Row Level Security (RLS)

The database has Row Level Security enabled:

- **quotes** and **videos**: Public read access (anyone can SELECT)
- **user_feedback**: Public insert access (anyone can INSERT), but no read access

Admin operations (INSERT/UPDATE/DELETE on quotes/videos, SELECT/UPDATE on feedback) require the service role key, which should only be used in server-side code.

## Type Safety

All database operations are fully typed. Import types as needed:

```typescript
import type { Quote, Video, UserFeedback, UserFeedbackInsert } from '@/lib/supabase';
```

## Validation

The `submitFeedback` function includes built-in validation:
- Name: Required, max 255 characters
- Email: Optional, must be valid format if provided, max 255 characters
- Experience: Required, min 10 characters, max 5000 characters
- Related content type: Must be 'blog', 'quote', or 'video' if provided

Validation errors are returned in the `error` field of the result.
