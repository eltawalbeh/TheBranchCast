type Status = 'Online' | 'Offline' | 'Not Paired' | 'Syncing' | 'Draft' | 'Approved' | 'Scheduled' | 'Archived' | 'Active' | 'Ready to schedule' | 'High' | 'Medium' | 'Low';

const config: Record<string, { bg: string; color: string; dot?: string }> = {
  Online:            { bg: 'var(--success-soft)', color: 'var(--success)',  dot: 'var(--success)' },
  Offline:           { bg: 'var(--danger-soft)',  color: 'var(--danger)',   dot: 'var(--danger)' },
  'Not Paired':      { bg: 'var(--neutral-soft)', color: 'var(--neutral)',  dot: 'var(--neutral)' },
  Syncing:           { bg: 'var(--info-soft)',    color: 'var(--info)',     dot: 'var(--info)' },
  Draft:             { bg: 'var(--neutral-soft)', color: 'var(--neutral)' },
  Approved:          { bg: 'var(--success-soft)', color: 'var(--success)' },
  Scheduled:         { bg: 'var(--info-soft)',    color: 'var(--info)' },
  Archived:          { bg: 'var(--neutral-soft)', color: 'var(--neutral)' },
  Active:            { bg: 'var(--success-soft)', color: 'var(--success)',  dot: 'var(--success)' },
  'Ready to schedule': { bg: 'var(--warning-soft)', color: 'var(--warning)' },
  High:              { bg: 'var(--danger-soft)',  color: 'var(--danger)' },
  Medium:            { bg: 'var(--warning-soft)', color: 'var(--warning)' },
  Low:               { bg: 'var(--info-soft)',    color: 'var(--info)' },
};

interface StatusBadgeProps {
  status: string;
  pulse?: boolean;
}

export function StatusBadge({ status, pulse }: StatusBadgeProps) {
  const c = config[status] ?? { bg: 'var(--neutral-soft)', color: 'var(--neutral)' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        paddingInline: 8,
        paddingBlock: 3,
        borderRadius: 6,
        background: c.bg,
        color: c.color,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: '16px',
        whiteSpace: 'nowrap',
      }}
    >
      {c.dot && (
        <span
          className={pulse ? 'signal-dot' : ''}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: c.dot,
            flexShrink: 0,
          }}
        />
      )}
      {status}
    </span>
  );
}
