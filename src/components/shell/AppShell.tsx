import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, type DemoRole } from './Sidebar';
import { TopBar } from './TopBar';
import { useWorkspace } from '@/providers/WorkspaceProvider';

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { workspace } = useWorkspace();
  const role = (workspace?.role ?? 'viewer') as DemoRole;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--canvas)' }}>
      <Sidebar
        role={role}
        onRoleChange={() => undefined}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        organizationName={workspace?.name}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        <TopBar role={role} onMenuOpen={() => setMobileOpen(true)} alertCount={2} />
        <main style={{ flex: 1 }}>
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  );
}
