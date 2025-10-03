import type {
  LinksFunction as RemixLinksFunction,
  MetaFunction as RemixMetaFunction,
} from 'react-router';

// Using interfaces and types instead of namespace
export type RouteLinksFunction = RemixLinksFunction;
export type RouteMetaFunction = RemixMetaFunction;

export interface RouteErrorBoundaryProps {
  error: unknown;
}
