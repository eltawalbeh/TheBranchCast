-- Read-only production validation for BranchCast.
-- Run with a read-only database role in the Supabase SQL editor.

select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'organizations', 'organization_members', 'profiles', 'locations', 'players',
    'content_items', 'campaigns', 'campaign_targets', 'schedule_entries',
    'alerts', 'branch_issue_reports', 'player_events', 'workspace_invites'
  )
order by table_name;

select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'organizations', 'organization_members', 'profiles', 'locations', 'players',
    'content_items', 'campaigns', 'campaign_targets', 'schedule_entries',
    'alerts', 'branch_issue_reports', 'player_events', 'workspace_invites'
  )
order by tablename;

select id, name, public, file_size_limit
from storage.buckets
where id = 'audio-assets';
