# BranchCast — Design Tokens

## Token Principles
- Use semantic names in implementation, not raw color names.
- The dashboard default is light workspace plus dark navigation.
- Signal Orange is intentional and scarce.
- Status colors always include label and icon; color is never the sole signal.
- Use an 8-point layout rhythm, with 4 px available for dense component internals.

## Color Tokens

### Core
| Token | Value | Use |
|---|---|---|
| color.canvas | #F7F5F1 | Main application background |
| color.surface | #FFFFFF | Primary cards, inputs, panels |
| color.surface.subtle | #F1EEE9 | Secondary panels and hover surfaces |
| color.surface.strong | #E8E3DC | Selected or emphasized neutral surface |
| color.ink | #1D1916 | Primary text and dark UI elements |
| color.ink.secondary | #625C55 | Secondary text |
| color.ink.tertiary | #8E877F | Placeholder and supporting text |
| color.border | #E5E0D9 | Default borders and dividers |
| color.sidebar | #211C18 | Sidebar background |
| color.sidebar.hover | #312A25 | Sidebar hover state |
| color.sidebar.active | #3C332D | Sidebar active state |
| color.on.dark | #FFFFFF | Text on dark surfaces |

### Signal Accent
| Token | Value | Use |
|---|---|---|
| color.signal | #F47C2C | Primary CTA, active signal, on-air indicator |
| color.signal.hover | #D96418 | Hover/pressed accent |
| color.signal.soft | #FFF0E5 | Accent background |
| color.signal.border | #F8C39C | Accent border or selected outline |

### Status
| Token | Value | Use |
|---|---|---|
| color.success | #217A56 | Online, approved, saved |
| color.success.soft | #E7F5EE | Success background |
| color.warning | #B86A00 | Needs attention, schedule warning |
| color.warning.soft | #FFF3D6 | Warning background |
| color.danger | #C53B3B | Offline, failed, destructive error |
| color.danger.soft | #FCEBEC | Error background |
| color.info | #3A6FA6 | Syncing, informational state |
| color.info.soft | #EAF2FA | Informational background |
| color.neutral | #706960 | Unknown, archived, inactive |
| color.neutral.soft | #EFEBE6 | Neutral status background |

## Typography

### Typeface Stack
| Context | Typeface |
|---|---|
| English / Latin UI | IBM Plex Sans |
| Arabic UI | IBM Plex Sans Arabic |
| Numeric emphasis | IBM Plex Sans, tabular numerals where available |

### Type Scale
| Token | Size / line-height | Weight | Use |
|---|---|---|---|
| type.display | 40 / 48 | 600 | Large overview or empty-state heading |
| type.h1 | 32 / 40 | 600 | Page title |
| type.h2 | 24 / 32 | 600 | Section title |
| type.h3 | 18 / 26 | 600 | Card / panel title |
| type.body.lg | 16 / 24 | 400 | Lead supporting copy |
| type.body | 14 / 22 | 400 | Default UI text |
| type.label | 13 / 18 | 500 | Inputs, metadata, controls |
| type.caption | 12 / 16 | 400 | Supporting status and timestamps |
| type.metric | 28 / 32 | 600 | Key numeric metric |

Rules:
- Use sentence case, never all caps for UI labels.
- Default dashboard body text is 14 px.
- Use numeric alignment for metrics and tables.
- Arabic uses the same semantic scale; do not reduce Arabic font size to fit a layout.

## Spacing
| Token | Value |
|---|---|
| space.1 | 4 px |
| space.2 | 8 px |
| space.3 | 12 px |
| space.4 | 16 px |
| space.5 | 20 px |
| space.6 | 24 px |
| space.7 | 32 px |
| space.8 | 40 px |
| space.9 | 48 px |
| space.10 | 64 px |

Layout rules:
- Desktop page padding: 32 px minimum; 40 px preferred on large screens.
- Card padding: 20 px normal; 24 px for primary panels.
- Form field gap: 16 px.
- Section gap: 32 px.
- Do not use arbitrary spacing values outside the token scale.

## Layout
| Token | Value |
|---|---|
| layout.max-width | 1440 px |
| layout.sidebar | 248 px |
| layout.topbar | 72 px |
| layout.grid.desktop | 12 columns |
| layout.grid.gutter | 24 px |
| layout.grid.tablet | 8 columns |
| layout.grid.mobile | 4 columns |

## Shape, Borders & Elevation
| Token | Value | Use |
|---|---|---|
| radius.sm | 8 px | Inputs, tags, compact controls |
| radius.md | 12 px | Standard cards and buttons |
| radius.lg | 18 px | Large panels and drawers |
| radius.xl | 24 px | Hero / feature container only |
| border.default | 1 px solid color.border | Standard separation |
| shadow.sm | 0 1px 2px rgba(29,25,22,.06) | Resting controls |
| shadow.md | 0 8px 24px rgba(29,25,22,.08) | Floating panels / menus |
| shadow.lg | 0 16px 40px rgba(29,25,22,.12) | Modal / key overlay only |

## Iconography
- Use a single rounded-outline icon family, 20 px by default.
- 16 px icons for compact table actions; 24 px for primary action modules.
- Pair icon-only controls with tooltip and accessible label.
- Icons support text; they do not replace critical labels.

## Responsive Token Changes
| Viewport | Rule |
|---|---|
| Desktop 1280 px and above | Full sidebar, 12-column grid |
| Tablet 768–1279 px | Collapsible sidebar, 8-column grid |
| Mobile below 768 px | Drawer navigation, 4-column grid, 16 px page padding |
