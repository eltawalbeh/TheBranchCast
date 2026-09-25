import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '@/providers/WorkspaceProvider';

export function InvoicesPage() {
  const navigate = useNavigate();
  const { workspace } = useWorkspace();
  return <div style={page}><button style={back} onClick={() => navigate('/settings/billing')}><ArrowLeft size={15} /> Back to billing</button><header><p style={eyebrow}>BILLING</p><h1 style={title}>Invoices</h1><p style={sub}>Review invoices and billing documents for {workspace?.name ?? 'your workspace'}.</p></header><section style={card}><div style={empty}><span style={icon}><FileText size={22} /></span><h2>No invoices yet</h2><p>Invoices will appear here once a paid plan and billing provider are connected.</p><button style={secondary} disabled><Download size={15} /> Export invoices</button></div></section></div>;
}

const page = { padding: '32px 40px', maxWidth: 1000, margin: '0 auto' } as const;
const back = { display: 'inline-flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', color: 'var(--ink-secondary)', cursor: 'pointer', padding: 0, marginBottom: 24 } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const card = { background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, marginTop: 26 } as const;
const empty = { minHeight: 280, display: 'grid', placeItems: 'center', alignContent: 'center', gap: 8, padding: 32, textAlign: 'center', color: 'var(--ink-secondary)' } as const;
const icon = { width: 48, height: 48, display: 'grid', placeItems: 'center', borderRadius: 12, background: 'var(--surface-subtle)', color: 'var(--signal)' } as const;
const secondary = { display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 13px', background: '#fff', color: 'var(--ink-secondary)' } as const;
