# Phase 28 — Production Activation & Launch

This bundle is the next step after the completed Phase 21–27 UI delivery. It is an implementation and release gate, not a new Figma page bundle.

## Objective

Turn the delivered BranchCast interface into a safe, observable production release by wiring the real Supabase services, player runtime, billing provider, alerts, and deployment environment.

## Required sequence

1. Configure the production environment variables listed in `supabase/PRODUCTION_ENVIRONMENT.md`.
2. Apply and verify Supabase migrations, RLS policies, Storage buckets, Realtime, Cron, and Edge Functions.
3. Register one real player and verify heartbeat, online/offline transitions, now-playing events, and command acknowledgement.
4. Configure the billing provider in test mode, verify webhook signatures and idempotency, then switch to live mode only after acceptance.
5. Run the release smoke tests in `qa/RELEASE_SMOKE_TEST.md` for public site, authentication, manager, branch manager, player runtime, billing, and RTL/LTR.
6. Confirm monitoring, alert routing, backups, rollback owner, and incident contact before deployment.

## Definition of done

- No production secrets are committed to the repository.
- RLS prevents cross-organization reads and writes.
- A real player can check in, receive a safe command, and report acknowledgement.
- Billing webhooks are verified, replay-safe, and linked to the correct organization.
- Error, offline, empty, loading, and permission states are visible and actionable.
- A rollback version and named release owner are recorded.

## Important

Do not mark the product production-ready based on the UI alone. This phase requires real Supabase credentials, a player runtime/device, a billing provider account if billing is enabled, and a deployed environment.

