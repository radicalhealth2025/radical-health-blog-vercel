import { NextRequest, NextResponse } from 'next/server';
import { getQuotes } from '@/lib/supabase/queries';

// Enable ISR with 60 second revalidation
export const revalidate = 60;

/**
 * GET /api/quotes
 * Fetch quotes with optional filtering and pagination
 * 
 * Query parameters:
 * - category: Filter by category
 * - featured: Filter for featured quotes only (true/false)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 20, max: 100)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract query parameters
    const category = searchParams.get('category') || undefined;
    const featuredParam = searchParams.get('featured');
    const featuredOnly = featuredParam === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);

    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json(
        { error: 'Invalid page number', message: 'Page must be greater than 0' },
        { status: 400 }
      );
    }

    if (limit < 1) {
      return NextResponse.json(
        { error: 'Invalid limit', message: 'Limit must be greater than 0' },
        { status: 400 }
      );
    }

    // Fetch quotes from database
    const { data: allQuotes, error } = await getQuotes(category, featuredOnly);

    if (error) {
      console.error('Error fetching quotes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch quotes', message: error.message },
        { status: 500 }
      );
    }

    if (!allQuotes) {
      return NextResponse.json(
        { error: 'No data returned', message: 'Failed to fetch quotes' },
        { status: 500 }
      );
    }

    // Calculate pagination
    const total = allQuotes.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const quotes = allQuotes.slice(startIndex, endIndex);

    // Return paginated response
    return NextResponse.json({
      quotes,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Unexpected error in quotes API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
