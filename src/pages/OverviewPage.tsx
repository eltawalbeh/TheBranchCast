import { useState } from 'react';
import { useOutletContext, useSearchParams, useNavigate } from 'react-router-dom';
import { ExternalLink, ChevronRight, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MetricCard } from '@/components/ui/MetricCard';
import { Button } from '@/components/ui/Button';
import { EmptyState, AlertBanner } from '@/components/ui/EmptyState';
import { MetricCardSkeleton, TableRowSkeleton } from '@/components/ui/Skeleton';
import {
  networkMetrics, alerts, activityTimeline, campaigns, nowPlayingRows,
} from '@/data/sample';
import type { DemoRole } from '@/components/shell/Sidebar';

type UIState = 'default' | 'loading' | 'no-locations' | 'no-players' | 'error';

const uiStateLabels: Record<UIState, string> = {
  default: 'Default',
  loading: 'Loading',
  'no-locations': 'No locations',
  'no-players': 'No player data',
  error: 'Network error',
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>{children}</h2>
  );
}

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

function TextLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 13, fontWeight: 500, color: 'var(--signal)',
        padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4,
      }}
    >
      {children} <ChevronRight size={14} />
    </button>
  );
}

// ── Section: Network Health ────────────────────────────────────────────────
function NetworkHealthSection({ loading }: { loading: boolean }) {
  return (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          : networkMetrics.map(m => (
            <MetricCard key={m.label} label={m.label} metric={m.metric} context={m.context} status={m.status} />
          ))
        }
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .metric-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .metric-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

// ── Section: Live Network ─────────────────────────────────────────────────
function LiveNetworkPanel({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div style={{
      background: '#1A1410',
      borderRadius: 'var(--radius-lg)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      minHeight: 220,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle signal pattern */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: 160,
        background: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(244,124,44,0.04) 18px, rgba(244,124,44,0.04) 20px)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
          Live network
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(244,124,44,0.15)',
          border: '1px solid rgba(244,124,44,0.3)',
          borderRadius: 6, padding: '3px 9px',
          fontSize: 11, fontWeight: 600, color: 'var(--signal)',
          letterSpacing: '0.04em',
        }}>
          <span className="signal-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)' }} />
          On air
        </span>
      </div>

      {/* Main stat */}
      <div>
        <p style={{ fontSize: 22, fontWeight: 600, color: '#FFFFFF', margin: 0, lineHeight: '28px' }}>
          9 players are online across 6 locations.
        </p>
      </div>

      {/* Status breakdown */}
      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { label: 'Online', value: 9, color: 'var(--success)' },
          { label: 'Needs attention', value: 1, color: 'var(--warning)' },
          { label: 'Not paired', value: 1, color: 'rgba(255,255,255,0.3)' },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 20, fontWeight: 600, color: s.color, fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Last sync 2 minutes ago</span>
        <button
          onClick={() => navigate('/monitoring/alerts')}
          style={{
            background: 'rgba(244,124,44,0.15)',
            border: '1px solid rgba(244,124,44,0.3)',
            borderRadius: 8, padding: '6px 14px',
            fontSize: 13, fontWeight: 500, color: 'var(--signal)',
            cursor: 'pointer',
            transition: 'background var(--motion-fast) ease-out',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,124,44,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,124,44,0.15)'}
        >
          Open monitoring
        </button>
      </div>
    </div>
  );
}

// ── Section: Needs Attention ──────────────────────────────────────────────
function NeedsAttentionPanel({ navigate }: { navigate: (to: string) => void }) {
  const hasAlerts = alerts.length > 0;

  return (
    <Card style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SectionTitle>Needs attention</SectionTitle>
        <span style={{
          background: 'var(--danger-soft)', color: 'var(--danger)',
          fontSize: 12, fontWeight: 600,
          borderRadius: 6, padding: '2px 7px',
        }}>
          {alerts.length}
        </span>
      </div>

      {!hasAlerts ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8, padding: '16px 0' }}>
          <CheckCircle2 size={28} style={{ color: 'var(--success)' }} />
          <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-secondary)' }}>
            All locations are operating normally.
          </p>
          <TextLink onClick={() => navigate('/monitoring/alerts')}>Open monitoring</TextLink>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {alerts.map(a => (
              <div key={a.id} style={{
                padding: '12px 14px',
                background: a.priority === 'High' ? 'var(--danger-soft)' : 'var(--warning-soft)',
                border: `1px solid ${a.priority === 'High' ? 'rgba(197,59,59,0.15)' : 'rgba(184,106,0,0.15)'}`,
                borderRadius: 'var(--radius-sm)',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
                      {a.location}, {a.zone}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink-secondary)' }}>
                      {a.problem}
                    </p>
                  </div>
                  <StatusBadge status={a.priority} />
                </div>
                <button
                  onClick={() => navigate(a.nextActionRoute)}
                  style={{
                    alignSelf: 'flex-start',
                    background: 'none', border: 'none',
                    fontSize: 12, fontWeight: 500,
                    color: a.priority === 'High' ? 'var(--danger)' : 'var(--warning)',
                    cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}
                >
                  {a.nextAction} <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
            <TextLink onClick={() => navigate('/monitoring/alerts')}>View all alerts</TextLink>
          </div>
        </>
      )}
    </Card>
  );
}

// ── Section: Now Playing ──────────────────────────────────────────────────
function NowPlayingSection() {
  return (
    <Card>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <SectionTitle>Now playing</SectionTitle>
      </div>

      {/* Desktop table */}
      <div className="now-playing-table" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              {['Location', 'Zone', 'Now playing', 'Campaign', 'Player status', 'Last sync', ''].map(h => (
                <th key={h} style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontSize: 12, fontWeight: 500, color: 'var(--ink-tertiary)',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nowPlayingRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < nowPlayingRows.length - 1 ? '1px solid var(--border-color)' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-subtle)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                  {row.location}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--ink-secondary)', whiteSpace: 'nowrap' }}>
                  {row.zone}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--ink)', whiteSpace: 'nowrap', maxWidth: 200 }}>
                  {row.nowPlaying}
                </td>
                <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                  {row.campaign
                    ? <span style={{ fontSize: 12, color: 'var(--info)', fontWeight: 500 }}>{row.campaign}</span>
                    : <span style={{ fontSize: 12, color: 'var(--ink-tertiary)' }}>None</span>
                  }
                </td>
                <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                  <StatusBadge status={row.status} pulse={row.status === 'Online'} />
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--ink-tertiary)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                  {row.lastSeen}
                </td>
                <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                  <button style={{
                    background: 'none', border: 'none',
                    color: 'var(--signal)', fontSize: 12, fontWeight: 500,
                    cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}>
                    Open <ExternalLink size={11} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="now-playing-cards">
        {nowPlayingRows.map((row, i) => (
          <div key={i} style={{
            padding: '14px 16px',
            borderBottom: i < nowPlayingRows.length - 1 ? '1px solid var(--border-color)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{row.location} — {row.zone}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink-secondary)' }}>{row.nowPlaying}</p>
              </div>
              <StatusBadge status={row.status} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--ink-tertiary)' }}>{row.lastSeen}</span>
              <button style={{
                background: 'none', border: 'none',
                color: 'var(--signal)', fontSize: 12, fontWeight: 500,
                cursor: 'pointer', padding: 0, minHeight: 44, minWidth: 44,
                display: 'flex', alignItems: 'center',
              }}>
                Open <ExternalLink size={11} style={{ marginLeft: 3 }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .now-playing-cards { display: none; }
        @media (max-width: 767px) {
          .now-playing-table { display: none; }
          .now-playing-cards { display: block; }
        }
      `}</style>
    </Card>
  );
}

// ── Section: Active Campaigns ─────────────────────────────────────────────
function CampaignsSection({ readOnly, navigate }: { readOnly: boolean; navigate: (to: string) => void }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <SectionTitle>Active campaigns</SectionTitle>
        {!readOnly && (
          <TextLink onClick={() => navigate('/campaigns')}>All campaigns</TextLink>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {campaigns.map(c => (
          <Card key={c.name} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{c.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ink-tertiary)' }}>{c.dateRange}</p>
              </div>
              <StatusBadge status={c.status} pulse={c.status === 'Active'} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--ink-tertiary)', fontWeight: 500 }}>Target</p>
                <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--ink)' }}>{c.target}, {c.zones}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--ink-tertiary)', fontWeight: 500 }}>Delivery</p>
                <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--ink)' }}>{c.scheduleState}</p>
              </div>
            </div>
            {!readOnly && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
                <TextLink onClick={() => navigate(c.ctaRoute)}>{c.cta}</TextLink>
              </div>
            )}
          </Card>
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .campaigns-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── Section: Activity Timeline ────────────────────────────────────────────
function ActivitySection() {
  return (
    <Card>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
        <SectionTitle>Recent activity</SectionTitle>
      </div>
      <div>
        {activityTimeline.map((item, i) => (
          <div key={item.id} style={{
            display: 'flex', gap: 14, padding: '14px 20px',
            borderBottom: i < activityTimeline.length - 1 ? '1px solid var(--border-color)' : 'none',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--border-color)',
              flexShrink: 0, marginTop: 6,
            }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--ink)' }}>{item.event}</p>
            </div>
            <span style={{ fontSize: 12, color: 'var(--ink-tertiary)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Loading state ─────────────────────────────────────────────────────────
function LoadingOverview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ width: 160, height: 14, borderRadius: 6, background: 'var(--surface-subtle)' }} className="skeleton" />
        <div style={{ width: 100, height: 32, borderRadius: 8, background: 'var(--surface-subtle)', marginTop: 8 }} className="skeleton" />
        <div style={{ width: 280, height: 14, borderRadius: 6, background: 'var(--surface-subtle)', marginTop: 8 }} className="skeleton" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--radius-lg)', height: 220 }} className="skeleton" />
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', height: 220 }} className="skeleton" />
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-subtle)', height: 48 }} className="skeleton" />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Role-specific section order helpers ───────────────────────────────────
function OwnerOverview({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <NetworkHealthSection loading={false} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <LiveNetworkPanel navigate={navigate} />
        <NeedsAttentionPanel navigate={navigate} />
      </div>
      <NowPlayingSection />
      <CampaignsSection readOnly={false} navigate={navigate} />
      <ActivitySection />
      <style>{`
        @media (max-width: 900px) {
          .live-attention-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function OperationsOverview({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <NetworkHealthSection loading={false} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <LiveNetworkPanel navigate={navigate} />
        <NeedsAttentionPanel navigate={navigate} />
      </div>
      <NowPlayingSection />
      <CampaignsSection readOnly={true} navigate={navigate} />
      <ActivitySection />
    </>
  );
}

function MarketingOverview({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <CampaignsSection readOnly={false} navigate={navigate} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card style={{ padding: 20 }}>
          <SectionTitle>Playlist readiness</SectionTitle>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Morning Rhythm Playlist', status: 'Approved', usage: '4 zones' },
              { name: 'Calm Focus Playlist', status: 'Approved', usage: '2 zones' },
              { name: 'Evening Wind Down Playlist', status: 'Draft', usage: 'Not scheduled' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{p.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-tertiary)' }}>{p.usage}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </Card>
        <NeedsAttentionPanel navigate={navigate} />
      </div>
      <ActivitySection />
    </>
  );
}

function ViewerOverview({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <NetworkHealthSection loading={false} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <LiveNetworkPanel navigate={navigate} />
        <NeedsAttentionPanel navigate={navigate} />
      </div>
      <NowPlayingSection />
      <CampaignsSection readOnly={true} navigate={navigate} />
      <ActivitySection />
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export function OverviewPage() {
  const { role } = useOutletContext<{ role: DemoRole }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [uiState, setUiState] = useState<UIState>('default');

  const effectiveRole: DemoRole = searchParams.get('role') as DemoRole ?? role ?? 'owner';

  const isViewer = effectiveRole === 'viewer';
  const isMarketing = effectiveRole === 'marketing';
  const isOperations = effectiveRole === 'operations';

  const greetings: Record<string, string> = {
    owner: 'Good afternoon, Amina',
    marketing: 'Good afternoon, Amina',
    operations: 'Good afternoon, Amina',
    viewer: 'Good afternoon, Amina',
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1440, margin: '0 auto' }}>
      {/* UI State switcher (demo tool) */}
      <div style={{
        marginBottom: 24, padding: '10px 14px',
        background: 'var(--surface)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 12, color: 'var(--ink-tertiary)', fontWeight: 500 }}>Demo state:</span>
        {(Object.keys(uiStateLabels) as UIState[]).map(s => (
          <button
            key={s}
            onClick={() => setUiState(s)}
            style={{
              padding: '4px 10px', borderRadius: 6, border: '1px solid',
              fontSize: 12, fontWeight: 500, cursor: 'pointer',
              borderColor: uiState === s ? 'var(--signal)' : 'var(--border-color)',
              background: uiState === s ? 'var(--signal-soft)' : 'transparent',
              color: uiState === s ? 'var(--signal)' : 'var(--ink-secondary)',
            }}
          >
            {uiStateLabels[s]}
          </button>
        ))}
      </div>

      {uiState === 'loading' && <LoadingOverview />}

      {uiState === 'no-locations' && (
        <Card style={{ marginTop: 32 }}>
          <EmptyState
            heading="Start with your first location"
            body="Add a location, set up an audio zone, then pair a player."
            primaryAction={{ label: 'Add location', onClick: () => navigate('/locations/new') }}
            secondaryAction={{ label: 'Learn about audio zones', onClick: () => navigate('/help') }}
          />
        </Card>
      )}

      {uiState === 'no-players' && (
        <>
          <PageHeader isViewer={isViewer} navigate={navigate} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
            {[
              { label: 'Active locations', metric: '6 of 6', context: 'All locations configured', status: 'neutral' as const },
              { label: 'Players online', metric: '—', context: 'No player has been paired yet', status: 'neutral' as const },
              { label: 'Active campaigns', metric: '2', context: 'One starts tomorrow', status: 'info' as const },
              { label: 'Playback coverage', metric: '—', context: 'No player data available', status: 'neutral' as const },
            ].map(m => <MetricCard key={m.label} {...m} />)}
          </div>
          <div style={{ marginTop: 24 }}>
            <Card>
              <EmptyState
                compact
                heading="No player has been paired yet"
                body="Open a location to pair a player and begin playback."
                primaryAction={{ label: 'Open locations', onClick: () => navigate('/locations') }}
              />
            </Card>
          </div>
        </>
      )}

      {uiState === 'error' && (
        <>
          <PageHeader isViewer={isViewer} navigate={navigate} />
          <div style={{ marginTop: 24 }}>
            <AlertBanner
              type="error"
              title="We could not load the latest network status."
              body="Your saved configuration is not affected."
              action={{ label: 'Try again', onClick: () => setUiState('default') }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
            {networkMetrics.map(m => <MetricCard key={m.label} {...m} />)}
          </div>
        </>
      )}

      {uiState === 'default' && (
        <>
          <PageHeader isViewer={isViewer} navigate={navigate} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 28 }}>
            {isMarketing && <MarketingOverview navigate={navigate} />}
            {isOperations && <OperationsOverview navigate={navigate} />}
            {isViewer && <ViewerOverview navigate={navigate} />}
            {!isMarketing && !isOperations && !isViewer && <OwnerOverview navigate={navigate} />}
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 900px) {
          [data-layout="live-attention"] { grid-template-columns: 1fr !important; }
          [data-layout="campaigns"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          [data-layout="metrics"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

function PageHeader({ isViewer, navigate }: { isViewer: boolean; navigate: (to: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
      <div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-tertiary)', fontWeight: 400 }}>
          Good afternoon, Amina
        </p>
        <h1 style={{ margin: '4px 0 6px', fontSize: 28, fontWeight: 600, color: 'var(--ink)', lineHeight: '36px' }}>
          Overview
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-secondary)' }}>
          Your audio network is operating across 6 locations.
        </p>
      </div>
      {!isViewer && (
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <Button variant="secondary" size="sm" onClick={() => navigate('/locations/new')}>
            Add location
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/campaigns/new')}>
            Create campaign
          </Button>
        </div>
      )}
    </div>
  );
}
