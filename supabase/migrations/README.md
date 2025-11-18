# Database Migrations

This directory contains SQL migration files for the Radical Healing Blog database.

## Applying Migrations

### Option 1: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Apply migrations:
   ```bash
   supabase db push
   ```

### Option 2: Manual Application via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `001_initial_schema.sql`
4. Paste and run the SQL

### Option 3: Using the Supabase Client

You can also run the migration programmatically, but this is not recommended for production.

## Migration Files

- `001_initial_schema.sql` - Initial database schema with quotes, videos, and user_feedback tables

## Schema Overview

### Tables

1. **quotes** - Curated healing quotes
   - Columns: id, text, author, category, featured, created_at, updated_at
   - Indexes: category, featured, created_at
   - RLS: Public read access

2. **videos** - Healing video content
   - Columns: id, title, url, thumbnail_url, category, duration, description, created_at, updated_at
   - Indexes: category, created_at
   - RLS: Public read access

3. **user_feedback** - User testimonials and experiences
   - Columns: id, name, email, experience, related_content_type, related_content_id, status, submitted_at
   - Indexes: status, submitted_at
   - RLS: Public insert access only

### Row Level Security (RLS)

All tables have RLS enabled:
- **quotes** and **videos**: Public can read (SELECT)
- **user_feedback**: Public can insert (INSERT), but cannot read
- Admin operations require service role key

## Seeding the Database

After applying migrations, you can populate the database with sample data using the seed script.

### Prerequisites

1. Install tsx for running TypeScript files:
   ```bash
   npm install -D tsx
   ```

2. Ensure you have the following environment variables set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (found in Supabase dashboard under Settings > API)

### Running the Seed Script

From the project root directory:

```bash
npx tsx supabase/seed.ts
```

This will populate your database with:
- 15 curated healing quotes across various categories
- 8 healing and mindfulness videos with real YouTube URLs
- Some items marked as featured for homepage display

### Seed Data Includes

**Quote Categories:**
- Healing
- Trauma
- Self-Acceptance
- Self-Love
- Mindfulness
- Self-Compassion
- Resilience
- Acceptance
- Nervous System

**Video Categories:**
- Somatic Healing
- Meditation
- Trauma Education
- Self-Compassion
- Breathwork
- Movement
- Mindfulness

### Re-seeding

If you need to re-seed the database:

1. Clear existing data (via Supabase dashboard or SQL):
   ```sql
   DELETE FROM quotes;
   DELETE FROM videos;
   ```

2. Run the seed script again:
   ```bash
   npx tsx supabase/seed.ts
   ```

## Troubleshooting

### Migration Fails

**Error: "extension uuid-ossp does not exist"**
- Solution: The migration script includes `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"` which should handle this automatically
- If it still fails, run manually in SQL Editor: `CREATE EXTENSION "uuid-ossp";`

**Error: "permission denied"**
- Solution: Ensure you're using the service role key or have proper permissions
- Check that you're connected to the correct Supabase project

### Seed Script Fails

**Error: "Cannot find module '@supabase/supabase-js'"**
- Solution: Install dependencies: `npm install`

**Error: "Invalid API key"**
- Solution: Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly in `.env.local`
- Verify the key is the service role key, not the anon key

**Error: "Row Level Security policy violation"**
- Solution: The seed script should use the service role key which bypasses RLS
- Verify you're using `SUPABASE_SERVICE_ROLE_KEY` and not `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Verifying Data

After seeding, verify data was inserted:

```sql
-- Check quotes
SELECT COUNT(*) FROM quotes;
SELECT * FROM quotes LIMIT 5;

-- Check videos
SELECT COUNT(*) FROM videos;
SELECT * FROM videos LIMIT 5;

-- Check featured items
SELECT * FROM quotes WHERE featured = true;
SELECT * FROM videos WHERE featured = true;
```

## Backup and Restore

### Creating a Backup

Via Supabase Dashboard:
1. Go to Database → Backups
2. Click "Create backup"
3. Wait for backup to complete

Via SQL:
```bash
# Export specific tables
pg_dump -h db.your-project.supabase.co -U postgres -t quotes -t videos > backup.sql
```

### Restoring from Backup

Via Supabase Dashboard:
1. Go to Database → Backups
2. Select backup
3. Click "Restore"

Via SQL:
```bash
psql -h db.your-project.supabase.co -U postgres < backup.sql
```

## Notes

- UUID generation is handled automatically via `uuid_generate_v4()`
- Timestamps are automatically managed via triggers
- The `updated_at` column is automatically updated on row modifications
- The seed script uses the service role key to bypass RLS policies
- All tables have RLS enabled for security
- Public users can only read quotes/videos and insert feedback
- Admin operations require service role key or authenticated admin user
