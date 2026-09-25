interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = 16, style }: SkeletonProps) {
  return (
    <span
      className="skeleton"
      style={{ display: 'block', width, height, ...style }}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <Skeleton width="60%" height={13} />
      <Skeleton width="40%" height={28} />
      <Skeleton width="70%" height={12} />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr>
      {[40, 20, 30, 25, 20, 20, 10].map((w, i) => (
        <td key={i} style={{ padding: '12px 16px' }}>
          <Skeleton width={`${w}%`} height={14} />
        </td>
      ))}
    </tr>
  );
}
