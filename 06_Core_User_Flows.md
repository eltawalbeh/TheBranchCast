# BranchCast — Core User Flows

## Flow Principles
- Every critical flow must show a clear start, current context, review moment, and success/failure outcome.
- The prototype may simulate outcomes, but must never claim real player connection, publishing, or audio rights.
- The user must understand the difference between content, campaign, schedule, location, zone, and player.

---

## Flow 1 — First-Time Organization Setup
**User:** Organization Owner or Operations Manager  
**Goal:** Create a usable first location and prepare it for audio.

```
Sign in
→ Welcome / organization context
→ Add first location
→ Add audio zone
→ Start player pairing
→ Generate pairing code
→ Player pairing pending state
→ Review location setup
→ Go to location dashboard
```

### Required states
- First-time empty dashboard.
- No locations yet.
- Pairing code generated.
- Pairing pending.
- Pairing failed / expired.
- Location ready but no schedule assigned.

### Success definition
The user can see a location, one audio zone, and one player in a clearly identified setup state.

---

## Flow 2 — Add and Organize Content
**User:** Owner or Marketing Manager  
**Goal:** Add approved audio content and create a reusable playlist.

```
Content Library
→ Add content
→ Select content type
→ Enter title and source details
→ Mark source as approved / pending review
→ Save
→ Create playlist
→ Add content items
→ Arrange order
→ Save playlist
```

### Required states
- Empty library.
- Content approval pending.
- Missing or invalid source detail.
- Playlist with no items.
- Save success.
- Source cannot be used in a schedule until approved.

### Success definition
A playlist is saved and available to be selected during schedule creation.

---

## Flow 3 — Create an Audio Campaign
**User:** Owner or Marketing Manager  
**Goal:** Prepare a time-bound promotional message for selected locations.

```
Campaigns
→ Create campaign
→ Add campaign name and message audio
→ Select target locations / zones
→ Choose start and end dates
→ Choose delivery frequency placeholder
→ Review campaign scope
→ Save as draft or mark ready to schedule
```

### Required states
- No audio message attached.
- No target location selected.
- End date before start date.
- Target zone has no active schedule.
- Draft saved.
- Campaign ready for schedule.

### Success definition
A valid campaign exists as a reusable, targeted item; it is not automatically broadcast.

---

## Flow 4 — Assign a Weekly Schedule
**User:** Owner or Marketing Manager  
**Goal:** Assign a playlist and campaign rules to an audio zone.

```
Schedule
→ Select location and audio zone
→ Select day and time block
→ Choose playlist
→ Add eligible campaign
→ Review schedule
→ Conflict check
→ Save draft
→ Publish prototype state
```

### Required states
- No playlist available.
- No zone selected.
- Overlapping time block.
- Campaign date outside selected period.
- Schedule conflict warning.
- Draft saved.
- Published prototype state.

### Success definition
The weekly schedule clearly shows what is intended to play for a selected zone and when.

---

## Flow 5 — Monitor and Respond to Player Health
**User:** Operations Manager  
**Goal:** Identify a player issue and take the appropriate action.

```
Overview attention item
→ Monitoring
→ Filter offline / needs attention players
→ Open player details
→ Review last seen, current state, assigned zone, and recent activity
→ Choose simulated action: resend pairing / request resync / contact branch
→ Confirm action
→ Updated action log
```

### Required states
- Online.
- Offline.
- Syncing.
- Needs attention.
- No recent playback data.
- Action requires branch assistance.
- Simulated action queued.

### Success definition
The Operations Manager knows which location is affected, why it needs attention, and what to do next.

---

## Flow 6 — Branch Manager Checks Local Playback
**User:** Branch Manager  
**Goal:** Confirm what their assigned location is playing and report an issue.

```
Sign in
→ Assigned location view
→ Now playing / player status
→ Open zone detail
→ Report an issue
→ Select issue type
→ Add note
→ Submit report
→ Confirmation and issue reference
```

### Required states
- No assigned location.
- Player offline.
- No active schedule.
- Issue successfully reported.
- Submitted report awaiting operations review.

### Success definition
The Branch Manager does not need access to global settings to give useful operational feedback.

---

## Flow 7 — Owner Reviews Organization Health
**User:** Organization Owner  
**Goal:** Quickly understand whether BranchCast is operating across the business.

```
Overview
→ Review player health
→ Open attention items
→ Review active campaigns
→ Review now playing by location
→ Open report
→ Filter date range
→ Review playback health summary
```

### Required states
- Organization has no active locations.
- All players healthy.
- One or more locations require attention.
- No campaign activity in date range.
- Reporting data is unavailable or delayed.

### Success definition
The Owner can answer: “Are our branches playing the intended audio, and where do we need to act?”

---

## Cross-Flow Guardrails
- A campaign is created before it is scheduled; creation alone does not publish it.
- A playlist is created before it is assigned; creation alone does not broadcast it.
- A player belongs to one audio zone at a time.
- A schedule belongs to a selected audio zone, not a whole organization by default.
- A user with restricted location access must never be able to change another location through direct navigation.
- Every publish-like action must show scope and use a confirmation step.
