import { type ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  heading: string;
  body: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  compact?: boolean;
}

export function EmptyState({ icon, heading, body, primaryAction, secondaryAction, compact }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: compact ? '32px 24px' : '64px 40px',
      gap: 16,
    }}>
      {icon && (
        <span style={{ fontSize: compact ? 32 : 48, lineHeight: 1 }}>{icon}</span>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{ fontSize: compact ? 16 : 20, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>
          {heading}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-secondary)', margin: 0, maxWidth: 360 }}>
          {body}
        </p>
      </div>
      {(primaryAction || secondaryAction) && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {primaryAction && (
            <Button variant="primary" onClick={primaryAction.onClick}>{primaryAction.label}</Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>
          )}
        </div>
      )}
    </div>
  );
}

export function AlertBanner({ type, title, body, action }: {
  type: 'warning' | 'error' | 'info';
  title: string;
  body?: string;
  action?: { label: string; onClick: () => void };
}) {
  const colors = {
    warning: { bg: 'var(--warning-soft)', border: 'var(--warning)', color: 'var(--warning)' },
    error: { bg: 'var(--danger-soft)', border: 'var(--danger)', color: 'var(--danger)' },
    info: { bg: 'var(--info-soft)', border: 'var(--info)', color: 'var(--info)' },
  };
  const c = colors[type];

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: c.color, margin: 0 }}>{title}</p>
        {body && <p style={{ fontSize: 13, color: 'var(--ink-secondary)', margin: '2px 0 0' }}>{body}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 13,
            fontWeight: 500,
            color: c.color,
            cursor: 'pointer',
            padding: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
