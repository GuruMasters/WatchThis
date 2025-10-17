import * as React from 'react';

// Loading styles as JavaScript objects instead of Tailwind classes
const loadingStyles: {
  container: React.CSSProperties;
  sizes: Record<string, React.CSSProperties>;
} = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizes: {
    sm: {
      width: '16px',
      height: '16px',
    } as React.CSSProperties,
    md: {
      width: '32px',
      height: '32px',
    } as React.CSSProperties,
    lg: {
      width: '48px',
      height: '48px',
    } as React.CSSProperties,
    xl: {
      width: '64px',
      height: '64px',
    } as React.CSSProperties,
  },
};

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof loadingStyles.sizes;
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  text?: string;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = 'md', variant = 'spinner', text, style, ...props }, ref) => {
    const containerStyle = {
      ...loadingStyles.container,
      ...loadingStyles.sizes[size],
      ...style,
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        {...props}
      >
        {variant === 'spinner' && (
          <Spinner size={size} />
        )}

        {variant === 'dots' && (
          <Dots size={size} />
        )}

        {variant === 'pulse' && (
          <Pulse size={size} />
        )}

        {variant === 'bars' && (
          <Bars size={size} />
        )}

        {text && (
          <span style={{
            marginLeft: '8px',
            fontSize: '14px',
            color: '#6b7280',
          }}>
            {text}
          </span>
        )}
      </div>
    );
  }
);
Loading.displayName = 'Loading';

const Spinner = ({ size = 'md' }: { size?: keyof typeof loadingStyles.sizes }) => {
  const spinnerSize = loadingStyles.sizes[size];

  return (
    <svg
      style={{
        animation: 'spin 1s linear infinite',
        color: '#0081C5',
        ...spinnerSize,
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        style={{ opacity: 0.25 }}
      />
      <path
        fill="currentColor"
        style={{ opacity: 0.75 }}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

const Dots = ({ size = 'md' }: { size?: keyof typeof loadingStyles.sizes }) => {
  const dotSizes = {
    sm: { width: '4px', height: '4px' },
    md: { width: '8px', height: '8px' },
    lg: { width: '12px', height: '12px' },
    xl: { width: '16px', height: '16px' },
  };

  const dotSize = dotSizes[size];

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#0081C5',
            borderRadius: '50%',
            animation: 'bounce 1.4s ease-in-out infinite both',
            animationDelay: `${i * 0.16}s`,
            ...dotSize,
          }}
        />
      ))}
    </div>
  );
};

const Pulse = ({ size = 'md' }: { size?: keyof typeof loadingStyles.sizes }) => {
  const pulseSize = loadingStyles.sizes[size];

  return (
    <div
      style={{
        backgroundColor: '#0081C5',
        borderRadius: '50%',
        animation: 'pulse 1.4s ease-in-out infinite both',
        ...pulseSize,
      }}
    />
  );
};

const Bars = ({ size = 'md' }: { size?: keyof typeof loadingStyles.sizes }) => {
  const barSizes = {
    sm: { width: '4px', height: '16px' },
    md: { width: '4px', height: '24px' },
    lg: { width: '4px', height: '32px' },
    xl: { width: '4px', height: '48px' },
  };

  const barSize = barSizes[size];

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#0081C5',
            animation: 'pulse 0.8s ease-in-out infinite both',
            animationDelay: `${i * 0.1}s`,
            ...barSize,
          }}
        />
      ))}
    </div>
  );
};

const LoadingOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { loading?: boolean }
>(({ style, loading = true, children, ...props }, ref) => {
  return (
    <div ref={ref} style={{ position: 'relative', ...style }} {...props}>
      {children}

      {loading && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '10',
        }}>
          <Loading />
        </div>
      )}
    </div>
  );
});
LoadingOverlay.displayName = 'LoadingOverlay';

const LoadingSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { lines?: number }
>(({ style, lines = 3, ...props }, ref) => {
  return (
    <div ref={ref} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', ...style }} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: '16px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            marginBottom: i < lines - 1 ? '8px' : '0',
          }}
        />
      ))}
    </div>
  );
});
LoadingSkeleton.displayName = 'LoadingSkeleton';

export {
  Loading,
  LoadingOverlay,
  LoadingSkeleton,
  Spinner,
  Dots,
  Pulse,
  Bars,
};
