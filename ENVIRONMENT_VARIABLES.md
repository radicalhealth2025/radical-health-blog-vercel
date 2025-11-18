# Environment Variables Guide

This guide explains all environment variables used in the Radical Healing Blog application.

## Overview

Environment variables are used to configure the application for different environments (development, staging, production) without hardcoding sensitive information in the codebase.

## File Locations

- **Local Development**: `.env.local` (not committed to git)
- **Template**: `.env.example` (committed to git, no sensitive values)
- **Production**: Set in Vercel dashboard under Settings → Environment Variables

## Required Variables

### Supabase Configuration

#### `NEXT_PUBLIC_SUPABASE_URL`

- **Description**: Your Supabase project URL
- **Required**: Yes
- **Exposed to Browser**: Yes (prefixed with `NEXT_PUBLIC_`)
- **Example**: `https://abcdefghijklmnop.supabase.co`
- **Where to Find**:
  1. Log in to Supabase dashboard
  2. Select your project
  3. Go to Settings → API
  4. Copy "Project URL"

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **Description**: Supabase anonymous/public API key
- **Required**: Yes
- **Exposed to Browser**: Yes (prefixed with `NEXT_PUBLIC_`)
- **Security**: Safe to expose - has limited permissions via Row Level Security
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Where to Find**:
  1. Log in to Supabase dashboard
  2. Select your project
  3. Go to Settings → API
  4. Copy "anon" key under "Project API keys"

#### `SUPABASE_SERVICE_ROLE_KEY`

- **Description**: Supabase service role key (bypasses Row Level Security)
- **Required**: Yes (for seeding and admin operations)
- **Exposed to Browser**: No (server-side only)
- **Security**: ⚠️ KEEP SECRET - Has full database access
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Where to Find**:
  1. Log in to Supabase dashboard
  2. Select your project
  3. Go to Settings → API
  4. Copy "service_role" key under "Project API keys"
- **Usage**: Only used in server-side code and seed scripts

### Site Configuration

#### `NEXT_PUBLIC_SITE_URL`

- **Description**: The full URL of your deployed site
- **Required**: Yes
- **Exposed to Browser**: Yes
- **Development**: `http://localhost:3000`
- **Production**: `https://radicalhealing.blog`
- **Usage**: Used for:
  - SEO metadata (canonical URLs, Open Graph)
  - Sitemap generation
  - Absolute URLs in emails/notifications

## Optional Variables

### Cloudinary Configuration

These variables are optional. If not set, the application will work but without Cloudinary image optimization.

#### `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

- **Description**: Your Cloudinary cloud name
- **Required**: No
- **Exposed to Browser**: Yes
- **Example**: `your-cloud-name`
- **Where to Find**:
  1. Log in to Cloudinary dashboard
  2. Copy "Cloud name" from the dashboard home

#### `CLOUDINARY_API_KEY`

- **Description**: Cloudinary API key
- **Required**: No (only if using server-side Cloudinary features)
- **Exposed to Browser**: No
- **Example**: `123456789012345`
- **Where to Find**:
  1. Log in to Cloudinary dashboard
  2. Go to Settings → Access Keys
  3. Copy "API Key"

#### `CLOUDINARY_API_SECRET`

- **Description**: Cloudinary API secret
- **Required**: No (only if using server-side Cloudinary features)
- **Exposed to Browser**: No
- **Security**: ⚠️ KEEP SECRET
- **Example**: `abcdefghijklmnopqrstuvwxyz123456`
- **Where to Find**:
  1. Log in to Cloudinary dashboard
  2. Go to Settings → Access Keys
  3. Copy "API Secret"

## Setting Up Environment Variables

### Local Development

1. **Copy the template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your actual values:
   ```bash
   nano .env.local
   # or
   code .env.local
   ```

3. **Fill in the values** (see "Where to Find" sections above)

4. **Restart the development server**:
   ```bash
   npm run dev
   ```

### Production (Vercel)

1. **Navigate to your project** in Vercel dashboard

2. **Go to Settings → Environment Variables**

3. **Add each variable**:
   - Click "Add New"
   - Enter the **Key** (variable name)
   - Enter the **Value** (from your Supabase/Cloudinary dashboard)
   - Select environments:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click "Save"

4. **Redeploy** after adding variables:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Environment-Specific Values

You can set different values for different environments:

| Environment | Description | When Used |
|-------------|-------------|-----------|
| Production | Live site | Deployments from `main` branch |
| Preview | Staging/testing | Pull request deployments |
| Development | Local development | When running `vercel dev` |

**Example**:
- Production `NEXT_PUBLIC_SITE_URL`: `https://radicalhealing.blog`
- Preview `NEXT_PUBLIC_SITE_URL`: `https://preview.radicalhealing.blog`
- Development `NEXT_PUBLIC_SITE_URL`: `http://localhost:3000`

## Security Best Practices

### DO ✅

- **Keep `.env.local` out of git**: Already in `.gitignore`
- **Use `NEXT_PUBLIC_` prefix** for client-side variables only
- **Rotate keys regularly**: Especially service role keys
- **Use different keys** for development and production
- **Store secrets in Vercel**: Never hardcode in code
- **Limit service role key usage**: Only use when necessary

### DON'T ❌

- **Don't commit `.env.local`** to git
- **Don't expose service role key** to the browser
- **Don't share keys** in public channels (Slack, Discord, etc.)
- **Don't use production keys** in development
- **Don't hardcode secrets** in code
- **Don't prefix sensitive keys** with `NEXT_PUBLIC_`

## Variable Naming Convention

Next.js has specific rules for environment variables:

### Client-Side Variables

- **Prefix**: `NEXT_PUBLIC_`
- **Exposed**: Yes, bundled into JavaScript
- **Usage**: Can be used in any component
- **Example**: `NEXT_PUBLIC_SUPABASE_URL`

```typescript
// ✅ Works in client components
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
```

### Server-Side Variables

- **Prefix**: None
- **Exposed**: No, only available on server
- **Usage**: Only in API routes, server components, and server-side code
- **Example**: `SUPABASE_SERVICE_ROLE_KEY`

```typescript
// ✅ Works in API routes and server components
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ❌ Returns undefined in client components
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
```

## Verifying Environment Variables

### In Development

Check if variables are loaded:

```typescript
// In a server component or API route
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Service Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
```

### In Production

1. **Check Vercel dashboard**:
   - Go to Settings → Environment Variables
   - Verify all required variables are set

2. **Check deployment logs**:
   - Go to Deployments tab
   - Click on a deployment
   - Check build logs for any missing variable warnings

3. **Test functionality**:
   - Visit your site
   - Test features that depend on environment variables
   - Check browser console for errors

## Troubleshooting

### Variable Not Found

**Problem**: `process.env.MY_VARIABLE` returns `undefined`

**Solutions**:
1. Check variable name spelling
2. Restart development server after adding variables
3. For client-side access, ensure variable has `NEXT_PUBLIC_` prefix
4. Verify variable is set in `.env.local` (development) or Vercel (production)

### Variable Not Updating

**Problem**: Changed variable value but still seeing old value

**Solutions**:
1. **Development**: Restart dev server (`npm run dev`)
2. **Production**: Redeploy in Vercel dashboard
3. Clear browser cache
4. Check you're editing the correct environment (Production vs Preview)

### Service Role Key Exposed

**Problem**: Accidentally exposed service role key to client

**Solutions**:
1. **Immediately rotate the key** in Supabase dashboard:
   - Go to Settings → API
   - Click "Reset" next to service_role key
2. Update the key in Vercel environment variables
3. Update the key in `.env.local`
4. Redeploy the application
5. Review code to ensure key is only used server-side

### Supabase Connection Fails

**Problem**: Cannot connect to Supabase

**Solutions**:
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
3. Check Supabase project is active (not paused)
4. Test connection in Supabase dashboard
5. Check for typos in environment variable names

## Example Configuration

### `.env.local` (Development)

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjM0NTY3OCwiZXhwIjoxOTI3OTIxNjc4fQ.abcdefghijklmnopqrstuvwxyz123456
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjEyMzQ1Njc4LCJleHAiOjE5Mjc5MjE2Nzh9.abcdefghijklmnopqrstuvwxyz123456

# Cloudinary Configuration (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### `.env.example` (Template)

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://radicalhealing.blog
```

## Additional Resources

- [Next.js Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase API Documentation](https://supabase.com/docs/guides/api)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Checklist

Before deploying, ensure:

- [ ] All required variables are set in Vercel
- [ ] Service role key is not exposed to client
- [ ] Production uses different keys than development
- [ ] `NEXT_PUBLIC_SITE_URL` points to production domain
- [ ] All variables are set for Production, Preview, and Development environments
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` is up to date with all required variables
- [ ] Sensitive keys are rotated regularly
