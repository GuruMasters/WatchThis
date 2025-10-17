import React from 'react';

interface ShurikenIconProps {
  size?: number;
  filled?: boolean;
  className?: string;
}

/**
 * ShurikenIcon - compact SVG ninja star for ratings and badges
 * - Uses brand gradient (yellow → orange)
 * - Subtle inner hub and soft shadow
 */
const ShurikenIcon: React.FC<ShurikenIconProps> = ({ size = 18, filled = true, className }) => {
  const id = React.useId();
  const gradientId = `shuriken-grad-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBC314" />
          <stop offset="100%" stopColor="#EFAF13" />
        </linearGradient>
        <filter id={`soft-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
          <feOffset dy="0.4" result="offsetBlur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#soft-${id})`} opacity={filled ? 1 : 0.35}>
        {/* Four blades */}
        <g transform="translate(12 12)">
          {[0, 90, 180, 270].map((angle) => (
            <polygon
              key={angle}
              transform={`rotate(${angle}) translate(0 -9)`}
              points="0,0 2.6,6 -0.1,3.6 -2.8,6"
              fill={`url(#${gradientId})`}
            />
          ))}
        </g>
        {/* Inner hub */}
        <circle cx="12" cy="12" r="1.2" fill="#111111" />
      </g>
    </svg>
  );
};

export default ShurikenIcon;


