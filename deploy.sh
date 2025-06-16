#!/bin/bash

# Pull latest changes
git pull origin main

# Build and deploy
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Prune unused images/containers
docker system prune -f

# Migrate database
docker exec orignx_app npx prisma migrate deploy

# Restart Nginx
docker restart orignx_nginx