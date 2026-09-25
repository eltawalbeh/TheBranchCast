import { useEffect, useState, type FormEvent } from 'react';
import { CalendarClock, Clock3, Plus, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useWorkspace } from '@/providers/WorkspaceProvider';

type ScheduleRow = {
  id: string; starts_at: string; ends_at: string | null; recurrence_rule: string | null;
  zone_id: string; content_item_id: string | null; campaign_id: string | null;
  audio_zones: { name: string; locations: { name: string } | null } | null;
  content_items: { title: string } | null; campaigns: { title: string } | null;
};
type Option = { id: string; title?: string; name?: string; state?: string; locations?: { name: string } | null };

export function SchedulePage() {
  const { workspace } = useWorkspace(); const { user } = useAuth();
  const [rows, setRows] = useState<ScheduleRow[]>([]); const [assets, setAssets] = useState<Option[]>([]);
  const [campaigns, setCampaigns] = useState<Option[]>([]); const [zones, setZones] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true); const [show, setShow] = useState(false); const [message, setMessage] = useState('');
  const canManage = ['owner', 'marketing', 'operations'].includes(workspace?.role ?? '');
  const load = async () => {
    if (!supabase || !workspace) return; setLoading(true);
    const [schedule, assetResult, campaignResult, zoneResult] = await Promise.all([
      supabase.from('schedule_entries').select('id,starts_at,ends_at,recurrence_rule,zone_id,content_item_id,campaign_id,audio_zones(name,locations(name)),content_items(title),campaigns(title)').order('starts_at'),
      supabase.from('content_items').select('id,title,state').eq('organization_id', workspace.id).neq('state', 'archived').order('title'),
      supabase.from('campaigns').select('id,title,state').eq('organization_id', workspace.id).order('title'),
      supabase.from('audio_zones').select('id,name,locations(name)').order('name'),
    ]);
    if (schedule.error) setMessage(schedule.error.message);
    setRows((schedule.data ?? []) as unknown as ScheduleRow[]); setAssets((assetResult.data ?? []) as Option[]);
    setCampaigns((campaignResult.data ?? []) as Option[]); setZones((zoneResult.data ?? []) as unknown as Option[]); setLoading(false);
  };
  useEffect(() => { void load(); }, [workspace?.id]);
  const remove = async (id: string) => { if (!supabase || !window.confirm('Remove this schedule entry?')) return; const { error } = await supabase.from('schedule_entries').delete().eq('id', id); if (error) setMessage(error.message); else await load(); };
  if (!canManage) return <div style={page}><h1 style={title}>Schedule</h1><p style={sub}>You do not have permission to manage playback schedules.</p></div>;
  return <div style={page}>
    <header style={header}><div><p style={eyebrow}>PLAYBACK SCHEDULE</p><h1 style={title}>Schedule</h1><p style={sub}>Decide what plays, where it plays, and when it starts.</p></div><button style={primary} onClick={() => setShow(true)}><Plus size={16} /> Add schedule</button></header>
    {message && <div style={notice}>{message}<button onClick={() => setMessage('')}><X size={15} /></button></div>}
    {loading ? <p>Loading schedule…</p> : rows.length === 0 ? <div style={empty}><CalendarClock size={30} color="var(--signal)" /><h2>No schedule entries yet</h2><p>Add a campaign or audio asset to a playback zone.</p><button style={primary} onClick={() => setShow(true)}>Create first entry</button></div> : <div style={list}>{rows.map(row => <article key={row.id} style={card}><div style={cardTop}><div><h2 style={cardTitle}>{row.campaigns?.title ?? row.content_items?.title ?? 'Scheduled audio'}</h2><p style={meta}>{row.audio_zones?.locations?.name ? row.audio_zones.locations.name + ' · ' : ''}{row.audio_zones?.name ?? 'Zone unavailable'}</p></div><button style={deleteButton} onClick={() => void remove(row.id)} aria-label="Remove schedule"><Trash2 size={16} /></button></div><div style={details}><span><Clock3 size={14} /> {new Date(row.starts_at).toLocaleString()}</span><span>{row.ends_at ? 'Ends ' + new Date(row.ends_at).toLocaleString() : 'No end time'}</span><span>{row.recurrence_rule ?? 'One-time'}</span></div></article>)}</div>}
    {show && <ScheduleModal userId={user?.id} assets={assets} campaigns={campaigns} zones={zones} onClose={() => setShow(false)} onSaved={async () => { setShow(false); await load(); }} />}
  </div>;
}

function ScheduleModal({ userId, assets, campaigns, zones, onClose, onSaved }: { userId?: string; assets: Option[]; campaigns: Option[]; zones: Option[]; onClose: () => void; onSaved: () => Promise<void> }) {
  const [source, setSource] = useState<'campaign' | 'asset'>('campaign'); const [sourceId, setSourceId] = useState('');
  const [zoneId, setZoneId] = useState(''); const [startsAt, setStartsAt] = useState(''); const [endsAt, setEndsAt] = useState('');
  const [recurrence, setRecurrence] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (!supabase || !userId || !sourceId || !zoneId || !startsAt) { setError('Choose a source, zone, and start time.'); return; }
    setBusy(true);
    const payload = { zone_id: zoneId, created_by: userId, starts_at: new Date(startsAt).toISOString(), ends_at: endsAt ? new Date(endsAt).toISOString() : null, recurrence_rule: recurrence || null, content_item_id: source === 'asset' ? sourceId : null, campaign_id: source === 'campaign' ? sourceId : null };
    const { error: insertError } = await supabase.from('schedule_entries').insert(payload);
    if (insertError) { setError(insertError.message); setBusy(false); return; } await onSaved();
  };
  const options = source === 'campaign' ? campaigns : assets;
  return <div style={overlay}><form style={modal} onSubmit={submit}><div style={modalHeader}><div><p style={eyebrow}>NEW SCHEDULE ENTRY</p><h2 style={{ margin: '4px 0 0', fontSize: 22 }}>Add playback schedule</h2></div><button type="button" style={close} onClick={onClose}><X size={18} /></button></div>
    <label style={label}>Source<select style={field} value={source} onChange={event => { setSource(event.target.value as 'campaign' | 'asset'); setSourceId(''); }}><option value="campaign">Campaign</option><option value="asset">Audio asset</option></select></label>
    <label style={label}>{source === 'campaign' ? 'Campaign' : 'Audio asset'}<select style={field} required value={sourceId} onChange={event => setSourceId(event.target.value)}><option value="">Select an option</option>{options.map(item => <option key={item.id} value={item.id}>{item.title} {item.state ? '· ' + item.state : ''}</option>)}</select></label>
    <label style={label}>Playback zone<select style={field} required value={zoneId} onChange={event => setZoneId(event.target.value)}><option value="">Select a zone</option>{zones.map(zone => <option key={zone.id} value={zone.id}>{zone.locations?.name ? zone.locations.name + ' · ' : ''}{zone.name}</option>)}</select></label>
    <div style={twoCol}><label style={label}>Starts at<input style={field} type="datetime-local" required value={startsAt} onChange={event => setStartsAt(event.target.value)} /></label><label style={label}>Ends at<input style={field} type="datetime-local" value={endsAt} onChange={event => setEndsAt(event.target.value)} /></label></div>
    <label style={label}>Recurrence<select style={field} value={recurrence} onChange={event => setRecurrence(event.target.value)}><option value="">One-time</option><option value="FREQ=DAILY">Every day</option><option value="FREQ=WEEKLY">Every week</option></select></label>
    {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}<div style={actions}><button type="button" style={secondary} onClick={onClose}>Cancel</button><button style={primary} disabled={busy}>{busy ? 'Saving…' : 'Save schedule'}</button></div>
  </form></div>;
}

const page = { padding: '32px 40px', maxWidth: 1200, margin: '0 auto' } as const;
const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 26 } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const primary = { display: 'inline-flex', alignItems: 'center', gap: 7, border: 0, borderRadius: 8, padding: '11px 14px', background: 'var(--signal)', color: '#fff', fontWeight: 600, cursor: 'pointer' } as const;
const secondary = { border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', background: '#fff', color: 'var(--ink)', cursor: 'pointer' } as const;
const list = { display: 'grid', gap: 12 } as const; const card = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: 20 } as const;
const cardTop = { display: 'flex', justifyContent: 'space-between', gap: 14 } as const; const cardTitle = { margin: 0, fontSize: 17 } as const;
const meta = { margin: '7px 0 0', color: 'var(--ink-secondary)', fontSize: 13 } as const; const details = { marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 18, color: 'var(--ink-secondary)', fontSize: 12 } as const;
const deleteButton = { border: '1px solid var(--border-color)', background: '#fff', borderRadius: 7, width: 30, height: 30, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--danger)' } as const;
const notice = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(210,63,63,.08)', color: 'var(--danger)', borderRadius: 9, padding: '10px 12px', marginBottom: 16, fontSize: 13 } as const;
const empty = { background: '#fff', border: '1px dashed var(--border-color)', borderRadius: 16, padding: 42, textAlign: 'center', color: 'var(--ink-secondary)' } as const;
const overlay = { position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(29,25,22,.52)', display: 'grid', placeItems: 'center', padding: 20 } as const;
const modal = { width: 'min(620px,100%)', maxHeight: '90vh', overflowY: 'auto', background: '#fff', borderRadius: 16, padding: 26, boxShadow: 'var(--shadow-md)' } as const;
const modalHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } as const; const close = { border: 0, background: 'transparent', color: 'var(--ink-secondary)', cursor: 'pointer' } as const;
const label = { display: 'block', fontSize: 13, fontWeight: 600, marginTop: 15 } as const; const field = { width: '100%', marginTop: 7, padding: '10px 11px', border: '1px solid var(--border-color)', borderRadius: 8, font: 'inherit', background: '#fff' } as const;
const twoCol = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } as const; const actions = { display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 22 } as const;
