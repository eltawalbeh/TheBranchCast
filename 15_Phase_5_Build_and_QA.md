# BranchCast — Phase 5 Build Instructions & QA

## Purpose
This file is the execution checklist for the first Figma Make build. It must be read together with files 00 through 14.

## Required Inputs
1. 00_Project_Context.md
2. 04_Information_Architecture_v1.md
3. 05_Users_Roles_and_Permissions.md
4. 06_Core_User_Flows.md
5. 07_Screen_Inventory.md
6. 08_UX_States_and_Interaction_Requirements.md
7. 09_Brand_Direction.md
8. 10_Design_Tokens.md
9. 11_Component_System.md
10. 12_Localization_and_Motion.md
11. 13_Phase_5_App_Shell_and_Overview_Blueprint.md
12. 14_Phase_5_Sample_Data.md

If information conflicts, priority is:
1. Product safety and scope constraints.
2. Phase 5 blueprint.
3. Design tokens and interaction rules.
4. Screen inventory.
5. Sample data.

## Build Order
1. Establish color, type, spacing, radius, and elevation tokens.
2. Build the App Shell: sidebar, top bar, page header, responsive navigation.
3. Build shared status, metric, alert, table, card, timeline, and empty-state components.
4. Build Owner Overview with the exact sample data.
5. Build Operations and Marketing hierarchy variations.
6. Build Branch Manager My Location variation.
7. Build Viewer read-only variation.
8. Build Alert Center, access denied, not found, loading, empty, and error states.
9. Test desktop, tablet, mobile, and RTL structure.

## Required Screens
- Login entry state.
- Owner Overview.
- Operations Overview.
- Marketing Overview.
- Branch Manager My Location.
- Viewer Overview.
- Alert Center.
- No locations empty state.
- No player data state.
- Loading state.
- Network status error state.
- Access denied.
- Not found.

## Required Prototype Interactions
| Trigger | Expected prototype behavior |
|---|---|
| Sidebar item | Navigate to its defined route or a clearly labelled placeholder page. |
| Create campaign | Opens a non-destructive prototype placeholder or future route. |
| Add location | Opens a non-destructive prototype placeholder or future route. |
| Open monitoring | Navigates to Monitoring / Alert Center. |
| View player | Navigates to a clearly labelled Player Detail placeholder. |
| Pair player | Navigates to a clearly labelled pairing placeholder. |
| View all alerts | Opens Alert Center. |
| Profile menu | Shows role/context and sign-out placeholder only. |
| Location scope | Shows a non-destructive selection UI; the dashboard can remain sample data. |

## Non-Negotiable Build Rules
- Build no pages beyond the stated Phase 5 scope except safe labelled placeholders needed to prevent dead ends.
- Do not add consumer podcast widgets, public listener metrics, host profiles, pricing cards, or entertainment content.
- Do not claim any real player, stream, campaign, or report data is live.
- Use all status labels as text, not colour alone.
- Keep orange usage limited to decisive actions and selected signal states.
- Do not use generic lorem ipsum, test accounts, or inconsistent data.
- Do not add Supabase, APIs, real uploads, or payment features.
- Do not use hard-coded layout assumptions that would fail in Arabic/RTL.
- No large decorative waveform or equalizer graphics.

## Desktop QA
- Sidebar is 248 px and visually quiet.
- Top bar is 72 px and preserves page context.
- Main layout uses 12 columns and 24 px gutters.
- Page header contains no more than two actions.
- Network Health shows four metrics.
- Live Network and Needs Attention share the first main content row.
- Now Playing contains the exact sample rows and statuses.
- Active Campaigns and Activity Timeline are present.
- All status and timestamps match the sample-data file.

## Tablet QA
- Navigation collapses without losing access.
- Metric row becomes a two-by-two grid.
- Live Network and Needs Attention stack cleanly.
- Table retains status and action information.
- No control overlaps or truncates.

## Mobile QA
- Navigation is a drawer.
- Touch controls are at least 44 px.
- Metrics use two columns.
- Now Playing becomes cards, not a compressed unreadable table.
- Page actions remain available.
- No sidebar, table, or filter content causes horizontal page overflow.

## RTL QA
- Sidebar, drawers, breadcrumbs, table actions, and directional arrows mirror correctly.
- Brand wordmark remains unchanged.
- Media controls and IDs do not mirror incorrectly.
- Arabic copy has adequate space and does not overlap icons/actions.
- Dialog and drawer entry direction follows logical language direction.

## Acceptance Checklist
The Phase 5 build is ready for review when every statement below is true:
- [ ] The dashboard makes operational health understandable at a glance.
- [ ] A user can identify both attention items and their next action.
- [ ] No page or control implies a live backend connection.
- [ ] The visual direction follows the UI System, not a generic podcast template.
- [ ] Owner, Operations, Marketing, Branch Manager, and Viewer experiences differ meaningfully where needed.
- [ ] Empty, loading, error, permission, tablet, mobile, and RTL states exist.
- [ ] All sample data remains internally consistent.
- [ ] All navigation has either a real prototype destination or a transparent placeholder.
- [ ] No scope from Phase 6 onward was built prematurely.

## Handoff
After this package is uploaded and implemented in Figma Make:
1. Review the visual result against this checklist.
2. Capture defects as a numbered audit.
3. Fix only Phase 5 issues.
4. Move to Phase 6: Locations, Zones & Player Setup visual blueprint.
