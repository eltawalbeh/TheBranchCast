import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, Music, Megaphone, CalendarDays, Radio,
  BarChart3, Users, Settings, HelpCircle, ChevronDown, ChevronRight,
  X, Building2,
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export type DemoRole = 'owner' | 'marketing' | 'operations' | 'branch' | 'viewer';

const allNavItems = [
  { label: 'Overview', icon: LayoutDashboard, to: '/overview', roles: ['owner', 'marketing', 'operations', 'viewer'] },
  { label: 'My location', icon: MapPin, to: '/my-location', roles: ['branch'] },
  { label: 'Locations', icon: Building2, to: '/locations', roles: ['owner', 'marketing', 'operations', 'viewer'] },
  { label: 'Content', icon: Music, to: '/content', roles: ['owner', 'marketing', 'operations', 'viewer'] },
  { label: 'Campaigns', icon: Megaphone, to: '/campaigns', roles: ['owner', 'marketing', 'operations', 'viewer'] },
  { label: 'Schedule', icon: CalendarDays, to: '/schedule', roles: ['owner', 'marketing', 'operations', 'viewer'] },
  { label: 'Monitoring', icon: Radio, to: '/monitoring/alerts', roles: ['owner', 'marketing', 'operations', 'viewer'], badge: 2 },
  { label: 'Reports', icon: BarChart3, to: '/reports', roles: ['owner', 'marketing', 'operations', 'viewer'] },
];

const secondaryNavItems = [
  { label: 'Team & Roles', icon: Users, to: '/team', roles: ['owner', 'marketing', 'operations', 'viewer'] },
  { label: 'Settings', icon: Settings, to: '/settings', roles: ['owner', 'marketing', 'operations', 'viewer'] },
  { label: 'Help & Support', icon: HelpCircle, to: '/help', roles: ['owner', 'marketing', 'operations', 'viewer', 'branch'] },
];

const roleLabels: Record<DemoRole, string> = {
  owner: 'Organization Owner',
  marketing: 'Marketing Manager',
  operations: 'Operations Manager',
  branch: 'Branch Manager',
  viewer: 'Viewer',
};

interface SidebarProps {
  role: DemoRole;
  onRoleChange: (r: DemoRole) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  organizationName?: string;
}

function NavItem({ label, icon: Icon, to, badge, active }: {
  label: string; icon: React.ElementType; to: string; badge?: number; active?: boolean;
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: isActive || active ? 500 : 400,
        color: isActive || active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
        background: isActive || active ? 'var(--sidebar-active)' : 'transparent',
        textDecoration: 'none',
        transition: 'background var(--motion-fast) ease-out, color var(--motion-fast) ease-out',
        position: 'relative',
      })}
      onMouseEnter={e => {
        const el = e.currentTarget;
        if (!el.getAttribute('aria-current')) el.style.background = 'var(--sidebar-hover)';
        if (!el.getAttribute('aria-current')) el.style.color = 'rgba(255,255,255,0.85)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        if (!el.getAttribute('aria-current')) {
          el.style.background = 'transparent';
          el.style.color = 'rgba(255,255,255,0.55)';
        }
      }}
    >
      {({ isActive }) => (
        <>
          {(isActive || active) && (
            <span style={{
              position: 'absolute',
              left: 0, top: '50%', transform: 'translateY(-50%)',
              width: 3, height: 20,
              background: 'var(--signal)',
              borderRadius: '0 2px 2px 0',
            }} />
          )}
          <Icon size={18} strokeWidth={1.75} />
          <span style={{ flex: 1 }}>{label}</span>
          {badge && badge > 0 && (
            <span style={{
              background: 'var(--danger)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 10,
              padding: '1px 6px',
              lineHeight: '16px',
            }}>
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ role, onRoleChange, onClose, organizationName }: {
  role: DemoRole; onRoleChange: (r: DemoRole) => void; onClose?: () => void; organizationName?: string;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [rolePickerOpen, setRolePickerOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const userName = String(user?.user_metadata.full_name ?? user?.email?.split('@')[0] ?? 'BranchCast user');
  const initials = userName.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();

  const mainItems = allNavItems.filter(i => i.roles.includes(role));
  const secondItems = secondaryNavItems.filter(i => i.roles.includes(role));

  const isBranchActive = location.pathname === '/my-location';
  const isOverviewActive = location.pathname.startsWith('/overview') || (role !== 'branch' && location.pathname === '/');

  return (
    <div style={{
      width: 'var(--sidebar-width)',
      height: '100%',
      background: 'var(--sidebar-bg)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Brand + close (mobile) */}
      <div style={{ padding: '20px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
          BranchCast
        </span>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 4 }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Org switcher */}
      <div style={{ padding: '0 8px 8px' }}>
        <button style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px', borderRadius: 8,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
        }}>
          <Building2 size={14} style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{organizationName ?? 'Your workspace'}</span>
          <ChevronDown size={14} style={{ opacity: 0.5 }} />
        </button>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 8px 8px' }} />

      {/* Main nav */}
      <nav style={{ flex: 1, padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }} className="panel-scroll">
        {mainItems.map(item => (
          <NavItem
            key={item.to}
            label={item.label}
            icon={item.icon}
            to={item.to}
            badge={item.badge}
            active={
              (item.to === '/overview' && isOverviewActive) ||
              (item.to === '/my-location' && isBranchActive)
            }
          />
        ))}

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 4px' }} />

        {secondItems.map(item => (
          <NavItem key={item.to} label={item.label} icon={item.icon} to={item.to} />
        ))}
      </nav>

      {/* Demo role switcher */}
      <div style={{ display: 'none', padding: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setRolePickerOpen(p => !p)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 8px', borderRadius: 6,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.45)',
              fontSize: 11, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{ flex: 1 }}>Demo: {roleLabels[role]}</span>
            <ChevronRight size={12} style={{ transform: rolePickerOpen ? 'rotate(90deg)' : 'none', transition: 'transform 120ms' }} />
          </button>
          {rolePickerOpen && (
            <div style={{
              position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 4,
              background: '#2A2420',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 8, overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              zIndex: 100,
            }}>
              {(['owner', 'marketing', 'operations', 'branch', 'viewer'] as DemoRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => { onRoleChange(r); setRolePickerOpen(false); }}
                  style={{
                    width: '100%', display: 'block',
                    padding: '8px 12px',
                    textAlign: 'left', fontSize: 13,
                    color: role === r ? 'var(--signal)' : 'rgba(255,255,255,0.7)',
                    background: role === r ? 'rgba(244,124,44,0.1)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    fontWeight: role === r ? 500 : 400,
                  }}
                >
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile card */}
      <div style={{ padding: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(p => !p)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: 10, borderRadius: 8,
              background: 'transparent', border: 'none', cursor: 'pointer',
              transition: 'background var(--motion-fast) ease-out',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--sidebar-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--signal)',
              color: '#fff', fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {initials}
            </span>
            <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {userName}
              </p>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {roleLabels[role]}
              </p>
            </div>
            <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
          </button>
          {profileOpen && (
            <div style={{
              position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 4,
              background: '#2A2420',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 8,
              boxShadow: 'var(--shadow-md)',
              zIndex: 100, overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{userName}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{user?.email}</p>
              </div>
              <button onClick={() => { void signOut(); }} style={{
                width: '100%', display: 'block', padding: '9px 14px',
                textAlign: 'left', fontSize: 13, color: 'var(--danger)',
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <div style={{ display: 'none' }} className="sidebar-desktop">
        <SidebarContent role={props.role} onRoleChange={props.onRoleChange} organizationName={props.organizationName} />
      </div>

      {/* Tablet icon rail hidden for now — using full sidebar up to 768px then drawer */}

      {/* Mobile drawer */}
      {props.mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(29,25,22,0.6)',
            backdropFilter: 'blur(2px)',
          }}
          onClick={props.onMobileClose}
        >
          <div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              animation: 'slideInLeft var(--motion-emphasis) ease-out',
            }}
            onClick={e => e.stopPropagation()}
          >
            <SidebarContent role={props.role} onRoleChange={props.onRoleChange} onClose={props.onMobileClose} organizationName={props.organizationName} />
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: flex !important; height: 100vh; position: sticky; top: 0; flex-shrink: 0; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
