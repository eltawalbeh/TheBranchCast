import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import { zones } from '@/data/sample';

const myLocation = zones.filter(z => z.location === 'Luma Coffee — Sweifieh');

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

export function MyLocationPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>My location</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--ink-secondary)' }}>
            Luma Coffee — Sweifieh
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/help?subject=report-issue')}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <AlertTriangle size={14} />
          Report an issue
        </Button>
      </div>

      {/* Hero player card */}
      <Card style={{ padding: 24, marginBottom: 24, background: '#1A1410', border: 'none' }}>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.04em' }}>
          Current player status
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>Sweifieh — Main Floor</p>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Player: BC-SWF-01</p>
          </div>
          <StatusBadge status="Offline" />
        </div>
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(197,59,59,0.15)', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--danger)', fontWeight: 500 }}>
            Player is offline. Last seen 18 min ago.
          </p>
        </div>
      </Card>

      {/* Audio zone cards */}
      <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: '0 0 16px' }}>Audio zones</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {myLocation.map((zone, i) => (
          <Card key={i} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{zone.zone}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink-tertiary)' }}>
                  {zone.player !== 'Not paired' ? `Player: ${zone.player}` : 'No player paired'}
                </p>
              </div>
              <StatusBadge status={zone.status} pulse={zone.status === 'Online'} />
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-tertiary)', fontWeight: 500 }}>Now playing</p>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--ink)' }}>{zone.nowPlaying}</p>
            </div>
            {zone.lastSeen !== '—' && (
              <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--ink-tertiary)' }}>
                Last seen: {zone.lastSeen}
              </p>
            )}
          </Card>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .zone-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
