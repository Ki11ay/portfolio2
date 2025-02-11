# Personal Portfolio

A modern, responsive portfolio website built with React and Vite.

## Features

- 🚀 Fast and responsive design
- 🎨 Interactive experience cards with hover effects
- 📱 Mobile-first approach
- 💼 Project showcase with smooth scrolling
- 📄 Downloadable CV
- ⚡ PWA support for offline access
- 🔄 Smooth page transitions
- 📊 Analytics integration

## Technologies Used

- React 18
- Vite
- GSAP for animations
- CSS Modules
- PWA capabilities
- React Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # React components
├── styles/           # Component styles
├── utils/            # Utility functions
├── assets/           # Static assets
└── App.jsx           # Main app component
```

## Deployment

Use the deploy script to build and deploy:
```bash
./deploy.sh
```

## PWA Support

The site works offline and can be installed as a PWA. To test PWA features:

1. Build the project: `npm run build`
2. Serve the build: `npm run preview`
3. Open in a supported browser
4. Use Chrome DevTools > Application to test offline functionality

## License

MIT License - see LICENSE file for details
