alter table public.players
  add column if not exists active_schedule_entry_id uuid references public.schedule_entries(id) on delete set null,
  add column if not exists active_content_item_id uuid references public.content_items(id) on delete set null;

create index if not exists players_active_schedule_entry_idx
  on public.players(active_schedule_entry_id)
  where active_schedule_entry_id is not null;
