import { Outlet } from 'react-router';

import type { RouteLinksFunction } from './+types/root';
import { ErrorBoundary } from '@/components/error';
import { RootLayout } from '@/components/layout';
import { fontLinks } from '@/lib/fonts';
import { defaultMeta } from '@/lib/meta';
import '@/styles/app.css';

export const links: RouteLinksFunction = () => [...fontLinks()];

export const meta = defaultMeta;

export function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}

export default function App() {
  return <Outlet />;
}

export { ErrorBoundary };
