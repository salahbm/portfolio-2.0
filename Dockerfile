# Base image with Bun installed
FROM oven/bun:1 AS base
WORKDIR /app

# Development dependencies
FROM base AS development-dependencies
# Install xdg-utils and create a dummy xdg-open script
RUN apt-get update && apt-get install -y xdg-utils && apt-get clean
# Create a dummy xdg-open script that does nothing but return success
RUN echo '#!/bin/sh\nexit 0' > /usr/local/bin/xdg-open && chmod +x /usr/local/bin/xdg-open
# Set environment variable to disable Storybook telemetry
ENV STORYBOOK_DISABLE_TELEMETRY=1
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