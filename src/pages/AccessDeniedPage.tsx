import { useNavigate } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: 'calc(100vh - var(--topbar-height))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: 'var(--warning-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ShieldOff size={26} style={{ color: 'var(--warning)' }} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>
            You do not have access to this area.
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--ink-secondary)', lineHeight: '22px' }}>
            Your current role can view assigned locations only.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/my-location')}>
          Go to my location
        </Button>
      </div>
    </div>
  );
}
