# BranchCast — Information Architecture v1

## Primary Navigation
```
Overview
Locations
  ├─ All Locations
  ├─ Location Details
  │   ├─ Overview
  │   ├─ Audio Zones
  │   ├─ Players
  │   └─ Activity
  └─ Add Location
Content
  ├─ Library
  ├─ Playlists
  └─ Audio Messages
Campaigns
  ├─ All Campaigns
  ├─ Create Campaign
  └─ Campaign Details
Schedule
  ├─ Weekly Schedule
  └─ Conflicts
Monitoring
  ├─ Live Status
  └─ Alerts
Reports
  ├─ Playback Health
  └─ Campaign Delivery
Organization
  ├─ Team & Roles
  ├─ Organization Settings
  └─ Billing (future placeholder)
Help & Support
```

## Overview Dashboard
The dashboard answers four questions immediately:
1. Are all players connected?
2. What is playing right now?
3. Which campaigns are active?
4. What needs attention today?

### Dashboard Modules
- Organization and date context.
- Player Health summary.
- Locations requiring attention.
- Now Playing by location.
- Active campaigns.
- Recent activity.
- Quick actions: Add Location, Create Playlist, Create Campaign, Open Schedule.

## Core Object Relationships
```
Organization
  └─ Locations
       └─ Audio Zones
            └─ Players
                 └─ Playback Status

Content Library
  ├─ Audio Items / Approved Sources
  └─ Playlists

Campaign
  └─ Target Locations or Audio Zones

Schedule
  ├─ Playlist
  ├─ Campaign insertions
  └─ Target Audio Zone
```

## Core Routes for Prototype
| Route | Purpose |
|---|---|
| `/overview` | Operational summary |
| `/locations` | List and filter locations |
| `/locations/:locationId` | Location overview |
| `/locations/:locationId/zones/:zoneId` | Zone and player details |
| `/content/library` | Manage approved audio/source entries |
| `/content/playlists` | View and create playlists |
| `/campaigns` | Manage audio-message campaigns |
| `/campaigns/new` | Campaign creation flow |
| `/schedule` | Weekly calendar and assignments |
| `/monitoring` | Live player status and alerts |
| `/reports` | Basic playback and campaign reporting |
| `/organization/team` | Team and roles |
| `/organization/settings` | Organization settings |

## Navigation Rules
- “Locations” is the operational home for branch setup and player troubleshooting.
- “Content” is the home for reusable audio assets; it must not contain schedule logic.
- “Campaigns” is the home for promotional messages; it must not become a general playlist editor.
- “Schedule” owns time, recurrence, targeting, and conflicts.
- “Monitoring” is read-first and action-oriented; it should surface problems before reports.
- Billing appears only as a future placeholder and is not interactive in the MVP.

## First Screen Sequence
1. Overview Dashboard
2. Locations List
3. Location Detail
4. Zone / Player Detail
5. Content Library
6. Playlist Detail
7. Campaign Creation
8. Weekly Schedule
9. Live Monitoring
10. Empty, offline, and error states for the above
