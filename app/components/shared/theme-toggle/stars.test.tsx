import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Stars from './stars';

// Mock GSAP to avoid actual animations in tests
vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    killTweensOf: vi.fn(),
  },
}));

// Mock Math.random to return predictable values
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('Stars', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders stars when isDark is true', () => {
    render(<Stars isDark={true} />);

    // Check that stars are rendered
    const starImages = screen.getAllByAltText('Star');
    expect(starImages.length).toBeGreaterThan(0);
  });

  it('does not render stars when isDark is false', () => {
    render(<Stars isDark={false} />);

    // Check that no stars are rendered
    const starImages = screen.queryAllByAltText('Star');
    expect(starImages.length).toBe(0);
  });

  it('renders the correct number of stars', () => {
    render(<Stars isDark={true} />);

    // Check the exact number of stars (8 in the current implementation)
    const starImages = screen.getAllByAltText('Star');
    expect(starImages.length).toBe(8);
  });
});
