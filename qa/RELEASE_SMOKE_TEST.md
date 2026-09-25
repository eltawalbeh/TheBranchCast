# BranchCast Release Smoke Test

Run this checklist against the deployed build and record the date, commit SHA, tester, and result.

## Public and authentication

- [ ] Landing page loads on desktop and mobile.
- [ ] Login, signup, logout, and password recovery complete successfully.
- [ ] An unauthenticated user cannot open protected routes.
- [ ] Organization switching never exposes another organization's data.

## Manager and branch manager

- [ ] Dashboard loads with loading, empty, and error states.
- [ ] Manager can view locations, content, campaigns, players, reports, billing, and invoices.
- [ ] Branch manager is limited to the assigned location.
- [ ] Report issue creates a record and shows confirmation.

## Player runtime

- [ ] Real player appears online after heartbeat.
- [ ] Stale heartbeat changes the player to offline.
- [ ] Now-playing state updates without a full page refresh.
- [ ] A safe playback command is acknowledged or reports a useful failure.

## Billing and release safety

- [ ] Test checkout or billing setup completes.
- [ ] Duplicate webhook delivery does not duplicate an invoice or subscription event.
- [ ] RLS, Storage, and audit-log checks pass.
- [ ] Alert route, backup, rollback build, and incident owner are confirmed.

## Accessibility and localization

- [ ] Arabic RTL and English LTR layouts have no clipping or reversed actions.
- [ ] Keyboard focus is visible and all primary actions are reachable.
- [ ] Contrast, reduced-motion, and responsive checks pass.

