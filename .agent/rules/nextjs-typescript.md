---
trigger: model_decision
description: Applies Next.js App Router, TypeScript, and Tailwind CSS best practices when working on the web application.
globs: **/*.ts, **/*.tsx, **/*.js, **/*.jsx, **/*.css
---

# Next.js & TypeScript Best Practice Rules

## General

- Use the **App Router** (`app/` directory) for all new pages and layouts.
- Prefer **Server Components** by default. Only use Client Components (`"use client"`) when interactivity (state, effects, event listeners) is required.
- Isolate Client Components to the leaves of the component tree to maximize server-side rendering benefits.

## TypeScript

- Do not use `any`. Use `unknown` if the type is truly uncertain, or be specific.
- Use `interface` for object definitions and `type` for unions/intersections.
- Strongly type all component props. Use `React.FC` or explicitly type the `props` argument (e.g., `({ id }: { id: string })`).
- Use `zod` for runtime validation of API responses and form data.
- Ensure strict null checks are enabled (standard in modern TS configs).

## Next.js Specifics

- **Images**: Always use `next/image` (`<Image />`) instead of `<img>`. Ensure `width` and `height` are provided or `fill` is used correctly.
- **Links**: Use `next/link` (`<Link />`) for internal navigation. Do not use `<a>` tags for internal links.
- **Data Fetching**: Use `fetch` with caching options (`force-cache`, `no-store`) in Server Components. Avoid `useEffect` for data fetching in Client Components; use SWR or React Query if client-side fetching is needed.
- **Server Actions**: Use Server Actions for form submissions and mutations instead of API routes where possible.
- **Metadata**: Use the Metadata API for SEO (title, description, open graph) in `layout.tsx` and `page.tsx`.

## Styling

- Use **Tailwind CSS** for styling.
- Utilize generic utility classes. Avoid custom CSS classes unless necessary for complex animations or specific component overrides.
- Use `clsx` or `cn` (classnames utility) for conditional class application.

## State Management

- Use URL search parameters for global state (e.g., filters, pagination) where appropriate to make the UI shareable.
- Use `useContext` or global state libraries (like Zustand) sparingly; prefer local state or server state.

## Folder Structure

- Colocate components, styles, and tests with their routes or features.
- Use `_components` folder inside routes for route-specific components that shouldn't be publicly accessible.
- Use `(group)` folders for route grouping without affecting the URL path.
