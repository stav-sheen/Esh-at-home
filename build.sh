#!/bin/bash

# Function to log messages with timestamps
log() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1"
}

log "Starting the build process..."
#removing and stopping existing app
docker-compose down

# Build
log "Building..."
docker-compose build

# Check build
if [ $? -ne 0 ]; then
    log "Error: build failed!"
    exit 1
fi

# start
log "Starting the containers..."
docker-compose up -d

# Check if containers started
if [ $? -ne 0 ]; then
    log "Error: failed to start the containers!"
    exit 1
fi

log "Containers are up and running. Checking status..."
docker-compose ps
log "Services started. Visit at http://localhost:8080 and check the backend at http://localhost:3000/api/message."
