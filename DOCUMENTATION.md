# Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Key Components](#key-components)
4. [Routing System](#routing-system)
5. [Styling Architecture](#styling-architecture)
6. [State Management](#state-management)

## Project Overview
This is a Hydrogen-powered e-commerce project built with Remix, focusing on providing a seamless shopping experience. The project uses TypeScript for type safety and Tailwind CSS for styling.

## Directory Structure

app/
├── assets/ # Static assets (images, icons, videos)
├── components/ # React components
│ ├── account/ # Account-related components
│ │ ├── AccountDetails.tsx
│ │ ├── OrderHistory.tsx
│ │ └── LoginForm.tsx
│ ├── cart/ # Shopping cart components
│ │ ├── Cart.tsx
│ │ ├── CartEmpty.tsx
│ │ └── CartItems.tsx
│ ├── layout/ # Layout components
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ └── PageLayout.tsx
│ ├── products/ # Product-related components
│ │ ├── ProductCard.tsx
│ │ ├── ProductGrid.tsx
│ │ └── ProductDetails.tsx
│ └── sections/ # Marketing sections
│ ├── Hero.tsx
│ ├── Features.tsx
│ └── Testimonials.tsx
├── lib/ # Utility functions and helpers
├── routes/ # Application routes
├── styles/ # Global styles and Tailwind config
└── graphql/ # GraphQL queries and fragments

## Key Components

### Layout Components
The layout system is built around `PageLayout.tsx`, which provides the basic structure for all pages. Reference:
typescript:app/components/PageLayout.tsx
startLine: 157
endLine: 238

### Product Components
- **ProductCard**: Displays individual product information in a grid
- **ProductShowcase**: Featured product display with enhanced details
- **Cart Components**: Handles shopping cart functionality

Reference for ProductCard implementation:
typescript:app/components/ProductCard.tsx
startLine: 9
endLine: 113

### Marketing Sections
- **BlogArticles**: Displays latest blog posts and articles
- **TestimonialsCarousel**: Customer testimonials slider
- **InstagramFeed**: Social media integration

## Routing System
The project uses Remix's file-based routing system with locale support. Routes are structured as:

```
routes/
├── ($locale)._index.tsx       # Homepage
├── ($locale).products.$productHandle.tsx  # Product pages
├── ($locale).collections.$collectionHandle.tsx  # Collection pages
└── ($locale).account.tsx      # Account pages
```

## Styling Architecture
The project uses a combination of Tailwind CSS and custom CSS variables for consistent styling:

```css:app/styles/app.css
startLine: 46
endLine: 72
```

Key features:
- Responsive design system
- Custom color scheme
- Typography scale
- Animation utilities

## State Management
The application uses a combination of:
- Local component state for UI interactions
- Remix's loader data for server state
- Cart state managed through Shopify's Hydrogen utilities

## Development Guidelines

### Component Organization
1. Each component should be in its own directory when it includes:
   - Component file (.tsx)
   - Test file (.test.tsx)
   - Types file (.types.ts)
   - Styles file (if needed)

### Code Style
- Use TypeScript for all components
- Follow ESLint and Prettier configurations
- Use Tailwind CSS for styling
- Implement responsive design using Tailwind breakpoints

### Performance Considerations
1. Image Optimization
   - Use Shopify's Image component
   - Implement lazy loading
   - Proper sizing and formats

2. Code Splitting
   - Leverage Remix's automatic code splitting
   - Use dynamic imports for large components

3. SEO
   - Implement meta tags
   - Use semantic HTML
   - Follow accessibility guidelines

## Testing Strategy
1. Unit Tests
   - Component testing
   - Utility function testing

2. Integration Tests
   - User flow testing
   - API integration testing

3. E2E Tests
   - Critical path testing
   - Checkout flow testing