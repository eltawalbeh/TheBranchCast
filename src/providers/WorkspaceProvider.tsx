import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Role = Database['public']['Enums']['branchcast_role'];
type Workspace = { id: string; name: string; slug: string; role: Role; locationId: string | null };
type WorkspaceContextValue = { workspace: Workspace | null; isLoading: boolean; refresh: () => Promise<void> };
const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(user));
  const refresh = async () => {
    if (!supabase || !user) { setWorkspace(null); setIsLoading(false); return; }
    setIsLoading(true);
    const { data } = await supabase.from('organization_members')
      .select('role, location_id, organizations(id, name, slug)')
      .eq('user_id', user.id).limit(1).maybeSingle();
    const organization = data?.organizations as unknown as { id: string; name: string; slug: string } | null;
    setWorkspace(data && organization ? { id: organization.id, name: organization.name, slug: organization.slug, role: data.role, locationId: data.location_id } : null);
    setIsLoading(false);
  };
  useEffect(() => { void refresh(); }, [user?.id]);
  const value = useMemo(() => ({ workspace, isLoading, refresh }), [workspace, isLoading]);
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return context;
}
