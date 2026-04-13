---
name: No inline styles — use Tailwind CSS only
description: User prefers Tailwind CSS classes over inline styles for all styling changes
type: feedback
---

Always use Tailwind CSS utility classes instead of inline `style` attributes.

**Why:** User explicitly corrected this when inline styles were added for `will-change` and `height`.

**How to apply:** When adding or modifying styles in `.astro` or HTML files, always reach for Tailwind classes (e.g. `will-change-transform`, `h-screen`) instead of `style="..."` attributes.
