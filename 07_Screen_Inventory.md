# BranchCast — Screen Inventory

## Purpose
This inventory defines the screens required for the first BranchCast prototype. It is a product blueprint, not a visual-design specification. Each screen uses realistic sample data and supports relevant loading, empty, error, and permission states.

## Priority Legend
- P0: Required for the first coherent prototype.
- P1: Required before MVP usability review.
- Later: Deliberately deferred.

## Global App Shell — P0
| Screen / component | Route | Primary user | Purpose |
|---|---|---|---|
| Sign in | /login | All users | Enter the organization workspace. |
| App shell | All authenticated routes | All users | Sidebar, top bar, context, notifications, and profile menu. |
| Access denied | /access-denied | Restricted users | Explain missing permission and provide a safe return path. |
| Not found | * | All users | Recover from an unknown route. |

## Overview — P0
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Overview Dashboard | /overview | Owner, Marketing, Operations | Player health, campaigns, now playing, attention items, quick actions. |
| Alert Center | /monitoring/alerts | Owner, Operations | Review unresolved operational alerts. |

### Overview modules
- Organization and date context.
- Player Health summary: Online, Offline, Syncing, Needs Attention.
- Attention items with next action.
- Now Playing by location.
- Active campaigns and recent activity.
- Role-aware quick actions.

## Locations & Player Setup — P0
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Locations List | /locations | Owner, Operations | Find, filter, and assess location health. |
| Add Location | /locations/new | Owner, Operations | Create a location with basic operational details. |
| Location Detail | /locations/:locationId | Owner, Operations, assigned Branch Manager | Understand zones, players, and recent activity. |
| Add Audio Zone | /locations/:locationId/zones/new | Owner, Operations | Define a listening area within a location. |
| Zone / Player Detail | /locations/:locationId/zones/:zoneId | Owner, Operations, assigned Branch Manager | Inspect playback, player health, schedule, and activity. |
| Player Pairing | /locations/:locationId/zones/:zoneId/pair | Owner, Operations | Generate and track a prototype pairing code. |

### Location Detail modules
- Location name, address/context, and operational status.
- Audio-zone cards with player health and now-playing state.
- Primary actions: Add Zone, Open Player Detail, View Schedule.
- Recent branch activity.
- Access-scope indicator for Branch Manager.

## Content & Playlists — P0
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Content Library | /content/library | Owner, Marketing | Browse approved, pending, and unavailable content/source entries. |
| Add Content | /content/library/new | Owner, Marketing | Add approved audio metadata or permitted source reference. |
| Content Detail | /content/library/:contentId | Owner, Marketing | Review metadata, approval state, playlist usage, and notes. |
| Playlists List | /content/playlists | Owner, Marketing | Browse and filter reusable playlists. |
| Create Playlist | /content/playlists/new | Owner, Marketing | Build an ordered playlist from approved items. |
| Playlist Detail | /content/playlists/:playlistId | Owner, Marketing | Edit order, metadata, and availability. |

## Campaigns — P0
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Campaigns List | /campaigns | Owner, Marketing | Filter campaigns by status, dates, and target scope. |
| Create Campaign | /campaigns/new | Owner, Marketing | Create a promotional audio message and target it. |
| Campaign Detail | /campaigns/:campaignId | Owner, Marketing | Review scope, dates, message, readiness, and schedule usage. |
| Campaign Review | Creation flow | Owner, Marketing | Confirm scope before draft or ready-to-schedule. |

## Scheduling — P0
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Weekly Schedule | /schedule | Owner, Marketing; read-only Operations | Assign playlists and eligible campaigns to a selected zone. |
| Conflict Detail | Side panel/modal | Owner, Marketing | Understand overlap and choose a safe resolution. |
| Publish Review | Side panel/modal | Owner, Marketing | Confirm selected zone, time range, content, and scope. |

## Monitoring & Reporting — P1
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Live Monitoring | /monitoring | Owner, Operations | Find offline or unhealthy players and inspect activity. |
| Player Alert Detail | /monitoring/alerts/:alertId | Owner, Operations | Understand the issue and record a response action. |
| Reports Overview | /reports | Owner, Marketing, Operations, Viewer | Review playback and campaign summaries. |
| Playback Health Report | /reports/playback-health | Owner, Operations, Viewer | Filter location/player health. |
| Campaign Delivery Report | /reports/campaign-delivery | Owner, Marketing, Viewer | Review intended versus simulated delivery. |

## Organization — P1
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Team & Roles | /organization/team | Owner | Invite and manage organization members. |
| Invite Member | Modal | Owner | Choose role and optional location assignment. |
| Organization Settings | /organization/settings | Owner | Manage name, timezone, and operating preferences. |
| Profile & Preferences | /profile | All users | Personal profile and notification preferences. |
| Billing Placeholder | /organization/billing | Owner | Clearly communicate not available in prototype. |

## Branch Manager Experience — P1
| Screen | Route | Primary user | Key outcome |
|---|---|---|---|
| Assigned Location Home | /my-location | Branch Manager | See assigned branch status, zones, and now playing. |
| Report an Issue | /my-location/report-issue | Branch Manager | Report an audio or player issue to Operations. |
| Issue Confirmation | Same flow state | Branch Manager | Show reference and next expected action. |

## Required Shared Components
- Role-aware sidebar navigation.
- Top bar with page title, context selector, alerts, and profile menu.
- Status badge system.
- Location / zone picker.
- Search and filter bar.
- Empty, loading, error, confirmation, and success-feedback patterns.
- Activity timeline, responsive data table, audio-item row, schedule grid, and player-health card.

## Screens Explicitly Deferred
- Public marketing site.
- Customer sign-up funnel.
- Super Admin console.
- Native Player setup.
- Billing and payment.
- AI voice creator.
- Audio marketplace.
