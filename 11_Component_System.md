# BranchCast — Component System

## Component Principles
- Components are task-oriented, not decorative.
- A component must support its defined states before variations multiply.
- Use semantic variants and status tokens.
- Do not create visual duplicates for each page.

## Foundation Components
| Component | Required variants / states |
|---|---|
| Button | Primary, secondary, tertiary, destructive; default, hover, focus, disabled, loading |
| Icon Button | Default, hover, focus, disabled; tooltip required |
| Status Badge | Online, Offline, Syncing, Needs Attention, Draft, Approved, Scheduled, Archived |
| Tag / Filter Chip | Default, selected, removable, disabled |
| Avatar | Image, initials, group |
| Tooltip | Icon action, truncated copy, status explanation |
| Divider | Horizontal, vertical |
| Empty State | Compact and full-page |
| Skeleton | Card, row, table, schedule cell |
| Toast | Success, warning, error, info |
| Alert Banner | Informational, warning, error; action optional |

## Navigation Components
| Component | Requirements |
|---|---|
| Sidebar | Brand wordmark, section navigation, active state, collapse behavior, profile / support area |
| Mobile Navigation Drawer | Same routes and role rules as sidebar |
| Top Bar | Page context, organization selector placeholder, alert access, profile menu |
| Breadcrumb | Only for deep pages such as Location > Zone > Player |
| Page Header | Title, supporting copy when needed, primary action, optional filters |

## Data & Status Components
| Component | Requirements |
|---|---|
| Metric Card | Label, value, trend/context, status; never a decorative chart by default |
| Player Health Card | Status, last seen, location/zone, now playing, next action |
| Attention Item | Issue label, impact, owner/action, timestamp |
| Now Playing Row | Location, zone, content name, player status, duration/progress placeholder |
| Activity Timeline | Time, actor/system, action, optional source link |
| Data Table | Sort, filter, status column, row action, responsive card fallback |
| Filter Bar | Search, selected filters, date range, clear behavior |
| Report Card | Metric, timeframe, contextual comparison, empty state |

## Content & Playback Components
| Component | Requirements |
|---|---|
| Content Item Row | Title, type, approval status, duration/source metadata, actions |
| Playlist Builder Row | Drag handle placeholder, sequence number, item metadata, remove action |
| Audio Preview Module | Static/simulated preview state only; no claim of actual playback |
| Campaign Card | Name, status, date range, target scope, schedule state |
| Location / Zone Picker | Searchable selection, clear current context, empty state |
| Player Pairing Card | Pairing code, expiry/pending state, success/failure state |

## Scheduling Components
| Component | Requirements |
|---|---|
| Week Selector | Previous / next week, date range label, today action |
| Zone Context Bar | Explicit location + zone selection |
| Schedule Grid | Days, time blocks, playlist label, campaign indicator, state |
| Schedule Block | Default, selected, unsaved, conflict, disabled/read-only |
| Conflict Panel | Both conflicting items, times, affected zone, resolution action |
| Publish Review Drawer | Scope, selected schedule items, warning summary, confirm action |

## Form Components
| Component | Requirements |
|---|---|
| Text Input | Label, helper, error, required indicator, disabled |
| Text Area | Character guidance, helper, error |
| Select | Default, selected, search where list is long, disabled |
| Date Range Input | Start/end validation, timezone helper |
| Toggle | Only for binary choices; clear on/off labels |
| Radio Group | Mutually exclusive choices |
| Checkbox | Multiple selection and confirmations |
| File / Source Input | Clear distinction between uploaded sample item and external source reference |
| Review Summary | Read-only confirmation of entered details |

## Overlay Components
| Component | Use |
|---|---|
| Modal | Narrow, focused confirmation or form task |
| Side Drawer | Detail, review, filters, schedule conflict |
| Command / Quick Action Menu | Later only; not required in first prototype |
| Dropdown Menu | Compact contextual action list |

## Component States
Every interactive component supports:
- Default
- Hover where a pointer is available
- Focus-visible
- Active/pressed
- Disabled
- Loading where an action can take time
- Error where applicable
- Read-only where applicable

## Component Documentation Requirement
For each component created in Figma Make, document:
1. Purpose.
2. Variants.
3. Allowed content.
4. Interactive states.
5. Responsive behavior.
6. RTL behavior.
7. Accessibility label / keyboard expectation where relevant.
