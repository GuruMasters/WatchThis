import React from 'react';

type ScribbleVariant = 'arrow-curve' | 'arrow-down' | 'arrow-right';
type Position = 'tl' | 'tr' | 'bl' | 'br' | 'custom' | 11 | 12 | 21 | 22;

interface ScribbleProps {
  variant?: ScribbleVariant;
  position?: Position;
  className?: string;
  rotateDeg?: number;
  width?: number;
  customStyle?: React.CSSProperties; // Za custom positioning
  top?: string | number; // Direktna pozicija u procentima ili pikselima
  left?: string | number; // Direktna pozicija u procentima ili pikselima
  right?: string | number; // Direktna pozicija u procentima ili pikselima
  bottom?: string | number; // Direktna pozicija u procentima ili pikselima
}

const variantToSrc: Record<NonNullable<ScribbleProps['variant']>, string> = {
  'arrow-curve': '/watchthis/asset-3@4x-1.png',
  'arrow-down': '/watchthis/asset-4@4x-2.png',
  'arrow-right': '/watchthis/asset-5@4x-1.png',
};

const posToStyle: Record<Position, React.CSSProperties> = {
  tl: { top: '5%', left: '5%' },
  tr: { top: '5%', right: '5%' },
  bl: { bottom: '5%', left: '5%' },
  br: { bottom: '5%', right: '5%' },
  custom: {}, // Use customStyle prop
  // Numeric positions: first digit = vertical (1=top, 2=bottom), second digit = horizontal (1=left, 2=right)
  11: { top: '5%', left: '5%' },    // top left
  12: { top: '5%', right: '5%' },   // top right
  21: { bottom: '5%', left: '5%' }, // bottom left
  22: { bottom: '5%', right: '5%' }, // bottom right
};

export const Scribble: React.FC<ScribbleProps> = ({
  variant = 'arrow-curve',
  position = 'br',
  className,
  rotateDeg = 0,
  width = 120,
  customStyle,
  top,
  left,
  right,
  bottom,
}) => {
  const src = variantToSrc[variant];

  // Koristi direktne pozicione parametre ako su dati
  const directPositionStyle: React.CSSProperties = {};
  if (top !== undefined) directPositionStyle.top = typeof top === 'number' ? `${top}%` : top;
  if (left !== undefined) directPositionStyle.left = typeof left === 'number' ? `${left}%` : left;
  if (right !== undefined) directPositionStyle.right = typeof right === 'number' ? `${right}%` : right;
  if (bottom !== undefined) directPositionStyle.bottom = typeof bottom === 'number' ? `${bottom}%` : bottom;

  // Koristi ili direktne pozicije ili predefined pozicije
  const baseStyle = position === 'custom' ? customStyle :
                   (Object.keys(directPositionStyle).length > 0 ? directPositionStyle : posToStyle[position]);

  const style: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    width,
    zIndex: 10,
    ...baseStyle,
    ...(rotateDeg ? { transform: `rotate(${rotateDeg}deg)` } : {}),
  };

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      style={style}
      className={`drop-shadow-lg ${className || ''}`}
      loading="lazy"
      decoding="async"
    />
  );
};

export default Scribble;


