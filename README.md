# 3D Portfolio

A modern, interactive 3D portfolio built with React, React Router v7, and Three.js.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering with React Router v7
- 🎮 Interactive 3D elements using Three.js
- ⚡️ Hot Module Replacement (HMR) for fast development
- 📦 Asset bundling and optimization with Vite
- 🔄 Data loading and mutations
- 🔒 TypeScript for type safety
- 🎨 TailwindCSS for modern styling
- 🧹 ESLint and Prettier for code quality
- 📝 Commitlint for consistent commit messages
- 🔄 Husky and lint-staged for pre-commit hooks

## Getting Started

### Installation

This project uses [Bun](https://bun.sh/) as the package manager. Make sure you have Bun installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then install the dependencies:

```bash
bun install
```

### Development

Start the development server with HMR:

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

### Linting and Formatting

Lint your code:

```bash
bun run lint
```

Fix linting issues:

```bash
bun run lint:fix
```

Format your code:

```bash
bun run format
```

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Project Structure

```
├── app/                  # Main application code
│   ├── +types/           # TypeScript type definitions
│   ├── routes/           # Route components
│   ├── welcome/          # Welcome page components
│   ├── app.css           # Global styles
│   ├── root.tsx          # Root component
│   └── routes.ts         # Route definitions
├── public/               # Static assets
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .husky/              # Git hooks
├── commitlint.config.js # Commit lint configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
├── bun.lock             # Bun lock file
├── package.json         # Package configuration
└── README.md            # Project documentation
```

## Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Each commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

See [SECURITY.md](SECURITY.md) for details on our security policy.

---

Built with ❤️ using React, Three.js, and React Router.
