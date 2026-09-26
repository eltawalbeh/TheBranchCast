-- Keep the organization membership helper out of the exposed public API schema.
-- It is still callable by authenticated RLS policies, but not as an RPC endpoint.
create schema if not exists private;

create or replace function private.is_org_member(_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = _organization_id
      and user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_org_member(uuid) from public;
grant execute on function private.is_org_member(uuid) to authenticated;

drop policy if exists "members read playback events" on public.playback_events;
create policy "members read playback events" on public.playback_events
  for select to authenticated
  using (exists (
    select 1
    from public.players p
    join public.audio_zones z on z.id = p.zone_id
    join public.locations l on l.id = z.location_id
    where p.id = playback_events.player_id
      and private.is_org_member(l.organization_id)
  ));

drop policy if exists "users read notifications" on public.notifications;
create policy "users read notifications" on public.notifications
  for select to authenticated
  using (private.is_org_member(organization_id)
    and (user_id is null or user_id = (select auth.uid())));

drop policy if exists "members read billing subscription" on public.billing_subscriptions;
create policy "members read billing subscription" on public.billing_subscriptions
  for select to authenticated
  using (private.is_org_member(organization_id));

drop policy if exists "members read billing events" on public.billing_events;
create policy "members read billing events" on public.billing_events
  for select to authenticated
  using (organization_id is not null and private.is_org_member(organization_id));

drop policy if exists "members read support incidents" on public.support_incidents;
create policy "members read support incidents" on public.support_incidents
  for select to authenticated
  using (private.is_org_member(organization_id));

drop policy if exists "members create support incidents" on public.support_incidents;
create policy "members create support incidents" on public.support_incidents
  for insert to authenticated
  with check (
    reported_by = (select auth.uid())
    and private.is_org_member(organization_id)
  );

drop policy if exists "operators update support incidents" on public.support_incidents;
create policy "operators update support incidents" on public.support_incidents
  for update to authenticated
  using (exists (
    select 1
    from public.organization_members
    where organization_id = support_incidents.organization_id
      and user_id = (select auth.uid())
      and role in ('owner', 'operations')
  ))
  with check (private.is_org_member(organization_id));

-- The old helper was exposed through /rest/v1/rpc and is no longer needed.
drop function if exists public.is_org_member(uuid);
