import { Check, CreditCard, Sparkles } from 'lucide-react';
import { useWorkspace } from '@/providers/WorkspaceProvider';

const plans = [
  { name: 'Starter', price: 'Custom', description: 'For one location getting started.', features: ['1 location', 'Core scheduling', 'Basic monitoring'], featured: false },
  { name: 'Growth', price: 'Custom', description: 'For teams managing multiple branches.', features: ['Multiple locations', 'Campaigns and reports', 'Priority support'], featured: true },
  { name: 'Enterprise', price: 'Talk to us', description: 'For large brands and rollout programs.', features: ['Unlimited locations', 'Advanced roles and audit', 'Dedicated onboarding'], featured: false },
] as const;

export function BillingPage() {
  const { workspace } = useWorkspace();
  return <div style={page}><header><p style={eyebrow}>WORKSPACE SETTINGS</p><h1 style={title}>Plans & billing</h1><p style={sub}>Choose the operating plan that matches your BranchCast rollout.</p></header><section style={current}><div style={currentIcon}><CreditCard size={20} /></div><div><strong>{workspace?.name ?? 'Your workspace'}</strong><p style={sub}>Current plan: <b>Trial</b> · Billing is not connected yet</p></div><span style={trial}>Trial</span></section><div style={grid}>{plans.map((plan) => <article style={{ ...card, ...(plan.featured ? featured : {}) }} key={plan.name}>{plan.featured && <span style={recommended}><Sparkles size={13} /> Recommended</span>}<h2>{plan.name}</h2><p style={sub}>{plan.description}</p><strong style={price}>{plan.price}</strong><ul>{plan.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul><button style={plan.featured ? primary : secondary}>Request {plan.name}</button></article>)}</div><p style={note}>Payments, invoices, and automatic renewals will be enabled after a billing provider is connected. Until then, plan requests are handled by your BranchCast administrator.</p></div>;
}

const page = { padding: '32px 40px', maxWidth: 1100, margin: '0 auto' } as const;
const eyebrow = { margin: 0, color: 'var(--signal)', fontWeight: 600, fontSize: 12, letterSpacing: '.06em' } as const;
const title = { margin: '5px 0', fontSize: 28, color: 'var(--ink)' } as const;
const sub = { margin: 0, color: 'var(--ink-secondary)' } as const;
const current = { display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface-subtle)', borderRadius: 14, padding: 18, margin: '26px 0' } as const;
const currentIcon = { width: 38, height: 38, display: 'grid', placeItems: 'center', borderRadius: 10, background: '#fff', color: 'var(--signal)' } as const;
const trial = { marginLeft: 'auto', borderRadius: 99, padding: '5px 10px', background: 'rgba(44,167,96,.12)', color: 'var(--success)', fontSize: 12 } as const;
const grid = { display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 14 } as const;
const card = { position: 'relative', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 14, padding: 22 } as const;
const featured = { border: '2px solid var(--signal)' } as const;
const recommended = { display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--signal)', fontSize: 12, fontWeight: 600 } as const;
const price = { display: 'block', fontSize: 22, margin: '20px 0 15px', color: 'var(--ink)' } as const;
const primary = { width: '100%', border: 0, borderRadius: 8, padding: '10px 12px', background: 'var(--signal)', color: '#fff', cursor: 'pointer' } as const;
const secondary = { width: '100%', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 12px', background: '#fff', cursor: 'pointer' } as const;
const note = { marginTop: 22, fontSize: 13, color: 'var(--ink-secondary)' } as const;
