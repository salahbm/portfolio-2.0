# Testing in Portfolio 2.0

This document provides a quick guide on how to write and run tests in the Portfolio 2.0 project.

## Testing Setup

The project uses [Vitest](https://vitest.dev/) as the testing framework.

### Installation

```bash
# Install Vitest
bun add -D vitest
```

### Configuration

The minimal Vitest configuration in `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './app'),
    },
  },
});
```

## Writing Tests

### Test File Location

Place test files in a `__tests__` directory next to the file being tested:

```
components/ui/button/
├── button.tsx         # Component
├── button.stories.tsx # Storybook
└── __tests__/         # Tests folder
    └── button.test.ts # Test file
```

### Basic Test Structure

```typescript
import { describe, expect, it } from 'vitest';
import { yourFunction } from '../your-file';

describe('ComponentName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'some input';

    // Act
    const result = yourFunction(input);

    // Assert
    expect(result).toBe('expected output');
  });
});
```

### Example: Testing a Utility Function

Here's an example of testing the `buttonVariants` utility function:

```typescript
import { describe, expect, it } from 'vitest';
import { buttonVariants } from '../button';

describe('Button', () => {
  it('should have correct default variants', () => {
    const defaultClasses = buttonVariants();

    expect(defaultClasses).toContain('bg-primary');
    expect(defaultClasses).toContain('text-primary-foreground');
  });

  it('should apply destructive variant', () => {
    const destructiveClasses = buttonVariants({ variant: 'destructive' });

    expect(destructiveClasses).toContain('bg-destructive');
    expect(destructiveClasses).toContain('text-white');
  });
});
```

## Running Tests

Run tests using the script defined in `package.json`:

```bash
# Run all tests
bun test
```

## Best Practices

1. **Test in isolation**: Each test should be independent
2. **Test behavior, not implementation**: Focus on what the code does
3. **Keep tests simple**: Write small, focused tests
4. **Use descriptive names**: Make it clear what you're testing
5. **Follow AAA pattern**: Arrange, Act, Assert
6. **Test edge cases**: Consider boundary conditions

## Common Matchers

```typescript
// Equality
expect(value).toBe(expected); // Strict equality
expect(value).toEqual(expected); // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);

// Strings
expect(value).toMatch(/regex/);
expect(value).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);
```

## Testing React Components (Advanced)

To test React components, you'll need additional setup:

```bash
bun add -D @testing-library/react jsdom @testing-library/jest-dom
```

Update Vitest config to use jsdom:

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
  // ...
});
```

Example React component test:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });
});
```
