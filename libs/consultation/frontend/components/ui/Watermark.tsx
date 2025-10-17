import React from 'react';

interface WatermarkProps {
  text: string;
  color?: 'white' | 'black' | 'yellow';
  rotation?: number; // degrees
  opacity?: number; // 0-1
  className?: string;
}

/**
 * Watermark Component - Large decorative background text
 * Used in hero sections and large content areas
 * 
 * @example
 * <Watermark text="WATCH" color="white" rotation={-10} opacity={0.05} />
 */
export const Watermark: React.FC<WatermarkProps> = ({
  text,
  color = 'white',
  rotation = -10,
  opacity = 0.05,
  className,
}) => {
  const colorClasses = {
    white: 'text-white',
    black: 'text-wt-black',
    yellow: 'text-wt-yellow',
  };

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className || ''}`}
      aria-hidden="true"
    >
      <div
        className={`text-[clamp(8rem,20vw,18rem)] font-black uppercase leading-none select-none ${colorClasses[color]}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          opacity,
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          fontFamily: "'Century Gothic', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Watermark;

