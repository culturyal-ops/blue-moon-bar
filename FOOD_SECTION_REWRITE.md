# Food Section - Complete Rewrite

## Overview
Completely rebuilt the Food section from scratch with a modern, editorial magazine-style design that works beautifully on both desktop and mobile.

## Key Changes

### Design Philosophy
- **Editorial First**: Magazine-style layout with clear typography hierarchy
- **Clean & Minimal**: Removed visual clutter, focused on content
- **Mobile-First**: Designed for touch interactions and small screens
- **Accessibility**: Full keyboard navigation and screen reader support

### Component Structure (Food.tsx)
```
✓ Framer Motion animations for smooth transitions
✓ AnimatePresence for category switching
✓ Improved state management
✓ Better structured category data
✓ Smooth stagger animations for menu items
```

### Visual Design (Food.css)

#### Header Section
- **Eyebrow text**: Small uppercase label ("Our Kitchen")
- **Large title**: Fluid typography using clamp()
- **Description**: Centered, max 65 characters per line
- **Spacing**: Generous whitespace for breathing room

#### Category Filters
- **Pill buttons**: Rounded, clean design
- **Active state**: Primary color fill with white text
- **Hover effects**: Lift animation + shadow
- **Mobile scroll**: Horizontal scroll with snap points and custom scrollbar

#### Menu Items Grid
- **Card-based layout**: Each item in its own card
- **Auto-grid**: Responsive columns (1 on mobile, auto-fill on desktop)
- **Hover effects**: 
  - Lift animation
  - Border color change
  - Background tint
  - Indicator appears
- **Badge system**: "Popular" badge for featured items
- **Time indicators**: Shows "After 6pm" etc.

#### Visual Element
- **Featured image**: Large, rounded corners
- **Aspect ratio**: 16:10 on desktop, 4:3 on mobile
- **Hover effect**: Subtle zoom
- **Shadow**: Editorial depth shadow

### Responsive Breakpoints

#### Desktop (>1024px)
- Multi-column grid (3-4 items per row)
- Centered categories
- Large typography
- Spacious padding

#### Tablet (769px - 1024px)
- 2-3 items per row
- Adjusted typography scale
- Medium padding

#### Mobile (≤768px)
- Single column layout
- Horizontal scrolling categories
- Touch-optimized buttons (44px min)
- Reduced typography scale
- Compact padding

#### Small Mobile (≤430px)
- Further reduced typography
- Tighter spacing
- Optimized for iPhone SE and similar

### Accessibility Features

1. **Keyboard Navigation**
   - All buttons focusable
   - Visible focus states
   - Skip to content support

2. **Screen Readers**
   - Semantic HTML (section, article, h2, h3)
   - ARIA labels (aria-pressed for category buttons)
   - Alt text for images

3. **Motion**
   - Respects prefers-reduced-motion
   - Animations disabled when requested
   - No forced animations

4. **Contrast**
   - High contrast mode support
   - Thicker borders in high contrast
   - Clear text hierarchy

5. **Touch Targets**
   - Minimum 44px height
   - Adequate spacing between buttons
   - Touch-action: manipulation

### Performance Optimizations

1. **CSS**
   - Minimal specificity
   - Efficient selectors
   - CSS custom properties
   - Hardware-accelerated transforms

2. **Animations**
   - will-change hints
   - Transform/opacity only
   - Staggered loading (50ms delay per item)
   - GPU acceleration

3. **Images**
   - Lazy loading ready
   - Aspect ratio boxes (prevent layout shift)
   - Optimized hover effects

### Color Palette
- **Primary**: Navy (#07182c)
- **Background**: Warm white (#fffdf8) + Paper (#f8f9fb)
- **Accent**: Moon blue (#6eb5e9)
- **Border**: Light gray with transparency
- **Text**: Navy for headings, muted for secondary

### Typography Scale
- **Title**: clamp(2.5rem, 6vw, 4rem)
- **Item name**: var(--text-lg) 
- **Description**: var(--text-lg)
- **Eyebrow**: var(--text-sm)
- **Badge**: 0.625rem

### Spacing System
- Uses CSS custom properties from tokens.css
- Consistent clamp() values for fluid spacing
- Mobile-specific gutter variables

## Migration Notes

### What Was Removed
- ❌ ScrollReveal component (replaced with Framer Motion)
- ❌ Separate desktop/mobile visual columns
- ❌ Old list-based layout
- ❌ Complex grid system
- ❌ Accent decorations

### What Was Added
- ✅ Framer Motion animations
- ✅ Card-based grid layout
- ✅ Editorial visual hierarchy
- ✅ Better mobile scrolling
- ✅ Popular badges
- ✅ Hover indicators
- ✅ Smooth category transitions

## Testing Checklist

- [x] Desktop layout (1920px)
- [x] Tablet layout (768px)
- [x] Mobile layout (375px)
- [x] Small mobile (320px)
- [x] Category switching
- [x] Horizontal scroll on mobile
- [x] Hover states
- [x] Keyboard navigation
- [x] Reduced motion
- [x] Build process

## Browser Support
- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- iOS Safari (13+)
- Android Chrome (latest)

## Future Enhancements
- [ ] Add search/filter functionality
- [ ] Include prices
- [ ] Add item descriptions
- [ ] Include dietary tags (veg, vegan, gluten-free)
- [ ] Add spice level indicators
- [ ] Include item images
- [ ] Add favorites/save functionality
