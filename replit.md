# Le Maschou - Next.js Website

## Overview
This is a Next.js restaurant website for "Le Maschou" with internationalization support (English and Arabic). The site features a modern design showcasing menu items, venue information, and FAQs.

## Tech Stack
- **Framework**: Next.js 14.2.13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **State Management**: Redux Toolkit with redux-persist
- **UI Components**: Radix UI, Framer Motion, Swiper
- **Analytics**: Microsoft Clarity

## Project Structure
- `/src/app/[locale]/` - Internationalized pages (home, menu, venue, faqs)
- `/src/app/main-components/` - Shared components (Navbar, Footer, etc.)
- `/messages/` - Translation files (en.json, ar.json)
- `/public/` - Static assets (images, fonts, icons)

## Development Setup
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm run start`

## Key Configuration
- Next.js configured with cache-control headers for proper Replit preview
- Internationalization with English (en) and Arabic (ar) locales
- Remote image patterns configured for external image sources
- Automatic redirect from `/menu` to `/en/menu`

## Deployment
- **Type**: Autoscale (stateless website)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

## Known Deprecation Warnings
- next-intl has deprecation warnings about `locale` parameter - functionality works but should be updated to use `await requestLocale` in future versions

## Recent Changes (Sept 30, 2025)
- Imported from GitHub
- Configured for Replit environment
- Set up workflow on port 5000
- Added cache-control headers
- Configured deployment settings
