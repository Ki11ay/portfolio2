# Deployment Guide

## Prerequisites

1. Node.js 18+ installed
2. npm or yarn package manager
3. A hosting platform (e.g., Netlify, Vercel, GitHub Pages)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Building for Production

1. Create production build:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

## Deployment Options

### Option 1: Using the Deploy Script

1. Make the deploy script executable:
```bash
chmod +x deploy.sh
```

2. Run the deploy script:
```bash
./deploy.sh
```

### Option 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform.

### Option 3: Continuous Deployment

1. Connect your repository to a hosting platform (Netlify/Vercel)
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+

## Environment Variables

Create the following files based on your environment:
- `.env.development` for development
- `.env.production` for production

Copy the variables from `.env.example` and set appropriate values.

## PWA Configuration

The site is configured as a Progressive Web App (PWA). To ensure PWA features work:

1. All icons must be present in `/public/icons/`
2. SSL must be enabled on the production domain
3. Web App Manifest must be properly configured
4. Service Worker must be registered

## Post-Deployment Checklist

- [ ] Verify SSL/HTTPS is enabled
- [ ] Test offline functionality
- [ ] Validate PWA installation
- [ ] Check CV download functionality
- [ ] Test responsive design
- [ ] Verify contact form submission
- [ ] Check analytics integration
- [ ] Validate meta tags and SEO elements
- [ ] Test loading performance

## Troubleshooting

If you encounter issues:

1. Clear browser cache and service workers
2. Verify environment variables
3. Check build logs for errors
4. Ensure all assets are properly loaded
5. Validate PWA manifest

## Support

For additional support:
1. Check the README.md
2. Review the documentation in `/docs`
3. Create an issue in the repository
