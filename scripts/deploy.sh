#!/bin/bash

# ==========================================
# WatchThis - Production Deployment Script
# ==========================================

set -e  # Exit on error

echo "🚀 WatchThis Deployment Script"
echo "================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Environment check
if [ ! -f "consultation-backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Warning: consultation-backend/.env not found${NC}"
    echo "Creating .env from template..."
    cp consultation-backend/ENV_TEMPLATE.txt consultation-backend/.env
    echo -e "${YELLOW}⚠️  Please edit consultation-backend/.env with your actual values before deploying!${NC}"
    exit 1
fi

# Build and deploy
echo -e "${GREEN}📦 Building Docker images...${NC}"
docker-compose build --no-cache

echo -e "${GREEN}🔄 Stopping existing containers...${NC}"
docker-compose down

echo -e "${GREEN}🚀 Starting containers...${NC}"
docker-compose up -d

echo -e "${GREEN}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Health check
echo -e "${GREEN}🏥 Checking service health...${NC}"

if curl -f http://localhost:3088 &> /dev/null; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    docker-compose logs backend
    exit 1
fi

if curl -f http://localhost/health &> /dev/null; then
    echo -e "${GREEN}✅ Frontend is healthy${NC}"
else
    echo -e "${RED}❌ Frontend health check failed${NC}"
    docker-compose logs frontend
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo ""
echo "🌐 Frontend: http://localhost"
echo "⚙️  Backend: http://localhost:3088"
echo "📚 API Docs: http://localhost:3088/api"
echo ""
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop services: docker-compose down"
echo ""

