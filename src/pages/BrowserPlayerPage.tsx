import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { CheckCircle2, LogOut, Pause, Play, Radio, RefreshCw, Square, Wifi } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type PlayerIdentity = { id: string; display_name: string | null; device_code: string; state: string };
type StoredSession = { token: string; player: PlayerIdentity };
const STORAGE_KEY = 'branchcast.browser-player-session';

export function BrowserPlayerPage() {
  const [code, setCode] = useState('');
  const [session, setSession] = useState<StoredSession | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [lastHeartbeat, setLastHeartbeat] = useState<string | null>(null);
  const [track, setTrack] = useState('No audio selected');
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useState(() => new Audio())[0];

  const unlockAudio = useCallback(async () => {
    try {
      const context = new AudioContext();
      await context.resume();
      await context.close();
      setAudioReady(true);
      setMessage('Audio is enabled for this browser.');
    } catch {
      setError('Tap Enable audio once, then try playback again.');
    }
  }, []);

  const playLocal = async () => {
    if (!audioRef.src) {
      setError('No audio is loaded yet. Select an audio asset in Playback and press Play.');
      return;
    }
    try { await unlockAudio(); await audioRef.play(); setError(''); }
    catch { setError('Tap Enable audio, then press Play again.'); }
  };
  const pauseLocal = () => { audioRef.pause(); setError(''); };
  const stopLocal = () => { audioRef.pause(); audioRef.currentTime = 0; setPlaying(false); setError(''); };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSession(JSON.parse(stored) as StoredSession);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const call = useCallback(async (name: string, body: Record<string, unknown>) => {
    if (!supabase) throw new Error('Supabase is not configured.');
    const result = await supabase.functions.invoke(name, { body });
    if (result.error) throw new Error(result.error.message);
    return result.data as Record<string, any>;
  }, []);

  const pair = async (event: FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;
    await unlockAudio();
    setBusy(true); setError(''); setMessage('');
    try {
      const data = await call('player-pair', { pairing_code: code.trim().toUpperCase(), agent_version: 'browser/1.0' });
      if (!data.browser_session_token || !data.player) throw new Error('Pairing response is incomplete.');
      const next = { token: data.browser_session_token, player: data.player as PlayerIdentity };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSession(next); setCode(''); setMessage('Player connected. This browser is now the player.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Pairing failed.');
    } finally { setBusy(false); }
  };

  const heartbeat = useCallback(async () => {
    if (!session) return;
    try {
      await call('player-browser-heartbeat', { session_token: session.token, state: 'online' });
      setLastHeartbeat(new Date().toLocaleTimeString());
      setError('');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Heartbeat failed.');
    }
  }, [call, session]);

  useEffect(() => {
    if (!session) return;
    void heartbeat();
    const timer = window.setInterval(() => void heartbeat(), 10000);
    return () => window.clearInterval(timer);
  }, [heartbeat, session]);

  useEffect(() => {
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audioRef.addEventListener('play', onPlay); audioRef.addEventListener('pause', onPause);
    return () => { audioRef.pause(); audioRef.removeEventListener('play', onPlay); audioRef.removeEventListener('pause', onPause); };
  }, [audioRef]);

  useEffect(() => {
    if (!session) return;
    const poll = async () => {
      try {
        const data = await call('player-browser-runtime', { session_token: session.token, action: 'poll' });
        const command = data.command as { id: string; command: string; payload?: { audio_url?: string; title?: string } } | null;
        if (command) {
          try {
            if (command.command === 'play') {
              const url = command.payload?.audio_url;
              if (!url) throw new Error('The selected audio asset has no playable file.');
              if (audioRef.src !== url) { audioRef.src = url; audioRef.load(); }
              try { await audioRef.play(); setAudioReady(true); } catch { throw new Error('Browser audio is blocked. Tap Enable audio, then press Play again.'); }
              setTrack(command.payload?.title || 'Audio asset');
            } else if (command.command === 'pause') audioRef.pause();
            else if (command.command === 'skip') { audioRef.pause(); audioRef.currentTime = 0; setTrack('No audio selected'); }
            setMessage(`Command completed: ${command.command}`);
            await call('player-browser-runtime', { session_token: session.token, action: 'ack', command_id: command.id, status: 'acknowledged' });
          } catch (commandError) {
            await call('player-browser-runtime', { session_token: session.token, action: 'ack', command_id: command.id, status: 'failed', error_message: commandError instanceof Error ? commandError.message : 'Playback failed.' });
            setError(commandError instanceof Error ? commandError.message : 'Playback failed.');
          }
        }
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Runtime connection failed.');
      }
    };
    void poll();
    const timer = window.setInterval(() => void poll(), 4000);
    return () => window.clearInterval(timer);
  }, [call, session]);

  const disconnect = async () => {
    localStorage.removeItem(STORAGE_KEY); setSession(null); setMessage('Browser player disconnected.'); setError('');
  };
  const statusText = useMemo(() => lastHeartbeat ? `Connected · last heartbeat ${lastHeartbeat}` : 'Connecting…', [lastHeartbeat]);

  if (!session) return <main style={shell}><section style={card}><div style={brand}>Branch<span>Cast</span></div><div style={icon}><Radio size={30} /></div><p style={eyebrow}>BROWSER PLAYER</p><h1 style={title}>Connect this browser</h1><p style={sub}>Open this page on the desktop or mobile browser that should play this branch’s audio. Enter the pairing code from the manager’s Location page.</p><form onSubmit={pair} style={form}><label style={label}>Pairing code<input autoFocus inputMode="text" autoCapitalize="characters" maxLength={12} value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="e.g. 7E35ED" style={input} /></label>{error && <p style={errorText}>{error}</p>}<button disabled={busy || !code.trim()} style={primary}>{busy ? 'Connecting…' : 'Connect browser player'}</button></form><p style={hint}>This page does not require a manager login. Keep this tab open while the player is running.</p></section></main>;

  return <main style={shell}><section style={card}><div style={brand}>Branch<span>Cast</span></div><div style={icon}><Wifi size={30} /></div><p style={eyebrow}>BROWSER PLAYER</p><h1 style={title}>{session.player.display_name || 'BranchCast player'}</h1><p style={sub}>This browser is connected and sending its heartbeat to BranchCast.</p><div style={connected}><CheckCircle2 size={18} />{statusText}</div><div style={nowPlaying}><span>{playing ? <Play size={17} /> : <Pause size={17} />}</span><div><strong>{track}</strong><small>{playing ? 'Playing in this browser' : 'Paused'}</small></div></div>{!audioReady && <button type="button" onClick={() => void unlockAudio()} style={enableAudio}>Enable audio</button>}{message && <p style={messageText}>{message}</p>}{error && <p style={errorText}>{error}</p>}<div style={actions}><button type="button" onClick={() => void playLocal()} style={control}><Play size={15} /> Play</button><button type="button" onClick={pauseLocal} style={control}><Pause size={15} /> Pause</button><button type="button" onClick={stopLocal} style={control}><Square size={15} /> Stop</button><button type="button" onClick={() => void heartbeat()} style={secondary}><RefreshCw size={15} /> Send heartbeat</button><button type="button" onClick={() => void disconnect()} style={danger}><LogOut size={15} /> Disconnect</button></div><p style={hint}>Leave this tab open. The manager can now use Playback for this player.</p></section></main>;
}

const shell = { minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--canvas)', padding: 24 } as const;
const card = { width: 'min(100%, 520px)', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 18, padding: 32, boxShadow: 'var(--shadow-sm)' } as const;
const brand = { fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 36 } as const;
const icon = { width: 60, height: 60, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'var(--signal)', color: '#fff', marginBottom: 22 } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 700, fontSize: 12, letterSpacing: '.08em' } as const;
const title = { margin: '7px 0 10px', fontSize: 30, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)', lineHeight: 1.55 } as const;
const form = { display: 'grid', gap: 16, marginTop: 28 } as const;
const label = { display: 'grid', gap: 8, color: 'var(--ink)', fontWeight: 600, fontSize: 13 } as const;
const input = { border: '1px solid var(--border-color)', borderRadius: 9, padding: '13px 14px', font: 'inherit', letterSpacing: '.12em', fontSize: 20 } as const;
const primary = { border: 0, borderRadius: 9, padding: '13px 16px', background: 'var(--signal)', color: '#fff', font: 'inherit', fontWeight: 700, cursor: 'pointer' } as const;
const secondary = { display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-color)', borderRadius: 9, padding: '11px 13px', background: '#fff', cursor: 'pointer' } as const;
const control = { ...secondary, fontWeight: 700 } as const;
const danger = { ...secondary, color: 'var(--danger)' } as const;
const connected = { display: 'flex', alignItems: 'center', gap: 8, marginTop: 22, padding: '12px 14px', borderRadius: 9, color: 'var(--success)', background: 'rgba(44,167,96,.10)', fontSize: 13 } as const;
const nowPlaying = { display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, padding: '12px 14px', borderRadius: 9, background: 'var(--surface-subtle)', color: 'var(--ink)' } as const;
const actions = { display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 20 } as const;
const errorText = { color: 'var(--danger)', fontSize: 13, margin: 0 } as const;
const messageText = { color: 'var(--signal)', fontSize: 13 } as const;
const enableAudio = { border: 0, borderRadius: 9, padding: '11px 14px', background: 'var(--signal)', color: '#fff', font: 'inherit', fontWeight: 700, cursor: 'pointer', marginTop: 14 } as const;
const hint = { color: 'var(--ink-tertiary)', fontSize: 12, lineHeight: 1.5, marginTop: 22 } as const;
