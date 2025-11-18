# Image Optimization Guide

This document describes the image optimization setup for the Radical Healing Blog.

## Overview

The application uses Next.js Image component with Cloudinary integration for optimal image delivery and performance.

## Configuration

### Next.js Image Configuration

The `next.config.ts` file is configured with:

- **Remote Patterns**: Allowed image sources (Cloudinary, Unsplash, YouTube, Vimeo)
- **Formats**: AVIF and WebP for modern browsers with automatic fallback
- **Device Sizes**: Optimized breakpoints for responsive images
- **Image Sizes**: Predefined sizes for common use cases

### Cloudinary Integration

Environment variables required:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Usage

### Using Next.js Image Component

All images in the application use the Next.js `Image` component for automatic optimization:

```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  fill // or width/height
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy" // or "eager" for above-fold images
/>
```

### Using OptimizedImage Component

For Cloudinary-hosted images, use the `OptimizedImage` component:

```tsx
import { OptimizedImage } from '@/components/ui';

<OptimizedImage
  src="cloudinary-public-id" // or full URL
  alt="Descriptive alt text"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  cloudinaryOptions={{
    quality: 'auto',
    format: 'auto'
  }}
/>
```

### Using Cloudinary Utilities

For custom image transformations:

```tsx
import { getCloudinaryUrl, getCloudinarySrcSet } from '@/lib/cloudinary';

// Generate optimized URL
const imageUrl = getCloudinaryUrl('my-image', {
  width: 800,
  height: 600,
  quality: 'auto',
  format: 'auto',
  crop: 'fill',
  gravity: 'auto'
});

// Generate responsive srcset
const srcSet = getCloudinarySrcSet('my-image', [640, 1024, 1920]);
```

## Best Practices

### 1. Lazy Loading

- Use `loading="lazy"` for below-fold images (default behavior)
- Use `loading="eager"` or `priority` for above-fold images (hero images, cover images)

### 2. Sizes Attribute

Always provide the `sizes` attribute to help the browser select the appropriate image:

```tsx
// For full-width images on mobile, half-width on tablet, third-width on desktop
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

// For full-width images up to 1200px max
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
```

### 3. Alt Text

Always provide descriptive alt text for accessibility:

```tsx
// Good
alt="Person meditating in a peaceful garden at sunrise"

// Bad
alt="image1"
alt=""
```

### 4. Image Dimensions

- Use `fill` prop for responsive containers with `position: relative`
- Use explicit `width` and `height` for fixed-size images
- This prevents Cumulative Layout Shift (CLS)

### 5. Priority Images

Mark above-fold images as priority to preload them:

```tsx
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  priority
  fill
/>
```

## Current Implementation

### BlogCard Component
- Uses lazy loading for card images
- Responsive sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
- Fill layout with aspect ratio container

### BlogPost Component
- Cover image uses `priority` (above-fold)
- Responsive sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px`
- Fill layout with fixed height container

### VideoCard Component
- Uses lazy loading (default)
- Responsive sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
- Fill layout with aspect-video container

## Performance Metrics

Target metrics:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

## Cloudinary Features

### Automatic Format Selection
Cloudinary automatically serves:
- AVIF for supported browsers (best compression)
- WebP for modern browsers
- JPEG/PNG for legacy browsers

### Automatic Quality
Using `quality: 'auto'` enables Cloudinary's AI-powered quality optimization.

### Responsive Images
Cloudinary generates multiple sizes automatically based on the `sizes` attribute.

### Lazy Loading
Combined with Next.js lazy loading, images are only loaded when they enter the viewport.

## Troubleshooting

### Images Not Loading

1. Check that the domain is added to `next.config.ts` remote patterns
2. Verify environment variables are set correctly
3. Check browser console for CORS errors

### Poor Performance

1. Verify `sizes` attribute is set correctly
2. Check that lazy loading is enabled for below-fold images
3. Use `priority` only for above-fold images
4. Verify Cloudinary transformations are being applied

### Layout Shift

1. Always specify dimensions or use `fill` with a sized container
2. Use aspect ratio containers for responsive images
3. Avoid changing image dimensions after load

## Future Enhancements

- [ ] Implement blur placeholder for better UX
- [ ] Add automatic image optimization on upload
- [ ] Implement art direction with `<picture>` element
- [ ] Add image CDN caching headers
- [ ] Implement progressive image loading
