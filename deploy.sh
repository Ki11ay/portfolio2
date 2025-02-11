#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process...${NC}"

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}Error: Git working directory is not clean${NC}"
  echo "Please commit or stash your changes before deploying"
  exit 1
fi

# Build the project
echo -e "${YELLOW}Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed!${NC}"
  exit 1
fi

# Optimize images
echo -e "${YELLOW}Optimizing assets...${NC}"
# Generate icons
node public/icons/generate-icons.js
# Generate screenshots
node public/screenshots/generate-screenshots.js

# Move to dist directory
cd dist

# Create or update .gitignore
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore
echo ".env*" >> .gitignore

# Initialize git if needed
if [ ! -d .git ]; then
  git init
  git branch -M main
fi

# Add all files
git add -A

# Commit changes
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "Deploy: $TIMESTAMP"

# Check if remote exists, if not add it
if ! git remote | grep -q "^origin"; then
  echo -e "${YELLOW}Enter your repository URL:${NC}"
  read REPO_URL
  git remote add origin $REPO_URL
fi

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -u origin main --force

# Return to project root
cd ..

echo -e "${GREEN}Deployment complete!${NC}"

# Output instructions
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Configure your hosting platform (e.g., GitHub Pages, Netlify)"
echo "2. Set up HTTPS for PWA functionality"
echo "3. Configure custom domain if needed"
echo -e "\n${GREEN}Your site is ready to go!${NC}"
