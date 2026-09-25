alter table public.content_items
  add column if not exists description text,
  add column if not exists mime_type text,
  add column if not exists file_size_bytes bigint,
  add column if not exists language text not null default 'en',
  add column if not exists bucket_id text not null default 'audio-assets';

alter table public.content_items
  drop constraint if exists content_items_language_check;
alter table public.content_items
  add constraint content_items_language_check
  check (language in ('en','ar','bilingual'));

create index if not exists content_items_organization_state_idx
  on public.content_items(organization_id, state);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('audio-assets', 'audio-assets', false, 52428800,
  array['audio/mpeg','audio/wav','audio/wave','audio/x-wav','audio/mp4','audio/aac','audio/ogg','audio/webm'])
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "audio_assets_select_team" on storage.objects;
create policy "audio_assets_select_team" on storage.objects for select to authenticated
using (
  bucket_id = 'audio-assets'
  and (storage.foldername(name))[1] ~ '^[0-9a-fA-F-]{36}$'
  and private.has_org_role(((storage.foldername(name))[1])::uuid,
    array['owner','marketing','operations','viewer']::public.branchcast_role[])
);

drop policy if exists "audio_assets_insert_marketing" on storage.objects;
create policy "audio_assets_insert_marketing" on storage.objects for insert to authenticated
with check (
  bucket_id = 'audio-assets'
  and (storage.foldername(name))[1] ~ '^[0-9a-fA-F-]{36}$'
  and private.has_org_role(((storage.foldername(name))[1])::uuid,
    array['owner','marketing']::public.branchcast_role[])
);

drop policy if exists "audio_assets_update_marketing" on storage.objects;
create policy "audio_assets_update_marketing" on storage.objects for update to authenticated
using (
  bucket_id = 'audio-assets'
  and (storage.foldername(name))[1] ~ '^[0-9a-fA-F-]{36}$'
  and private.has_org_role(((storage.foldername(name))[1])::uuid,
    array['owner','marketing']::public.branchcast_role[])
)
with check (
  bucket_id = 'audio-assets'
  and (storage.foldername(name))[1] ~ '^[0-9a-fA-F-]{36}$'
  and private.has_org_role(((storage.foldername(name))[1])::uuid,
    array['owner','marketing']::public.branchcast_role[])
);

drop policy if exists "audio_assets_delete_marketing" on storage.objects;
create policy "audio_assets_delete_marketing" on storage.objects for delete to authenticated
using (
  bucket_id = 'audio-assets'
  and (storage.foldername(name))[1] ~ '^[0-9a-fA-F-]{36}$'
  and private.has_org_role(((storage.foldername(name))[1])::uuid,
    array['owner','marketing']::public.branchcast_role[])
);
