-- Allow managers to stop a browser player without changing its pairing/session.
alter table public.player_commands
  drop constraint if exists player_commands_command_check;

alter table public.player_commands
  add constraint player_commands_command_check
  check (command in ('play', 'pause', 'skip', 'stop', 'set_volume'));
