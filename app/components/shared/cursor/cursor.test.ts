import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Cursor } from './cursor';

// Mock the requestAnimationFrame to avoid test timeouts
vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
  return setTimeout(cb, 0);
});

// Mock the animate function for the click animation
Element.prototype.animate = vi.fn().mockReturnValue({
  finished: Promise.resolve(),
});

describe('Cursor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock DOM methods used in the component
    document.querySelectorAll = vi.fn().mockReturnValue([]);
  });

  it('renders cursor', () => {
    const { container } = render(Cursor());
    const cursor = container.querySelector('span[aria-hidden="true"]');
    expect(cursor).toBeInTheDocument();
  });

  it('renders cursor with default cursor type', () => {
    const { container } = render(Cursor());
    const iconComponent = container.querySelector('svg');
    expect(iconComponent).toBeInTheDocument();
  });

  // Since the component doesn't accept cursorType as a prop, we can't test different cursor types directly
  // Instead, we can test that the component renders and has the expected structure

  it('has the correct structure', () => {
    const { container } = render(Cursor());
    const outerSpan = container.querySelector('span');
    expect(outerSpan).toHaveClass('fixed', 'top-0', 'left-0', 'z-[9999]', 'pointer-events-none');

    const innerSpan = outerSpan?.querySelector('span');
    expect(innerSpan).toHaveClass('block', 'transition-transform', 'duration-150', 'ease-out');

    const icon = innerSpan?.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
