import * as React from 'react';

// Input styles as JavaScript objects instead of Tailwind classes
const inputStyles: {
  base: React.CSSProperties;
  variants: Record<string, React.CSSProperties>;
  sizes: Record<string, React.CSSProperties>;
  focus: Record<string, React.CSSProperties>;
  disabled: React.CSSProperties;
  container: React.CSSProperties;
  wrapper: React.CSSProperties;
  icon: React.CSSProperties;
  leftIcon: React.CSSProperties;
  rightIcon: React.CSSProperties;
  helperText: React.CSSProperties;
  errorText: React.CSSProperties;
  helperTextColor: React.CSSProperties;
} = {
  base: {
    display: 'flex',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    padding: '8px 12px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
  },
  variants: {
    default: {
      borderColor: '#d1d5db',
    } as React.CSSProperties,
    error: {
      borderColor: '#fca5a5',
    } as React.CSSProperties,
    success: {
      borderColor: '#86efac',
    } as React.CSSProperties,
    warning: {
      borderColor: '#fde047',
    } as React.CSSProperties,
  },
  sizes: {
    default: {
      height: '40px',
    } as React.CSSProperties,
    sm: {
      height: '32px',
      fontSize: '12px',
      padding: '6px 8px',
    } as React.CSSProperties,
    lg: {
      height: '48px',
      fontSize: '16px',
      padding: '12px 16px',
    } as React.CSSProperties,
    xl: {
      height: '56px',
      fontSize: '18px',
      padding: '16px 20px',
    } as React.CSSProperties,
  },
  focus: {
    default: {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
    } as React.CSSProperties,
    error: {
      outline: '2px solid #ef4444',
      outlineOffset: '2px',
    } as React.CSSProperties,
    success: {
      outline: '2px solid #22c55e',
      outlineOffset: '2px',
    } as React.CSSProperties,
    warning: {
      outline: '2px solid #eab308',
      outlineOffset: '2px',
    } as React.CSSProperties,
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
    backgroundColor: '#f3f4f6',
  } as React.CSSProperties,
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  } as React.CSSProperties,
  wrapper: {
    position: 'relative',
  } as React.CSSProperties,
  icon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    zIndex: 1,
  } as React.CSSProperties,
  leftIcon: {
    left: '12px',
  } as React.CSSProperties,
  rightIcon: {
    right: '12px',
  } as React.CSSProperties,
  helperText: {
    fontSize: '12px',
  } as React.CSSProperties,
  errorText: {
    color: '#dc2626',
  } as React.CSSProperties,
  helperTextColor: {
    color: '#6b7280',
  } as React.CSSProperties,
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: keyof typeof inputStyles.variants;
  size?: keyof typeof inputStyles.sizes;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = 'default',
    size = 'default',
    leftIcon,
    rightIcon,
    error,
    helperText,
    id,
    disabled,
    style,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const inputId = id || React.useId();
    const hasError = error || variant === 'error';

    const baseStyle = inputStyles.base;
    const variantStyle = inputStyles.variants[variant] || inputStyles.variants.default;
    const sizeStyle = inputStyles.sizes[size] || inputStyles.sizes.default;

    const combinedStyle = {
      ...baseStyle,
      ...variantStyle,
      ...sizeStyle,
      ...(disabled ? inputStyles.disabled : {}),
      ...style,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const focusStyle = inputStyles.focus[variant] || inputStyles.focus.default;
      Object.assign(e.currentTarget.style, focusStyle);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Reset to base styles
      Object.assign(e.currentTarget.style, combinedStyle);
      onBlur?.(e);
    };

    const leftIconStyle = {
      ...inputStyles.icon,
      ...inputStyles.leftIcon,
    };

    const rightIconStyle = {
      ...inputStyles.icon,
      ...inputStyles.rightIcon,
    };

    return (
      <div style={inputStyles.container}>
        <div style={inputStyles.wrapper}>
          {leftIcon && (
            <div style={leftIconStyle}>
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            style={{
              ...combinedStyle,
              paddingLeft: leftIcon ? '40px' : combinedStyle.paddingLeft,
              paddingRight: rightIcon ? '40px' : combinedStyle.paddingRight,
            }}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {rightIcon && (
            <div style={rightIconStyle}>
              {rightIcon}
            </div>
          )}
        </div>

        {helperText && (
          <p
            style={{
              ...inputStyles.helperText,
              ...(hasError ? inputStyles.errorText : inputStyles.helperTextColor),
            }}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
