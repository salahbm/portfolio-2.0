import { describe, expect, it } from 'vitest';

import { buttonVariants } from '../button';

describe('Button', () => {
  it('should have correct default variants', () => {
    const defaultClasses = buttonVariants();

    // Check that the default variant classes are included
    expect(defaultClasses).toContain('bg-primary');
    expect(defaultClasses).toContain('text-primary-foreground');

    // Check that the default size classes are included
    expect(defaultClasses).toContain('h-9');
    expect(defaultClasses).toContain('px-4');
  });

  it('should apply destructive variant', () => {
    const destructiveClasses = buttonVariants({ variant: 'destructive' });

    expect(destructiveClasses).toContain('bg-destructive');
    expect(destructiveClasses).toContain('text-white');
  });

  it('should apply outline variant', () => {
    const outlineClasses = buttonVariants({ variant: 'outline' });

    expect(outlineClasses).toContain('border');
    expect(outlineClasses).toContain('bg-background');
  });

  it('should apply small size', () => {
    const smallClasses = buttonVariants({ size: 'sm' });

    expect(smallClasses).toContain('h-8');
    expect(smallClasses).toContain('rounded-md');
  });

  it('should apply large size', () => {
    const largeClasses = buttonVariants({ size: 'lg' });

    expect(largeClasses).toContain('h-10');
    expect(largeClasses).toContain('px-6');
  });

  it('should apply icon size', () => {
    const iconClasses = buttonVariants({ size: 'icon' });

    expect(iconClasses).toContain('size-9');
  });

  it('should combine variant with size', () => {
    const combinedClasses = buttonVariants({
      variant: 'secondary',
      size: 'sm',
    });

    // Check for secondary variant classes
    expect(combinedClasses).toContain('bg-secondary');
    expect(combinedClasses).toContain('text-secondary-foreground');

    // Check for small size classes
    expect(combinedClasses).toContain('h-8');
    expect(combinedClasses).toContain('rounded-md');
  });

  it('should include custom className', () => {
    const customClasses = buttonVariants({ className: 'my-custom-class' });

    expect(customClasses).toContain('my-custom-class');
  });
});
