alter table public.campaigns
  add column if not exists content_item_id uuid references public.content_items(id) on delete restrict;

create index if not exists campaigns_organization_state_idx
  on public.campaigns(organization_id, state);

grant select, insert, update, delete on public.content_items, public.campaigns, public.campaign_targets to authenticated;
