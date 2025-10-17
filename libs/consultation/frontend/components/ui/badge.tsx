import * as React from 'react';

// Badge styles as JavaScript objects instead of Tailwind classes
const badgeStyles: {
  base: React.CSSProperties;
  variants: Record<string, React.CSSProperties>;
  hover: Record<string, React.CSSProperties>;
  focus: React.CSSProperties;
} = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    border: '1px solid',
    padding: '2px 10px',
    fontSize: '12px',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    outline: 'none',
    cursor: 'default',
  },
  variants: {
    default: {
      borderColor: 'transparent',
      backgroundColor: '#FBC314',
      color: '#111111',
    } as React.CSSProperties,
    secondary: {
      borderColor: 'transparent',
      backgroundColor: '#f3f4f6',
      color: '#111111',
    } as React.CSSProperties,
    destructive: {
      borderColor: 'transparent',
      backgroundColor: '#ef4444',
      color: 'white',
    } as React.CSSProperties,
    outline: {
      borderColor: '#e5e7eb',
      backgroundColor: 'transparent',
      color: '#111111',
    } as React.CSSProperties,
  },
  hover: {
    default: {
      backgroundColor: 'rgba(251, 195, 20, 0.8)',
    } as React.CSSProperties,
    secondary: {
      backgroundColor: '#e5e7eb',
    } as React.CSSProperties,
    destructive: {
      backgroundColor: '#dc2626',
    } as React.CSSProperties,
  },
  focus: {
    outline: '2px solid #0081C5',
    outlineOffset: '2px',
  } as React.CSSProperties,
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeStyles.variants;
}

function Badge({ variant = 'default', style, ...props }: BadgeProps) {
  const badgeStyle = {
    ...badgeStyles.base,
    ...badgeStyles.variants[variant],
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant === 'default' || variant === 'secondary' || variant === 'destructive') {
      const hoverStyle = badgeStyles.hover[variant];
      if (hoverStyle) {
        Object.assign(e.currentTarget.style, hoverStyle);
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    Object.assign(e.currentTarget.style, badgeStyle);
  };

  return (
    <div
      style={badgeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
}

export { Badge };
