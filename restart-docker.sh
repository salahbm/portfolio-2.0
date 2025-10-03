#!/bin/bash

# Stop and remove existing containers
docker-compose down

# Rebuild the images
docker-compose build

# Start the containers
docker-compose up
