# BranchCast release smoke test

Run against the deployed BranchCast URL in a fresh private browser window. Use a disposable
test email and remove the test account after the run.

## 1. Public entry and auth

- [ ] `/` loads without a console error; primary CTA reaches `/login`.
- [ ] Invalid credentials show an inline error and preserve the form values.
- [ ] Valid login redirects to `/overview` or `/onboarding` according to account state.
- [ ] Signup creates one user and does not create duplicate workspaces on refresh.
- [ ] Refreshing an authenticated route preserves the session.
- [ ] Sign out clears the session and returns to the public landing page.

## 2. Onboarding and workspace isolation

- [ ] Owner can create one organization/workspace and its first location.
- [ ] Required fields, duplicate slug/name, and network failure have visible recovery states.
- [ ] A second test user cannot read or mutate the first workspace's locations, players,
      campaigns, content, alerts, or issue reports.
- [ ] Browser back/forward does not bypass `RequireAuth` or `RequireWorkspace`.

## 3. Core operations

- [ ] Content Library lists, filters, and opens an item.
- [ ] Upload rejects unsupported audio and files over 50 MB; valid upload stays private.
- [ ] Campaign create/edit/target/publish flow persists after a hard refresh.
- [ ] Schedule changes show the correct timezone and survive reload.
- [ ] Monitoring shows online/offline state, last-seen time, and a next action.
- [ ] Branch Manager can submit an issue and see confirmation/reference state.
- [ ] Reports load empty, populated, and error states without a blank screen.

## 4. Roles and safety

- [ ] Owner can invite a team member and change role.
- [ ] Operations manager can operate content/campaigns but cannot change organization ownership.
- [ ] Branch manager sees only My Location and can report an issue.
- [ ] A denied action shows `/access-denied` with a useful explanation.
- [ ] No service-role key, private storage URL, or auth token appears in page source/logs.

## 5. Responsive and localization pass

- [ ] Test 390px, 768px, and 1440px widths.
- [ ] Test Arabic RTL and English LTR on auth, overview, tables, dialogs, and empty states.
- [ ] Keyboard focus is visible; dialogs close with Escape; primary actions are reachable by Tab.
- [ ] Loading, empty, error, and success states are distinguishable by text, not color alone.

## Evidence to record

Record browser/version, deployed commit, Supabase project ref, UTC timestamp, and links to
the screenshots or console/network logs for any failed check. Never include credentials.
