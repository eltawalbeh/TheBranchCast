import { Navigate, Outlet } from 'react-router-dom';
import { useWorkspace } from '@/providers/WorkspaceProvider';

export function RequireWorkspace() {
  const { workspace, isLoading, error, refresh } = useWorkspace();

  if (isLoading) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--ink-secondary)' }}>Opening workspace…</div>;
  }

  // A query/auth failure is not proof that onboarding is incomplete.
  // Keep the user in context and offer a safe retry instead of losing their route.
  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, color: 'var(--ink-primary)' }}>
        <div style={{ maxWidth: 440, textAlign: 'center' }}>
          <h1 style={{ marginBottom: 8 }}>Workspace unavailable</h1>
          <p style={{ color: 'var(--ink-secondary)', marginBottom: 16 }}>{error}</p>
          <button type="button" onClick={() => void refresh()}>Try again</button>
        </div>
      </div>
    );
  }

  return workspace ? <Outlet /> : <Navigate to="/onboarding" replace />;
}

