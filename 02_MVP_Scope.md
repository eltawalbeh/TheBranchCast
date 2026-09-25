# BranchCast — MVP Scope

## MVP Goal
Prove that an authorized organization can centrally configure branch audio and see whether its branch players are active.

## In Scope

### Organization & Access
- Sign in entry point and organization workspace concept.
- One sample organization with realistic workspace data.
- Basic roles presented in the UI: Owner, Marketing Manager, Operations Manager, Viewer.

### Locations & Players
- Create and list locations.
- View a location and its audio zones.
- Add a player through a pairing-code flow in the UI.
- Display player state: Online, Offline, Syncing, Needs Attention.
- Show last-seen time and current playback state.

### Content
- Content library with approved audio items and/or approved external stream sources.
- Content metadata: title, type, duration when relevant, source status, and approval status.
- Create and edit playlists.
- Preview player-style now-playing information.

### Campaigns & Scheduling
- Create a basic audio campaign/message.
- Select locations or zones.
- Set a start date, end date, and recurrence/frequency placeholder.
- Weekly schedule view.
- Detect or visibly warn about a simple schedule conflict.
- Publish status in the prototype only.

### Monitoring & Reporting
- Dashboard overview: active locations, player health, now playing, and attention items.
- Live monitoring list.
- Basic date-filtered report concept: playback health and campaign delivery summary.

## Explicitly Out of Scope
- Real music licensing, music-catalog procurement, or commercial rebroadcasting.
- Direct YouTube playback or conversion of YouTube content into a radio stream.
- Real payment, subscriptions, invoices, or taxes.
- AI voice generation or text-to-speech.
- Real-time playback engine, device management protocol, or offline downloads.
- POS, CRM, loyalty, weather, advertising marketplace, or third-party integrations.
- White-label multi-tenant configuration beyond the core organization model.
- Native mobile apps.
- Full marketing website and public sign-up funnel.

## MVP User Stories
1. As an Operations Manager, I can see which branch players need attention.
2. As a Marketing Manager, I can build a campaign and target selected locations.
3. As a Content Manager, I can group approved audio into a playlist.
4. As a Branch Manager, I can view what my location is playing.
5. As an Owner, I can understand the organization’s audio health at a glance.

## MVP Acceptance Criteria
The first Figma Make prototype is ready for review when it:
- has a coherent dashboard navigation;
- contains the full happy path from Location → Zone → Player → Schedule;
- uses realistic sample data rather than generic placeholders;
- includes empty, loading, offline, and error states for core screens;
- clearly marks prototype-only controls that do not yet have a live backend;
- does not claim legal music rights or real device connectivity.
