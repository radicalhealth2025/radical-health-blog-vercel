# Deployment Guide

This guide provides step-by-step instructions for deploying the Radical Healing Blog to Vercel.

## Prerequisites

- GitHub account with repository access
- Vercel account (sign up at https://vercel.com)
- Supabase project set up with database migrations applied
- Cloudinary account (optional, for image optimization)
- Domain name (optional, for custom domain setup)

## Step 1: Connect GitHub Repository to Vercel

1. **Log in to Vercel**
   - Go to https://vercel.com and sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `radical-healing-blog`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `radical-healing-blog` (if in monorepo) or `.` (if standalone)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

## Step 2: Configure Environment Variables

In the Vercel project settings, add the following environment variables:

### Required Environment Variables

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_SITE_URL` | Your production site URL | `https://radicalhealing.blog` |

### Optional Environment Variables (for Cloudinary)

| Variable Name | Description | Example Value |
|--------------|-------------|---------------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz` |

### How to Add Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. For each variable:
   - Enter the **Key** (variable name)
   - Enter the **Value** (from your Supabase/Cloudinary dashboard)
   - Select environments: **Production**, **Preview**, and **Development**
   - Click "Save"

### Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### Getting Cloudinary Credentials (Optional)

1. Go to your Cloudinary dashboard
2. Copy the following from the dashboard:
   - **Cloud Name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

## Step 3: Deploy to Production

1. **Initial Deployment**
   - After configuring environment variables, click "Deploy"
   - Vercel will build and deploy your application
   - Wait for the deployment to complete (usually 2-5 minutes)

2. **Verify Deployment**
   - Once deployed, Vercel will provide a URL: `https://your-project.vercel.app`
   - Click the URL to visit your deployed site
   - Test key functionality:
     - Homepage loads correctly
     - Blog posts are visible
     - Audio player works
     - Feedback form submits successfully

3. **Set Up Preview Environments**
   - Vercel automatically creates preview deployments for pull requests
   - Each PR will get a unique preview URL
   - Preview deployments use the same environment variables as production

## Step 4: Configure Custom Domain (Optional)

If you have a custom domain (e.g., `radicalhealing.blog`):

1. **Add Domain in Vercel**
   - Go to your project → "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain: `radicalhealing.blog`
   - Click "Add"

2. **Configure DNS Records**
   
   Vercel will provide DNS configuration instructions. Typically:

   **For apex domain (radicalhealing.blog):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel's IP)

   **For www subdomain (www.radicalhealing.blog):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Update DNS at Your Domain Registrar**
   - Log in to your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare)
   - Navigate to DNS settings
   - Add/update the A and CNAME records as specified above
   - Save changes (DNS propagation can take 24-48 hours)

4. **Verify SSL Certificate**
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - Once DNS propagates, visit `https://radicalhealing.blog`
   - Verify the padlock icon appears in the browser
   - Test HTTPS redirect: visit `http://radicalhealing.blog` and ensure it redirects to HTTPS

5. **Update Environment Variables**
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain
   - Redeploy the application for changes to take effect

## Step 5: Post-Deployment Tasks

1. **Seed Database**
   - If you haven't already, run the database seed script:
   ```bash
   npm run seed
   ```
   - This populates quotes and videos in Supabase

2. **Test All Features**
   - Browse blog posts
   - Filter by categories and tags
   - Play audio
   - Watch videos
   - Submit feedback form
   - Test on mobile devices

3. **Set Up Monitoring (Optional)**
   - Enable Vercel Analytics in project settings
   - Set up error tracking (e.g., Sentry)
   - Configure uptime monitoring

4. **Configure Redirects (if needed)**
   - Add redirects in `next.config.ts` if migrating from another site
   - Example:
   ```typescript
   async redirects() {
     return [
       {
         source: '/old-path',
         destination: '/new-path',
         permanent: true,
       },
     ]
   }
   ```

## Continuous Deployment

Vercel automatically deploys your application when you push to GitHub:

- **Production Deployments**: Triggered by pushes to the `main` branch
- **Preview Deployments**: Triggered by pushes to any other branch or pull requests
- **Rollback**: You can rollback to any previous deployment from the Vercel dashboard

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set correctly
3. Test build locally: `npm run build`
4. Check for TypeScript errors: `npx tsc --noEmit`

### Environment Variables Not Working

1. Ensure variables are set for the correct environment (Production/Preview/Development)
2. Redeploy after adding/updating environment variables
3. For client-side variables, ensure they start with `NEXT_PUBLIC_`

### Database Connection Issues

1. Verify Supabase credentials are correct
2. Check Supabase project is active and not paused
3. Verify Row Level Security (RLS) policies allow public access where needed
4. Check Supabase logs for connection errors

### Custom Domain Not Working

1. Verify DNS records are configured correctly
2. Wait for DNS propagation (up to 48 hours)
3. Use DNS checker tool: https://dnschecker.org
4. Check Vercel domain settings for any errors

### Images Not Loading

1. Verify Cloudinary credentials (if using Cloudinary)
2. Check `next.config.ts` has correct image domains configured
3. Verify images exist in the specified locations
4. Check browser console for CORS errors

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs

## Security Checklist

- [ ] All environment variables are set in Vercel (not in code)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is never exposed to client-side code
- [ ] HTTPS is enabled and HTTP redirects to HTTPS
- [ ] Supabase Row Level Security (RLS) policies are configured
- [ ] Rate limiting is enabled on feedback API endpoint
- [ ] Content Security Policy headers are configured (if needed)

## Performance Checklist

- [ ] Lighthouse score is 90+ for all pages
- [ ] Images are optimized and lazy-loaded
- [ ] Audio files are compressed for web delivery
- [ ] Database queries are optimized with proper indexes
- [ ] Caching is configured for static assets
- [ ] CDN is enabled (automatic with Vercel)
