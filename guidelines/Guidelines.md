# BranchCast — Design Guidelines

## Brand

BranchCast is a business audio and radio management platform for retail, hospitality, and enterprise. It handles scheduled playlists, live broadcast control, audio branding, and multi-location routing. The aesthetic is authoritative and precise — a broadcast booth, not a music app.

---

## Stance

**Dark broadcast minimalist.** Near-black ground with structured, spacious layouts. Everything on screen feels intentional and mission-critical. Type carries weight; color signals state, not decoration.

---

## Typography

| Role | Family | Weights | Use |
|------|--------|---------|-----|
| Display | Fraunces | 400, 600, 700 | Page headings, section titles |
| Body / UI | Outfit | 300, 400, 500, 600 | Paragraphs, labels, navigation |
| Mono | DM Mono | 400, 500 | Time codes, status values, data |

### Scale (rem)
- `text-xs` 0.75 — captions, timestamps
- `text-sm` 0.875 — secondary labels
- `text-base` 1 — body
- `text-lg` 1.125 — lead copy
- `text-xl` 1.25 — card headings
- `text-2xl` 1.5 — section headings
- `text-3xl` 1.875 — page headings
- `text-4xl`+ — display / hero

---

## Color Tokens

```
Background:   #0A0A0C   (near-black, slight blue cast)
Foreground:   #F0EFEC   (warm white)
Card:         #141417   (lifted surface)
Card-fg:      #F0EFEC
Primary:      #00C6A7   (electric teal — "on-air" signal)
Primary-fg:   #0A0A0C
Secondary:    #1C1C21
Secondary-fg: #A8A7A3
Muted:        #1C1C21
Muted-fg:     #6B6A66
Accent:       #00C6A7
Accent-fg:    #0A0A0C
Border:       rgba(255,255,255,0.08)
Ring:         #00C6A7
Radius:       6px
```

---

## Imagery

Source from Unsplash. Themes: broadcast control rooms, professional audio mixers, studio interiors, retail environments with ambient lighting. Always desaturate or tint to fit the dark ground. Use `object-cover` + a teal or dark overlay.

---

## Composition Principles

- **Grid**: CSS Grid for page structure; Flexbox for component internals.
- **Spacing**: Generous. Let the dark ground breathe.
- **Borders**: Hairline rules at `rgba(255,255,255,0.08)` — organize, never decorate.
- **Teal accents**: Reserve for live/active states, primary actions, and key indicators only.
- **Hierarchy**: Fraunces at large scale → Outfit medium → DM Mono for data values.
- **Motion**: Subtle. 150–200ms ease-out transitions on interactive elements.

---

## Component Conventions

- Cards: `bg-card` with `border border-border` and `rounded-md`
- Buttons (primary): `bg-primary text-primary-foreground` — teal fill
- Buttons (ghost): transparent with `border-border`, teal text on hover
- Status badges: small DM Mono caps with teal (live), amber (#F5A224, caution), red (#E74C3C, error)
- Inputs: dark fill (`bg-secondary`), `border-border`, teal focus ring
