# BranchCast — Product Decisions & Constraints

## Confirmed Decisions
| Area | Decision |
|---|---|
| Product name | BranchCast |
| Product type | B2B business-audio management platform |
| Build approach | Structured project files uploaded to Figma Make |
| Repository | `eltawalbeh/BranchCast_Changes` is the change/document source |
| Prototype cost | Free tools and free tiers only |
| Backend | Supabase is considered only after product flows and UI are approved |
| First target | Multi-location businesses |
| Main dashboard | Desktop-first |
| Language direction | English-first product structure with Arabic/RTL readiness |

## Delivery Rules
1. Do not use one large generative prompt as the project specification.
2. Each phase is documented in separate files before Figma Make work begins.
3. Do not introduce code, databases, or integrations before the requirements file for that item is approved.
4. Use realistic sample content but never represent it as licensed or live.
5. Keep the design system and interface clean, operational, and data-led—not a generic music-app visual theme.
6. Every future addition must identify whether it is MVP, later phase, assumption, or blocker.

## Technical Constraints
- No paid APIs or paid infrastructure for the prototype.
- No dependency on commercial music-streaming consumer accounts.
- No YouTube downloading, ripping, extraction, or rebroadcast functionality.
- Any future external stream must be user-provided and authorized for the intended use.
- The UI must not imply a player is truly connected unless the backend eventually verifies it.

## Design Constraints
- Prioritize status, clarity, and task completion.
- Use accessible color contrast and never encode player status through color alone.
- Design responsive layouts, but optimize the first dashboard iteration for desktop.
- Preserve a future bilingual structure: strings must not be hard-coded into layout assumptions that break RTL.
- Avoid excessive glass effects, waveform decoration, or “DJ app” styling.

## Decision Log
| ID | Decision | Status | Owner |
|---|---|---|---|
| D-001 | BranchCast is B2B, not a consumer radio product. | Confirmed | Product |
| D-002 | Phase 1 produces documentation only. | Confirmed | Product |
| D-003 | The prototype uses free tools only. | Confirmed | Product |
| D-004 | Paid music licensing is not part of the prototype. | Confirmed | Product |
| D-005 | Supabase is deferred until the experience is approved. | Confirmed | Product |
| D-006 | Exact target vertical for pilot | Open | Product |
| D-007 | Approved pilot audio-source model | Open | Product |
| D-008 | First player environment: web/tablet/Android device | Open | Product |

## Blockers Before Production
- Music and commercial playback rights per customer/country.
- A compliant audio-source agreement or customer-content policy.
- Real player heartbeat and device-management approach.
- Data retention, access control, and security rules.
- Pilot customer and success criteria.
