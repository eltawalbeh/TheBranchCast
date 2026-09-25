import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, style, ...props }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: 'inherit',
    fontWeight: 500,
    fontSize: size === 'sm' ? 13 : 14,
    lineHeight: size === 'sm' ? '18px' : '22px',
    paddingBlock: size === 'sm' ? 6 : 9,
    paddingInline: size === 'sm' ? 12 : 16,
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'background var(--motion-fast) ease-out, border-color var(--motion-fast) ease-out, color var(--motion-fast) ease-out',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    ...style,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--signal)',
      borderColor: 'var(--signal)',
      color: '#FFFFFF',
    },
    secondary: {
      background: 'transparent',
      borderColor: 'var(--border-color)',
      color: 'var(--ink)',
    },
    ghost: {
      background: 'transparent',
      borderColor: 'transparent',
      color: 'var(--ink-secondary)',
    },
    destructive: {
      background: 'var(--danger-soft)',
      borderColor: 'var(--danger)',
      color: 'var(--danger)',
    },
  };

  return (
    <button
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        if (variant === 'primary') el.style.background = 'var(--signal-hover)';
        if (variant === 'secondary') el.style.background = 'var(--surface-subtle)';
        if (variant === 'ghost') el.style.background = 'var(--surface-subtle)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        Object.assign(el.style, variants[variant]);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
