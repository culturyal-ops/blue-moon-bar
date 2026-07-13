# Blue Moon | Bar & Kitchen · Pala

A complete, production-quality website for Blue Moon, a bar and kitchen located on T.B. Road in Pala, Kerala.

## Overview

This website recreates the sophistication and design discipline extracted from the Lush Life design language, transformed into an original nocturnal identity for Blue Moon. The site captures the essence of:

- Midnight in Pala
- Cold glasses on dark wood
- Dim blue light
- Kerala food served late
- Atmospheric but accessible

## Design System

The design system is translated from the Lush Life DesignLang extraction into a Blue Moon-specific palette:

### Color Palette

- **Primary Blues**: Moon Ink, Midnight, Deep Navy, Ocean Blue, Royal Blue, Electric Blue
- **Accent Tones**: Moonlight Blue, Mist Blue, Cold White, Warm Paper, Muted Silver
- **Warmth**: Wood Brown for visual balance

### Typography

- **Display Font**: Anton (headings, titles)
- **Body Font**: Arimo (content, navigation)
- **Responsive Scale**: From 0.75rem to 5rem

### Motion

- Adapted from Lush extraction with slower, weighted, cinematic pacing
- Custom easing functions for smooth interactions
- Respects `prefers-reduced-motion`

## Technology Stack

- **Framework**: React 19.2.7
- **Build Tool**: Vite 8.1.1
- **Language**: TypeScript 6.0.2
- **Linter**: OxLint 1.71.0
- **Styling**: Custom CSS with design tokens

## Business Information

All business content is centralized in `src/content.ts`:

- Address: 20/385, T.B. Road, Pala, Kottayam, Kerala 686575
- Phone: +91 94470 52202
- Instagram: @hotel_bluemoon_pala
- Established: Since 1969
- FSSAI: 11323005000154

## Features

### Homepage Sections

1. **Hero**: Full-screen introduction with brand positioning
2. **Experience**: Editorial section introducing Blue Moon
3. **Food**: Categorized menu showcase (Kerala Beef, Seafood, Indo-Chinese, etc.)
4. **Drinks**: Bar offerings (Beer, Wine, Fresh Juices)
5. **Evening**: Special evening menu (Tandoor items available after 5 PM)
6. **Visit**: Location, contact, and directions
7. **Footer**: Complete site navigation and information

### Responsive Design

Tested and optimized for:
- Mobile: 360px, 390px, 430px
- Tablet: 768px
- Desktop: 1024px, 1440px

### Accessibility

- Semantic HTML5
- ARIA labels where appropriate
- Keyboard navigation support
- Visible focus states
- Sufficient color contrast
- Reduced motion support

### SEO & Metadata

- Descriptive page title and meta description
- Open Graph tags for social sharing
- Twitter Card metadata
- LocalBusiness structured data (Schema.org)
- Canonical URL support

## Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

\`\`\`bash
npm install
\`\`\`

### Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:5173` (or the port shown in the terminal)

### Linting

\`\`\`bash
npm run lint
\`\`\`

### Production Build

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
blue-moon/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/        # React components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Experience.tsx
│   │   ├── Food.tsx
│   │   ├── Drinks.tsx
│   │   ├── Evening.tsx
│   │   ├── Visit.tsx
│   │   └── Footer.tsx
│   ├── tokens.css         # Design tokens (colors, spacing, typography)
│   ├── reset.css          # CSS reset adapted from Lush
│   ├── motion.css         # Animation utilities
│   ├── content.ts         # Centralized business content
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
\`\`\`

## Content Management

All editable business information is stored in `src/content.ts`:

### Update Business Details

Edit the `blueMoonContent` object:

\`\`\`typescript
export const blueMoonContent: BusinessContent = {
  name: "Blue Moon",
  descriptor: "Bar & Kitchen",
  phone: "+91 94470 52202",
  // ... other fields
};
\`\`\`

### Update Menu Items

Edit the `foodMenu` array:

\`\`\`typescript
export const foodMenu: MenuItem[] = [
  {
    name: "Beef Dry Fry",
    category: "Kerala Beef",
    featured: true,
  },
  // ... add more items
];
\`\`\`

### Update Drinks

Edit the `drinksMenu` array:

\`\`\`typescript
export const drinksMenu = [
  {
    category: "Beer",
    items: ["Available – ask for selection"],
  },
  // ... add categories and items
];
\`\`\`

## Design Principles

This website follows specific design principles derived from the Lush Life extraction:

### What We Borrowed

- Composition logic
- Section rhythm
- Typography hierarchy
- Spacing discipline
- Navigation behavior
- Editorial image treatment
- Responsive strategy
- Reveal timing
- Motion characteristics

### What We Avoided

- Lush Life branding and green identity
- Direct source code copying
- Generic bar/restaurant templates
- Excessive effects (neon, glow, smoke)
- Stock photography
- Fake claims (history, awards, reviews)

## Missing Assets

The following need to be added when available:

- Real venue photographs for Experience section
- Bar counter photography for Drinks section
- Food photography for featured dishes
- Google Maps integration for Visit section
- Opening hours confirmation
- Complete alcohol menu details

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized font loading
- Lazy loading ready (add when images are available)
- Minimal dependencies
- Clean CSS without bloat

## License

All rights reserved © 2026 Blue Moon, Pala

---

Built with attention to craft, respecting the design discipline extracted from Lush Life while creating an entirely original identity for Blue Moon.
