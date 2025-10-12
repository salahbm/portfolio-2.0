import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ThemeToggle } from './toggle';

// Mock the child components
vi.mock('./clouds', () => ({
  default: ({ isDark }: { isDark: boolean }) => (
    <div data-testid="clouds" data-is-dark={isDark.toString()} />
  ),
}));

vi.mock('./stars', () => ({
  default: ({ isDark }: { isDark: boolean }) => (
    <div data-testid="stars" data-is-dark={isDark.toString()} />
  ),
}));

// Mock the document.documentElement.classList methods
const mockToggle = vi.fn();

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock document.documentElement.classList.toggle
    document.documentElement.classList.toggle = mockToggle;
  });

  it('renders correctly in light mode by default', () => {
    render(<ThemeToggle />);

    // Check that the toggle is rendered
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    // Check that the sun image is rendered
    const sunImage = screen.getByAltText('Sun');
    expect(sunImage).toBeInTheDocument();

    // Check that the moon image is not rendered
    const moonImage = screen.queryByAltText('Moon');
    expect(moonImage).not.toBeInTheDocument();

    // Check that the clouds component is rendered with isDark=false
    const clouds = screen.getByTestId('clouds');
    expect(clouds).toHaveAttribute('data-is-dark', 'false');

    // Check that the stars component is rendered with isDark=false
    const stars = screen.getByTestId('stars');
    expect(stars).toHaveAttribute('data-is-dark', 'false');
  });

  it('renders correctly in dark mode when initialDark is true', () => {
    render(<ThemeToggle initialDark={true} />);

    // Check that the toggle is rendered
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    // Check that the moon image is rendered
    const moonImage = screen.getByAltText('Moon');
    expect(moonImage).toBeInTheDocument();

    // Check that the sun image is not rendered
    const sunImage = screen.queryByAltText('Sun');
    expect(sunImage).not.toBeInTheDocument();

    // Check that the clouds component is rendered with isDark=true
    const clouds = screen.getByTestId('clouds');
    expect(clouds).toHaveAttribute('data-is-dark', 'true');

    // Check that the stars component is rendered with isDark=true
    const stars = screen.getByTestId('stars');
    expect(stars).toHaveAttribute('data-is-dark', 'true');
  });

  it('toggles between light and dark mode when clicked', () => {
    render(<ThemeToggle />);

    // Initially in light mode
    expect(screen.getByAltText('Sun')).toBeInTheDocument();
    expect(screen.queryByAltText('Moon')).not.toBeInTheDocument();

    // Click the toggle button
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Now in dark mode
    expect(screen.queryByAltText('Sun')).not.toBeInTheDocument();
    expect(screen.getByAltText('Moon')).toBeInTheDocument();

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Back to light mode
    expect(screen.getByAltText('Sun')).toBeInTheDocument();
    expect(screen.queryByAltText('Moon')).not.toBeInTheDocument();
  });

  it('calls onToggle callback when clicked', () => {
    const onToggleMock = vi.fn();
    render(<ThemeToggle onToggle={onToggleMock} />);

    // Click the toggle button
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Check that onToggle was called with true (dark mode)
    expect(onToggleMock).toHaveBeenCalledTimes(1);
    expect(onToggleMock).toHaveBeenCalledWith(true);

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Check that onToggle was called with false (light mode)
    expect(onToggleMock).toHaveBeenCalledTimes(2);
    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

  it('toggles the dark class on document.documentElement', () => {
    render(<ThemeToggle />);

    // Check that classList.toggle was called with 'dark', false
    expect(mockToggle).toHaveBeenCalledWith('dark', false);

    // Click the toggle button
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Check that classList.toggle was called with 'dark', true
    expect(mockToggle).toHaveBeenCalledWith('dark', true);
  });
});
