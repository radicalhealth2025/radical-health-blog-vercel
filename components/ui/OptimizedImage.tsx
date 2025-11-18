import React from 'react';
import Image, { ImageProps } from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  cloudinaryOptions?: {
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  };
}

/**
 * Optimized Image component that automatically uses Cloudinary transformations
 * when available, with fallback to Next.js Image optimization
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  cloudinaryOptions,
  loading,
  priority,
  ...props
}) => {
  // If src is a Cloudinary public ID (not a full URL), optimize it
  const optimizedSrc = src.startsWith('http')
    ? src
    : getCloudinaryUrl(src, cloudinaryOptions);

  // Don't set loading if priority is true (they conflict)
  const loadingProp = priority ? undefined : (loading || 'lazy');

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      loading={loadingProp}
      priority={priority}
      {...props}
    />
  );
};

OptimizedImage.displayName = 'OptimizedImage';
