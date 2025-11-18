import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeedbackForm } from '../FeedbackForm';

// Mock fetch
global.fetch = vi.fn();

describe('FeedbackForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Validation', () => {
    it('should show error when name is empty', async () => {
      const user = userEvent.setup();
      render(<FeedbackForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const submitButton = screen.getByRole('button', { name: /submit feedback/i });

      await user.click(nameInput);
      await user.tab(); // Blur the input

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when experience is empty', async () => {
      const user = userEvent.setup();
      render(<FeedbackForm />);

      const submitButton = screen.getByRole('button', { name: /submit feedback/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please share your experience/i)).toBeInTheDocument();
      });
    });

    it('should show error when experience is too short', async () => {
      const user = userEvent.setup();
      render(<FeedbackForm />);

      const experienceInput = screen.getByLabelText(/your experience/i);
      await user.type(experienceInput, 'Short');

      const submitButton = screen.getByRole('button', { name: /submit feedback/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/experience must be at least 10 characters/i)).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      const user = userEvent.setup();
      render(<FeedbackForm />);

      const emailInput = screen.getByLabelText(/email \(optional\)/i);
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should not show error for valid email', async () => {
      const user = userEvent.setup();
      render(<FeedbackForm />);

      const emailInput = screen.getByLabelText(/email \(optional\)/i);
      await user.type(emailInput, 'test@example.com');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
      });
    });

    it('should not show error when email is empty (optional field)', async () => {
      const user = userEvent.setup();
      render(<FeedbackForm />);

      const emailInput = screen.getByLabelText(/email \(optional\)/i);
      await user.click(emailInput);
      await user.tab();

      expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Success', data: { id: '123', submitted_at: new Date().toISOString() } }),
      });
      global.fetch = mockFetch;

      render(<FeedbackForm />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/your experience/i), 'This is a great healing experience that helped me a lot.');

      const submitButton = screen.getByRole('button', { name: /submit feedback/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            experience: 'This is a great healing experience that helped me a lot.',
          }),
        });
      });

      await waitFor(() => {
        expect(screen.getByText(/thank you for sharing your experience/i)).toBeInTheDocument();
      });
    });

    it('should submit form with optional fields', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Success', data: { id: '123', submitted_at: new Date().toISOString() } }),
      });
      global.fetch = mockFetch;

      render(<FeedbackForm />);

      await user.type(screen.getByLabelText(/name/i), 'Jane Smith');
      await user.type(screen.getByLabelText(/email \(optional\)/i), 'jane@example.com');
      await user.type(screen.getByLabelText(/your experience/i), 'Amazing content that transformed my life.');
      await user.selectOptions(screen.getByLabelText(/related content \(optional\)/i), 'blog');

      const submitButton = screen.getByRole('button', { name: /submit feedback/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[0]).toBe('/api/feedback');
        const body = JSON.parse(callArgs[1].body);
        expect(body.name).toBe('Jane Smith');
        expect(body.email).toBe('jane@example.com');
        expect(body.experience).toBe('Amazing content that transformed my life.');
        expect(body.related_content_type).toBe('blog');
      });
    });

    it('should show error message on submission failure', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Server error' }),
      });
      global.fetch = mockFetch;

      render(<FeedbackForm />);

      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/your experience/i), 'This is a great healing experience.');

      const submitButton = screen.getByRole('button', { name: /submit feedback/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/server error/i)).toBeInTheDocument();
      });
    });

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Success', data: { id: '123', submitted_at: new Date().toISOString() } }),
      });
      global.fetch = mockFetch;

      render(<FeedbackForm />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const experienceInput = screen.getByLabelText(/your experience/i) as HTMLTextAreaElement;

      await user.type(nameInput, 'John Doe');
      await user.type(experienceInput, 'This is a great healing experience.');

      const submitButton = screen.getByRole('button', { name: /submit feedback/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(experienceInput.value).toBe('');
      });
    });
  });
});
