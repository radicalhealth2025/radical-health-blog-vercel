import { supabase } from './client';
import type { Quote, Video, UserFeedback, UserFeedbackInsert } from './types';

/**
 * Query result type with error handling
 */
export interface QueryResult<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Quotes Queries
 */

/**
 * Fetch all quotes, optionally filtered by category
 * @param category - Optional category filter
 * @param featuredOnly - If true, only return featured quotes
 * @returns Array of quotes
 */
export async function getQuotes(
  category?: string,
  featuredOnly: boolean = false
): Promise<QueryResult<Quote[]>> {
  try {
    let query = supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (featuredOnly) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching quotes:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as Quote[], error: null };
  } catch (error) {
    console.error('Unexpected error fetching quotes:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Fetch a single quote by ID
 * @param id - Quote UUID
 * @returns Single quote or null
 */
export async function getQuoteById(id: string): Promise<QueryResult<Quote>> {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching quote:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as Quote, error: null };
  } catch (error) {
    console.error('Unexpected error fetching quote:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Fetch all unique quote categories
 * @returns Array of category strings
 */
export async function getQuoteCategories(): Promise<QueryResult<string[]>> {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('category')
      .not('category', 'is', null);

    if (error) {
      console.error('Error fetching quote categories:', error);
      return { data: null, error: new Error(error.message) };
    }

    // Extract unique categories
    const categories = Array.from(
      new Set(data.map((item) => item.category).filter(Boolean))
    ) as string[];

    return { data: categories, error: null };
  } catch (error) {
    console.error('Unexpected error fetching quote categories:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Videos Queries
 */

/**
 * Fetch all videos, optionally filtered by category
 * @param category - Optional category filter
 * @returns Array of videos
 */
export async function getVideos(category?: string): Promise<QueryResult<Video[]>> {
  try {
    let query = supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching videos:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as Video[], error: null };
  } catch (error) {
    console.error('Unexpected error fetching videos:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Fetch a single video by ID
 * @param id - Video UUID
 * @returns Single video or null
 */
export async function getVideoById(id: string): Promise<QueryResult<Video>> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching video:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as Video, error: null };
  } catch (error) {
    console.error('Unexpected error fetching video:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Fetch all unique video categories
 * @returns Array of category strings
 */
export async function getVideoCategories(): Promise<QueryResult<string[]>> {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('category')
      .not('category', 'is', null);

    if (error) {
      console.error('Error fetching video categories:', error);
      return { data: null, error: new Error(error.message) };
    }

    // Extract unique categories
    const categories = Array.from(
      new Set(data.map((item) => item.category).filter(Boolean))
    ) as string[];

    return { data: categories, error: null };
  } catch (error) {
    console.error('Unexpected error fetching video categories:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * User Feedback Queries
 */

/**
 * Validation for feedback submission
 */
function validateFeedback(feedback: UserFeedbackInsert): string | null {
  // Validate name
  if (!feedback.name || feedback.name.trim().length === 0) {
    return 'Name is required';
  }
  if (feedback.name.length > 255) {
    return 'Name must be less than 255 characters';
  }

  // Validate email if provided
  if (feedback.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(feedback.email)) {
      return 'Invalid email format';
    }
    if (feedback.email.length > 255) {
      return 'Email must be less than 255 characters';
    }
  }

  // Validate experience
  if (!feedback.experience || feedback.experience.trim().length === 0) {
    return 'Experience is required';
  }
  if (feedback.experience.length < 10) {
    return 'Experience must be at least 10 characters';
  }
  if (feedback.experience.length > 5000) {
    return 'Experience must be less than 5000 characters';
  }

  // Validate related content type if provided
  if (feedback.related_content_type) {
    const validTypes = ['blog', 'quote', 'video'];
    if (!validTypes.includes(feedback.related_content_type)) {
      return 'Invalid related content type';
    }
  }

  return null;
}

/**
 * Submit user feedback
 * @param feedback - User feedback data
 * @returns Submitted feedback with ID or error
 */
export async function submitFeedback(
  feedback: UserFeedbackInsert
): Promise<QueryResult<UserFeedback>> {
  try {
    // Validate input
    const validationError = validateFeedback(feedback);
    if (validationError) {
      return { data: null, error: new Error(validationError) };
    }

    // Sanitize inputs
    const sanitizedFeedback = {
      name: feedback.name.trim(),
      email: feedback.email?.trim() || null,
      experience: feedback.experience.trim(),
      related_content_type: feedback.related_content_type || null,
      related_content_id: feedback.related_content_id?.trim() || null,
    };

    const { data, error } = await supabase
      .from('user_feedback')
      .insert(sanitizedFeedback)
      .select()
      .single();

    if (error) {
      console.error('Error submitting feedback:', error);
      return { data: null, error: new Error(error.message) };
    }

    return { data: data as UserFeedback, error: null };
  } catch (error) {
    console.error('Unexpected error submitting feedback:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get feedback statistics (requires service role key)
 * This is a utility function for admin use
 */
export async function getFeedbackStats(): Promise<
  QueryResult<{ total: number; pending: number; approved: number; rejected: number }>
> {
  try {
    const { data, error } = await supabase
      .from('user_feedback')
      .select('status');

    if (error) {
      console.error('Error fetching feedback stats:', error);
      return { data: null, error: new Error(error.message) };
    }

    const stats = {
      total: data.length,
      pending: data.filter((f) => f.status === 'pending').length,
      approved: data.filter((f) => f.status === 'approved').length,
      rejected: data.filter((f) => f.status === 'rejected').length,
    };

    return { data: stats, error: null };
  } catch (error) {
    console.error('Unexpected error fetching feedback stats:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
