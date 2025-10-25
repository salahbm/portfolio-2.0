# Page Transition Component

A powerful and creative page transition system for Next.js applications using GSAP animations.

## Features

- 🎨 **5 Unique Transition Effects**: Liquid morph, ripple wave, curtain slide, spiral vortex, and pixel dissolve
- ⚡ **Smooth Animations**: Powered by GSAP for high-performance animations
- 🔄 **Automatic Detection**: Triggers on route changes using Next.js `usePathname`
- 🎯 **Easy Integration**: Simple wrapper component
- 📱 **Responsive**: Works seamlessly across all screen sizes

## Available Effects

### 1. Liquid Morph (Default)
Morphing circles that expand and contract with a liquid-like effect.
- **Best for**: Modern, fluid designs
- **Duration**: ~2.2s

### 2. Ripple Wave
Horizontal waves that sweep across the screen.
- **Best for**: Dynamic, energetic transitions
- **Duration**: ~2.0s

### 3. Curtain Slide
Vertical curtains that slide down and up.
- **Best for**: Elegant, theatrical presentations
- **Duration**: ~1.9s

### 4. Spiral Vortex
Rotating spirals that create a vortex effect.
- **Best for**: Creative, eye-catching transitions
- **Duration**: ~2.4s

### 5. Pixel Dissolve
Grid-based pixel dissolution effect.
- **Best for**: Retro, digital aesthetics
- **Duration**: ~2.0s

## Usage

### Basic Setup

The component is already integrated into your app via `ProvidersTree`. By default, it uses the "liquid" effect.

```tsx
// src/components/providers/providers-tree.tsx
import { PageTransition } from '@/components/page-transition'

export function ProvidersTree({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CursorProvider>
        <TooltipProvider>
          <PageTransition>{children}</PageTransition>
        </TooltipProvider>
      </CursorProvider>
    </ThemeProvider>
  )
}
```

### Changing the Effect

To use a different transition effect, pass the `effect` prop:

```tsx
<PageTransition effect="spiral">{children}</PageTransition>
```

Available effects:
- `"liquid"` (default)
- `"ripple"`
- `"curtain"`
- `"spiral"`
- `"pixel"`

### Custom Implementation

If you want to use the transition effects programmatically:

```tsx
import { liquidMorphTransition } from '@/lib/page-transition-effects'

// In your component
const elements = document.querySelectorAll('.transition-element')
const content = document.querySelector('.content')

const timeline = liquidMorphTransition(
  Array.from(elements) as HTMLElement[],
  content as HTMLElement
)
```

## How It Works

1. **Route Detection**: Uses Next.js `usePathname()` to detect route changes
2. **Animation Sequence**:
   - Transition elements expand/appear
   - Old content fades out
   - Transition elements contract/disappear
   - New content fades in
3. **Cleanup**: GSAP timelines are properly cleaned up on unmount

## Performance

- Uses GSAP's optimized rendering engine
- GPU-accelerated transforms
- Minimal DOM manipulation
- Skips animation on initial page load

## Customization

### Adjusting Animation Duration

Edit the animation functions in `page-transition.tsx`:

```tsx
function animateLiquidMorph(tl, elements, content) {
  // Change duration values here
  tl.to(elements, {
    scale: 3,
    duration: 0.8, // ← Adjust this
    ease: 'power3.inOut',
  })
}
```

### Changing Colors

Modify the gradient classes in the overlay rendering:

```tsx
className={cn(
  'absolute h-[200vh] w-[200vw] rounded-full',
  'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent',
  // ↑ Customize these colors
)}
```

### Adding New Effects

1. Create a new animation function following the existing pattern
2. Add a new case to the `switch` statement in `useEffect`
3. Add a new overlay structure in `renderOverlay()`
4. Update the `TransitionEffect` type

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Troubleshooting

### Transition not working
- Ensure GSAP is installed: `npm install gsap`
- Check that the component wraps your page content
- Verify `usePathname()` is detecting route changes

### Animation feels janky
- Reduce the number of transition elements
- Simplify gradient effects
- Check for other heavy animations running simultaneously

### Content flashing
- Ensure the content wrapper has proper opacity handling
- Check z-index layering

## Credits

Built with:
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
