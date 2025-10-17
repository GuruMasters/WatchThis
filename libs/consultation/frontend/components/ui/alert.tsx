import * as React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';

// Alert styles as JavaScript objects instead of Tailwind classes
const alertStyles: {
  container: React.CSSProperties;
  variants: Record<string, React.CSSProperties>;
  content: React.CSSProperties;
  icon: React.CSSProperties;
  textContainer: React.CSSProperties;
  title: React.CSSProperties;
  description: React.CSSProperties;
  closeButton: React.CSSProperties;
  closeButtonHover: React.CSSProperties;
  closeIcon: React.CSSProperties;
} = {
  container: {
    position: 'relative',
    borderRadius: '8px',
    border: '1px solid',
    padding: '16px',
    transition: 'all 0.2s ease',
  },
  variants: {
    default: {
      backgroundColor: '#eff6ff',
      borderColor: '#bfdbfe',
      color: '#1e40af',
    } as React.CSSProperties,
    destructive: {
      backgroundColor: '#fef2f2',
      borderColor: '#fecaca',
      color: '#dc2626',
    } as React.CSSProperties,
    success: {
      backgroundColor: '#f0fdf4',
      borderColor: '#bbf7d0',
      color: '#166534',
    } as React.CSSProperties,
    warning: {
      backgroundColor: '#fffbeb',
      borderColor: '#fef3c7',
      color: '#92400e',
    } as React.CSSProperties,
    info: {
      backgroundColor: '#eff6ff',
      borderColor: '#bfdbfe',
      color: '#1e40af',
    } as React.CSSProperties,
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  } as React.CSSProperties,
  icon: {
    width: '20px',
    height: '20px',
    flexShrink: '0',
    marginTop: '2px',
  } as React.CSSProperties,
  textContainer: {
    flex: '1',
  } as React.CSSProperties,
  title: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '4px',
  } as React.CSSProperties,
  description: {
    fontSize: '14px',
    lineHeight: '1.5',
  } as React.CSSProperties,
  closeButton: {
    flexShrink: '0',
    borderRadius: '6px',
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  } as React.CSSProperties,
  closeButtonHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  closeIcon: {
    width: '16px',
    height: '16px',
  } as React.CSSProperties,
};

const alertIconMap = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertStyles.variants;
  title?: string;
  description?: string;
  onClose?: () => void;
  closable?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'default',
    title,
    description,
    onClose,
    closable = false,
    children,
    style,
    ...props
  }, ref) => {
    const Icon = alertIconMap[variant];

    const containerStyle = {
      ...alertStyles.container,
      ...alertStyles.variants[variant],
      ...style,
    };

    const handleCloseMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      Object.assign(e.currentTarget.style, alertStyles.closeButtonHover);
    };

    const handleCloseMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      Object.assign(e.currentTarget.style, alertStyles.closeButton);
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        {...props}
      >
        <div style={alertStyles.content}>
          <Icon style={alertStyles.icon} />

          <div style={alertStyles.textContainer}>
            {title && (
              <h4 style={alertStyles.title}>{title}</h4>
            )}

            {description && (
              <p style={alertStyles.description}>{description}</p>
            )}

            {children && (
              <div style={alertStyles.description}>{children}</div>
            )}
          </div>

          {closable && onClose && (
            <button
              onClick={onClose}
              style={alertStyles.closeButton}
              onMouseEnter={handleCloseMouseEnter}
              onMouseLeave={handleCloseMouseLeave}
              aria-label="Close alert"
            >
              <X style={alertStyles.closeIcon} />
            </button>
          )}
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ style, ...props }, ref) => (
  <h4
    ref={ref}
    style={{
      ...alertStyles.title,
      ...style,
    }}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ style, ...props }, ref) => (
  <p
    ref={ref}
    style={{
      ...alertStyles.description,
      ...style,
    }}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
