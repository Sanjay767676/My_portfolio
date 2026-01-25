# Portfolio System

## Overview

A personal portfolio website with animated frontend, backend API, and AI-ready resume analysis capabilities. The system showcases skills, projects, and professional experience with modern visual effects including Three.js 3D backgrounds and GSAP scroll animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom dark theme and glassmorphism effects
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: GSAP with ScrollTrigger for scroll-based animations
- **3D Graphics**: Three.js for particle background effects
- **State Management**: TanStack React Query for server state and caching

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Style**: REST endpoints under `/api/*` prefix
- **Build Tool**: esbuild for server bundling, Vite for client

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` using Zod for validation
- **Storage**: Currently uses in-memory storage with interface for database migration
- **Migrations**: Drizzle Kit with migrations in `/migrations` directory

### AI Integration
- **Module**: `server/aiAnalyzer.ts` provides placeholder AI resume analysis
- **Capabilities**: Resume parsing, skill extraction, career domain inference
- **Integration Points**: Designed for OpenAI or local LLM replacement

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components including sections and shadcn/ui
    pages/        # Route components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  routes.ts       # API endpoint definitions
  storage.ts      # Data access layer
  aiAnalyzer.ts   # AI resume analysis module
shared/           # Shared types and schemas
  schema.ts       # Zod schemas for validation
```

### Build Configuration
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds static assets to `dist/public`, esbuild bundles server

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe queries
- connect-pg-simple for session storage (if needed)

### Frontend Libraries
- Three.js for 3D particle backgrounds
- GSAP for animations
- react-icons for skill icons
- react-hook-form with Zod resolver for form validation

### AI Services (Placeholder)
- OpenAI integration ready in aiAnalyzer.ts
- Currently uses rule-based extraction logic

### Replit-Specific
- @replit/vite-plugin-runtime-error-modal for error display
- @replit/vite-plugin-cartographer for development tooling