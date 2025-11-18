import { NextRequest, NextResponse } from 'next/server';
import { getVideos } from '@/lib/supabase/queries';

// Enable ISR with 60 second revalidation
export const revalidate = 60;

/**
 * GET /api/videos
 * Fetch videos from Supabase, optionally filtered by category
 * Query params:
 *   - category: string (optional) - Filter videos by category
 */
export async function GET(request: NextRequest) {
  try {
    // Extract category from query params
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;

    // Fetch videos from Supabase
    const { data, error } = await getVideos(category);

    if (error) {
      console.error('Error fetching videos:', error);
      return NextResponse.json(
        {
          error: 'Failed to fetch videos',
          message: error.message,
          statusCode: 500,
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          error: 'No videos found',
          message: 'No videos available',
          statusCode: 404,
        },
        { status: 404 }
      );
    }

    // Return videos sorted by creation date (already sorted in query)
    return NextResponse.json(
      {
        videos: data,
        count: data.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in videos API:', error);
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
