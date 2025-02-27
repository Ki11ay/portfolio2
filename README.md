# Mohamed Abubaker's Portfolio

A modern, responsive portfolio showcasing my work in software engineering and robotics.

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes
- **PWA Support**: Installable and works offline
- **Dynamic Content**: Blog posts loaded from Supabase
- **Dark Mode**: System preference based theme
- **Contact Form**: EmailJS integration
- **Smooth Animations**: GSAP powered transitions
- **Custom Cursor**: Interactive cursor effects
- **Type Safety**: Built with TypeScript
- **SEO Optimized**: Meta tags and sitemap generation

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- GSAP
- Supabase
- EmailJS
- PWA (Workbox)

## 📋 Prerequisites

- Node.js >= 16
- npm >= 8
- Git

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
```bash
cp .env.example .env.development
cp .env.example .env.production
```

4. Update environment variables with your credentials:
```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

Run type checking in watch mode:
```bash
npm run typecheck --watch
```

Run linting:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## 📦 Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🚀 Deployment

Make the deployment script executable:
```bash
chmod +x deploy.sh
```

Deploy to production:
```bash
./deploy.sh
```

## 🧪 PWA Testing

1. Build the project:
```bash
npm run build
```

2. Serve the build directory:
```bash
npm run preview
```

3. Open in a supported browser and test offline functionality

## 📝 Writing Posts

Posts are managed through Supabase. Each post should have:

- Title
- Content (Markdown)
- Excerpt
- Published Date
- Tags
- Image URL

## 🧹 Maintenance

Clean service worker files:
```bash
npm run clean-sw
```

## 📱 PWA Assets

Generate PWA assets:
```bash
cd public/icons
node generate-icons.js
```

Generate screenshots:
```bash
cd public/screenshots
node generate-screenshots.js
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) for animations
- [EmailJS](https://www.emailjs.com/) for the contact form
- [Supabase](https://supabase.io/) for the backend
- [Vite](https://vitejs.dev/) for the build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety
