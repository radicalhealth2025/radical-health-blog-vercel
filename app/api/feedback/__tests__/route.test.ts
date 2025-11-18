import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';

// Mock the submitFeedback function
vi.mock('@/lib/supabase/queries', () => ({
  submitFeedback: vi.fn(),
}));

import { submitFeedback } from '@/lib/supabase/queries';

describe('POST /api/feedback', () => {
  let uniqueIpCounter = 0;

  beforeEach(() => {
    vi.clearAllMocks();
    uniqueIpCounter++;
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  const createMockRequest = (body: any, headers: Record<string, string> = {}): NextRequest => {
    // Use unique IP for each test to avoid rate limiting conflicts
    const defaultIp = `127.0.0.${uniqueIpCounter}`;
    return {
      json: async () => body,
      headers: new Headers({
        'x-forwarded-for': defaultIp,
        ...headers,
      }),
    } as NextRequest;
  };

  describe('Valid Inputs', () => {
    it('should accept valid feedback with required fields only', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockResolvedValue({
        data: {
          id: '123',
          name: 'John Doe',
          email: null,
          experience: 'Great experience',
          related_content_type: null,
          related_content_id: null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
        error: null,
      });

      const request = createMockRequest({
        name: 'John Doe',
        experience: 'Great experience with healing content',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toBe('Feedback submitted successfully');
      expect(mockSubmitFeedback).toHaveBeenCalledWith({
        name: 'John Doe',
        email: null,
        experience: 'Great experience with healing content',
        related_content_type: null,
        related_content_id: null,
      });
    });

    it('should accept valid feedback with all optional fields', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockResolvedValue({
        data: {
          id: '456',
          name: 'Jane Smith',
          email: 'jane@example.com',
          experience: 'Amazing transformation',
          related_content_type: 'blog',
          related_content_id: 'post-123',
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
        error: null,
      });

      const request = createMockRequest({
        name: 'Jane Smith',
        email: 'jane@example.com',
        experience: 'Amazing transformation through your content',
        related_content_type: 'blog',
        related_content_id: 'post-123',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toBe('Feedback submitted successfully');
      expect(mockSubmitFeedback).toHaveBeenCalledWith({
        name: 'Jane Smith',
        email: 'jane@example.com',
        experience: 'Amazing transformation through your content',
        related_content_type: 'blog',
        related_content_id: 'post-123',
      });
    });

    it('should sanitize input to prevent XSS', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockResolvedValue({
        data: {
          id: '789',
          name: 'Test User',
          email: null,
          experience: 'Safe content',
          related_content_type: null,
          related_content_id: null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
        error: null,
      });

      const request = createMockRequest({
        name: '<script>alert("xss")</script>Test User',
        experience: 'Safe content with javascript:void(0) and onclick=alert(1)',
      });

      const response = await POST(request);

      expect(response.status).toBe(201);
      // Verify that dangerous characters are removed
      const call = mockSubmitFeedback.mock.calls[0][0];
      expect(call.name).not.toContain('<');
      expect(call.name).not.toContain('>');
      expect(call.experience).not.toContain('javascript:');
      expect(call.experience).not.toContain('onclick=');
    });
  });

  describe('Invalid Inputs', () => {
    it('should reject request with missing name', async () => {
      const request = createMockRequest({
        experience: 'Great experience',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(data.message).toContain('Name is required');
    });

    it('should reject request with missing experience', async () => {
      const request = createMockRequest({
        name: 'John Doe',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(data.message).toContain('Experience is required');
    });

    it('should reject request with invalid JSON', async () => {
      const request = {
        json: async () => {
          throw new Error('Invalid JSON');
        },
        headers: new Headers({ 'x-forwarded-for': '127.0.0.1' }),
      } as NextRequest;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request');
      expect(data.message).toBe('Request body must be valid JSON');
    });

    it('should reject request with non-string name', async () => {
      const request = createMockRequest({
        name: 123,
        experience: 'Great experience',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(data.message).toContain('Name is required and must be a string');
    });

    it('should reject request with non-string experience', async () => {
      const request = createMockRequest({
        name: 'John Doe',
        experience: 123,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(data.message).toContain('Experience is required and must be a string');
    });
  });

  describe('Error Handling', () => {
    it('should handle database validation errors', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockResolvedValue({
        data: null,
        error: { message: 'Experience must be at least 10 characters' },
      });

      const request = createMockRequest({
        name: 'John Doe',
        experience: 'Short',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation error');
      expect(data.message).toContain('Experience must be at least 10 characters');
    });

    it('should handle database errors', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockResolvedValue({
        data: null,
        error: { message: 'Database connection failed' },
      });

      const request = createMockRequest({
        name: 'John Doe',
        experience: 'Great experience with healing',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Submission failed');
    });

    it('should handle unexpected errors', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockRejectedValue(new Error('Unexpected error'));

      const request = createMockRequest({
        name: 'John Doe',
        experience: 'Great experience',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
    });
  });

  describe('Rate Limiting', () => {
    it('should allow requests within rate limit', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockResolvedValue({
        data: {
          id: '123',
          name: 'John Doe',
          email: null,
          experience: 'Great',
          related_content_type: null,
          related_content_id: null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
        error: null,
      });

      // Make 5 requests (within limit)
      for (let i = 0; i < 5; i++) {
        const request = createMockRequest(
          {
            name: `User ${i}`,
            experience: `Experience ${i} with healing content`,
          },
          { 'x-forwarded-for': '192.168.1.1' }
        );

        const response = await POST(request);
        expect(response.status).toBe(201);
      }
    });

    it('should block requests exceeding rate limit', async () => {
      const mockSubmitFeedback = vi.mocked(submitFeedback);
      mockSubmitFeedback.mockResolvedValue({
        data: {
          id: '123',
          name: 'John Doe',
          email: null,
          experience: 'Great',
          related_content_type: null,
          related_content_id: null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
        error: null,
      });

      // Make 6 requests (exceeding limit of 5)
      for (let i = 0; i < 6; i++) {
        const request = createMockRequest(
          {
            name: `User ${i}`,
            experience: `Experience ${i} with healing content`,
          },
          { 'x-forwarded-for': '192.168.1.2' }
        );

        const response = await POST(request);
        
        if (i < 5) {
          expect(response.status).toBe(201);
        } else {
          expect(response.status).toBe(429);
          const data = await response.json();
          expect(data.error).toBe('Rate limit exceeded');
        }
      }
    });
  });
});
