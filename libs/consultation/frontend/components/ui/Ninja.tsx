import React from 'react';

type NinjaVariant = 'hero' | 'cta' | 'what' | 'who' | 'none';

const variantToSrc: Record<NinjaVariant, string> = {
  hero: '/watchthis/ninja-hero.png',
  cta: '/watchthis/ninja-cta.png',
  what: '/watchthis/ninja-what.png',
  who: '/watchthis/ninja-who.png',
  none: '',
};

interface NinjaProps {
  variant?: NinjaVariant;
  width?: number;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  showGlow?: boolean; // Yellow circle + blue glow
  glowIntensity?: 'soft' | 'medium' | 'strong';
}

/**
 * Ninja Illustration Component with Yellow Circle Background & Blue Glow
 *
 * Matches Figma design with:
 * - Yellow circle background (#FBC314, opacity 0.8)
 * - Adjustable blue glow effect (rgba(0,129,197,0.25-0.6))
 * - Floating animation (animate-wt-float)
 * - Performance optimizations (loading, decoding, sizes)
 *
 * @example
 * <Ninja variant="hero" width={520} loading="eager" fetchPriority="high" />
 * <Ninja variant="cta" width={380} showGlow={true} glowIntensity="strong" />
 * <Ninja variant="what" width={280} />
 * <Ninja variant="who" width={280} />
 */
export const Ninja: React.FC<NinjaProps> = ({
  variant = 'hero',
  width = 520,
  className,
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
  showGlow = true,
  glowIntensity = 'medium',
}) => {
  const src = variantToSrc[variant];
  
  // Don't render if variant is 'none' or src is missing
  if (variant === 'none' || !src) {
    return null;
  }

  // Glow intensity mapping
  const glowOpacity = {
    soft: 0.25,
    medium: 0.4,
    strong: 0.6,
  };

  return (
    <div className={`relative inline-block ${className || ''}`}>
      {/* Yellow Circle Background */}
      {showGlow && (
        <div 
          className="absolute inset-0 bg-wt-yellow rounded-full blur-sm"
          style={{
            width: `${width * 0.85}px`,
            height: `${width * 0.85}px`,
            margin: 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.8,
            zIndex: -1,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Ninja Image with Blue Glow */}
      <img
        src={src}
        width={width}
        height={width} // Assuming square aspect ratio
        alt=""
        aria-hidden
        decoding="async"
        loading={loading}
        fetchPriority={fetchPriority as any}
        sizes={sizes || '(max-width: 1024px) 100vw, 520px'}
        className="relative z-10 animate-wt-float motion-reduce:animate-none"
        style={{
          filter: showGlow 
            ? `drop-shadow(0 0 40px rgba(0, 129, 197, ${glowOpacity[glowIntensity]}))`
            : 'none',
        }}
      />
    </div>
  );
};

export default Ninja;


