# Portfolio 2.0 Documentation

This directory contains documentation for various aspects of the Portfolio 2.0 projec with details how to set up, run and troubleshoot common issues that I have encountered during the development process.

## Available Documentation

- [Docker Setup](./docker.md) - How to set up and use Docker for this project
- [Storybook Setup](./storybook.md) - How to set up and use Storybook in this project

## Quick Start

### Development

To start the development environment:

```bash
# Using Bun directly
bun run dev

# Using Docker
docker-compose up
```

### Storybook

To start Storybook:

```bash
# Using Bun directly
bun run storybook

# Using Docker
docker-compose up storybook
```

## Project Structure

The project follows a specific structure:

```
portfolio-2.0/
├── app/                   # Main application code
│   ├── components/        # React components
│   │   ├── ui/            # UI components
│   │   │   ├── button/    # Button component
│   │   │   │   ├── button.tsx
│   │   │   │   └── button.stories.tsx
│   ├── styles/            # Global styles
├── .storybook/           # Storybook configuration
│   ├── main.ts           # Main Storybook config
│   ├── preview.ts        # Preview configuration
│   └── vite.config.ts    # Dedicated Vite config for Storybook
├── docs/                 # Documentation
├── Dockerfile            # Docker configuration
└── docker-compose.yml    # Docker Compose configuration
```

## Troubleshooting

If you encounter any issues, please refer to the specific documentation files for troubleshooting guidance:

- For Docker-related issues, see [Docker Setup](./docker.md)
- For Storybook-related issues, see [Storybook Setup](./storybook.md)

## Contributing

When adding new features or making changes, please update the relevant documentation files to keep them in sync with the codebase.
