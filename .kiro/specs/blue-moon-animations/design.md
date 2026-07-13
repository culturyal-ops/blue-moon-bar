# Design Document — Blue Moon Animations

## Overview

This document describes the technical design for adding a layered set of scroll and animation effects to the Blue Moon bar & kitchen website. The project is a React 19 + Vite + TypeScript application using Framer Motion v12 for all motion work and plain CSS with design tokens (no Tailwind).

Four effects are in scope:

1. **Circular Text Fixed Overlay** — a new `CircularOverlay` wrapper renders `CircularText` at `position: fixed`, centre-screen on desktop, so page sections scroll behind the spinning badge.
2. **Scroll-Triggered Content Reveals** — a reusable `ScrollReveal` component wraps section content in Framer Motion `whileInView` animations.
3. **Sticky Navigation Visual State** — the existing `Navigation` component gains a frosted-glass treatment when scroll depth exceeds 80 px.
4. **Circular Video Element** — an optional `PortholeMask` component clips a `<video>` to a perfect circle for use within page sections.

All motion work must respect `prefers-reduced-motion`. The Hero section layout is locked and must not be altered.

---

## Architecture

The feature is implemented entirely within the existing React component tree. No new routing, no state management library, and no new build tooling are introduced.

```
App
├── Navigation            ← Req 3: gains scroll-depth state & frosted-glass CSS class
├── CircularOverlay       ← Req 1: NEW fixed wrapper around CircularText
├── main
│   ├── Hero              ← untouched
│   ├── CurvedLoop
│   ├── Experience        ← Req 2: section content wrapped in ScrollReveal
│   ├── Food              ← Req 2: header + menu grid items wrapped in ScrollReveal
│   ├── Drinks            ← Req 2: header + image wrapped in ScrollReveal
│   ├── Evening           ← Req 2: header + image + items wrapped in ScrollReveal
│   │   └── PortholeMask  ← Req 4 (optional): circular video in Evening or Experience
│   └── Visit             ← Req 2: heading + info groups wrapped in ScrollReveal
└── Footer
```

Motion is centralised in Framer Motion. CSS `@keyframes` are NOT used for the new scroll-reveal animations (existing `motion.css` keyframes for other use-cases remain untouched).

---

## Components and Interfaces

### 1. `CircularOverlay`

New component. Wraps the existing `CircularText` in a fixed-position container.

```tsx
// src/components/CircularOverlay.tsx
interface CircularOverlayProps {
  /** Pass-through: text rendered on the spinning ring */
  text?: string;
  /** Pass-through: full rotation duration in seconds */
  spinDuration?: number;
}
```

Defaults: `text = "BAR & KITCHEN · PALA · BLUE MOON · "`, `spinDuration = 22`.

- `position: fixed`, `top: 50%`, `left: 50%`, `transform: translate(-50%, -50%)`
- `z-index: var(--z-overlay)` — new token sitting between `--z-elevated` (10) and `--z-nav` (100); proposed value **50**
- `pointer-events: none` on the outer wrapper; `pointer-events: auto` on the inner `CircularText` for hover effects
- On mobile (≤ 768 px): hidden via `display: none` to avoid obscuring navigation and hero content
- When `useReducedMotion()` returns `true`: `spinDuration` is passed as `0`; `CircularText` will render letters statically with no rotation

### 2. `ScrollReveal`

New reusable component. Wraps any child in a Framer Motion element that animates in on first viewport entry.

```tsx
// src/components/ScrollReveal.tsx
interface ScrollRevealProps {
  children: React.ReactNode;
  /** Sequential index within a stagger group — drives delay = index × 0.12 s */
  index?: number;
  /** Override wrapper element tag (default: 'div') */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}
```

Animation spec:
- `hidden`: `{ opacity: 0, y: 24 }`
- `visible`: `{ opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.12, ease: [0.2, 0.6, 0.3, 1] } }`
- `whileInView="visible"`, `initial="hidden"`, `viewport={{ once: true }}`
- When `useReducedMotion()` returns `true`: renders children directly (no motion wrapper, full opacity, zero offset)

Usage pattern in each section:

```tsx
<ScrollReveal index={0}><h2>Kitchen</h2></ScrollReveal>
<ScrollReveal index={1}><p>Kerala favourites…</p></ScrollReveal>
{filteredItems().map((item, i) => (
  <ScrollReveal key={item.name} index={i}>
    <div className="food-item">…</div>
  </ScrollReveal>
))}
```

### 3. `Navigation` (modified)

The existing `Navigation` component already tracks `isScrolled` but fires at 100 px. The threshold is updated to **80 px** per requirement 3.2. The CSS class `.scrolled` already applies `backdrop-filter: blur(12px)` and a light background — no CSS changes are needed beyond confirming the transition token matches `var(--duration-md)` (300 ms) and `var(--ease-out)`.

When `useReducedMotion()` returns `true`, the CSS transition on `.navigation` is overridden to `transition: none` so the background state switches instantly.

```tsx
// Addition to Navigation.tsx
const shouldReduceMotion = useReducedMotion();
// …
<nav
  className={`navigation ${isScrolled ? 'scrolled' : ''} ${shouldReduceMotion ? 'no-transition' : ''}`}
>
```

```css
/* Navigation.css addition */
.navigation.no-transition {
  transition: none !important;
}
```

### 4. `PortholeMask` (optional)

New component. Renders a `<video>` clipped to a circle.

```tsx
// src/components/PortholeMask.tsx
interface PortholeMaskProps {
  videoSrc: string;
  /** Max diameter in px (default: 480 on desktop, 260 on mobile via CSS) */
  size?: number;
}
```

- Container: `border-radius: 50%`, `overflow: hidden`, `aspect-ratio: 1`
- Max-width capped at 480 px desktop / 260 px mobile via CSS media query
- `<video>` attributes: `autoPlay muted loop playsInline` — no `controls`
- ScrollReveal entry: `scale: 0.92, opacity: 0` → `scale: 1, opacity: 1` using a `motion.div` wrapper with `whileInView`
- When `useReducedMotion()`: no scroll reveal, renders at full scale/opacity

---

## Data Models

No new persistent data or API data structures are introduced. The only runtime state additions are:

| Component | New State / Derived Value | Type |
|---|---|---|
| `Navigation` | `shouldReduceMotion` | `boolean` (from Framer Motion hook) |
| `CircularOverlay` | `shouldReduceMotion` | `boolean` (from Framer Motion hook) |
| `ScrollReveal` | `shouldReduceMotion` | `boolean` (from Framer Motion hook) |
| `PortholeMask` | `shouldReduceMotion` | `boolean` (from Framer Motion hook) |

The `Navigation` scroll threshold changes from 100 px to 80 px (internal constant, no new state shape).

### Design Token Addition

A new z-index layer is required:

```css
/* tokens.css addition */
--z-overlay: 50;  /* CircularOverlay: above sections, below nav (--z-nav: 100) */
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Stagger delay scales linearly with index

*For any* `ScrollReveal` stagger group of N elements, each element at index i (0-based) SHALL have an animation delay equal to `i × 0.12` seconds.

**Validates: Requirements 2.3**

### Property 2: Navigation scrolled state is determined solely by scroll threshold

*For any* page scroll position y (in pixels), the Navigation component's scrolled state SHALL be `true` if and only if `y > 80`, and `false` otherwise.

**Validates: Requirements 3.2**

### Property 3: PortholeMask maintains 1:1 aspect ratio at all viewport widths

*For any* rendered viewport width, the PortholeMask container element SHALL have equal computed width and height (i.e., `aspect-ratio: 1` is preserved), ensuring the video is always displayed as a perfect circle.

**Validates: Requirements 4.3**

---

## Error Handling

| Scenario | Handling |
|---|---|
| `CircularOverlay` rendered before fonts load | `CircularText` letters are absolutely positioned; layout does not depend on font metrics. No special handling needed. |
| `PortholeMask` video source unavailable | The `<video>` element renders an empty circle; no error state is shown (consistent with `BackgroundVideo` pattern). |
| `ScrollReveal` wrapping a component that does not accept `className` | The `as` prop defaults to `'div'`, so `ScrollReveal` always owns its own DOM node. Children need not accept className. |
| `useReducedMotion()` returns `null` (SSR / pre-hydration) | Framer Motion returns `null` on the server; treat as `false` (animations enabled) via `shouldReduceMotion ?? false`. |
| Large `index` values in stagger groups | Delays grow linearly. For very long lists (e.g. full food menu, ~50 items) the last item's delay reaches ~6 s. Cap `index` at a maximum of 12 for list items to keep last delay ≤ 1.44 s. |

---

## Testing Strategy

### Dual approach

Unit tests verify specific examples and edge cases. Property-based tests verify universal invariants across many generated inputs. Both are necessary.

### Property-based testing library

**[fast-check](https://github.com/dubzzz/fast-check)** — the standard PBT library for the TypeScript/JavaScript ecosystem, zero runtime dependencies, works with Vitest.

Install:
```bash
npm install --save-dev fast-check vitest @testing-library/react @testing-library/jest-dom
```

Each property test is configured to run a minimum of **100 iterations**.

Tag format: `Feature: blue-moon-animations, Property {N}: {property_text}`

### Property tests

**Property 1 — Stagger delay scales linearly**
```
Feature: blue-moon-animations, Property 1: Stagger delay scales linearly with index
```
Generate: integer N in [1, 20], integer i in [0, N-1].
Assert: the `ScrollReveal` component at index i produces a transition delay of `i * 0.12` (within floating-point tolerance).

**Property 2 — Navigation scrolled state**
```
Feature: blue-moon-animations, Property 2: Navigation scrolled state is determined solely by scroll threshold
```
Generate: integer y in [0, 2000] (scroll position).
Assert: the `isScrolled` value in Navigation equals `y > 80`.

**Property 3 — PortholeMask aspect ratio**
```
Feature: blue-moon-animations, Property 3: PortholeMask maintains 1:1 aspect ratio at all viewport widths
```
Generate: integer viewportWidth in [320, 1920].
Assert: rendered PortholeMask container has `offsetWidth === offsetHeight` (or `aspect-ratio` CSS value is `1`).

### Unit tests (example-based)

- `CircularOverlay` renders with `position: fixed` and `pointer-events: none`
- `CircularOverlay` is hidden on ≤ 768 px viewport
- `CircularOverlay` passes correct `text` and `spinDuration` props to `CircularText`
- `CircularOverlay` with `useReducedMotion()` mocked to `true`: `spinDuration` is `0`
- `ScrollReveal` renders with `whileInView` and `viewport: { once: true }`
- `ScrollReveal` with reduced motion: renders children without motion wrapper, full opacity
- `Navigation` at scroll 0: does not have `.scrolled` class
- `Navigation` with reduced motion: transition is disabled (`no-transition` class applied)
- `PortholeMask`: video has `autoPlay`, `muted`, `loop`, `playsInline` attributes; no `controls`
- `PortholeMask` with reduced motion: no scale-in animation applied

### Accessibility

- All animation components use `useReducedMotion()` — covered by the unit tests above
- `CircularOverlay` is `aria-hidden="true"` (decorative, not content-bearing)
- `PortholeMask` video has no `controls` and is decorative; wrap with `aria-hidden="true"`
