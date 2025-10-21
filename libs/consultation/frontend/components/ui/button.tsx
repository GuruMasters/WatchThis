import React from 'react';

/**
 * LUXURY PREMIUM BUTTON COMPONENT
 * 
 * Ultra-premium design with:
 * - Elegant gradients
 * - Glow effects
 * - Multi-layer shadows
 * - Smooth animations
 * - Shimmer effects
 * - Glass morphism
 * 
 * Apple quality meets luxury design
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'luxury' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const LoadingSpinner: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      animation: 'spin 0.8s linear infinite'
    }}
  >
    <circle cx="12" cy="12" r="10" opacity="0.25" />
    <path d="M12 2 A10 10 0 0 1 22 12" opacity="0.75" />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      loading = false,
      fullWidth = false,
      disabled = false,
      children,
      className = '',
      style = {},
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    // Base luxury styles
    const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
      fontWeight: 600,
      textDecoration: 'none',
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      outline: 'none',
      ...style
    };

    // Luxury size variants
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
      fontSize: '14px',
        padding: '10px 20px',
        borderRadius: '12px',
        minHeight: '38px',
        lineHeight: '1.4',
        letterSpacing: '0.02em'
      },
      md: {
        fontSize: '16px',
        padding: '14px 28px',
        borderRadius: '14px',
        minHeight: '48px',
        lineHeight: '1.5',
        letterSpacing: '0.01em'
      },
      lg: {
        fontSize: '17px',
        padding: '16px 32px',
        borderRadius: '16px',
        minHeight: '56px',
        lineHeight: '1.5',
        letterSpacing: '0.01em'
      },
      xl: {
        fontSize: '19px',
        padding: '20px 40px',
        borderRadius: '18px',
        minHeight: '64px',
        lineHeight: '1.5',
        letterSpacing: '0.005em'
      }
    };

    // Luxury variant styles with gradients and glow
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundImage: 'linear-gradient(135deg, #0071E3 0%, #0077ED 100%)',
        color: '#FFFFFF',
        boxShadow: '0 4px 14px 0 rgba(0, 113, 227, 0.35), 0 2px 6px 0 rgba(0, 113, 227, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
      },
    secondary: {
        backgroundImage: 'linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%)',
        color: '#1D1D1F',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
      },
    outline: {
        backgroundColor: 'transparent',
        color: '#0071E3',
        boxShadow: 'inset 0 0 0 2px #0071E3, 0 2px 8px 0 rgba(0, 113, 227, 0.1)',
      },
    ghost: {
        backgroundColor: 'rgba(0, 113, 227, 0.05)',
        color: '#0071E3',
        boxShadow: '0 2px 6px 0 rgba(0, 113, 227, 0.08)',
      },
      luxury: {
        backgroundImage: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)',
        color: '#FFFFFF',
        boxShadow: '0 8px 24px 0 rgba(0, 113, 227, 0.4), 0 4px 12px 0 rgba(0, 113, 227, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)'
      },
      premium: {
        backgroundImage: 'linear-gradient(135deg, #1D1D1F 0%, #3A3A3C 100%)',
        color: '#FFFFFF',
        boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.25), 0 4px 12px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }
    };

    // Luxury hover states with glow
    const variantHoverStyles: Record<string, React.CSSProperties> = {
    primary: {
        backgroundImage: 'linear-gradient(135deg, #0077ED 0%, #0088FF 100%)',
        boxShadow: '0 6px 20px 0 rgba(0, 113, 227, 0.45), 0 3px 10px 0 rgba(0, 113, 227, 0.3), 0 0 20px 0 rgba(0, 113, 227, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px) scale(1.02)',
      },
    secondary: {
        backgroundImage: 'linear-gradient(135deg, #E8E8ED 0%, #D2D2D7 100%)',
        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.12), 0 2px 6px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        transform: 'translateY(-2px) scale(1.02)',
      },
    outline: {
        backgroundColor: 'rgba(0, 113, 227, 0.08)',
        boxShadow: 'inset 0 0 0 2px #0088FF, 0 4px 16px 0 rgba(0, 113, 227, 0.2), 0 0 16px 0 rgba(0, 113, 227, 0.15)',
        transform: 'translateY(-1px)',
      },
    ghost: {
        backgroundColor: 'rgba(0, 113, 227, 0.12)',
        boxShadow: '0 4px 12px 0 rgba(0, 113, 227, 0.15), 0 0 12px 0 rgba(0, 113, 227, 0.1)',
        transform: 'translateY(-1px)',
      },
      luxury: {
        backgroundImage: 'linear-gradient(135deg, #0088FF 0%, #00A3FF 100%)',
        boxShadow: '0 12px 32px 0 rgba(0, 113, 227, 0.5), 0 6px 16px 0 rgba(0, 113, 227, 0.4), 0 0 24px 0 rgba(0, 136, 255, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-3px) scale(1.03)',
      },
      premium: {
        backgroundImage: 'linear-gradient(135deg, #3A3A3C 0%, #515154 100%)',
        boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.35), 0 6px 16px 0 rgba(0, 0, 0, 0.25), 0 0 20px 0 rgba(255, 255, 255, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        transform: 'translateY(-3px) scale(1.03)',
      }
    };

    // Active states
    const variantActiveStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundImage: 'linear-gradient(135deg, #0066CC 0%, #0071E3 100%)',
        transform: 'translateY(0) scale(0.98)',
        boxShadow: '0 2px 8px 0 rgba(0, 113, 227, 0.3), inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      secondary: {
        backgroundImage: 'linear-gradient(135deg, #D2D2D7 0%, #C7C7CC 100%)',
        transform: 'translateY(0) scale(0.98)',
      },
      outline: {
        backgroundColor: 'rgba(0, 113, 227, 0.12)',
        transform: 'translateY(0) scale(0.98)',
      },
      ghost: {
        backgroundColor: 'rgba(0, 113, 227, 0.15)',
        transform: 'translateY(0) scale(0.98)',
      },
      luxury: {
        backgroundImage: 'linear-gradient(135deg, #0066CC 0%, #0071E3 100%)',
        transform: 'translateY(0) scale(0.97)',
      },
      premium: {
        transform: 'translateY(0) scale(0.97)',
      }
    };

    // Premium focus state
    const focusStyle: React.CSSProperties = {
      boxShadow: '0 0 0 4px rgba(0, 113, 227, 0.25), 0 0 20px 0 rgba(0, 113, 227, 0.2)',
    };

    const disabledStyle: React.CSSProperties = {
      opacity: 0.4,
      cursor: 'not-allowed',
      transform: 'none',
    };

    const fullWidthStyle: React.CSSProperties = fullWidth ? { width: '100%' } : {};

    let finalStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...fullWidthStyle,
      ...(disabled || loading ? disabledStyle : {}),
    };

    if (!disabled && !loading) {
      if (isActive) {
        finalStyles = { ...finalStyles, ...variantActiveStyles[variant] };
      } else if (isHovered) {
        finalStyles = { ...finalStyles, ...variantHoverStyles[variant] };
      }
      if (isFocused) {
        finalStyles = { ...finalStyles, ...focusStyle };
      }
    }

    const iconSizes = { sm: 16, md: 18, lg: 20, xl: 22 };

    const buttonContent = (
      <>
        {loading && <LoadingSpinner size={iconSizes[size]} />}
        {!loading && leftIcon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>
        )}
        {children && (
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>{children}</span>
        )}
        {!loading && rightIcon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>
        )}
      </>
    );

    return (
      <button
        ref={ref}
        style={finalStyles}
        disabled={disabled || loading}
        onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => !disabled && !loading && setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onFocus={() => !disabled && !loading && setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Luxury animations
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  if (!document.querySelector('style[data-button-animations]')) {
    styleElement.setAttribute('data-button-animations', 'true');
    document.head.appendChild(styleElement);
  }
}

export default Button;

// Button styles as JavaScript objects instead of Tailwind classes
const buttonStyles: {
  base: React.CSSProperties;
  variants: Record<string, React.CSSProperties>;
  sizes: Record<string, React.CSSProperties>;
  hover: Record<string, React.CSSProperties>;
  active: Record<string, React.CSSProperties>;
  disabled: React.CSSProperties;
  focus: React.CSSProperties;
} = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    whiteSpace: 'nowrap',
    borderRadius: '35px',
    fontSize: '12.8px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'all 0.2s ease',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Century Gothic', 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
  },
    variants: {
    primary: {
      backgroundColor: '#FBC314',
      color: '#111111',
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.15)',
    } as React.CSSProperties,
    default: {
      backgroundColor: '#FBC314',
      color: '#111111',
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.15)',
    } as React.CSSProperties,
    secondary: {
      backgroundColor: 'white',
      color: '#111111',
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.15)',
    } as React.CSSProperties,
    neutral: {
      backgroundColor: 'white',
      color: '#111111',
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.15)',
    } as React.CSSProperties,
    black: {
      backgroundColor: '#111111',
      color: 'white',
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.15)',
    } as React.CSSProperties,
    inverse: {
      backgroundColor: 'white',
      color: '#111111',
      boxShadow: '2px 4px 0 0 rgba(255,255,255,0.3)',
    } as React.CSSProperties,
    outline: {
      backgroundColor: 'transparent',
      color: '#111111',
      border: '2px solid #111111',
    } as React.CSSProperties,
    ghost: {
      backgroundColor: 'transparent',
      color: '#111111',
    } as React.CSSProperties,
    link: {
      backgroundColor: 'transparent',
      color: '#FBC314',
      textDecoration: 'none',
    } as React.CSSProperties,
  },
  sizes: {
    default: {
      height: '48px',
      padding: '15px 24px',
    } as React.CSSProperties,
    sm: {
      height: '40px',
      padding: '12px 20px',
      fontSize: '14px',
    } as React.CSSProperties,
    lg: {
      height: '56px',
      padding: '18px 28px',
      fontSize: '18px',
    } as React.CSSProperties,
    xl: {
      height: '64px',
      padding: '20px 32px',
      fontSize: '20px',
    } as React.CSSProperties,
    icon: {
      height: '48px',
      width: '48px',
      padding: '0',
    } as React.CSSProperties,
    'icon-sm': {
      height: '40px',
      width: '40px',
      padding: '0',
    } as React.CSSProperties,
    'icon-lg': {
      height: '56px',
      width: '56px',
      padding: '0',
    } as React.CSSProperties,
  },
  hover: {
    primary: {
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.25)',
      filter: 'brightness(1.05)',
    } as React.CSSProperties,
    default: {
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.25)',
      filter: 'brightness(1.05)',
    } as React.CSSProperties,
    secondary: {
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.25)',
      backgroundColor: '#f9fafb',
    } as React.CSSProperties,
    neutral: {
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.25)',
      backgroundColor: '#f9fafb',
    } as React.CSSProperties,
    black: {
      boxShadow: '2px 4px 0 0 rgba(0,0,0,0.25)',
      backgroundColor: '#222222',
    } as React.CSSProperties,
    inverse: {
      boxShadow: '2px 4px 0 0 rgba(255,255,255,0.4)',
      backgroundColor: '#f9fafb',
    } as React.CSSProperties,
    outline: {
      backgroundColor: '#111111',
      color: 'white',
    } as React.CSSProperties,
    ghost: {
      backgroundColor: '#f3f4f6',
    } as React.CSSProperties,
    link: {
      textDecoration: 'none',
      filter: 'brightness(1.1)',
    } as React.CSSProperties,
  },
  active: {
    primary: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    default: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    secondary: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    neutral: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    black: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    inverse: {
      boxShadow: '1px 2px 0 0 rgba(255,255,255,0.3)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    outline: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    ghost: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
    link: {
      boxShadow: '1px 2px 0 0 rgba(0,0,0,0.15)',
      transform: 'translateY(2px)',
    } as React.CSSProperties,
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
    cursor: 'not-allowed',
  } as React.CSSProperties,
  focus: {
    outline: '2px solid #FBC314',
    outlineOffset: '2px',
  } as React.CSSProperties,
};

// Helper function to combine styles
const combineStyles = (...styles: React.CSSProperties[]): React.CSSProperties => {
  return styles.reduce((acc, style) => ({ ...acc, ...style }), {});
};

