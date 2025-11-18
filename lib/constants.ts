// Site Configuration
export const SITE_NAME = "Radical Healing Blog";
export const SITE_DESCRIPTION = "Explore the root causes of suffering and discover lasting transformation";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://radicalhealing.blog";

// Content Categories
export const BLOG_CATEGORIES = [
  "Healing Foundations",
  "Mindfulness",
  "Transformation",
  "Self-Discovery",
  "Emotional Healing",
] as const;

export const QUOTE_CATEGORIES = [
  "Wisdom",
  "Healing",
  "Transformation",
  "Awareness",
  "Compassion",
] as const;

export const VIDEO_CATEGORIES = [
  "Guided Meditations",
  "Healing Practices",
  "Teachings",
  "Testimonials",
] as const;

// Performance Thresholds
export const AUDIO_LOAD_TIMEOUT = 2000; // 2 seconds
export const FILTER_DEBOUNCE_MS = 500; // 500ms
export const INTERACTION_FEEDBACK_MS = 100; // 100ms

// Pagination
export const POSTS_PER_PAGE = 12;
export const QUOTES_PER_PAGE = 20;
export const VIDEOS_PER_PAGE = 12;
