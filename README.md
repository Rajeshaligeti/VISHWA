# Vishwa Astra 🪐

> A cutting-edge space exploration and astronomy web application featuring interactive knowledge hubs, simulations, and AI-powered assistance.

## 🌟 Features

- **🏠 Interactive Home** - Immersive space-themed landing experience with particle effects
- **📚 Knowledge Hub** - Comprehensive astronomy and space science resources
- **🔬 Simulations** - Interactive space and physics simulations
- **🤖 AI Assistant** - Intelligent astronomy companion for queries and learning
- **👥 Community** - Connect with fellow space enthusiasts
- **ℹ️ About & Contact** - Learn more about the project and get in touch

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: install with [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn package manager

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd vishva-astro-core-main

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Create production build
npm run build
# or
yarn build

# Preview production build locally
npm run preview
# or
yarn preview
```

## 🛠️ Tech Stack

- **⚡ Vite** - Lightning-fast build tool and dev server
- **⚛️ React 18** - Modern UI library with hooks and concurrent features
- **🎯 TypeScript** - Type-safe JavaScript for better development experience
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid styling
- **🧩 shadcn/ui** - Beautiful and accessible UI components
- **🔍 Radix UI** - Low-level UI primitives for accessibility and customization
- **📊 React Query** - Powerful data fetching and state management
- **🗺️ React Router** - Client-side routing for single-page application

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### Docker
```dockerfile
# Create Dockerfile in project root
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Variables

For production deployment, consider setting up these environment variables:

```bash
# .env.production
VITE_API_URL=https://your-api-url.com
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── knowledge-hub/  # Knowledge Hub specific components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility functions and configurations
└── pages/              # Application pages/routes
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

This project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** (recommended) for code formatting

## 🤝 Contributing

1. Gadicherla Abhilash 
2. Gudivada Sumana
3. Akshitha Ganji
4. Addagarla Mahesh Kumar
5. Aligeti Rajesh

## 📄 License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.


## 🌟 Acknowledgments

- Built with modern web technologies for optimal performance
- Inspired by the wonders of space exploration and astronomy
- Thanks to the open-source community for the amazing tools and libraries

---

