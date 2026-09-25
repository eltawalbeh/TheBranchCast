type CardStatus = 'neutral' | 'warning' | 'info' | 'success' | 'danger';

const statusColors: Record<CardStatus, string> = {
  neutral: 'var(--ink-tertiary)',
  warning: 'var(--warning)',
  info: 'var(--info)',
  success: 'var(--success)',
  danger: 'var(--danger)',
};

interface MetricCardProps {
  label: string;
  metric: string;
  context: string;
  status?: CardStatus;
  onClick?: () => void;
}

export function MetricCard({ label, metric, context, status = 'neutral', onClick }: MetricCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        boxShadow: 'var(--shadow-sm)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color var(--motion-fast) ease-out',
      }}
      onMouseEnter={e => {
        if (onClick) e.currentTarget.style.borderColor = 'var(--surface-strong)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-secondary)', lineHeight: '18px' }}>
        {label}
      </span>
      <span style={{ fontSize: 28, fontWeight: 600, lineHeight: '32px', color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
        {metric}
      </span>
      <span style={{ fontSize: 12, color: statusColors[status], lineHeight: '16px' }}>
        {context}
      </span>
    </div>
  );
}
