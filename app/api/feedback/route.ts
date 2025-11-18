import { NextRequest, NextResponse } from 'next/server';
import { submitFeedback } from '@/lib/supabase/queries';
import type { UserFeedbackInsert } from '@/lib/supabase/types';

/**
 * Rate limiting store (in-memory for simplicity)
 * In production, use Redis or similar
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 submissions per hour per IP

/**
 * Check if request should be rate limited
 */
function checkRateLimit(identifier: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || record.resetTime < now) {
    // No record or expired - create new
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return { allowed: false, resetTime: record.resetTime };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(identifier, record);
  return { allowed: true };
}

/**
 * Sanitize string input to prevent XSS
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
}

/**
 * POST /api/feedback
 * Submit user feedback/testimonial
 * 
 * Body parameters:
 * - name: string (required, max 255 chars)
 * - email: string (optional, must be valid email format, max 255 chars)
 * - experience: string (required, min 10 chars, max 5000 chars)
 * - related_content_type: 'blog' | 'quote' | 'video' (optional)
 * - related_content_id: string (optional)
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitResult.resetTime || Date.now();
      const resetDate = new Date(resetTime);
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Too many submissions. Please try again after ${resetDate.toLocaleTimeString()}.`,
          statusCode: 429,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse request body
    let body: any;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          message: 'Request body must be valid JSON',
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // Extract and sanitize fields
    const { name, email, experience, related_content_type, related_content_id } = body;

    // Basic validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: 'Name is required and must be a string',
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    if (!experience || typeof experience !== 'string') {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: 'Experience is required and must be a string',
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedFeedback: UserFeedbackInsert = {
      name: sanitizeInput(name),
      email: email ? sanitizeInput(email) : null,
      experience: sanitizeInput(experience),
      related_content_type: related_content_type || null,
      related_content_id: related_content_id ? sanitizeInput(related_content_id) : null,
    };

    // Submit feedback (validation happens in submitFeedback function)
    const { data, error } = await submitFeedback(sanitizedFeedback);

    if (error) {
      // Check if it's a validation error
      const isValidationError = error.message.includes('required') || 
                                error.message.includes('Invalid') ||
                                error.message.includes('must be');
      
      return NextResponse.json(
        {
          error: isValidationError ? 'Validation error' : 'Submission failed',
          message: error.message,
          statusCode: isValidationError ? 400 : 500,
        },
        { status: isValidationError ? 400 : 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          error: 'Submission failed',
          message: 'Failed to submit feedback',
          statusCode: 500,
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: 'Feedback submitted successfully',
        data: {
          id: data.id,
          submitted_at: data.submitted_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in feedback API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
