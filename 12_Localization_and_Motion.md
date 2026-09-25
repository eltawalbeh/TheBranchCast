# BranchCast — Arabic, English, Interaction & Motion Rules

## Language Strategy
BranchCast is structured for English and Arabic from the first visual pass.

English may be the first populated UI language, but every component and layout must be ready to switch to Arabic without redesign.

## English and Arabic Behaviour

### Direction
| Area | English | Arabic |
|---|---|---|
| App direction | LTR | RTL |
| Sidebar | Left | Right |
| Primary content alignment | Left-aligned | Right-aligned |
| Breadcrumb direction | Left to right | Right to left |
| Page actions | End of header, right side | End of header, left side |
| Table action column | Right-most | Left-most |
| Arrow icons | Point forward/right | Mirror to forward/left |
| Date range controls | Locale-led | Locale-led and RTL-aware |

### Do Not Mirror
- Brand wordmark unless an approved Arabic wordmark is created.
- Time values, file names, IDs, email addresses, URLs, or technical codes.
- Audio playback progress direction if it represents elapsed time; use a clear time label to avoid ambiguity.
- Universal media icons such as play, pause, volume, and stop.

### Text Rules
- Use IBM Plex Sans for English and IBM Plex Sans Arabic for Arabic.
- Arabic labels should be written as natural Arabic UX copy, not literal translated English.
- Support longer Arabic strings in buttons, filter labels, badges, and table headers.
- Keep numbers in the locale-appropriate form selected by the product; do not mix numeral styles within one screen.
- Avoid punctuation that creates mixed-direction rendering issues in short UI labels.

### Content Rules
- Date, timezone, and location information must be clearly structured rather than embedded into long sentences.
- Status labels are translated consistently and do not change product meaning.
- Do not place English-only helper text in an Arabic interface.

## Interaction Principles
- Fast, predictable, and quiet.
- Motion helps orientation, state change, and cause/effect; it never performs as decoration.
- Focus and keyboard behavior matter as much as pointer interactions.
- All important actions have visible labels, clear scope, and feedback.

## Motion Tokens
| Token | Duration | Use |
|---|---|---|
| motion.instant | 0 ms | Immediate toggle / status update |
| motion.fast | 120 ms | Hover, pressed state, badge change |
| motion.standard | 180 ms | Button, dropdown, small panel |
| motion.emphasis | 240 ms | Drawer, modal, schedule selection |
| motion.slow | 320 ms maximum | Large layout transition only |

### Easing
- Default: ease-out.
- Entering surfaces: ease-out.
- Exiting surfaces: ease-in.
- Avoid spring/bounce animation in operational dashboard UI.

## Motion Rules
- Buttons: background/color transition only; no scale jump larger than 1–2%.
- Sidebar: 180–240 ms open/close transition.
- Dropdowns and menus: fade + 4–8 px translate; no elaborate animation.
- Drawers: slide from logical screen edge based on language direction.
- Modals: fade scrim + small vertical transition.
- Toasts: enter from logical lower edge, remain until dismissed/timeout, do not stack excessively.
- Schedule blocks: selection change is immediate with a 120 ms color/border transition.
- Loading: use subtle skeleton shimmer or opacity pulse; never use spinning decorative waves.
- Player state: a restrained dot pulse is permitted only for Online/Syncing; it must stop under reduced-motion settings.

## Reduced Motion
When a user requests reduced motion:
- Remove transforms and looping pulses.
- Keep instant state changes and visible focus behavior.
- Skeletons use static neutral blocks rather than shimmer.
- Never make access to content depend on animation completion.

## Interaction Requirements
- Focus-visible ring uses color.signal with sufficient contrast.
- Buttons and controls have minimum 44 px touch target on mobile.
- Drag-and-drop playlist sorting must have an accessible alternative: move up/down controls.
- All overlays close with Escape and return focus to the launching control.
- Dialog confirmation actions are not pre-focused if destructive.
- Never rely on hover alone to reveal a necessary action.
- Use optimistic UI only for clearly simulated actions; otherwise show a saving state.

## Prototype Integrity
Any on-air status, player action, content preview, publish action, or report data that is not connected to a backend must be presented as sample/simulated behavior and never as a live operational claim.
