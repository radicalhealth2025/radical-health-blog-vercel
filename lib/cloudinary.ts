/**
 * Cloudinary image optimization utilities
 */

export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
}

/**
 * Generate an optimized Cloudinary URL for an image
 * @param publicId - The Cloudinary public ID or full URL
 * @param options - Image transformation options
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  // If it's already a full URL (not a Cloudinary public ID), return as-is
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId;
  }

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
    return publicId;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity && crop === 'fill') transformations.push(`g_${gravity}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformString = transformations.join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

/**
 * Generate responsive image srcset for Cloudinary images
 * @param publicId - The Cloudinary public ID
 * @param widths - Array of widths for srcset
 * @param options - Base image transformation options
 * @returns srcset string
 */
export function getCloudinarySrcSet(
  publicId: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920],
  options: CloudinaryImageOptions = {}
): string {
  return widths
    .map((width) => {
      const url = getCloudinaryUrl(publicId, { ...options, width });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Check if a URL is a Cloudinary URL
 * @param url - URL to check
 * @returns true if URL is from Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com');
}

/**
 * Extract public ID from a Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if not a valid Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  if (!isCloudinaryUrl(url)) return null;

  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match ? match[1] : null;
}
