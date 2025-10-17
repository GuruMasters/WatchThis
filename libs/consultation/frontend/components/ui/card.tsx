import * as React from 'react';

// Card styles as JavaScript objects instead of Tailwind classes
const cardStyles: {
  card: React.CSSProperties;
  variants: Record<string, React.CSSProperties>;
  paddings: Record<string, React.CSSProperties>;
  header: React.CSSProperties;
  title: React.CSSProperties;
  description: React.CSSProperties;
  content: React.CSSProperties;
  footer: React.CSSProperties;
  actions: React.CSSProperties;
} = {
  card: {
    borderRadius: '24px',
    border: '1px solid',
    backgroundColor: 'rgba(255,255,255,0.90)',
    color: '#111111',
    boxShadow: '0 6px 20px rgba(6, 24, 44, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    backdropFilter: 'blur(20px)',
  },
  variants: {
    default: {
      borderColor: 'rgba(229, 231, 235, 0.6)',
      backgroundColor: 'rgba(255,255,255,0.90)',
    } as React.CSSProperties,
    elevated: {
      borderColor: 'rgba(229, 231, 235, 0.6)',
      boxShadow: '0 12px 32px rgba(6, 24, 44, 0.12)',
    } as React.CSSProperties,
    outlined: {
      border: '2px solid #0081C5',
      backgroundColor: 'rgba(0, 129, 197, 0.06)',
    } as React.CSSProperties,
    glass: {
      borderColor: 'rgba(255,255,255,0.70)',
      backgroundColor: 'rgba(255,255,255,0.60)',
      boxShadow: '0 6px 20px rgba(6, 24, 44, 0.08)',
      backdropFilter: 'blur(20px)',
    } as React.CSSProperties,
    brandYellow: {
      borderColor: 'transparent',
      backgroundImage: 'linear-gradient(135deg, #FBC314 0%, #EFAF13 100%)',
      color: '#111111',
      boxShadow: '0 8px 20px rgba(17,17,17,0.18)',
    } as React.CSSProperties,
    black: {
      borderColor: 'rgba(255,255,255,0.12)',
      backgroundColor: '#111111',
      color: '#FFFFFF',
    } as React.CSSProperties,
    ghost: {
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    } as React.CSSProperties,
    success: {
      borderColor: '#bbf7d0',
      backgroundColor: 'rgba(34, 197, 94, 0.05)',
    } as React.CSSProperties,
    warning: {
      borderColor: '#FBC314',
      backgroundColor: 'rgba(251, 195, 20, 0.1)',
    } as React.CSSProperties,
    error: {
      borderColor: '#fecaca',
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
    } as React.CSSProperties,
  },
  paddings: {
    none: {} as React.CSSProperties,
    sm: {
      padding: '16px',
    } as React.CSSProperties,
    md: {
      padding: '24px',
    } as React.CSSProperties,
    lg: {
      padding: '32px',
    } as React.CSSProperties,
    xl: {
      padding: '40px',
    } as React.CSSProperties,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '16px',
  } as React.CSSProperties,
  title: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '1.25',
    letterSpacing: '-0.01em',
    fontFamily: "'Century Gothic', 'Inter', sans-serif",
  } as React.CSSProperties,
  description: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
  } as React.CSSProperties,
  content: {
    flex: '1',
  } as React.CSSProperties,
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6',
    marginTop: '16px',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,
};

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardStyles.variants;
  padding?: keyof typeof cardStyles.paddings;
  asChild?: boolean;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', asChild = false, style, hover = true, ...props }, ref) => {
    const baseStyle: React.CSSProperties = {
      ...cardStyles.card,
      ...cardStyles.variants[variant],
      ...cardStyles.paddings[padding],
      ...style,
    };

    const [computedStyle, setComputedStyle] = React.useState<React.CSSProperties>(baseStyle);

    const handleMouseEnter = () => {
      if (!hover) return;
      setComputedStyle(prev => ({
        ...prev,
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 32px rgba(6, 24, 44, 0.12)'
      }));
    };

    const handleMouseLeave = () => {
      if (!hover) return;
      setComputedStyle(baseStyle);
    };

    React.useEffect(() => {
      setComputedStyle(baseStyle);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant, padding, JSON.stringify(style)]);

    const Comp = asChild ? 'div' : 'div';
    return (
      <Comp
        ref={ref}
        style={computedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...cardStyles.header,
      ...style,
    }}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ style, ...props }, ref) => (
  <h3
    ref={ref}
    style={{
      ...cardStyles.title,
      ...style,
    }}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ style, ...props }, ref) => (
  <p
    ref={ref}
    style={{
      ...cardStyles.description,
      ...style,
    }}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...cardStyles.content,
      ...style,
    }}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...cardStyles.footer,
      ...style,
    }}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

const CardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...cardStyles.actions,
      ...style,
    }}
    {...props}
  />
));
CardActions.displayName = 'CardActions';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardActions,
};
