# Supabase Production Checklist

Before launch, verify this against the real BranchCast Supabase project:

- Apply and review all migrations in order.
- Confirm every exposed table has RLS enabled.
- Test organization isolation with owner, manager, editor, and branch-manager accounts.
- Confirm Storage policies for audio uploads and replacement.
- Enable only the required Realtime tables.
- Keep service-role and provider secrets server-side or in Edge Function secrets.
- Validate webhook signatures and idempotency before updating billing state.
- Confirm Cron jobs, alert delivery, backups, and restore procedure.
- Run database advisors and review Data API grants.
- Record the production project URL, deployment version, rollback target, and support owner.
