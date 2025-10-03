#!/bin/bash

# Helper script for Docker operations

case "$1" in
  build)
    echo "Building Docker image..."
    docker build -t portfolio-3d .
    ;;
  run)
    echo "Running Docker container..."
    docker run -p 3000:3000 portfolio-3d
    ;;
  dev)
    echo "Starting development environment with Docker Compose..."
    docker-compose up
    ;;
  stop)
    echo "Stopping Docker Compose services..."
    docker-compose down
    ;;
  clean)
    echo "Cleaning up Docker resources..."
    docker-compose down --rmi local --volumes --remove-orphans
    ;;
  *)
    echo "Usage: $0 {build|run|dev|stop|clean}"
    echo ""
    echo "Commands:"
    echo "  build  - Build the Docker image"
    echo "  run    - Run the Docker container"
    echo "  dev    - Start development environment with Docker Compose"
    echo "  stop   - Stop Docker Compose services"
    echo "  clean  - Clean up Docker resources (images, volumes, etc.)"
    exit 1
    ;;
esac

exit 0
