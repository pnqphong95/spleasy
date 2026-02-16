# Spleasy - UI Design Principles & Design System

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

## 1. Core Design Philosophy: Modern Minimalism ("Invisible Utility")

For Spleasy, our design philosophy centers on **"Invisible Utility"**. The app should feel less like a tool you have to learn and more like a natural extension of a group's conversation.

### Guiding Principles
1.  **Content Over Chrome**: Remove unnecessary borders, shadows, and containers. Let the data (expenses, names, balances) breathe with ample whitespace.
2.  **Radical Simplicity**: If an element doesn't help the user *split a bill* or *get paid*, it doesn't belong on the screen.
3.  **Thumb-Driven Ergonomics**: Primary actions (Add Expense, Settle Up) are placed in a fixed **Bottom Bar** for easy access.
4.  **Optimistic & Fluid**: Interactions should feel instant. Use micro-animations to confirm actions without blocking flow.
5.  **Clarity via Contrast**: Use typography weight and background contrast to create hierarchy, rather than heavy borders.

---

## 2. Color System (OKLCH)

We utilize the **OKLCH** color space for consistent perceived lightness across the application.

### Base Composition
*   **Background**: `oklch(0.985 0 0)` (Zinc 50) - Soft off-white to reduce glare.
*   **Surface**: `oklch(1 0 0)` (White) - Used for cards and modals.
*   **Text Primary**: `oklch(0.141 0.005 285.823)` (Zinc 900) - High contrast for readability.
*   **Text Muted**: `oklch(0.552 0.016 285.938)` (Zinc 500) - Metadata and supporting text.
*   **Border**: `oklch(0.92 0.004 286.32)` (Zinc 200) - Used sparingly.

### Primary Accent: "Electric Indigo"
*   **Primary**: `oklch(0.558 0.235 285.805)` (Violet 600) - Solid buttons, active states.
*   **Primary Light**: `oklch(0.967 0.001 286.375)` (Violet 50) - Backgrounds for active items.

### Functional Colors
*   **Success**: Emerald 500 - Settled debts.
*   **Destructive**: Rose 500 - Deletions and "You owe" states.
*   **Warning**: Amber 500 - Pending alerts.

---

## 3. Typography

**Font Family**: `Inter` (sans-serif).
**Numbers**: `tabular-nums` is **MANDATORY** for all financial data to ensure vertical alignment.

| Scale | Style | Usage |
| :--- | :--- | :--- |
| **Display** | `text-4xl` to `text-6xl` font-bold tracking-tighter | Hero amounts, total balances. |
| **Heading** | `text-2xl` font-semibold tracking-tight | Page titles. |
| **Subheading** | `text-lg` font-medium | Card titles. |
| **Body** | `text-base` font-normal leading-relaxed | Default text. |
| **Label** | `text-xs` font-semibold uppercase tracking-wider | Badges, small metadata. |

---

## 4. Component Guidelines

### Style Decision: Flat & Airy
We have adopted the **Flat & Airy** style.
*   **Borders**: Minimal to none.
*   **Separation**: Achieved through whitespace and subtle background colors (`bg-zinc-50/50`).
*   **Shadows**: Very soft or non-existent (`shadow-none` or `shadow-sm`).

### Buttons
*   **Shape**: `rounded-full` (Pill).
*   **Height**: `h-12` (48px) for primary actions to ensure easy touch targets.
*   **Primary**: Solid Electric Indigo background.
*   **Secondary**: Ghost or widely spaced outline.

### Cards
*   **Shape**: `rounded-[1.25rem]` (20px) for a friendly, modern feel.
*   **Background**: `bg-zinc-50/50` (Light) / `bg-zinc-900/50` (Dark).
*   **Border**: None (or extremely subtle `border-transparent`).

### Inputs
*   **Style**: Minimalist. `border-b` (Underline) or transparent backgrounds for smooth "form-filling" experience.
*   **Focus**: Soft ring, no jarring color shifts.

---

## 5. Layout & Spacing

*   **Mobile-First**: All designs assume a mobile viewport first.
*   **Container**: Max-width restricted on desktop to maintain app-like focus.
*   **Touch Targets**: Minimum **44x44px** for all interactive elements.
*   **Spacing Unit**: 4px (Tailwind standard).
*   **Section Padding**: Generous vertical padding (`py-24` or `py-32`) to create a breathable layout.

---

## 6. Navigation Structure

### Mobile
*   **Bottom Bar**: Primary navigation and "Add Expense" action are fixed at the bottom of the screen.
*   **Reachability**: Critical actions are always within the "Thumb Zone".

### Desktop
*   **Responsive**: The bottom bar may transition to a sidebar or top header, but the core "list" view remains centered.
