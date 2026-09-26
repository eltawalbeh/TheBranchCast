import { useEffect, useState } from 'react';
import { AlertTriangle, Pause, Play, Radio, SkipForward, Volume2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useWorkspace } from '@/providers/WorkspaceProvider';

type Player = { id: string; display_name: string | null; state: string; last_seen_at: string | null };
const db = supabase as any;

export function PlaybackPage() {
  const { workspace } = useWorkspace();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { const load = async () => { if (!db || !workspace) return; setLoading(true); const result = await db.from('players').select('id,display_name,state,last_seen_at').order('display_name'); const next = (result.data ?? []) as Player[]; setPlayers(next); setSelected((current) => current || next[0]?.id || ''); setError(result.error?.message ?? ''); setLoading(false); }; void load(); }, [workspace?.id]);
  const player = players.find((item) => item.id === selected);
  const online = player?.state === 'online';
  const sendCommand = async (command: 'play' | 'pause' | 'skip') => { if (!player || !online) return; setMessage(''); setError(''); const result = await db.from('player_commands').insert({ player_id: player.id, command, payload: {}, status: 'pending' }); if (result.error) setError(result.error.message); else setMessage(`${command[0].toUpperCase()}${command.slice(1)} command sent.`); };
  return <div style={page}><p style={eyebrow}>PLAYBACK RUNTIME</p><h1 style={title}>Now playing</h1><p style={sub}>Control playback for a connected browser player.</p><section style={card}><label style={label}>Player<select style={select} value={selected} onChange={(event) => setSelected(event.target.value)}><option value="">Select a player</option>{players.map((item) => <option value={item.id} key={item.id}>{item.display_name || 'Unnamed player'}</option>)}</select></label>{loading ? <p style={sub}>Loading player runtime…</p> : !player ? <div style={empty}><Radio size={24} /><strong>No player selected</strong><span>Open /player in a desktop or mobile browser and enter the pairing code first.</span></div> : <><div style={now}><span style={art}><Radio size={24} /></span><div><small>NOW PLAYING</small><h2>{online ? 'Browser player connected' : 'Waiting for browser player'}</h2><p>{online ? 'Commands are ready and will be handled by the player tab.' : 'Open /player on the device browser, enter its pairing code, and keep the tab open.'}</p></div><span style={status(online)}>{online ? 'Online' : 'Offline'}</span></div>{message && <p style={success}>{message}</p>}{error && <p style={warning}>{error}</p>}<div style={controls}><button disabled={!online} style={control} onClick={() => void sendCommand('play')}><Play size={17} /> Play</button><button disabled={!online} style={control} onClick={() => void sendCommand('pause')}><Pause size={17} /> Pause</button><button disabled={!online} style={control} onClick={() => void sendCommand('skip')}><SkipForward size={17} /> Skip</button><span style={volume}><Volume2 size={17} /> Volume 70%</span></div>{!online && <p style={warning}><AlertTriangle size={15} /> Connect the browser player to enable remote playback commands.</p>}</>}</section></div>;
}
const page = { padding: '32px 40px', maxWidth: 1000, margin: '0 auto' } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const card = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: 22, marginTop: 26 } as const;
const label = { display: 'grid', gap: 8, fontSize: 13, fontWeight: 600 } as const;
const select = { border: '1px solid var(--border-color)', borderRadius: 8, padding: '11px 12px', background: '#fff', font: 'inherit', fontWeight: 400 } as const;
const now = { display: 'flex', alignItems: 'center', gap: 15, marginTop: 26, padding: 20, background: 'var(--surface-subtle)', borderRadius: 12 } as const;
const art = { width: 54, height: 54, display: 'grid', placeItems: 'center', borderRadius: 12, background: 'var(--signal)', color: '#fff', flexShrink: 0 } as const;
const controls = { display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginTop: 18 } as const;
const control = { display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 13px', background: '#fff', cursor: 'pointer' } as const;
const volume = { display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 'auto', color: 'var(--ink-secondary)', fontSize: 13 } as const;
const empty = { display: 'grid', placeItems: 'center', gap: 8, padding: 48, color: 'var(--ink-secondary)', textAlign: 'center' } as const;
const warning = { display: 'flex', alignItems: 'center', gap: 7, color: 'var(--danger)', fontSize: 13, marginTop: 18 } as const;
const success = { color: 'var(--success)', fontSize: 13, marginTop: 16 } as const;
const status = (online: boolean) => ({ marginLeft: 'auto', borderRadius: 99, padding: '5px 9px', fontSize: 11, color: online ? 'var(--success)' : 'var(--danger)', background: online ? 'rgba(44,167,96,.10)' : 'rgba(210,63,63,.08)' }) as const;

