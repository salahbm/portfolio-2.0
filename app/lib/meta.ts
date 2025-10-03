import type { RouteMetaFunction } from '@/+types/root';

export const defaultMeta: RouteMetaFunction = () => {
  return [
    { title: '3D Portfolio' },
    { name: 'description', content: 'A modern 3D portfolio built with React Router and Three.js' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};
