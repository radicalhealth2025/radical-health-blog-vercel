/**
 * Database types for Supabase tables
 * These types match the schema defined in migrations
 */

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string | null;
  category: string | null;
  duration: number | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserFeedback {
  id: string;
  name: string;
  email: string | null;
  experience: string;
  related_content_type: 'blog' | 'quote' | 'video' | null;
  related_content_id: string | null;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
}

/**
 * Insert types (without auto-generated fields)
 */
export type QuoteInsert = Omit<Quote, 'id' | 'created_at' | 'updated_at'>;
export type VideoInsert = Omit<Video, 'id' | 'created_at' | 'updated_at'>;
export type UserFeedbackInsert = Omit<UserFeedback, 'id' | 'submitted_at' | 'status'>;

/**
 * Update types (all fields optional except id)
 */
export type QuoteUpdate = Partial<Omit<Quote, 'id' | 'created_at' | 'updated_at'>>;
export type VideoUpdate = Partial<Omit<Video, 'id' | 'created_at' | 'updated_at'>>;
export type UserFeedbackUpdate = Partial<Omit<UserFeedback, 'id' | 'submitted_at'>>;

/**
 * Database schema type for type-safe queries
 */
export interface Database {
  public: {
    Tables: {
      quotes: {
        Row: Quote;
        Insert: QuoteInsert;
        Update: QuoteUpdate;
      };
      videos: {
        Row: Video;
        Insert: VideoInsert;
        Update: VideoUpdate;
      };
      user_feedback: {
        Row: UserFeedback;
        Insert: UserFeedbackInsert;
        Update: UserFeedbackUpdate;
      };
    };
  };
}
