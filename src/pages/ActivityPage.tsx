import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, FileWarning, RefreshCw, Radio } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useWorkspace } from '@/providers/WorkspaceProvider';

type ActivityItem = { id: string; kind: string; title: string; detail: string; createdAt: string };

export function ActivityPage() {
  const { workspace } = useWorkspace();
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!supabase || !workspace) return;
    setLoading(true); setError(null);
    const [events, alerts, issues] = await Promise.all([
      supabase.from('player_events').select('id,event_type,occurred_at,player_id').order('occurred_at', { ascending: false }).limit(20),
      supabase.from('alerts').select('id,title,state,severity,created_at').order('created_at', { ascending: false }).limit(20),
      supabase.from('branch_issue_reports').select('id,issue_type,state,created_at,note').eq('organization_id', workspace.id).order('created_at', { ascending: false }).limit(20),
    ]);
    const firstError = events.error || alerts.error || issues.error;
    if (firstError) setError(firstError.message);
    const next: ActivityItem[] = [
      ...(events.data ?? []).map((event) => ({ id: `event-${event.id}`, kind: 'Player event', title: event.event_type, detail: `Player ${event.player_id}`, createdAt: event.occurred_at })),
      ...(alerts.data ?? []).map((alert) => ({ id: `alert-${alert.id}`, kind: 'Alert', title: alert.title, detail: `${alert.severity} · ${alert.state}`, createdAt: alert.created_at })),
      ...(issues.data ?? []).map((issue) => ({ id: `issue-${issue.id}`, kind: 'Branch report', title: issue.issue_type, detail: `${issue.state}${issue.note ? ` · ${issue.note}` : ''}`, createdAt: issue.created_at })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 40);
    setItems(next); setLoading(false);
  };
  useEffect(() => { void load(); }, [workspace?.id]);

  return <div style={page}><header style={header}><div><p style={eyebrow}>OPERATIONS</p><h1 style={title}>Activity log</h1><p style={sub}>A single timeline for player events, alerts, and branch reports.</p></div><button style={button} onClick={() => void load()}><RefreshCw size={15} /> Refresh</button></header>{error && <div style={errorBox}><AlertTriangle size={16} /> {error}</div>}{loading ? <p style={sub}>Loading activity…</p> : <section style={card}>{items.length === 0 ? <div style={empty}><Activity size={24} /><strong>No activity yet</strong><span>Events will appear here as players and branches report activity.</span></div> : items.map((item) => <div style={row} key={item.id}><span style={icon}>{item.kind === 'Alert' ? <AlertTriangle size={16} /> : item.kind === 'Branch report' ? <FileWarning size={16} /> : <Radio size={16} />}</span><div style={copy}><strong>{item.title}</strong><small>{item.kind} · {item.detail}</small></div><time>{new Date(item.createdAt).toLocaleString()}</time></div>)}</section>}</div>;
}

const page = { padding: '32px 40px', maxWidth: 1100, margin: '0 auto' } as const;
const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 26 } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const button = { display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 13px', background: '#fff', cursor: 'pointer' } as const;
const card = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: '8px 20px' } as const;
const row = { display: 'flex', alignItems: 'center', gap: 12, padding: '15px 0', borderBottom: '1px solid var(--border-color)' } as const;
const icon = { width: 32, height: 32, borderRadius: 9, display: 'grid', placeItems: 'center', color: 'var(--signal)', background: 'var(--surface-subtle)', flexShrink: 0 } as const;
const copy = { display: 'grid', gap: 4, flex: 1, minWidth: 0 } as const;
const empty = { display: 'grid', placeItems: 'center', gap: 8, padding: 48, color: 'var(--ink-secondary)', textAlign: 'center' } as const;
const errorBox = { display: 'flex', gap: 8, alignItems: 'center', color: 'var(--danger)', background: 'rgba(210,63,63,.08)', borderRadius: 10, padding: 12, marginBottom: 16 } as const;
