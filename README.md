# BranchCast Phase 7-9 Functional Bundle

This bundle is the complete Phase 7, 8, and 9 implementation for the BranchCast app.

## Upload / merge mapping

Copy the files inside this bundle into the existing project while preserving the relative paths under the bundle:

- `src/*` → project `src/*`
- `supabase/*` → project `supabase/*`
- `pnpm-lock.yaml` → project root `pnpm-lock.yaml`

The bundle includes:
- Public landing page and authentication entry.
- Workspace onboarding.
- Locations, audio zones, players, and pairing code setup.
- Supabase migration, generated database types, and `create-workspace` Edge Function.
- Direct Supabase browser client wiring.

Validation completed: TypeScript check, Vite production build, Git diff check, and Supabase security advisors.
