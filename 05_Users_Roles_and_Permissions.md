# BranchCast — Users, Roles & Permissions

## Role Model
BranchCast uses organization-based access. A user belongs to one organization and receives a predefined role. Custom roles are not part of the MVP.

## Primary Users
| User | Main responsibility | Primary product area |
|---|---|---|
| Organization Owner | Overall access, ownership, and account-level decisions | Overview, Team, Settings |
| Marketing Manager | Brand audio, campaigns, and schedule planning | Content, Campaigns, Schedule |
| Operations Manager | Branch rollout, player health, and operational continuity | Locations, Monitoring |
| Branch Manager | Local visibility and issue reporting for assigned locations | Assigned Location, Player Status |
| Viewer | Read-only reporting and visibility | Overview, Monitoring, Reports |

## MVP Roles & Permissions
| Capability | Owner | Marketing Manager | Operations Manager | Branch Manager | Viewer |
|---|:---:|:---:|:---:|:---:|:---:|
| View organization overview | Yes | Yes | Yes | Assigned only | Yes |
| Create/edit locations and zones | Yes | No | Yes | No | No |
| Pair, resync, or troubleshoot players | Yes | No | Yes | View status only | No |
| View live monitoring | Yes | Yes | Yes | Assigned only | Yes |
| Add/edit approved content | Yes | Yes | No | No | No |
| Create/edit playlists | Yes | Yes | No | No | No |
| Create/edit campaigns | Yes | Yes | No | No | No |
| Build/publish schedules | Yes | Yes | View only | Assigned only | View only |
| View reports | Yes | Yes | Yes | Assigned only | Yes |
| Invite/manage team | Yes | No | No | No | No |
| Organization settings | Yes | No | No | No | No |
| Billing | Future only | No | No | No | No |

## Location Access Rule
The MVP must support two access scopes:

1. **Organization-wide:** Owner, Marketing Manager, Operations Manager, and Viewer can access every location according to their role.
2. **Assigned locations only:** Branch Manager sees only locations explicitly assigned to them.

The interface must always make the selected organization and location context clear.

## Permission UX Rules
- Never hide a problem merely because the current role cannot resolve it; show the status and state the next responsible role.
- Read-only users can inspect information but cannot see misleading editable controls.
- Disabled actions require explanatory helper text, not just a disabled button.
- Destructive actions are not part of the first prototype; if represented, they require an explicit confirmation state.
- Publish actions must display their scope: selected locations/zones, start time, and affected schedule.

## Role-Based Dashboard Focus
| Role | What matters first |
|---|---|
| Owner | Organization health, attention items, active campaigns |
| Marketing Manager | Campaign status, scheduled messages, playlist readiness |
| Operations Manager | Offline players, location issues, pairing and sync state |
| Branch Manager | Current playback and local player condition |
| Viewer | Summary and reporting without configuration controls |

## Permission Boundary Examples
- A Marketing Manager can schedule an approved campaign but cannot pair a new player.
- An Operations Manager can restore a player but cannot edit campaign copy.
- A Branch Manager can report an issue but cannot change organization-wide audio rules.
- A Viewer can open reports but cannot export or modify data in the MVP.

## Future Roles — Not MVP
- Content Approver
- Finance/Billing Administrator
- External Agency
- Support Agent
- Super Admin for BranchCast internal operations
