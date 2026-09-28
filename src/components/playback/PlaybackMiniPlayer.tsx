import { useEffect, useState } from 'react';
import { Pause, Play, Radio, SkipForward, Square, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useWorkspace } from '@/providers/WorkspaceProvider';

type Player = { id: string; display_name: string | null; state: string };

/** A persistent, keyboard-friendly playback surface shown on every manager page. */
export function PlaybackMiniPlayer() {
  const navigate = useNavigate();
  const { workspace } = useWorkspace();
  const [player, setPlayer] = useState<Player | null>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!workspace) return;
      const { data } = await (supabase as any).from('players').select('id,display_name,state').order('display_name').limit(1);
      if (!cancelled) setPlayer((data?.[0] as Player | undefined) ?? null);
    };
    void load();
    return () => { cancelled = true; };
  }, [workspace?.id]);

  const send = async (command: 'play' | 'pause' | 'skip' | 'stop') => {
    if (!player || player.state !== 'online') { setError('Connect a browser player first.'); return; }
    setBusy(true); setError('');
    const result = await (supabase as any).from('player_commands').insert({ player_id: player.id, command, payload: {}, status: 'pending' });
    if (result.error) setError(result.error.message);
    else setPlaying(command === 'play' ? true : command === 'pause' || command === 'skip' || command === 'stop' ? false : playing);
    setBusy(false);
  };

  if (!expanded) return <button className="mini-player-collapsed" onClick={() => setExpanded(true)} aria-label="Open playback controls"><Radio size={17} /><span>Playback</span></button>;
  return <aside className="mini-player" aria-label="Playback controls">
    <div className="mini-player-title"><span className="mini-player-art"><Radio size={16} /></span><span><strong>{player?.display_name ?? 'Playback'}</strong><small>{player?.state === 'online' ? (playing ? 'Playing' : 'Connected') : 'No player connected'}</small></span></div>
    <div className="mini-player-actions">
      <button disabled={busy} onClick={() => void send('skip')} aria-label="Skip"><SkipForward size={16} /></button>
      <button disabled={busy} onClick={() => void send(playing ? 'pause' : 'play')} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>
      <button disabled={busy} onClick={() => void send('stop')} aria-label="Stop"><Square size={15} /></button>
      <button onClick={() => navigate('/players/playback')} aria-label="Open full playback">Open</button>
      <button className="mini-player-close" onClick={() => setExpanded(false)} aria-label="Minimize playback"><X size={15} /></button>
    </div>
    {error && <span className="mini-player-error" role="status">{error}</span>}
  </aside>;
}
