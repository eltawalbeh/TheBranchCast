import { useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Sidebar, type DemoRole } from './Sidebar';
import { TopBar } from './TopBar';

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roleParam = searchParams.get('role');
  const role: DemoRole = (['owner', 'marketing', 'operations', 'branch', 'viewer'].includes(roleParam ?? '')
    ? (roleParam as DemoRole)
    : 'owner');

  function handleRoleChange(r: DemoRole) {
    if (r === 'branch') {
      navigate('/my-location');
    } else {
      navigate(r === 'owner' ? '/overview' : `/overview?role=${r}`);
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--canvas)' }}>
      <Sidebar
        role={role}
        onRoleChange={handleRoleChange}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
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
