# Production Environment Contract

Set these values in the deployment secret manager. Never place real values in Figma Make, source control, screenshots, or client-side code unless the value is explicitly public.

## Client-safe values

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Server-only values

- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`
- `SUPABASE_ACCESS_TOKEN`
- `PLAYER_COMMAND_SIGNING_SECRET`
- `BILLING_PROVIDER_SECRET_KEY`
- `BILLING_WEBHOOK_SECRET`
- `ALERT_WEBHOOK_URL`

## Required checks

- Production and staging projects are separate.
- Redirect URLs and allowed origins are restricted to approved domains.
- Service-role keys are used only by trusted server-side functions.
- Billing webhook endpoints reject unsigned or replayed requests.
- Secrets have an owner, rotation date, and emergency revocation procedure.

