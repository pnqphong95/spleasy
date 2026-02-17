# Spleasy Design System 2.0: "The Trendy Boutique"

> **Philosophy**: "Invisible Utility meets Bento Clarity."
> We combine the radical simplicity of _Invisible Utility_ with the warmth and structure of modern _Bento Grids_.

---

## 1. Core Principles

1.  **Mobile-First & Thumb-Driven**:
    - Navigation and primary actions (Add Expense, Settle) live in the **bottom 30%** of the screen.
    - Top of screen is for Viewing (Balance, Charts), Bottom is for Acting.

2.  **Bento Grid Layouts**:
    - Data isn't just a list; it's organized into glanceable, beautiful blocks.
    - _Example_: A large square block for "Total Balance", rectangular blocks for "Recent Activity".

3.  **Invisible Containers**:
    - Borders are largely removed in favor of **Soft Backgrounds** (`bg-zinc-50` or `bg-white/50`).
    - Separation is created by whitespace and color blocks, not lines.

4.  **Optimistic & Fluid**:
    - Every interaction has a micro-animation.
    - Swiping, tapping, and paying feels "juicy" (haptic feedback + spring physics).

---

## 2. Typography

We pair a geometric display font with a utilitarian body font for a premium "Fintech" feel.

### Headings: **Plus Jakarta Sans**

_Geometric, friendly, modern, great Vietnamese support._

- **Heroes**: `text-5xl` font-bold (Balance Displays).
- **Titles**: `text-2xl` font-semibold (Page Headers).

### Body: **Inter**

_Clean, neutral, highly legible._

- **Body**: `text-base` font-normal (Transaction details).
- **Mono**: `Geist Mono` (Financial data tables).

> **Rule**: Use `tabular-nums` for ALL numbers to ensure alignment.

---

## 3. Color System (OKLCH)

We use **OKLCH** for perceptual uniformity. The palette is "Calm but Confident."

### Primary Brand

- **Electric Indigo**: `oklch(0.55 0.22 276.0)`
  - _Usage_: Primary Buttons, Active States, Brand Icons.
- **Soft Indigo**: `oklch(0.96 0.01 276.0)`
  - _Usage_: Tinted backgrounds for active items.

### Semantic Colors ("The Money Logic")

Moved away from standard "Traffic Light" colors to more modern, softer hues.

- **Money In (You are owed)**: **Mint / Teal**
  - Value: `oklch(0.7 0.14 160)`
  - _Vibe_: "Relaxed, money is coming."
- **Money Out (You owe)**: **Coral / Rose**
  - Value: `oklch(0.65 0.18 15)`
  - _Vibe_: "Urgent but polite."
- **Settled**: **Slate / Zinc**
  - Value: `oklch(0.6 0.04 260)`

### Backgrounds

- **Light Mode**:
  - App BG: `oklch(0.985 0 0)` (Soft Zinc 50) - Not harsh white.
  - Card BG: `oklch(1 0 0)` (Pure White).
- **Dark Mode**:
  - App BG: `oklch(0.14 0.01 285)` (Rich Zinc 900).
  - Card BG: `oklch(0.20 0.01 285)` (Lighter Zinc 800).

---

## 4. Components & Shape Language

### Shapes: "Super-Rounded"

- **Cards**: `rounded-3xl` (24px) or `rounded-[2rem]` (32px).
  - _Why_: Feels organic and friendly, like a physical object.
- **Buttons**: `rounded-full` (Pill shape).

### The "Bill Card" (Bento Style)

Instead of a single line item:

- **Container**: Large rounded rectangle.
- **Layout**:
  - Left: Merchant Icon (large).
  - Middle: Title & Date.
  - Right: Amount (Colored by status).
- **Interaction**: Swipe right to "Settle", Swipe left to "Remind".

### Navigation

- **Floating Tab Bar**: A floating pill listing "Groups | Friends | Account" at the bottom.
- **FAB**: A massive, glowing "+" button floating above the tab bar.

---

## 5. Spacing & Depth

- **Whitespace**: Generous. Minimum padding `p-6`.
- **Depth**: Minimal shadows. Depth is conveyed through **Color Layering** (Darker BG -> Lighter Card -> White Input).
- **Blur**: Heavy use of `backdrop-blur-md` on navigation elements to maintain context.

---

## 6. Implementation Checklist

1.  [ ] **Update `globals.css`**: Inject new OKLCH Mint/Coral values.
2.  [ ] **Add Fonts**: Import `Outfit` via `next/font`.
3.  [ ] **Refactor Radius**: Update global radius to `1.5rem` minimum.
4.  [ ] **Bento Dashboard**: Redesign Home screen to use Grid layout.
