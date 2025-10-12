import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Clouds from './clouds';

// Mock GSAP to avoid actual animations in tests
vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
    })),
    killTweensOf: vi.fn(),
  },
}));

// Mock Math.random to return predictable values
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('Clouds', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders clouds when isDark is false', () => {
    render(<Clouds isDark={false} />);

    // Check that clouds are rendered
    const cloudImages = screen.getAllByAltText(/Cloud/);
    expect(cloudImages.length).toBeGreaterThan(0);
  });

  it('does not render clouds when isDark is true', () => {
    render(<Clouds isDark={true} />);

    // Check that no clouds are rendered
    const cloudImages = screen.queryAllByAltText(/Cloud/);
    expect(cloudImages.length).toBe(0);
  });

  it('renders both background and foreground clouds', () => {
    render(<Clouds isDark={false} />);

    // Check for background clouds
    const backgroundClouds = screen.getAllByAltText('Background Cloud');
    expect(backgroundClouds.length).toBeGreaterThan(0);

    // Check for foreground clouds
    const foregroundClouds = screen.getAllByAltText('Foreground Cloud');
    expect(foregroundClouds.length).toBeGreaterThan(0);
  });
});
