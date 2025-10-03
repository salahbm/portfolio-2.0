import type { LinksFunction as RemixLinksFunction } from 'react-router';

// Using interfaces and types instead of namespace
export type RouteLinksFunction = RemixLinksFunction;

export interface RouteErrorBoundaryProps {
  error: unknown;
}
