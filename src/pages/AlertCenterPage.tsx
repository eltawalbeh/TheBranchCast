import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { alerts } from '@/data/sample';
import { ChevronRight } from 'lucide-react';

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      ...style,
    }}>
      {children}
    </div>
  );
}

export function AlertCenterPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>Alert center</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--ink-secondary)' }}>
            {alerts.length} issue{alerts.length !== 1 ? 's' : ''} require attention.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => {}}>Refresh</Button>
      </div>

      {/* Alert list */}
      <Card>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-tertiary)' }}>
            Showing {alerts.length} active alerts — All locations
          </span>
        </div>

        {alerts.map((a, i) => (
          <div key={a.id} style={{
            padding: '18px 20px',
            borderBottom: i < alerts.length - 1 ? '1px solid var(--border-color)' : 'none',
            display: 'flex', alignItems: 'flex-start', gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <StatusBadge status={a.priority} />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                  {a.location} — {a.zone}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-secondary)' }}>{a.problem}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(a.nextActionRoute)}
              style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {a.nextAction} <ChevronRight size={14} />
            </Button>
          </div>
        ))}
      </Card>

      {/* Summary note */}
      <p style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-tertiary)', textAlign: 'center' }}>
        Monitoring data is simulated and does not reflect a live connection.
      </p>
    </div>
  );
}
