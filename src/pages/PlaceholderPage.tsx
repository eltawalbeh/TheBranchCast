import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Construction } from 'lucide-react';

const labels: Record<string, string> = {
  '/locations': 'Locations',
  '/locations/new': 'Add Location',
  '/content': 'Content',
  '/campaigns': 'Campaigns',
  '/campaigns/new': 'Create Campaign',
  '/schedule': 'Schedule',
  '/reports': 'Reports',
  '/team': 'Team & Roles',
  '/settings': 'Settings',
  '/help': 'Help & Support',
  '/login': 'Login',
};

export function PlaceholderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const label = labels[location.pathname] ?? location.pathname;

  return (
    <div style={{
      minHeight: 'calc(100vh - var(--topbar-height))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40,
    }}>
      <div style={{
        textAlign: 'center', maxWidth: 400,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        padding: '40px 32px',
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{
          width: 48, height: 48,
          background: 'var(--surface-subtle)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Construction size={22} style={{ color: 'var(--ink-tertiary)' }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{label}</h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-tertiary)' }}>
            This section is planned for a future phase.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    </div>
  );
}
