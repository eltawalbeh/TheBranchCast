create table if not exists public.playback_events (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  content_item_id uuid references public.content_items(id) on delete set null,
  event_type text not null check (event_type in ('started','completed','skipped','failed','heartbeat')),
  result text,
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  data jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  provider text not null default 'manual',
  provider_customer_id text,
  provider_subscription_id text unique,
  plan_key text not null default 'trial',
  status text not null default 'trialing',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.billing_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  provider text not null,
  provider_event_id text not null unique,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  processed_at timestamptz not null default now()
);

create table if not exists public.support_incidents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  reported_by uuid not null references auth.users(id) on delete restrict,
  assigned_to uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  severity text not null default 'normal' check (severity in ('low','normal','high','critical')),
  status text not null default 'open' check (status in ('open','investigating','resolved','closed')),
  resolution text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.playback_events enable row level security;
alter table public.notifications enable row level security;
alter table public.billing_subscriptions enable row level security;
alter table public.billing_events enable row level security;
alter table public.support_incidents enable row level security;

create or replace function public.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.organization_members where organization_id = target_org and user_id = auth.uid());
$$;

drop policy if exists "members read playback events" on public.playback_events;
create policy "members read playback events" on public.playback_events for select to authenticated using (exists (
  select 1 from public.players p join public.audio_zones z on z.id = p.zone_id join public.locations l on l.id = z.location_id
  where p.id = playback_events.player_id and public.is_org_member(l.organization_id)
));

drop policy if exists "users read notifications" on public.notifications;
create policy "users read notifications" on public.notifications for select to authenticated using (public.is_org_member(organization_id) and (user_id is null or user_id = auth.uid()));
drop policy if exists "users update notifications" on public.notifications;
create policy "users update notifications" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "members read billing subscription" on public.billing_subscriptions;
create policy "members read billing subscription" on public.billing_subscriptions for select to authenticated using (public.is_org_member(organization_id));
drop policy if exists "members read billing events" on public.billing_events;
create policy "members read billing events" on public.billing_events for select to authenticated using (organization_id is not null and public.is_org_member(organization_id));

drop policy if exists "members read support incidents" on public.support_incidents;
create policy "members read support incidents" on public.support_incidents for select to authenticated using (public.is_org_member(organization_id));
drop policy if exists "members create support incidents" on public.support_incidents;
create policy "members create support incidents" on public.support_incidents for insert to authenticated with check (reported_by = auth.uid() and public.is_org_member(organization_id));
drop policy if exists "operators update support incidents" on public.support_incidents;
create policy "operators update support incidents" on public.support_incidents for update to authenticated using (exists (select 1 from public.organization_members where organization_id = support_incidents.organization_id and user_id = auth.uid() and role in ('owner','operations'))) with check (public.is_org_member(organization_id));

grant select on public.playback_events, public.notifications, public.billing_subscriptions, public.billing_events, public.support_incidents to authenticated;
grant update on public.notifications to authenticated;
grant insert, update on public.support_incidents to authenticated;
