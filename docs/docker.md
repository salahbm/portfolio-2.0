# Docker Setup for Portfolio 2.0

This document explains how to set up and use Docker for this project, including troubleshooting common issues.

## Project Docker Structure

The project uses Docker Compose to manage multiple services:

1. **app**: The main React application
2. **storybook**: The Storybook UI component explorer

## Docker Configuration Files

- `Dockerfile`: Defines the container images
- `docker-compose.yml`: Configures the services
- `restart-docker.sh`: Helper script to rebuild and restart containers

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine

### Running the Application

To start all services:

```bash
docker-compose up
```

To rebuild and start (after changes to Dockerfile or dependencies):

```bash
./restart-docker.sh
```

To run in detached mode:

```bash
docker-compose up -d
```

### Accessing the Services

- React App: http://localhost:5173
- Storybook: http://localhost:6006

## Docker Configuration Details

### Dockerfile Stages

Our Dockerfile uses multi-stage builds:

1. **base**: The foundation with Bun installed
2. **development-dependencies**: Installs all dependencies for development
3. **build**: Creates production build
4. **production**: Final production image

```dockerfile
# Base image with Bun installed
FROM oven/bun:1 AS base
WORKDIR /app

# Development dependencies
FROM base AS development-dependencies
# Install xdg-utils for Storybook telemetry
RUN apt-get update && apt-get install -y xdg-utils && apt-get clean
COPY package.json bun.lock ./
RUN bun install

# Build stage
FROM development-dependencies AS build
COPY . .
RUN bun run build

# Production stage
FROM base AS production
COPY --from=development-dependencies /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json ./

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
```

### Docker Compose Configuration

```yaml
services:
  app:
    build:
      context: .
      target: development-dependencies
    command: bun run dev -- --host 0.0.0.0
    ports:
      - '5173:5173'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - HOST=0.0.0.0
      - PORT=5173
    tty: true
    stdin_open: true

  storybook:
    build:
      context: .
      target: development-dependencies
    command: bun run storybook -- --host 0.0.0.0
    ports:
      - '6006:6006'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - HOST=0.0.0.0
      - STORYBOOK_DISABLE_TELEMETRY=1
    tty: true
    stdin_open: true
```

## Common Issues and Solutions

### Issue: xdg-open Not Found in Docker

**Error:**

```
error: Executable not found in $PATH: "xdg-open"
```

**Solution:**

There are multiple ways to solve this issue:

1. Install xdg-utils and create a dummy xdg-open script in the Dockerfile:

   ```dockerfile
   # Install xdg-utils and create a dummy xdg-open script
   RUN apt-get update && apt-get install -y xdg-utils && apt-get clean
   # Create a dummy xdg-open script that does nothing but return success
   RUN echo '#!/bin/sh\nexit 0' > /usr/local/bin/xdg-open && chmod +x /usr/local/bin/xdg-open
   ```

2. Disable Storybook telemetry by adding environment variables:

   ```yaml
   environment:
     - STORYBOOK_DISABLE_TELEMETRY=1
     - CI=true
   ```

3. Create a custom Storybook start script that mocks xdg-open:

   ```javascript
   // .storybook/docker-start.js
   #!/usr/bin/env node

   // This script is used to start Storybook in Docker without telemetry
   process.env.STORYBOOK_DISABLE_TELEMETRY = '1';
   process.env.CI = 'true';

   // Mock xdg-open to prevent errors
   const originalSpawn = require('child_process').spawn;
   require('child_process').spawn = function(cmd, args, options) {
     if (cmd === 'xdg-open') {
       // Return a mock process that does nothing
       return {
         on: () => {},
         stdout: { on: () => {} },
         stderr: { on: () => {} }
       };
     }
     return originalSpawn(cmd, args, options);
   };

   // Run the Storybook CLI
   require('storybook/bin');
   ```

4. Use this custom script in docker-compose.yml:
   ```yaml
   command: node .storybook/docker-start.js dev -p 6006 --host 0.0.0.0 --ci
   ```

### Issue: Host Not Allowed in Vite

**Error:**

```
'host' is set to '0.0.0.0' but 'allowedHosts' is not defined.
```

**Solution:**
Configure Vite to allow all hosts in the Storybook Vite config:

```typescript
server: {
  host: '0.0.0.0',
  port: 6006,
  allowedHosts: true
}
```

## Best Practices

1. **Volume Mounting**: We mount the local directory to `/app` for live code updates
2. **Node Modules**: We use a named volume for node_modules to avoid overwriting container modules
3. **Environment Variables**: We set NODE_ENV and other variables in docker-compose.yml
4. **Hot Reloading**: The setup supports hot reloading for both app and Storybook

## Useful Commands

```bash
# View logs for a specific service
docker-compose logs app
docker-compose logs storybook

# SSH into a running container
docker-compose exec app /bin/sh
docker-compose exec storybook /bin/sh

# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v
```
