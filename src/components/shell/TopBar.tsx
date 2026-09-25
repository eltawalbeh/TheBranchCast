import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Menu, MapPin } from 'lucide-react';
import { currentUser } from '@/data/sample';
import type { DemoRole } from './Sidebar';

const pageTitles: Record<string, string> = {
  '/overview': 'Overview',
  '/my-location': 'My location',
  '/monitoring/alerts': 'Alert center',
  '/locations': 'Locations',
  '/content': 'Content',
  '/campaigns': 'Campaigns',
  '/schedule': 'Schedule',
  '/reports': 'Reports',
  '/team': 'Team & Roles',
  '/settings': 'Settings',
  '/help': 'Help & Support',
  '/access-denied': 'Access denied',
  '/not-found': 'Page not found',
};

const roleLabels: Record<DemoRole, string> = {
  owner: 'Organization Owner',
  marketing: 'Marketing Manager',
  operations: 'Operations Manager',
  branch: 'Branch Manager',
  viewer: 'Viewer',
};

interface TopBarProps {
  role: DemoRole;
  onMenuOpen: () => void;
  alertCount?: number;
}

export function TopBar({ role, onMenuOpen, alertCount = 2 }: TopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [scopeOpen, setScopeOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const pageTitle = pageTitles[location.pathname] ?? 'BranchCast';
  const scope = role === 'branch' ? 'Sweifieh' : 'All locations';

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      paddingInline: 24,
      gap: 16,
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Hamburger (mobile) */}
      <button
        onClick={onMenuOpen}
        className="mobile-menu-btn"
        style={{
          display: 'none',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--ink-secondary)', padding: 6, borderRadius: 6,
        }}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Page label / breadcrumb */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0, whiteSpace: 'nowrap' }}>
          {pageTitle}
        </h1>
      </div>

      {/* Location scope selector */}
      <div style={{ position: 'relative' }} className="scope-selector">
        <button
          onClick={() => setScopeOpen(p => !p)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 10px',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            background: 'var(--surface)',
            color: 'var(--ink-secondary)',
            fontSize: 13, fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <MapPin size={14} />
          <span>{scope}</span>
          <ChevronDown size={14} style={{ opacity: 0.6 }} />
        </button>
        {scopeOpen && (
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 4,
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 10, overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            zIndex: 100, minWidth: 200,
          }}>
            {['All locations', 'Abdali', 'Sweifieh', 'Khalda', 'Jabal Amman', 'Dabouq', 'Irbid', 'Abdoun'].map(loc => (
              <button
                key={loc}
                onClick={() => setScopeOpen(false)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '9px 14px', border: 'none',
                  background: loc === scope ? 'var(--surface-subtle)' : 'transparent',
                  color: 'var(--ink)', fontSize: 13, fontWeight: loc === scope ? 500 : 400,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-subtle)'}
                onMouseLeave={e => e.currentTarget.style.background = loc === scope ? 'var(--surface-subtle)' : 'transparent'}
              >
                {loc}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date context */}
      <span className="date-context" style={{ fontSize: 13, color: 'var(--ink-tertiary)', whiteSpace: 'nowrap' }}>
        Today, 25 Sep 2026
      </span>

      {/* Notification bell */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { setAlertsOpen(p => !p); navigate('/monitoring/alerts'); }}
          style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36,
            background: 'none', border: 'none',
            borderRadius: 8, cursor: 'pointer',
            color: alertCount > 0 ? 'var(--ink)' : 'var(--ink-tertiary)',
          }}
          aria-label={`Notifications — ${alertCount} unresolved`}
        >
          <Bell size={18} />
          {alertCount > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4,
              width: 8, height: 8,
              background: 'var(--danger)',
              borderRadius: '50%',
              border: '1.5px solid var(--surface)',
            }} />
          )}
        </button>
      </div>

      {/* Avatar */}
      <button
        style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'var(--signal)',
          color: '#fff', fontSize: 12, fontWeight: 600,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-label="Profile menu"
      >
        {currentUser.initials}
      </button>

      <style>{`
        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
          .date-context { display: none !important; }
          .scope-selector { display: none !important; }
        }
      `}</style>
    </header>
  );
}
