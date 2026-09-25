alter table public.organizations
  add column if not exists onboarding_completed_at timestamptz;

alter table public.players
  add column if not exists pairing_code text unique;

alter table public.players
  add column if not exists pairing_expires_at timestamptz;

create table if not exists public.workspace_invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null check (email = lower(email)),
  role public.branchcast_role not null default 'viewer',
  location_id uuid references public.locations(id) on delete set null,
  token uuid not null unique default gen_random_uuid(),
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  constraint invite_branch_requires_location check (role <> 'branch' or location_id is not null)
);

create table if not exists public.branch_issue_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  zone_id uuid references public.audio_zones(id) on delete set null,
  created_by uuid not null references auth.users(id) on delete restrict,
  issue_type text not null check (issue_type in ('no-audio','wrong-content','player-offline','volume','other')),
  note text,
  state public.alert_state not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists workspace_invites_organization_id_idx
  on public.workspace_invites(organization_id);
create index if not exists workspace_invites_email_idx
  on public.workspace_invites(email);
create index if not exists branch_issue_reports_location_id_idx
  on public.branch_issue_reports(location_id);
create index if not exists branch_issue_reports_state_idx
  on public.branch_issue_reports(state);

alter table public.workspace_invites enable row level security;
alter table public.branch_issue_reports enable row level security;

drop policy if exists "invites_owner_manage" on public.workspace_invites;
create policy "invites_owner_manage" on public.workspace_invites
  for all to authenticated
  using (private.has_org_role(organization_id, array['owner']::public.branchcast_role[]))
  with check (
    private.has_org_role(organization_id, array['owner']::public.branchcast_role[])
    and created_by = (select auth.uid())
  );

drop policy if exists "issues_select_team_or_author" on public.branch_issue_reports;
create policy "issues_select_team_or_author" on public.branch_issue_reports
  for select to authenticated
  using (
    created_by = (select auth.uid())
    or private.has_org_role(organization_id, array['owner','operations']::public.branchcast_role[])
  );

drop policy if exists "issues_create_for_accessible_location" on public.branch_issue_reports;
create policy "issues_create_for_accessible_location" on public.branch_issue_reports
  for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and private.can_read_location(location_id)
    and private.is_org_member(organization_id)
  );

drop policy if exists "issues_manage_operations" on public.branch_issue_reports;
create policy "issues_manage_operations" on public.branch_issue_reports
  for update to authenticated
  using (private.has_org_role(organization_id, array['owner','operations']::public.branchcast_role[]))
  with check (private.has_org_role(organization_id, array['owner','operations']::public.branchcast_role[]));

grant select, insert, update, delete on public.workspace_invites, public.branch_issue_reports to authenticated;

