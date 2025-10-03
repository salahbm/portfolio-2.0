import type { RouteMetaFunction } from '@/+types/root';

// Application constants
const APP_NAME = '3D Portfolio';
const APP_DESCRIPTION = 'A modern 3D portfolio built with React Router and Three.js';
const AUTHOR = 'Salah';
const TWITTER_HANDLE = '@salah';
const THEME_COLOR = '#000000';

/**
 * Default meta tags for the application
 */
export const defaultMeta: RouteMetaFunction = () => {
  return [
    { title: APP_NAME },
    { name: 'description', content: APP_DESCRIPTION },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: AUTHOR },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: TWITTER_HANDLE },
    { name: 'twitter:title', content: APP_NAME },
    { name: 'twitter:description', content: APP_DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: APP_NAME },
    { property: 'og:description', content: APP_DESCRIPTION },
    { property: 'og:site_name', content: APP_NAME },
    { property: 'og:locale', content: 'en_US' },
    { name: 'theme-color', content: THEME_COLOR },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'msapplication-navbutton-color', content: THEME_COLOR },
  ];
};

/**
 * Create meta tags for a specific page
 */
export const createPageMeta = ({
  title,
  description = APP_DESCRIPTION,
  image,
  themeColor = THEME_COLOR,
}: {
  title: string;
  description?: string;
  image?: string;
  themeColor?: string;
}): RouteMetaFunction => {
  const pageTitle = `${title} | ${APP_NAME}`;

  return () => {
    const meta = [
      { title: pageTitle },
      { name: 'description', content: description },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: description },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: description },
      { name: 'theme-color', content: themeColor },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'msapplication-navbutton-color', content: themeColor },
    ];

    // Add image meta tags if an image is provided
    if (image) {
      meta.push(
        { property: 'og:image', content: image },
        { name: 'twitter:image', content: image }
      );
    }

    return meta;
  };
};
