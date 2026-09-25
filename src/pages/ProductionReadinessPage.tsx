import { CheckCircle2, ClipboardCheck, LockKeyhole, Rocket, ServerCog } from 'lucide-react';

const tracks = [
  ['Player runtime', 'Fleet visibility, heartbeat, playback controls, and offline behavior.', ServerCog],
  ['Public access', 'Brand website, login, signup, onboarding, and role-based entry.', Rocket],
  ['Data and security', 'Supabase migrations, RLS, Storage, Realtime, audit, and secrets.', LockKeyhole],
  ['Launch QA', 'Responsive, RTL/LTR, accessibility, E2E, backups, and monitoring.', ClipboardCheck],
] as const;

export function ProductionReadinessPage() {
  return <div style={page}><p style={eyebrow}>FINAL DELIVERY</p><h1 style={title}>Production readiness</h1><p style={sub}>The final gate for the combined Phases 21–27 delivery bundle.</p><section style={hero}><Rocket size={22} /><div><h2>Ready for launch review</h2><p>Complete every track below against the production Supabase project before switching the environment live.</p></div></section><div style={grid}>{tracks.map(([name, description, Icon]) => <article style={card} key={name}><span style={icon}><Icon size={18} /></span><h2>{name}</h2><p>{description}</p><span style={pending}><CheckCircle2 size={14} /> Verification required</span></article>)}</div><section style={checklist}><h2>Release checklist</h2><ul><li>Production environment variables are configured.</li><li>RLS policies are tested with each workspace role.</li><li>Player heartbeat and remote commands are tested with a real device.</li><li>Billing provider, invoices, and webhook signing are configured.</li><li>Arabic, English, mobile, keyboard, and error-state QA is complete.</li><li>Backups, monitoring, rollback, and support ownership are documented.</li></ul></section></div>;
}
const page = { padding: '32px 40px', maxWidth: 1100, margin: '0 auto' } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const hero = { display: 'flex', alignItems: 'flex-start', gap: 12, background: 'var(--surface-subtle)', borderRadius: 14, padding: 20, margin: '26px 0' } as const;
const grid = { display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 } as const;
const card = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: 20 } as const;
const icon = { width: 36, height: 36, display: 'grid', placeItems: 'center', borderRadius: 10, background: 'var(--surface-subtle)', color: 'var(--signal)' } as const;
const pending = { display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-secondary)', fontSize: 12 } as const;
const checklist = { marginTop: 18, background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: 20 } as const;
