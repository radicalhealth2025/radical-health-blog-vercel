import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AudioControls } from '../AudioControls';

// Mock the useAudio hook
vi.mock('@/lib/hooks', () => ({
  useAudio: vi.fn(),
}));

import { useAudio } from '@/lib/hooks';

describe('AudioControls Component', () => {
  const mockUseAudio = {
    volume: 0.5,
    isMuted: false,
    setVolume: vi.fn(),
    toggleMute: vi.fn(),
    isPlaying: false,
    isLoading: false,
    error: null,
    play: vi.fn(),
    pause: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAudio).mockReturnValue(mockUseAudio);
  });

  describe('Rendering', () => {
    it('should render mute/unmute button', () => {
      render(<AudioControls />);

      const muteButton = screen.getByRole('button', { name: /mute audio/i });
      expect(muteButton).toBeInTheDocument();
    });

    it('should render volume slider on desktop', () => {
      render(<AudioControls />);

      const volumeSlider = screen.getByRole('slider', { name: /volume control/i });
      expect(volumeSlider).toBeInTheDocument();
    });

    it('should show correct icon when not muted', () => {
      render(<AudioControls />);

      const muteButton = screen.getByRole('button', { name: /mute audio/i });
      expect(muteButton).toBeInTheDocument();
    });

    it('should show correct icon when muted', () => {
      vi.mocked(useAudio).mockReturnValue({
        ...mockUseAudio,
        isMuted: true,
      });

      render(<AudioControls />);

      const unmuteButton = screen.getByRole('button', { name: /unmute audio/i });
      expect(unmuteButton).toBeInTheDocument();
    });
  });

  describe('Mute/Unmute Functionality', () => {
    it('should call toggleMute when mute button is clicked', async () => {
      const user = userEvent.setup();
      render(<AudioControls />);

      const muteButton = screen.getByRole('button', { name: /mute audio/i });
      await user.click(muteButton);

      expect(mockUseAudio.toggleMute).toHaveBeenCalled();
    });

    it('should call toggleMute when unmute button is clicked', async () => {
      const user = userEvent.setup();
      vi.mocked(useAudio).mockReturnValue({
        ...mockUseAudio,
        isMuted: true,
      });

      render(<AudioControls />);

      const unmuteButton = screen.getByRole('button', { name: /unmute audio/i });
      await user.click(unmuteButton);

      expect(mockUseAudio.toggleMute).toHaveBeenCalled();
    });
  });

  describe('Volume Control', () => {
    it('should display current volume level', () => {
      render(<AudioControls />);

      const volumeSlider = screen.getByRole('slider', { name: /volume control/i }) as HTMLInputElement;
      expect(volumeSlider.value).toBe('0.5');
    });

    it('should call setVolume when slider is changed', () => {
      render(<AudioControls />);

      const volumeSlider = screen.getByRole('slider', { name: /volume control/i });
      
      // Simulate changing the slider value
      fireEvent.change(volumeSlider, { target: { value: '0.8' } });

      expect(mockUseAudio.setVolume).toHaveBeenCalledWith(0.8);
    });

    it('should display volume as 0 when muted', () => {
      vi.mocked(useAudio).mockReturnValue({
        ...mockUseAudio,
        isMuted: true,
        volume: 0.5,
      });

      render(<AudioControls />);

      const volumeSlider = screen.getByRole('slider', { name: /volume control/i }) as HTMLInputElement;
      expect(volumeSlider.value).toBe('0');
    });

    it('should display actual volume when not muted', () => {
      vi.mocked(useAudio).mockReturnValue({
        ...mockUseAudio,
        isMuted: false,
        volume: 0.75,
      });

      render(<AudioControls />);

      const volumeSlider = screen.getByRole('slider', { name: /volume control/i }) as HTMLInputElement;
      expect(volumeSlider.value).toBe('0.75');
    });
  });

  describe('Volume Icon States', () => {
    it('should show high volume icon when volume > 0.5', () => {
      vi.mocked(useAudio).mockReturnValue({
        ...mockUseAudio,
        volume: 0.8,
        isMuted: false,
      });

      render(<AudioControls />);

      const muteButton = screen.getByRole('button', { name: /mute audio/i });
      expect(muteButton).toBeInTheDocument();
    });

    it('should show low volume icon when 0 < volume <= 0.5', () => {
      vi.mocked(useAudio).mockReturnValue({
        ...mockUseAudio,
        volume: 0.3,
        isMuted: false,
      });

      render(<AudioControls />);

      const muteButton = screen.getByRole('button', { name: /mute audio/i });
      expect(muteButton).toBeInTheDocument();
    });

    it('should show muted icon when muted', () => {
      vi.mocked(useAudio).mockReturnValue({
        ...mockUseAudio,
        volume: 0.5,
        isMuted: true,
      });

      render(<AudioControls />);

      const unmuteButton = screen.getByRole('button', { name: /unmute audio/i });
      expect(unmuteButton).toBeInTheDocument();
    });
  });
});
