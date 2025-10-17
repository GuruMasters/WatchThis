import React from 'react';
import { Watermark } from '../ui/Watermark';

type SectionColor = 'yellow' | 'blue' | 'black' | 'orange' | 'white';
type SectionCut = 'top' | 'bottom' | 'both' | 'none';

interface SectionAngleProps {
  color?: SectionColor;
  cut?: SectionCut;
  className?: string;
  container?: boolean;
  paddingClass?: string;
  id?: string;
  children: React.ReactNode;
  watermark?: string; // Text for watermark
  watermarkColor?: 'white' | 'black' | 'yellow';
  extreme?: boolean; // Koristi ekstremne isečke umesto agresivnih
}

const colorToClasses: Record<SectionColor, string> = {
  yellow: 'bg-wt-yellow text-wt-black',
  blue: 'bg-wt-blue text-white',
  black: 'bg-wt-black text-white',
  orange: 'bg-[#DD5E23] text-white', // Primary Orange
  white: 'bg-white text-wt-black',
};

function cutToClasses(cut: SectionCut, aggressive = true, extreme = false): string {
  if (extreme) {
    // Ekstremni iseci za vrlo agresivan Figma stil
    switch (cut) {
      case 'top':
        return 'wt-diagonal-top-extreme';
      case 'bottom':
        return 'wt-diagonal-bottom-extreme';
      case 'both':
        return 'wt-diagonal-both-extreme';
      default:
        return '';
    }
  }

  if (aggressive) {
    // Agresivni iseci za Figma stil
    switch (cut) {
      case 'top':
        return 'wt-diagonal-top-aggressive';
      case 'bottom':
        return 'wt-diagonal-bottom-aggressive';
      case 'both':
        return 'wt-diagonal-both-aggressive';
      default:
        return '';
    }
  }

  // Standardni iseci
  switch (cut) {
    case 'top':
      return 'wt-diagonal-top';
    case 'bottom':
      return 'wt-diagonal-bottom';
    case 'both':
      return 'wt-diagonal-both';
    default:
      return '';
  }
}

/**
 * SectionAngle Component - Reusable angled sections with brand backgrounds
 *
 * Features:
 * - Diagonal cuts (top, bottom, both, none)
 * - 3 levels: standard, aggressive (default), extreme
 * - Brand colors (yellow, blue, black, orange, white)
 * - Optional watermark text
 * - Radial gradient overlay for blue sections
 *
 * @example
 * <SectionAngle
 *   color="yellow"
 *   cut="top"
 *   watermark="SERVICES"
 *   watermarkColor="black"
 * >
 *   <h2>Content here</h2>
 * </SectionAngle>
 *
 * @example
 * // Ekstremni isečak za vrlo agresivan stil
 * <SectionAngle
 *   color="blue"
 *   cut="bottom"
 *   extreme={true}
 * >
 *   <div>Content</div>
 * </SectionAngle>
 */
export const SectionAngle: React.FC<SectionAngleProps> = ({
  color = 'yellow',
  cut = 'top',
  className,
  container = true,
  paddingClass = 'py-16',
  id,
  children,
  watermark,
  watermarkColor = 'white',
  extreme = false,
}) => {
  const bgClasses = colorToClasses[color];
  const diagonalClasses = cutToClasses(cut, true, extreme); // aggressive = true, extreme = extreme

  return (
    <section id={id} className={`relative overflow-hidden ${bgClasses} ${diagonalClasses} ${paddingClass} ${className || ''}`.trim()}>
      {/* Radial gradient overlay for blue sections */}
      {color === 'blue' && (
        <div className="absolute inset-0 bg-wt-hero-radial opacity-100 pointer-events-none" aria-hidden></div>
      )}
      
      {/* Watermark text */}
      {watermark && (
        <Watermark 
          text={watermark} 
          color={watermarkColor} 
          rotation={-10} 
          opacity={0.05} 
        />
      )}
      
      {/* Content */}
      {container ? (
        <div className="container mx-auto px-4 relative z-10">{children}</div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </section>
  );
};

export default SectionAngle;


