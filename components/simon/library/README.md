# Simon transverse UI library

This folder contains reusable Simon UI components for approved mobile views.

Use these components when a screen needs the same visual language with different
data, actions or labels:

```tsx
import { SimonComponent, SimonShortcutGrid } from "@/components/simon/library"
```

## Main components

- `SimonTopBar`: greeting, user name, logo, CTA and header actions.
- `SimonShortcutGrid`: parameterized grid for shortcuts or feature access.
- `SimonBottomNavigation`: mobile bottom navigation with icons, labels and an active asset.
- `SimonSurface`: shared Simon surface variants: `neo`, `flat`, `tag`, `outline`.
- `SimonComponent`: registry entry point for screens that prefer naming the component through `component`.

## Usage pattern

```tsx
<SimonComponent
  component="shortcut-grid"
  items={[
    { label: "Simon Pay", icon: <Icon />, onClick: openSimonPay },
  ]}
/>
```

Keep screen-specific data in the screen or feature folder. Keep shared behavior,
spacing, tokens and accessibility defaults here.
