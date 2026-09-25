import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: 'calc(100vh - var(--topbar-height))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 48, fontWeight: 700, color: 'var(--border-color)', lineHeight: 1 }}>404</span>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--ink)' }}>Page not found</h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--ink-secondary)' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/overview')}>
          Go to Overview
        </Button>
      </div>
    </div>
  );
}
