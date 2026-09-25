# BranchCast — UX States & Interaction Requirements

## Purpose
This file defines how the BranchCast prototype behaves. The design must feel operational and trustworthy: users need to understand the current state, the next action, and the limits of the prototype.

## Global Interaction Rules

### Navigation
- The active sidebar item is visually distinct.
- Navigation labels match the information architecture exactly.
- Restricted pages do not appear in navigation for users without access.
- Direct navigation to a restricted route shows an access-denied state, never blank content.
- Preserve location, zone, date, and filter context on return from detail screens.

### Context
- Display organization name in the top bar.
- Display selected Location and Audio Zone where relevant.
- A page must not mix locations without explicit “All locations” context.
- Time-dependent screens show timezone and date range.

### Feedback
- Every save has one visible outcome: saving, saved, failed, or changes not saved.
- Use inline feedback for simple actions and toast feedback for cross-page success.
- Use review/confirmation before actions that affect schedules or many locations.
- Prototype-only actions are labelled as simulated where needed.

## Status System

### Player Health
| Status | Meaning | Required treatment |
|---|---|---|
| Online | Player is reporting normally in prototype data. | Positive badge, last seen, now-playing detail. |
| Offline | Player has not reported within expected window. | High-attention badge, last seen, next-action guidance. |
| Syncing | Player is receiving a change or initial setup. | Neutral/progress badge. |
| Needs Attention | A known issue needs operations review. | Warning badge, issue summary, owner/action. |
| Not Paired | No player is associated with the zone yet. | Setup state and Pair Player action. |
| Unknown | State cannot be determined. | Neutral badge and explanation. |

### Content & Campaign Status
| Status | Meaning |
|---|---|
| Draft | Saved but not ready for use. |
| Pending Approval | Cannot be used until approved. |
| Approved | Eligible for use. |
| Ready to Schedule | Valid and targeted but not assigned to a schedule. |
| Scheduled | Appears in a future or active schedule. |
| Active | Current date/time falls within its configured period. |
| Ended | Date range has completed. |
| Archived | Kept for records; cannot be newly assigned. |

### Status Accessibility
- Never rely on color alone.
- Pair status color with a text label and meaningful icon where useful.
- Use the same labels across lists, detail pages, alerts, and reports.

## Loading, Empty, Error & Permission States

### Loading
- Use skeletons for dashboard cards, tables, and schedule cells.
- Retain page structure during loading; avoid layout jumps.
- Do not show fake zero counts while data is loading.

### Empty states
| Context | Primary action |
|---|---|
| No locations | Add Location |
| No audio zones | Add Audio Zone |
| No paired player | Pair Player |
| No content | Add Content |
| Empty playlist | Add Items |
| No campaigns | Create Campaign |
| No schedule | Create Schedule |
| No alerts | View Monitoring |
| No report data | Change Date Range |

Each empty state explains what the object is and why it matters.

### Error state requirements
Every error includes:
- Plain-language explanation.
- Whether user data was saved.
- A recovery action.
- Technical reference only where useful for support.

Required errors:
- Incomplete location form.
- Expired pairing code.
- Unapproved content selected for a schedule.
- Invalid campaign dates.
- Schedule conflict.
- Offline player.
- User lacks access to requested location.
- Report data unavailable.

### Permission states
- Use a dedicated access-denied screen for route restrictions.
- For action restrictions, show disabled action plus concise reason.
- Do not expose editable fields to Viewers.
- Branch Managers see assigned locations only.

## Form Requirements
- Mark required fields clearly.
- Validate on blur or submit, not before user interaction.
- Keep one primary action per form.
- Save Draft is separate from publish/activate.
- Warn before discarding unsaved changes.

### Required form fields
| Form | Required fields |
|---|---|
| Location | Location name, city/country or address context, operating timezone |
| Audio Zone | Zone name |
| Content | Title, content type, source reference, approval state |
| Campaign | Campaign name, audio content, target location/zone, start date, end date |

The campaign end date cannot precede its start date. No external URL is represented as verified or licensed by default.

## Lists, Tables & Filters
- Default to attention-first then recent activity.
- Show count, search, filters, and an empty state.
- Row click opens details; direct actions cannot exist only on hover.
- Location, player status, campaign status, date range, and search are the primary filters.
- Active filters are visible and removable; show Clear all only when two or more filters are active.
- Tables may become stacked cards on smaller screens without hiding status or next action.

## Schedule Interaction Requirements
- A schedule always has an explicit selected Location and Audio Zone.
- Time blocks show playlist name, campaign indicator, and status.
- Unsaved changes are visually distinct.
- Identify conflicts before publish.
- A conflict panel names both items, their time range, and affected zone.
- Publishing requires review of scope, time range, and content.
- Campaign creation does not automatically publish a schedule.
- All publish behavior is simulated in this prototype.

## Player and Monitoring Requirements
- Player detail shows current status, last seen, location/zone, simulated now playing, schedule, and recent actions.
- Offline state prioritizes what happened and what to do next.
- Simulated actions: resend pairing, request resync, contact branch.
- Each action adds a timeline entry in the prototype.
- Do not show live waveform, true streaming control, or real connectivity without an integration.

## Accessibility & Bilingual Readiness
- Keyboard focus order follows visual reading order.
- Icon-only actions need accessible labels/tooltips.
- Support readable contrast for normal text and statuses.
- Text must expand for Arabic without breaking key controls.
- Do not use fixed-width label containers that will fail in RTL.
- Locale-specific dates and number formatting can be implemented later.

## Prototype Data Rules
- Use realistic organization, location, playlist, campaign, and player names.
- Do not use Lorem ipsum, Test 123, or generic unnamed branches.
- Keep data internally consistent across all screens.
- Identify sample data when it could be mistaken for a live operational status.
