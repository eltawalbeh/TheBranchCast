select current_database() as database_name,
       current_user as database_user,
       current_setting('server_version') as postgres_version;

select table_schema, table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'organizations', 'organization_members', 'locations', 'content_items',
    'campaigns', 'campaign_targets', 'players', 'playback_events',
    'subscriptions', 'invoices', 'audit_logs'
  )
order by table_name;

select n.nspname as schema_name, t.typname as enum_name
from pg_type t
join pg_namespace n on n.oid = t.typnamespace
where n.nspname = 'public'
  and t.typname in ('branchcast_role', 'content_state', 'campaign_state', 'player_status')
order by t.typname;

select schemaname, tablename, policyname, roles, cmd
from pg_policies
where schemaname in ('public', 'storage')
order by schemaname, tablename, policyname;

select id, name, public, file_size_limit
from storage.buckets
where id = 'audio-assets';

