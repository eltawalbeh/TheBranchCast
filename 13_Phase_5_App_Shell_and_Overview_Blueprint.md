# BranchCast — Phase 5 Visual Blueprint: App Shell & Overview Dashboard

## Phase Objective
Create the first fully designed product area: the authenticated application shell and the Overview Dashboard.

This phase translates the approved product strategy, information architecture, UI system, and UX rules into a complete desktop-first visual blueprint. It does not introduce backend logic, real streaming, real device connectivity, or forms beyond prototype interactions.

## Scope
### In Scope
- Authenticated App Shell.
- Overview Dashboard for Owner, Marketing Manager, Operations Manager, Branch Manager, and Viewer variants.
- Alert Center entry and notifications preview.
- All related empty, loading, error, and access states.
- Desktop, tablet, and mobile layout behavior.
- Consistent sample data.

### Out of Scope
- Locations list/detail implementation.
- Content library, campaigns, schedules, reports, team, settings, billing.
- Authentication backend.
- Real player pairing or playback.
- Full marketing site.

## Routes to Build
| Route | Required state |
|---|---|
| /overview | Default Owner overview |
| /overview?role=marketing | Marketing emphasis variation |
| /overview?role=operations | Operations emphasis variation |
| /my-location | Branch Manager location-specific overview |
| /monitoring/alerts | Alert Center list |
| /access-denied | Restricted-route state |
| /not-found | Unknown-route recovery state |

## Desktop Frame
- Primary frame: 1440 px wide, minimum 1024 px content height.
- Canvas: color.canvas.
- Sidebar: 248 px fixed width.
- Top bar: 72 px height.
- Main content: 32 px left/right padding; 32 px vertical section spacing.
- Grid: 12 columns, 24 px gutters.

## App Shell

### Sidebar
**Purpose:** persistent product navigation and organization identity.

#### Layout
1. Brand wordmark: BranchCast.
2. Organization switcher placeholder: Luma Coffee Co.
3. Main navigation:
   - Overview
   - Locations
   - Content
   - Campaigns
   - Schedule
   - Monitoring
   - Reports
4. Secondary navigation:
   - Team & Roles
   - Settings
   - Help & Support
5. Bottom profile card:
   - Avatar initials: AK
   - Name: Amina Khalil
   - Role: Organization Owner
   - Profile menu trigger

#### Required behavior
- Overview is active by default.
- Active item uses color.sidebar.active, an accent indicator, and text label.
- Hover state is visible but restrained.
- Navigation may display a count badge for Monitoring only when unresolved alerts exist.
- Role-aware visibility: Branch Manager sees Overview, My Location, and Help & Support only.
- Sidebar collapses on tablet and becomes a right/left drawer according to language direction on mobile.

### Top Bar
**Purpose:** maintain product context without competing with page content.

#### Elements
- Breadcrumb or page label: Overview.
- Location scope selector: All locations.
- Date context: Today, 25 Sep 2026, in the organization timezone.
- Notification bell with alert badge.
- Profile/avatar menu.

#### Rules
- Keep background color.surface with lower border.
- Avoid oversized search fields or decorative controls.
- The selected scope must persist visually across dashboard modules.
- On mobile, retain page label, alerts, and profile; move scope to a compact context control.

## Overview Dashboard — Owner Default

### Page Header
| Element | Content |
|---|---|
| Eyebrow | Good afternoon, Amina |
| H1 | Overview |
| Support copy | Your audio network is operating across 6 locations. |
| Primary action | Create campaign |
| Secondary action | Add location |

The primary action is signal orange. The secondary action is neutral outline. Do not show more than two page-level actions.

### Section 1 — Network Health
A 4-card metric row appears directly under the header.

| Card | Metric | Context | Status |
|---|---:|---|---|
| Active locations | 6 of 6 | All locations configured | Neutral |
| Players online | 9 of 10 | One requires attention | Warning |
| Active campaigns | 2 | One starts tomorrow | Info |
| Playback coverage | 96% | Last 7 days, simulated | Success |

#### Card behavior
- Card label uses type.label.
- Metric uses type.metric with tabular numerals.
- Context text stays concise.
- On hover, card can show a subtle border change, not elevation jump.
- Each card links to the relevant operational area only if it makes sense in the prototype.

### Section 2 — Live Network Panel
A wide, dark feature panel occupies 8 desktop columns. It is the only prominent dark dashboard panel.

#### Content
- Label: Live network.
- Main statement: 9 players are online across 6 locations.
- Signal indicator: On air.
- Small status breakdown: Online 9, Needs attention 1, Not paired 1.
- Simulated network activity line: last sync 2 minutes ago.
- CTA: Open monitoring.

#### Visual direction
- color.sidebar or a slightly deeper graphite background.
- White primary type, muted supporting type.
- Signal orange used only for the on-air state and CTA accent.
- No animated waveform. A very subtle static timing/signal pattern is permitted at low contrast.

### Section 3 — Needs Attention
A 4-column supporting panel beside Live Network.

#### Content
- Title: Needs attention.
- Count: 2 items.
- Item 1: Luma Coffee, Sweifieh — Main Floor Player is offline — Last seen 18 min ago.
- Item 2: Luma Coffee, Abdali — Terrace Zone has no player paired.
- Each row includes status badge and clear next action:
  - View player
  - Pair player
- Footer action: View all alerts.

#### Empty state
When no issues exist:
- Green success icon.
- Copy: All locations are operating normally.
- Link: Open monitoring.

### Section 4 — Now Playing
Full-width operational table/card.

| Column | Example |
|---|---|
| Location | Luma Coffee — Abdali |
| Zone | Main Floor |
| Now playing | Morning Rhythm Playlist |
| Campaign | Autumn Iced Latte |
| Player status | Online |
| Last sync | 2 min ago |
| Action | Open |

#### Rules
- Use five visible rows.
- Player status has text plus colored badge.
- Campaign can show none when not applicable.
- Action is a text link or icon + tooltip, not a large button.
- On tablet/mobile, convert rows into structured cards that retain player status and action.

### Section 5 — Active Campaigns
Two equal cards on desktop.

#### Card A
- Campaign: Autumn Iced Latte
- Status: Active
- Date range: 20–30 Sep 2026
- Target: 4 locations, 6 zones
- Delivery: Scheduled in 6 zones
- CTA: View campaign

#### Card B
- Campaign: Weekend Brunch Reminder
- Status: Ready to schedule
- Date range: 27–29 Sep 2026
- Target: 2 locations, 3 zones
- Delivery: Not yet scheduled
- CTA: Review schedule

### Section 6 — Recent Activity
A full-width timeline card.

Required sample events:
1. Amina Khalil created Weekend Brunch Reminder — 12 min ago.
2. Sweifieh Main Floor Player reported offline — 18 min ago.
3. Operations updated Abdali Main Floor schedule — 1 hr ago.
4. Terrace Zone was added to Abdali — yesterday.
5. Morning Rhythm Playlist was updated — yesterday.

## Role Variations

### Marketing Manager
Prioritize:
- Active campaigns.
- Campaigns ready to schedule.
- Playlist readiness.
- Schedule conflicts.
Reduce player-health density but preserve alert visibility.

### Operations Manager
Prioritize:
- Player health.
- Needs attention.
- Last-seen status.
- Locations and pairing.
Move campaigns below operations status.

### Branch Manager
Route: /my-location.
- No organization-wide metric cards.
- Shows assigned location only.
- Hero card: current player status and now playing.
- Audio-zone cards.
- One action: Report an issue.
- No global campaign editing, schedule editing, or other locations.

### Viewer
- Same general overview hierarchy.
- All edit/create actions absent.
- Clear read-only state in profile menu, not repeated on every card.

## Loading, Empty & Error States

### Loading
- Skeleton page header.
- Four metric-card skeletons.
- Dark Live Network panel skeleton.
- Table row skeletons.
- Do not show zero values while loading.

### Organization has no locations
- Replace dashboard modules with a focused onboarding empty state.
- Heading: Start with your first location.
- Copy: Add a location, set up an audio zone, then pair a player.
- Primary action: Add location.
- Secondary link: Learn about audio zones.

### No player data
- Keep location count visible.
- Replace player-health data with neutral explanation: No player has been paired yet.
- CTA: Open locations.

### Error
- Inline page alert with message: We could not load the latest network status.
- Secondary text: Your saved configuration is not affected.
- Action: Try again.
- Keep the shell visible.

### Access denied
- Heading: You do not have access to this area.
- Copy: Your current role can view assigned locations only.
- Primary action: Go to my location.

## Responsive Blueprint

### Tablet: 768–1279 px
- Sidebar collapses to icon rail or temporary drawer.
- Network Health uses two-by-two metric grid.
- Live Network and Needs Attention stack vertically.
- Campaign cards stack if width is limited.
- Table may preserve columns with horizontal scroll only if row-card fallback is not feasible.

### Mobile: below 768 px
- Navigation becomes a drawer.
- Page padding: 16 px.
- Header actions become compact menu or vertical stack.
- Metrics become two columns.
- Live Network is full width.
- Needs Attention follows live panel.
- Now Playing is a card list, not a table.
- Campaign cards and timeline are single-column.
- Minimum tap area: 44 px.

## Visual Acceptance Criteria
The dashboard is ready for review when:
- the hierarchy answers “what is happening, what needs attention, and what can I do?” within one screen;
- the dark feature panel is valuable rather than decorative;
- all metrics, status labels, campaigns, and activity entries are internally consistent;
- every operational problem shows a next action;
- the Overview works for Owner, Operations, Marketing, Branch Manager, and Viewer contexts;
- layout complies with tokens in 10_Design_Tokens.md and interaction rules in 12_Localization_and_Motion.md.
