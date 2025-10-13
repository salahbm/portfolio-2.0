import React, { useEffect } from 'react';
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';

import { easterEgg } from '@/lib/easter-egg';
import { useThemeStore } from '@/store';

import { ThemeProvider } from './theme-layout';

export interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const { theme } = useThemeStore();
  // Easter egg
  useEffect(() => {
    easterEgg();
  }, []);

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/app/styles/app.css" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
