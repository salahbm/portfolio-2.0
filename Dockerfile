# Base image with Bun installed
FROM oven/bun:1 AS base
WORKDIR /app

# Development dependencies
FROM base AS development-dependencies
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