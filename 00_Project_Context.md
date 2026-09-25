# BranchCast — Project Context

## Product Definition
BranchCast is a B2B business-audio platform for multi-location brands. It lets an authorized company manage approved audio sources, playlists, timed audio messages, and branch-level playback from one central workspace.

It is not a public consumer radio directory, a music-streaming service, or a way to rebroadcast copyrighted content without permission.

## Product Outcome
A brand should be able to decide what is heard at each branch, when it is heard, and confirm that playback is working—without relying on staff phones, personal accounts, or manual coordination.

## Phase 1 Purpose
This phase defines the product before visual design or technical implementation. It establishes:
- the customer problem and initial market;
- the MVP boundaries;
- product terminology and information architecture;
- delivery constraints for a free prototype.

## Primary Customer
A business with two or more physical locations, initially cafés, restaurants, retail stores, gyms, or salons.

## Primary User
A marketing or operations manager responsible for consistent in-store experience across branches.

## Core Product Surfaces
1. Customer Dashboard — central business workspace.
2. Branch Player — lightweight playback view/device mode for each branch.
3. Internal Admin — later phase for BranchCast support and account operations.
4. Marketing Website — later phase; it is not part of the first product build.

## Product Principles
- Central control, local reliability.
- Simple enough for operations teams.
- Clear status before decorative dashboards.
- No invented data, rights, integrations, or legal claims.
- Arabic and English must be considered from the start; UI implementation may begin in English.

## Terminology
| Term | Meaning |
|---|---|
| Organization | The customer company using BranchCast |
| Location | A physical branch |
| Audio Zone | A distinct listening area inside a location |
| Player | The browser/device application that plays approved audio |
| Content | An approved audio item or external audio source |
| Playlist | An ordered collection of audio items |
| Campaign | A timed audio message or promotion |
| Schedule | Rules that determine what plays in a zone and when |
| Playback Status | Current health and activity of a player |

## Explicit Non-Goals for the MVP
- Becoming a music streaming service.
- Hosting or distributing unlicensed music.
- A public listener app.
- Paid billing or payment gateway.
- AI voice generation.
- POS, weather, loyalty, or advertising-network integrations.

## Delivery Mode
Product documentation is created as structured Markdown files, committed to the BranchCast_Changes repository, then uploaded into Figma Make. Figma Make is asked to follow the uploaded documentation; it is not driven by a large free-form prompt.
