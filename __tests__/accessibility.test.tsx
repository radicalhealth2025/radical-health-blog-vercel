import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import BlogFilters from '@/components/blog/BlogFilters';
import { AudioControls } from '@/components/audio/AudioControls';

vi.mock('@/hooks/useFilters', () => ({
  useFilters: () => ({
    filters: { category: null, tag: null },
    setCategory: vi.fn(),
    setTag: vi.fn(),
    clearFilters: vi.fn(),
    hasActiveFilters: false,
  }),
}));

vi.mock('@/lib/hooks', () => ({
  useAudio: () => ({
    volume: 0.5,
    isMuted: false,
    setVolume: vi.fn(),
    toggleMute: vi.fn(),
    isPlaying: false,
    isLoading: false,
    error: null,
    play: vi.fn(),
    pause: vi.fn(),
  }),
}));

describe('Accessibility Tests', () => {
  describe('FeedbackForm', () => {
    it('should not have any automatically detectable accessibility issues', async () => {
      const { container } = render(<FeedbackForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('BlogFilters', () => {
    it('should not have any automatically detectable accessibility issues', async () => {
      const mockCategories = ['Healing', 'Mindfulness'];
      const mockTags = ['meditation', 'awareness'];
      
      const { container } = render(
        <BlogFilters categories={mockCategories} tags={mockTags} />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('AudioControls', () => {
    it('should not have any automatically detectable accessibility issues', async () => {
      const { container } = render(<AudioControls />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
