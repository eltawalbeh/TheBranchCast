import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Radio, ShieldCheck, MapPinned } from 'lucide-react';
const features = [
  { icon: Radio, title: 'One sound, every branch', body: 'Control brand audio, campaigns and schedules from one workspace.' },
  { icon: MapPinned, title: 'Built for locations', body: 'Organize every branch into audio zones and monitor each player.' },
  { icon: ShieldCheck, title: 'Role-aware operations', body: 'Give marketing, operations and branch teams only the access they need.' },
];
export function LandingPage() {
  return <div style={{ minHeight: '100vh', background: '#1D1916', color: '#fff' }}>
    <header style={{ maxWidth: 1160, margin: '0 auto', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 20 }}>Branch<span style={{ color: 'var(--signal)' }}>Cast</span></Link>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Link to="/login" style={{ color: 'rgba(255,255,255,.75)', textDecoration: 'none', fontSize: 14 }}>Log in</Link><Link to="/signup" style={{ background: 'var(--signal)', color: '#fff', padding: '10px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Start workspace</Link></div>
    </header>
    <main>
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '88px 28px 96px', display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 48, alignItems: 'center' }}>
        <div><p style={{ color: 'var(--signal)', margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Business audio, connected</p><h1 style={{ fontSize: 'clamp(44px,7vw,76px)', lineHeight: .98, letterSpacing: '-.055em', margin: '18px 0 22px' }}>Make every branch sound like your brand.</h1><p style={{ maxWidth: 560, color: 'rgba(255,255,255,.62)', fontSize: 18, lineHeight: 1.6 }}>BranchCast gives multi-location businesses one operational home for in-store audio, promotions and player health.</p><div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}><Link to="/signup" style={{ background: 'var(--signal)', color: '#fff', padding: '13px 17px', borderRadius: 9, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', gap: 8, alignItems: 'center' }}>Create your workspace <ArrowRight size={17}/></Link><Link to="/login" style={{ color: '#fff', padding: '13px 17px', border: '1px solid rgba(255,255,255,.2)', borderRadius: 9, textDecoration: 'none' }}>I have an account</Link></div></div>
        <div style={{ background: 'linear-gradient(145deg,#33271f,#201a16)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 22, padding: 26, boxShadow: '0 26px 80px rgba(0,0,0,.24)' }}><div style={{ color: 'rgba(255,255,255,.48)', fontSize: 12 }}>LIVE NETWORK</div><div style={{ fontSize: 35, fontWeight: 700, marginTop: 10 }}>All branches, on brand.</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginTop: 28 }}>{[['Locations','6'],['Players online','9'],['Campaigns','2'],['Needs attention','1']].map(([l,v])=><div key={l} style={{ background: 'rgba(255,255,255,.05)', padding: 14, borderRadius: 12 }}><div style={{ fontSize: 24, fontWeight: 700, color: l === 'Needs attention' ? '#F7C04A' : '#fff' }}>{v}</div><div style={{ color: 'rgba(255,255,255,.48)', fontSize: 12 }}>{l}</div></div>)}</div></div>
      </section>
      <section style={{ background: '#F7F5F1', color: 'var(--ink)', padding: '76px 28px' }}><div style={{ maxWidth: 1160, margin: '0 auto' }}><p style={{ color: 'var(--signal)', fontWeight: 600, fontSize: 13 }}>OPERATE WITH CLARITY</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>{features.map(({icon:Icon,title,body})=><article key={title} style={{ padding: 24, background: '#fff', borderRadius: 16, border: '1px solid var(--border-color)' }}><Icon size={24} color="var(--signal)"/><h2 style={{ fontSize: 18, margin: '18px 0 8px' }}>{title}</h2><p style={{ margin: 0, color: 'var(--ink-secondary)', lineHeight: 1.6 }}>{body}</p></article>)}</div></div></section>
    </main>
  </div>;
}
