import { useState } from 'react';

import { cn } from '@/lib/utils';

const colorVars = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'muted',
  'muted-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
];

const gradientClasses = [
  { name: 'bg-gradient-lilac', label: 'Gradient Lilac' },
  { name: 'bg-gradient-dark', label: 'Gradient Dark' },
  { name: 'bg-gradient-glow', label: 'Gradient Glow' },
  { name: 'bg-gradient-sunrise', label: 'Gradient Sunrise' },
  { name: 'bg-gradient-night', label: 'Gradient Night' },
  { name: 'text-gradient-lilac', label: 'Text Gradient Lilac' },
  { name: 'text-gradient-dark', label: 'Text Gradient Dark' },
];

export default function Hero() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-700 p-8 space-y-16',
        dark ? 'dark bg-background text-foreground' : 'bg-background text-foreground'
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {dark ? '🌙 Night Mode' : '🌞 Day Mode'}
        </h1>
        <button
          type="button"
          onClick={() => setDark(!dark)}
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium shadow-md transition-all hover:scale-105"
        >
          Toggle Theme
        </button>
      </div>

      {/* Color Tokens */}
      <section>
        <div className="flex justify-between my-8 items-center gap-4 flex-wrap">
          <h1 className="font-babygemoy text-4xl text-gradient-lilac">Font Babygemoy</h1>
          <h1 className="font-higherjump text-4xl">Font HigherJump</h1>
          <h1 className="font-milkyway text-4xl">Font Milkyway</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-4">🎨 Color Tokens</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colorVars.map(color => (
            <div
              key={color}
              className="rounded-lg border border-border p-4 flex flex-col items-center justify-center shadow-sm transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: `oklch(var(--${color}))` }}
            >
              <span
                className={cn(
                  'text-sm font-semibold',
                  color.includes('foreground') ? 'text-foreground' : 'text-background'
                )}
              >
                {color}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Gradients */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🌈 Gradient Utilities</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gradientClasses.map(gradient =>
            gradient.name.startsWith('text') ? (
              <div
                key={gradient.name}
                className="flex flex-col items-center justify-center rounded-lg border border-border p-6 bg-card text-center shadow-sm"
              >
                <span className={cn('text-2xl font-bold', gradient.name)}>Text Gradient</span>
                <p className="text-sm mt-2 opacity-80">{gradient.label}</p>
              </div>
            ) : (
              <div
                key={gradient.name}
                className={cn(
                  gradient.name,
                  'h-28 w-full rounded-lg border border-border flex flex-col items-center justify-center text-sm font-semibold text-foreground shadow-sm transition-transform hover:scale-[1.02]'
                )}
              >
                {gradient.label}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
