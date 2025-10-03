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

#### Prerequisites

Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).

#### Building the Docker Image

To build the Docker image for your 3D portfolio:

```bash
docker build -t portfolio-3d .
```

This command builds a Docker image named `portfolio-3d` using the Dockerfile in your project.

#### Running the Docker Container

After building the image, you can run it as a container:

```bash
docker run -p 3000:3000 portfolio-3d
```

This command:

- `-p 3000:3000`: Maps port 3000 of the container to port 3000 on your host machine
- `portfolio-3d`: Uses the image we built in the previous step

Your application will be available at `http://localhost:3000`.

#### Development with Docker

For development with hot-reloading, you can use Docker Compose. Create a `docker-compose.yml` file in your project root:

```yaml
version: '3'

services:
  app:
    build:
      context: .
      target: development-dependencies
    command: bun run dev
    ports:
      - '5173:5173'
    volumes:
      - .:/app
      - /app/node_modules
```

Then run:

```bash
docker-compose up
```

#### Using the Docker Helper Script

This project includes a helper script (`docker.sh`) to simplify Docker operations:

```bash
# Make the script executable (first time only)
chmod +x docker.sh

# Build the Docker image
./docker.sh build

# Run the Docker container
./docker.sh run

# Start all development services (app + storybook)
./docker.sh dev

# Start only the app service
./docker.sh dev-app

# Start only the Storybook service
./docker.sh storybook

# Stop Docker Compose services
./docker.sh stop

# Clean up Docker resources
./docker.sh clean
```

#### Docker Commands Reference

- **List all running containers:**

  ```bash
  docker ps
  ```

- **Stop a running container:**

  ```bash
  docker stop <container_id>
  ```

- **Remove a container:**

  ```bash
  docker rm <container_id>
  ```

- **List all images:**

  ```bash
  docker images
  ```

- **Remove an image:**

  ```bash
  docker rmi <image_id>
  ```

#### Deployment Platforms

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
