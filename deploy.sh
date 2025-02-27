#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment process...${NC}\n"

# Ensure we're on the main branch
echo -e "📍 Checking git branch..."
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo -e "${RED}❌ Not on main branch. Please switch to main branch first.${NC}"
  exit 1
fi

# Check for uncommitted changes
echo -e "🔍 Checking for uncommitted changes..."
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}❌ You have uncommitted changes. Please commit or stash them first.${NC}"
  exit 1
fi

# Pull latest changes
echo -e "⬇️ Pulling latest changes..."
git pull origin main
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to pull latest changes.${NC}"
  exit 1
fi

# Install dependencies
echo -e "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to install dependencies.${NC}"
  exit 1
fi

# Run type checking
echo -e "✅ Running type checks..."
npm run typecheck
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Type checking failed.${NC}"
  exit 1
fi

# Run linting
echo -e "🔍 Running linting..."
npm run lint
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Linting failed.${NC}"
  exit 1
fi

# Clean previous build
echo -e "🧹 Cleaning previous build..."
rm -rf dist
npm run clean-sw

# Build the project
echo -e "🏗️ Building project..."
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Build failed.${NC}"
  exit 1
fi

# Deploy to production (modify this section based on your hosting service)
echo -e "📤 Deploying to production..."
if [ -f ".env.production" ]; then
  # Example: Deploy to Vercel
  vercel --prod
  # Example: Deploy to Netlify
  # netlify deploy --prod
  # Example: Deploy to Firebase
  # firebase deploy --only hosting
else
  echo -e "${RED}❌ Missing .env.production file${NC}"
  exit 1
fi

# Clear CDN cache if needed
echo -e "🔄 Clearing CDN cache..."
# Add your CDN cache clearing commands here
# Example: Cloudflare
# curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
#      -H "Authorization: Bearer $API_TOKEN" \
#      -H "Content-Type: application/json" \
#      --data '{"purge_everything":true}'

echo -e "\n${GREEN}✅ Deployment completed successfully!${NC}"

# Optional: Send notification
echo -e "📧 Sending deployment notification..."
# Add your notification command here (e.g., Slack, Email, etc.)

# Print completion time
echo -e "\n${GREEN}🎉 Deployment completed at $(date)${NC}"
