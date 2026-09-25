import { BookOpen, Headphones, LifeBuoy, MessageSquareWarning } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const topics = [
  ['Getting started', 'Set up your organization, locations, and first player.', BookOpen],
  ['Content and campaigns', 'Upload audio, build a campaign, then assign it to a schedule.', Headphones],
  ['Playback and monitoring', 'Use Monitoring to check player health and resolve alerts.', LifeBuoy],
] as const;

export function HelpPage() {
  const navigate = useNavigate();
  return <div style={page}><p style={eyebrow}>SUPPORT</p><h1 style={title}>How can we help?</h1><p style={sub}>Quick guidance for running BranchCast across your locations.</p><div style={grid}>{topics.map(([name, description, Icon]) => <article style={card} key={name}><span style={icon}><Icon size={18} /></span><h2>{name}</h2><p>{description}</p></article>)}</div><section style={contact}><span style={icon}><MessageSquareWarning size={18} /></span><div><h2>Something is not working?</h2><p>Send a report from your branch workspace so your administrator can follow up.</p></div><button style={button} onClick={() => navigate('/my-location/report-issue')}>Report an issue</button></section></div>;
}
const page = { padding: '32px 40px', maxWidth: 1100, margin: '0 auto' } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const grid = { display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 14, margin: '28px 0' } as const;
const card = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: 20 } as const;
const icon = { width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', color: 'var(--signal)', background: 'var(--surface-subtle)' } as const;
const contact = { display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface-subtle)', borderRadius: 14, padding: 20, flexWrap: 'wrap' } as const;
const button = { marginLeft: 'auto', border: 0, borderRadius: 8, padding: '10px 14px', background: 'var(--signal)', color: '#fff', cursor: 'pointer' } as const;
