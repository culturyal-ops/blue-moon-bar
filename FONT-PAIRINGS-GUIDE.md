# 🎨 Blue Moon Typography Guide

## Fonts Applied

Your site now uses a carefully selected combination of **free Google Fonts** inspired by premium designs:

### 🏛️ League Spartan (for all section titles)
**Alternative to: MESHED Display**
- Bold, geometric, ultra-modern sans-serif
- Used for: All section headings (Food, Visit, Gallery)
- Style: Uppercase, bold (700), tight letter-spacing

### 👑 Cinzel (for hero/logo)
**Alternative to: HUMANE**
- Elegant, condensed serif with classical proportions
- Used for: "Blue Moon" logo and welcome text
- Style: Semibold (600), slightly open letter-spacing

### ✍️ Libre Baskerville (for accents)
**Alternative to: Classic serif details**
- Refined serif with beautiful italics
- Used for: Special callouts, decorative text
- Style: Italic for emphasis

### 📖 Cormorant Garamond (for body text)
- Elegant, highly readable serif
- Used for: Menu descriptions, paragraphs
- Style: Regular weight, relaxed line-height

### 🎯 Quicksand (for UI elements)
- Soft, rounded geometric sans
- Used for: Buttons, navigation, labels
- Style: Medium weight (500-600)

---

## ✅ What's Been Updated

All section titles across your site now use **League Spartan** (like MESHED Display):
- ✓ Food section: "What's on offer"
- ✓ Visit section: "Come visit us"
- ✓ Gallery section: "Inside the evening"

The hero logo "Blue Moon" now uses **Cinzel** (like HUMANE):
- ✓ Hero section: Large, elegant, condensed serif
- ✓ Welcome tagline styling updated

---

## 🎨 Font Variables Reference

Use these CSS variables in your components:

```css
/* Section titles - League Spartan (MESHED style) */
font-family: var(--font-display);

/* Hero/Logo - Cinzel (HUMANE style) */
font-family: var(--font-hero);

/* Accent text - Libre Baskerville */
font-family: var(--font-accent);

/* Body text - Cormorant Garamond */
font-family: var(--font-body);

/* UI elements - Quicksand */
font-family: var(--font-ui);
```

---

## 📐 Typography Scale & Usage

### Section Titles (League Spartan)
```css
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.95;
}
```

### Hero Logo (Cinzel)
```css
.hero-logo {
  font-family: var(--font-hero);
  font-size: clamp(3.5rem, 12vw, 8rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 0.85;
}
```

### Menu Item Names (Cormorant Garamond)
```css
.item-name {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: var(--leading-snug);
}
```

### Special Callouts (Libre Baskerville)
```css
.special-tag {
  font-family: var(--font-accent);
  font-size: var(--text-lg);
  font-style: italic;
  font-weight: 400;
}
```

### Buttons & Navigation (Quicksand)
```css
.button {
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

---

## 💡 Design Principles

### 1. Hierarchy Through Contrast
- **Display fonts** (League Spartan) are bold, geometric, commanding
- **Hero font** (Cinzel) is elegant, refined, memorable
- **Body fonts** (Cormorant) are readable, elegant, comfortable

### 2. Consistent Application
All section titles follow the same pattern:
- Uppercase transformation
- Bold weight (700)
- Tight line-height (0.95)
- Slight positive letter-spacing (0.02em)

### 3. Responsive Sizing
Using `clamp()` for fluid typography:
```css
/* Mobile → Tablet → Desktop */
font-size: clamp(2rem, 5vw, 4rem);
```

---

## 🎯 Visual Comparison

| Element | Font | Similar To |
|---------|------|------------|
| Section Titles | **League Spartan** | MESHED Display, MORGANITE |
| Hero Logo | **Cinzel** | HUMANE, League Spartan (condensed) |
| Accents | **Libre Baskerville** | MERCHANT, Classic serifs |
| Body Text | **Cormorant Garamond** | EMBERLY, Noto Serif |
| UI Elements | **Quicksand** | GENTUP, Rounded sans |

---

## 🚀 Performance

All fonts are loaded from Google Fonts with optimizations:
- Preconnect for faster DNS resolution
- Display swap for immediate text rendering
- Only loading required weights to minimize bundle size

---

## 📱 Mobile Optimization

Typography scales appropriately on all devices:
- Hero logo: 2.5rem → 8rem
- Section titles: 2rem → 5rem
- Body text: 1rem → 1.125rem

All text remains readable and maintains hierarchy across breakpoints.

---

## 🎨 Next Steps

Want to customize further? You can:
1. Adjust font weights in `tokens.css`
2. Modify letter-spacing for tighter/looser feel
3. Try different uppercase/lowercase combinations
4. Add font-variant settings for stylistic alternatives

**All your fonts are live and ready!** Just refresh your browser to see the new typography.

---

## 🍽️ Option 1: Fine Dining

**Playfair Display + Dancing Script**

![Similar to: Essonnes & Parlare]

### Why it works:
- **Playfair Display**: High-contrast elegant serif, gives that luxury magazine editorial feel
- **Dancing Script**: Flowing, handwritten elegance perfect for special callouts

### Best for:
- Formal, upscale restaurant aesthetic
- Menu cards that feel "printed"
- Special occasion dining

### Usage:
```css
/* Logo and main headings */
.hero-title {
  font-family: var(--font-display); /* Playfair Display */
  font-weight: 700;
}

/* Menu descriptions, "Special of the day" */
.special-callout {
  font-family: var(--font-accent); /* Dancing Script */
  font-size: 1.5rem;
}
```

### Activate in `tokens.css`:
```css
--font-display: "Playfair Display", "Bodoni Moda", serif;
--font-accent: "Dancing Script", cursive;
--font-body: "Cormorant Garamond", Georgia, serif;
--font-ui: "Jost", system-ui, sans-serif;
```

---

## 🌟 Option 2: Modern Trendy ✓ CURRENTLY ACTIVE

**Bebas Neue + Pacifico**

![Similar to: Bebas Neue & Gelato Luxe]

### Why it works:
- **Bebas Neue**: Tall, condensed, bold - exactly what's trending in modern cafes
- **Pacifico**: Soft, flowing brush script adds warmth and personality

### Best for:
- Instagram-worthy modern bistro aesthetic
- Casual but stylish bars and cafes
- Young, trendy audience

### Usage:
```css
/* Category headers: KERALA BEEF, PORK, CHICKEN */
.food-category {
  font-family: var(--font-display); /* Bebas Neue */
  font-size: 3rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Taglines and highlights */
.menu-highlight {
  font-family: var(--font-accent); /* Pacifico */
  font-size: 1.75rem;
}
```

### Already Active!
Just save your files and refresh your browser to see the changes.

---

## 💎 Option 3: Classic Elegant

**Gilda Display + Jost**

![Similar to: Norman & Ebony Light]

### Why it works:
- **Gilda Display**: Refined serif with delicate details, very "high-end lounge"
- **Jost**: Modern geometric sans-serif, clean and highly readable

### Best for:
- Upscale lounge or hotel bar
- Most readable for full menus
- Sophisticated, timeless aesthetic

### Usage:
```css
/* Elegant headings */
.section-title {
  font-family: var(--font-display); /* Gilda Display */
  font-weight: 400;
  font-size: 3.5rem;
}

/* Body text and menu items */
.menu-description {
  font-family: var(--font-body); /* Jost */
  font-weight: 300;
  line-height: 1.7;
}
```

### Activate in `tokens.css`:
```css
--font-display: "Gilda Display", serif;
--font-body: "Jost", sans-serif;
--font-accent: "Gilda Display", serif;
--font-ui: "Jost", sans-serif;
```

---

## 🔄 How to Switch Between Options

1. Open `src/tokens.css`
2. Find the "TYPOGRAPHY — FREE GOOGLE FONTS" section (~line 20)
3. Comment out the current active fonts (wrap with `/*` and `*/`)
4. Uncomment your desired option
5. Save and refresh your browser

Example:
```css
/* Option 2 - Comment out to deactivate */
/*
--font-display: "Bebas Neue", "Arial Narrow", sans-serif;
--font-accent: "Pacifico", cursive;
*/

/* Option 1 - Uncomment to activate */
--font-display: "Playfair Display", "Bodoni Moda", serif;
--font-accent: "Dancing Script", cursive;
```

---

## 📝 CSS Variable Reference

Use these throughout your components:

### `--font-display`
Large titles, hero text, category headers
```css
font-family: var(--font-display);
```

### `--font-accent`
Script text, decorative elements, special callouts
```css
font-family: var(--font-accent);
```

### `--font-body`
Paragraphs, descriptions, menu items
```css
font-family: var(--font-body);
```

### `--font-ui`
Buttons, navigation, labels, form inputs
```css
font-family: var(--font-ui);
```

---

## 🎯 Real-World Examples

### Example 1: Food Menu Category
```css
.category-header {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
}
```

### Example 2: Special Tag/Badge
```css
.chef-special {
  font-family: var(--font-accent);
  font-size: var(--text-lg);
  color: var(--moon-blue);
  font-style: italic;
}
```

### Example 3: Menu Item Name
```css
.dish-name {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-navy);
}
```

### Example 4: Blue Moon Logo
```css
.site-logo {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-primary);
}
```

---

## 💡 Pro Tips

1. **Script fonts are for accents only** - Don't use Pacifico or Dancing Script for paragraphs. They're meant for short, impactful text.

2. **Bebas Neue needs letter-spacing** - Always add `letter-spacing: 0.03em` to `0.05em` when using Bebas Neue for better readability.

3. **Test on mobile** - Script fonts can be harder to read on small screens. Keep them larger than 16px.

4. **Use font weights wisely**:
   - Playfair Display: 400 (regular), 600 (semibold), 700 (bold)
   - Dancing Script: 400-700 (variable)
   - Jost: 300-600 (light to semibold)

5. **Pairing hierarchy**:
   - Display font → Headings, categories, hero
   - Accent font → Special tags, decorative text
   - Body font → Descriptions, paragraphs
   - UI font → Buttons, navigation, forms

---

## 🔍 Visual Comparison

| Style | Vibe | Best Match From Image |
|-------|------|----------------------|
| **Fine Dining** | Formal, elegant, special occasion | "DESIGN Success" (top left) |
| **Modern Trendy** ✓ | Casual, Instagram-ready, trendy | "STROKE Beauty" (middle left) |
| **Classic Elegant** | Refined, timeless, readable | "FRESCA" (bottom left) |

---

## ✅ What's Already Set Up

- ✓ All three font options loaded from Google Fonts
- ✓ CSS variables configured in `tokens.css`
- ✓ Option 2 (Modern Trendy) active by default
- ✓ Fallback fonts included for reliability
- ✓ Performance optimized with `&display=swap`

**You're ready to go!** Just pick your style and start using the CSS variables in your components.

---

## 🎨 Component Style Suggestions

### For Food.tsx categories:
```css
.category-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

### For Hero section tagline:
```css
.hero-tagline {
  font-family: var(--font-accent);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--moon-blue);
}
```

### For menu item descriptions:
```css
.item-description {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-muted);
}
```

---

## 🚀 Next Steps

1. Browse your site and see Option 2 in action
2. Try switching to Option 1 or 3 to compare
3. Adjust font sizes using the existing CSS variables in `tokens.css`
4. Apply `var(--font-accent)` to any special callouts or badges

**Need help applying these to specific components?** Just let me know which section you want to style!
