import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getCloudinaryUrl,
  getCloudinarySrcSet,
  isCloudinaryUrl,
  extractPublicId,
} from '../cloudinary';

describe('Cloudinary Utilities', () => {
  const originalEnv = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = originalEnv;
  });

  describe('getCloudinaryUrl', () => {
    it('should return full URLs unchanged', () => {
      const url = 'https://example.com/image.jpg';
      expect(getCloudinaryUrl(url)).toBe(url);
    });

    it('should generate Cloudinary URL with default options', () => {
      const publicId = 'sample-image';
      const url = getCloudinaryUrl(publicId);
      expect(url).toContain('res.cloudinary.com/test-cloud');
      expect(url).toContain('q_auto');
      expect(url).toContain('f_auto');
      expect(url).toContain('c_fill');
    });

    it('should generate Cloudinary URL with custom width and height', () => {
      const publicId = 'sample-image';
      const url = getCloudinaryUrl(publicId, { width: 800, height: 600 });
      expect(url).toContain('w_800');
      expect(url).toContain('h_600');
    });

    it('should generate Cloudinary URL with custom quality', () => {
      const publicId = 'sample-image';
      const url = getCloudinaryUrl(publicId, { quality: 80 });
      expect(url).toContain('q_80');
    });

    it('should generate Cloudinary URL with custom format', () => {
      const publicId = 'sample-image';
      const url = getCloudinaryUrl(publicId, { format: 'webp' });
      expect(url).toContain('f_webp');
    });
  });

  describe('getCloudinarySrcSet', () => {
    it('should generate srcset with default widths', () => {
      const publicId = 'sample-image';
      const srcSet = getCloudinarySrcSet(publicId);
      expect(srcSet).toContain('640w');
      expect(srcSet).toContain('750w');
      expect(srcSet).toContain('1920w');
    });

    it('should generate srcset with custom widths', () => {
      const publicId = 'sample-image';
      const srcSet = getCloudinarySrcSet(publicId, [400, 800, 1200]);
      expect(srcSet).toContain('400w');
      expect(srcSet).toContain('800w');
      expect(srcSet).toContain('1200w');
      expect(srcSet).not.toContain('640w');
    });
  });

  describe('isCloudinaryUrl', () => {
    it('should return true for Cloudinary URLs', () => {
      const url = 'https://res.cloudinary.com/test-cloud/image/upload/sample.jpg';
      expect(isCloudinaryUrl(url)).toBe(true);
    });

    it('should return false for non-Cloudinary URLs', () => {
      const url = 'https://example.com/image.jpg';
      expect(isCloudinaryUrl(url)).toBe(false);
    });
  });

  describe('extractPublicId', () => {
    it('should extract public ID from Cloudinary URL', () => {
      const url = 'https://res.cloudinary.com/test-cloud/image/upload/v1234567890/sample-image.jpg';
      const publicId = extractPublicId(url);
      expect(publicId).toBe('sample-image');
    });

    it('should return null for non-Cloudinary URLs', () => {
      const url = 'https://example.com/image.jpg';
      const publicId = extractPublicId(url);
      expect(publicId).toBeNull();
    });
  });
});
