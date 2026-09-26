-- Browser schedule automation creates commands without a signed-in manager.
-- Manager-issued commands still populate requested_by; runtime-issued commands
-- are intentionally system-generated and therefore use NULL.
alter table public.player_commands
  alter column requested_by drop not null;
