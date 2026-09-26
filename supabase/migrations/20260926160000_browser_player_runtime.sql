create table if not exists public.player_commands (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  command text not null check (command in ('play', 'pause', 'skip', 'set_volume')),
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'acknowledged', 'failed')),
  error_message text,
  created_at timestamptz not null default now(),
  claimed_at timestamptz,
  acknowledged_at timestamptz
);

alter table public.player_commands add column if not exists payload jsonb not null default '{}'::jsonb;
alter table public.player_commands add column if not exists error_message text;
alter table public.player_commands add column if not exists claimed_at timestamptz;
alter table public.player_commands add column if not exists acknowledged_at timestamptz;

create table if not exists public.player_browser_sessions (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null default (now() + interval '30 days'),
  revoked_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists player_browser_sessions_player_idx on public.player_browser_sessions(player_id);
create index if not exists player_browser_sessions_active_idx on public.player_browser_sessions(token_hash, expires_at) where revoked_at is null;
create index if not exists player_commands_pending_idx on public.player_commands(player_id, status, created_at) where status = 'pending';

alter table public.player_browser_sessions enable row level security;
alter table public.player_commands enable row level security;

revoke all on public.player_browser_sessions from anon, authenticated;
grant all on public.player_browser_sessions to service_role;

drop policy if exists "workspace members can insert player commands" on public.player_commands;
create policy "workspace members can insert player commands" on public.player_commands
for insert to authenticated
with check (exists (
  select 1 from public.players p
  join public.audio_zones z on z.id = p.zone_id
  join public.locations l on l.id = z.location_id
  where p.id = player_commands.player_id and private.is_org_member(l.organization_id)
));

grant insert on public.player_commands to authenticated;

