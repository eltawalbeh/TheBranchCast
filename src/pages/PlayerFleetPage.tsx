import { useEffect, useState } from 'react';
import { Activity, CheckCircle2, MonitorSpeaker, RefreshCw, WifiOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useWorkspace } from '@/providers/WorkspaceProvider';

type Player = { id: string; display_name: string | null; state: string; last_seen_at: string | null; zone_id: string };

export function PlayerFleetPage() {
  const { workspace } = useWorkspace();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = async () => { if (!supabase || !workspace) return; setLoading(true); setError(null); const result = await supabase.from('players').select('id,display_name,state,last_seen_at,zone_id').order('display_name'); if (result.error) setError(result.error.message); setPlayers((result.data ?? []) as Player[]); setLoading(false); };
  useEffect(() => { void load(); }, [workspace?.id]);
  const online = players.filter((p) => p.state === 'online').length;
  return <div style={page}><header style={header}><div><p style={eyebrow}>PLAYER FLEET</p><h1 style={title}>Players & devices</h1><p style={sub}>Register, monitor, and troubleshoot the devices playing your brand audio.</p></div><button style={button} onClick={() => void load()}><RefreshCw size={15} /> Refresh</button></header><div style={metrics}><Metric icon={<MonitorSpeaker size={18} />} label="Registered" value={String(players.length)} /><Metric icon={<CheckCircle2 size={18} />} label="Online" value={String(online)} /><Metric icon={<WifiOff size={18} />} label="Needs attention" value={String(players.length - online)} /></div>{error && <p style={errorText}>{error}</p>}{loading ? <p style={sub}>Loading devices…</p> : <section style={card}>{players.length === 0 ? <div style={empty}><Activity size={24} /><strong>No players registered</strong><span>Connect a BranchCast player to start monitoring playback.</span></div> : players.map((player) => <div style={row} key={player.id}><div><strong>{player.display_name || 'Unnamed player'}</strong><small>Zone {player.zone_id || '—'} · {player.last_seen_at ? `Last seen ${new Date(player.last_seen_at).toLocaleString()}` : 'No heartbeat yet'}</small></div><span style={badge(player.state)}>{player.state}</span></div>)}</section>}</div>;
}
function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div style={metric}><span style={metricIcon}>{icon}</span><div><strong>{value}</strong><small>{label}</small></div></div>; }
const page = { padding: '32px 40px', maxWidth: 1200, margin: '0 auto' } as const;
const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 26 } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const button = { display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 13px', background: '#fff', cursor: 'pointer' } as const;
const metrics = { display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12, marginBottom: 22 } as const;
const metric = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 12, padding: 16, display: 'flex', gap: 12, alignItems: 'center' } as const;
const metricIcon = { width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 9, background: 'var(--surface-subtle)', color: 'var(--signal)' } as const;
const card = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: '8px 20px' } as const;
const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '15px 0', borderBottom: '1px solid var(--border-color)' } as const;
const empty = { display: 'grid', placeItems: 'center', gap: 8, padding: 48, color: 'var(--ink-secondary)', textAlign: 'center' } as const;
const errorText = { color: 'var(--danger)' } as const;
const badge = (state: string) => ({ borderRadius: 99, padding: '5px 9px', fontSize: 11, color: state === 'online' ? 'var(--success)' : 'var(--danger)', background: state === 'online' ? 'rgba(44,167,96,.10)' : 'rgba(210,63,63,.08)' }) as const;
