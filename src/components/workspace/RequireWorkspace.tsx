import { Navigate, Outlet } from 'react-router-dom';
import { useWorkspace } from '@/providers/WorkspaceProvider';
export function RequireWorkspace() {
  const { workspace, isLoading } = useWorkspace();
  if (isLoading) return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--ink-secondary)' }}>Opening workspace…</div>;
  return workspace ? <Outlet /> : <Navigate to="/onboarding" replace />;
}
