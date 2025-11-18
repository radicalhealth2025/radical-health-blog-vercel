export { supabase, createServerClient, testConnection } from './client';
export type {
  Quote,
  Video,
  UserFeedback,
  QuoteInsert,
  VideoInsert,
  UserFeedbackInsert,
  QuoteUpdate,
  VideoUpdate,
  UserFeedbackUpdate,
  Database,
} from './types';
export {
  getQuotes,
  getQuoteById,
  getQuoteCategories,
  getVideos,
  getVideoById,
  getVideoCategories,
  submitFeedback,
  getFeedbackStats,
} from './queries';
export type { QueryResult } from './queries';
