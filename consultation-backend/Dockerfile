# ==========================================
# WatchThis Backend - Production Dockerfile
# ==========================================

# Stage 1: Build
FROM node:20-alpine AS builder

# Install yarn globally
RUN npm install -g yarn

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn nx build consultation-backend --configuration=production

# Stage 2: Production
FROM node:20-alpine

# Install yarn globally
RUN npm install -g yarn

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy built application
COPY --from=builder /app/dist/consultation-backend ./dist/consultation-backend


# Expose port
EXPOSE 3088

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3088', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Start the application
CMD ["node", "dist/consultation-backend/main.js"]

