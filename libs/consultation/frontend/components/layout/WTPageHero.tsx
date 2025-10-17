import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@consultation-booking/consultation/frontend/components/ui/button';
import { Ninja } from '@consultation-booking/consultation/frontend/components/ui/Ninja';
import Scribble from '@consultation-booking/consultation/frontend/components/ui/Scribble';

type NinjaVariant = 'hero' | 'cta' | 'what' | 'who' | 'none';

interface WTPageHeroProps {
  titleTop?: string;
  titleAccent?: string;
  titleBottom?: string;
  description?: string;
  ninjaVariant?: NinjaVariant;
}

export const WTPageHero: React.FC<WTPageHeroProps> = ({
  titleTop = '',
  titleAccent = '',
  titleBottom = '',
  description,
  ninjaVariant = 'none',
}) => {
  return (
    <section className="relative overflow-hidden bg-wt-blue">
      <div className="absolute inset-0 bg-wt-hero-radial opacity-100" aria-hidden></div>
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-white text-4xl lg:text-6xl font-black leading-tight uppercase">
              {titleTop} {titleAccent && <span className="text-wt-yellow">{titleAccent}</span>}
              {titleBottom && (<><br />{titleBottom}</>)}
            </h1>
            {description && (
              <p className="text-white/90 text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">{description}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg">
                <Link to="/booking">Schedule a Call</Link>
              </Button>
              <Button asChild variant="neutral" size="lg">
                <Link to="/contact">Contact</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            {ninjaVariant !== 'none' && (
              <Ninja variant={(ninjaVariant as any) || 'hero'} width={480} sizes="(max-width: 1024px) 70vw, 480px" loading="eager" fetchPriority="high" />
            )}
            <Scribble variant="arrow-curve" position="br" width={120} />
          </div>
        </div>
        <div className="wt-watermark">
          <img 
            src="/watchthis/bgd-text-hero.png" 
            alt="" 
            aria-hidden 
            className="opacity-10 max-w-none w-[1200px]" 
            style={{ transform: 'rotate(-10deg)' }}
            decoding="async" 
            loading="lazy" 
          />
        </div>
      </div>
    </section>
  );
};

export default WTPageHero;


