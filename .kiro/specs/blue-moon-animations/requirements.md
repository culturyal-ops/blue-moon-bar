# Requirements Document

## Introduction

This feature adds a layered set of scroll and animation effects to the Blue Moon bar & kitchen website — a React + Vite + TypeScript + Framer Motion project with CSS modules / plain CSS (no Tailwind).

The four effects in scope are:

1. **Circular text fixed overlay** — A `CircularText` component (already exists at `src/components/CircularText.tsx`) is fixed on screen as a porthole, while page sections scroll behind it. This is the hero feature of this animation pass.
2. **Scroll-triggered content reveals** — Section content (headings, descriptions, images, menu items) animates in as the user scrolls into view.
3. **Sticky navigation refinement** — The existing fixed navigation gains a scrolled-state visual treatment.
4. **Circular video element** — The hero background video can optionally be used as a circular clipped element.

All effects must respect `prefers-reduced-motion` and must not alter the hero layout which is already approved.

## Glossary

- **CircularOverlay**: The fixed-position `CircularText` wrapper that sits above all page sections and persists throughout scrolling.
- **PortholeMask**: A circular `clip-path` or `border-radius: 50%` mask applied to the video element to render it as a circle.
- **ScrollReveal**: A Framer Motion `whileInView` animation that fades and translates content into view as it enters the viewport.
- **ReducedMotion**: The `prefers-reduced-motion: reduce` media query / Framer Motion `useReducedMotion()` hook that disables or minimises animations for users who prefer it.
- **Navigation**: The existing `Navigation` component at `src/components/Navigation.tsx`, already `position: fixed`.
- **Hero**: The existing `Hero` section at `src/components/Hero.tsx`. Its layout must not be changed by this feature.
- **SectionContent**: Headings, body text, images, and menu grid items within `Experience`, `Food`, `Drinks`, `Evening`, and `Visit` sections.

---

## Requirements

### Requirement 1: Circular Text Fixed Overlay

**User Story:** As a visitor to the Blue Moon website, I want to see a circular spinning text element fixed on screen as I scroll, so that the brand identity is continuously present and creates a porthole-through-sections visual effect.

#### Acceptance Criteria

1. THE CircularOverlay SHALL be rendered at `position: fixed` with a `z-index` above all page sections and below the navigation bar.
2. WHEN the page loads, THE CircularOverlay SHALL be visible without any user interaction.
3. WHILE the user scrolls, THE CircularOverlay SHALL remain fixed in its viewport position so that page sections appear to pass behind it.
4. THE CircularOverlay SHALL display the `CircularText` component with the text `"BAR & KITCHEN · PALA · BLUE MOON · "` and a `spinDuration` of 22 seconds.
5. THE CircularOverlay SHALL be positioned at the horizontal and vertical centre of the viewport on desktop screens (≥ 769 px).
6. WHERE the viewport width is ≤ 768 px, THE CircularOverlay SHALL be repositioned or hidden to avoid obscuring primary navigation or hero content.
7. IF `prefers-reduced-motion` is enabled, THEN THE CircularOverlay SHALL render the `CircularText` without rotation animation, displaying it as a static ring of text.
8. THE CircularOverlay SHALL have `pointer-events: none` on its container so that it does not block interaction with content scrolling beneath it.

---

### Requirement 2: Scroll-Triggered Content Reveals

**User Story:** As a visitor, I want section content to animate gracefully into view as I scroll down the page, so that the reading experience feels immersive and intentional rather than static.

#### Acceptance Criteria

1. WHEN a `SectionContent` element enters the viewport, THE ScrollReveal SHALL animate the element from `opacity: 0, y: 24px` to `opacity: 1, y: 0`.
2. THE ScrollReveal animation SHALL use a duration of 0.6 seconds and an ease of `[0.2, 0.6, 0.3, 1]` (matching the existing Hero fade-up timing).
3. WHEN multiple `SectionContent` elements appear in the same section, THE ScrollReveal SHALL apply a staggered delay of 0.12 seconds between consecutive elements so that they enter sequentially.
4. THE ScrollReveal SHALL use Framer Motion `whileInView` with `viewport: { once: true }` so that each element animates only the first time it enters view.
5. THE ScrollReveal SHALL be applied to: section headings and intro paragraphs in `Experience`, `Food`, `Drinks`, `Evening`, and `Visit`; images in `Experience`, `Drinks`, and `Evening`; and individual menu item cards in the `Food` grid and `Evening` items list.
6. IF `prefers-reduced-motion` is enabled, THEN THE ScrollReveal SHALL render all `SectionContent` elements at full opacity and zero offset without animation, using `useReducedMotion()` from Framer Motion.
7. THE ScrollReveal implementation SHALL use Framer Motion `motion` components and SHALL NOT introduce CSS `@keyframes` for the reveal animation, maintaining a single animation system.

---

### Requirement 3: Sticky Navigation Visual State

**User Story:** As a visitor, I want the navigation bar to visually indicate when I have scrolled past the hero, so that I always know where I am and the nav remains legible against light section backgrounds.

#### Acceptance Criteria

1. WHILE the page scroll position is 0, THE Navigation SHALL render with a transparent or near-transparent background as it does today.
2. WHEN the page scroll position exceeds 80 px, THE Navigation SHALL transition to a frosted-glass background (`backdrop-filter: blur`) with sufficient contrast for its text links to remain readable against light `--paper` and `--ice` section backgrounds.
3. THE background transition SHALL complete within 300 ms using `transition: background var(--duration-md) var(--ease-out)`.
4. THE Navigation SHALL remain `position: fixed` with a `z-index` above all other page content including the CircularOverlay.
5. IF `prefers-reduced-motion` is enabled, THEN THE Navigation SHALL apply the scrolled background state immediately without a transition animation.

---

### Requirement 4: Circular Video Element (Optional)

**User Story:** As a visitor, I want to see the hero video used as a circular element alongside content in one section, so that the cinematic brand identity extends beyond the hero.

#### Acceptance Criteria

1. WHERE the circular video feature is enabled, THE PortholeMask SHALL clip the hero background video (or a duplicate `<video>` element) to a circle using `border-radius: 50%` and `overflow: hidden`.
2. WHERE the circular video feature is enabled, THE PortholeMask element SHALL be no larger than 480 px in diameter on desktop and no larger than 260 px on mobile.
3. THE PortholeMask element SHALL maintain a 1:1 aspect ratio at all viewport widths using `aspect-ratio: 1`.
4. WHERE the circular video feature is enabled and `prefers-reduced-motion` is NOT enabled, THE PortholeMask element SHALL enter view with a `ScrollReveal` scale-in animation (from `scale: 0.92, opacity: 0` to `scale: 1, opacity: 1`).
5. IF `prefers-reduced-motion` is enabled, THEN THE PortholeMask SHALL render at full opacity and full scale without any entry animation.
6. THE PortholeMask video SHALL have `autoPlay`, `muted`, `loop`, and `playsInline` attributes set and SHALL NOT include playback controls.
