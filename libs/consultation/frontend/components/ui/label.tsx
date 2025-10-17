import * as React from 'react';

// Label styles as JavaScript objects instead of Tailwind classes
const labelStyles: {
  base: React.CSSProperties;
  disabled: React.CSSProperties;
} = {
  base: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1',
    display: 'inline-block',
  } as React.CSSProperties,
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.7,
  } as React.CSSProperties,
};

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ style, ...props }, ref) => {
    const labelStyle = {
      ...labelStyles.base,
      ...style,
    };

    return (
      <label
        ref={ref}
        style={labelStyle}
        {...props}
      />
    );
  }
);
Label.displayName = 'Label';

export { Label };
