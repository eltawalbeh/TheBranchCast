import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Role = Database['public']['Enums']['branchcast_role'];
type Workspace = { id: string; name: string; slug: string; role: Role; locationId: string | null };
type WorkspaceContextValue = {
  workspace: Workspace | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  // Start guarded routes in a loading state. Auth restores its session
  // asynchronously, so initializing from the first (null) user would let
  // RequireWorkspace redirect before this provider's first refresh runs.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadedUserRef = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase || !user) {
      loadedUserRef.current = null;
      setWorkspace(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    if (loadedUserRef.current !== user.id) setIsLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from('organization_members')
        .select('role, location_id, organizations(id, name, slug)')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (queryError) throw queryError;

      const organization = data?.organizations as unknown as { id: string; name: string; slug: string } | null;
      setWorkspace(data && organization ? {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        role: data.role,
        locationId: data.location_id,
      } : null);
      loadedUserRef.current = user.id;
    } catch (caught) {
      setWorkspace(null);
      setError(caught instanceof Error ? caught.message : 'Unable to load your workspace.');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    }

    if (!user) {
      loadedUserRef.current = null;
      setWorkspace(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Keep the route guard in a loading state for the whole first request.
    // This prevents a restored session from being mistaken for a new user.
    void refresh();
  }, [authLoading, user?.id]);

  const value = useMemo(() => ({ workspace, isLoading, error, refresh }), [workspace, isLoading, error, refresh]);
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return context;
}
