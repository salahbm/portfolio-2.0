#!/bin/bash

# Stop any running containers
echo "Stopping running containers..."
docker-compose down

# Rebuild the storybook service
echo "Rebuilding the storybook service..."
docker-compose build storybook

# Start only the storybook service
echo "Starting the storybook service..."
docker-compose up storybook
