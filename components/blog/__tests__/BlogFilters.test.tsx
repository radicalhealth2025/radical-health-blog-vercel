import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogFilters from '../BlogFilters';

// Mock the useFilters hook
vi.mock('@/hooks/useFilters', () => ({
  useFilters: vi.fn(),
}));

import { useFilters } from '@/hooks/useFilters';

describe('BlogFilters Component', () => {
  const mockCategories = ['Healing', 'Mindfulness', 'Transformation'];
  const mockTags = ['meditation', 'awareness', 'practice'];

  const mockUseFilters = {
    filters: { category: null, tag: null },
    setCategory: vi.fn(),
    setTag: vi.fn(),
    clearFilters: vi.fn(),
    hasActiveFilters: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFilters).mockReturnValue(mockUseFilters);
  });

  describe('Rendering', () => {
    it('should render category and tag dropdowns', () => {
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/tag/i)).toBeInTheDocument();
    });

    it('should render all categories in dropdown', () => {
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const categorySelect = screen.getByLabelText(/category/i);
      mockCategories.forEach((category) => {
        expect(screen.getByRole('option', { name: category })).toBeInTheDocument();
      });
    });

    it('should render all tags in dropdown', () => {
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const tagSelect = screen.getByLabelText(/tag/i);
      mockTags.forEach((tag) => {
        expect(screen.getByRole('option', { name: tag })).toBeInTheDocument();
      });
    });

    it('should not show clear filters button when no filters active', () => {
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      expect(screen.queryByRole('button', { name: /clear filters/i })).not.toBeInTheDocument();
    });

    it('should show clear filters button when filters are active', () => {
      vi.mocked(useFilters).mockReturnValue({
        ...mockUseFilters,
        filters: { category: 'Healing', tag: null },
        hasActiveFilters: true,
      });

      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
    });
  });

  describe('Filter Interactions', () => {
    it('should call setCategory when category is selected', async () => {
      const user = userEvent.setup();
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const categorySelect = screen.getByLabelText(/category/i);
      await user.selectOptions(categorySelect, 'Healing');

      expect(mockUseFilters.setCategory).toHaveBeenCalledWith('Healing');
    });

    it('should call setCategory with null when "All Categories" is selected', async () => {
      const user = userEvent.setup();
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const categorySelect = screen.getByLabelText(/category/i);
      await user.selectOptions(categorySelect, '');

      expect(mockUseFilters.setCategory).toHaveBeenCalledWith(null);
    });

    it('should call setTag when tag is selected', async () => {
      const user = userEvent.setup();
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const tagSelect = screen.getByLabelText(/tag/i);
      await user.selectOptions(tagSelect, 'meditation');

      expect(mockUseFilters.setTag).toHaveBeenCalledWith('meditation');
    });

    it('should call setTag with null when "All Tags" is selected', async () => {
      const user = userEvent.setup();
      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const tagSelect = screen.getByLabelText(/tag/i);
      await user.selectOptions(tagSelect, '');

      expect(mockUseFilters.setTag).toHaveBeenCalledWith(null);
    });

    it('should call clearFilters when clear button is clicked', async () => {
      const user = userEvent.setup();
      vi.mocked(useFilters).mockReturnValue({
        ...mockUseFilters,
        filters: { category: 'Healing', tag: 'meditation' },
        hasActiveFilters: true,
      });

      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const clearButton = screen.getByRole('button', { name: /clear filters/i });
      await user.click(clearButton);

      expect(mockUseFilters.clearFilters).toHaveBeenCalled();
    });
  });

  describe('Active Filters Display', () => {
    it('should display active category filter', () => {
      vi.mocked(useFilters).mockReturnValue({
        ...mockUseFilters,
        filters: { category: 'Healing', tag: null },
        hasActiveFilters: true,
      });

      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      expect(screen.getByText(/Category: Healing/i)).toBeInTheDocument();
    });

    it('should display active tag filter', () => {
      vi.mocked(useFilters).mockReturnValue({
        ...mockUseFilters,
        filters: { category: null, tag: 'meditation' },
        hasActiveFilters: true,
      });

      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      expect(screen.getByText(/Tag: meditation/i)).toBeInTheDocument();
    });

    it('should display both active filters', () => {
      vi.mocked(useFilters).mockReturnValue({
        ...mockUseFilters,
        filters: { category: 'Healing', tag: 'meditation' },
        hasActiveFilters: true,
      });

      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      expect(screen.getByText(/Category: Healing/i)).toBeInTheDocument();
      expect(screen.getByText(/Tag: meditation/i)).toBeInTheDocument();
    });

    it('should allow removing individual category filter', async () => {
      const user = userEvent.setup();
      vi.mocked(useFilters).mockReturnValue({
        ...mockUseFilters,
        filters: { category: 'Healing', tag: null },
        hasActiveFilters: true,
      });

      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const removeButton = screen.getByRole('button', { name: /remove category filter/i });
      await user.click(removeButton);

      expect(mockUseFilters.setCategory).toHaveBeenCalledWith(null);
    });

    it('should allow removing individual tag filter', async () => {
      const user = userEvent.setup();
      vi.mocked(useFilters).mockReturnValue({
        ...mockUseFilters,
        filters: { category: null, tag: 'meditation' },
        hasActiveFilters: true,
      });

      render(<BlogFilters categories={mockCategories} tags={mockTags} />);

      const removeButton = screen.getByRole('button', { name: /remove tag filter/i });
      await user.click(removeButton);

      expect(mockUseFilters.setTag).toHaveBeenCalledWith(null);
    });
  });
});
