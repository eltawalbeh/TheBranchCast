alter table public.players
  add column if not exists paired_at timestamptz,
  add column if not exists agent_version text,
  add column if not exists current_track text,
  add column if not exists last_error text;

create index if not exists players_pairing_code_active_idx
  on public.players(pairing_code, pairing_expires_at)
  where pairing_code is not null;

create index if not exists player_commands_pending_idx
  on public.player_commands(player_id, status, created_at)
  where status = 'pending';

alter table public.player_commands
  add column if not exists claimed_at timestamptz;

alter table public.playback_events
  add column if not exists error_message text;

drop policy if exists "workspace members can update player commands" on public.player_commands;
create policy "workspace members can update player commands" on public.player_commands
for update to authenticated using (exists (
  select 1 from public.players p
  join public.audio_zones z on z.id = p.zone_id
  join public.locations l on l.id = z.location_id
  where p.id = player_commands.player_id and private.is_org_member(l.organization_id)
)) with check (exists (
  select 1 from public.players p
  join public.audio_zones z on z.id = p.zone_id
  join public.locations l on l.id = z.location_id
  where p.id = player_commands.player_id and private.is_org_member(l.organization_id)
));

grant update on public.player_commands to authenticated;
