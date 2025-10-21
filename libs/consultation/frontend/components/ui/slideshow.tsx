import React, { useState, useEffect } from 'react';

interface SlideshowItem {
  id: string;
  image: string;
  title: string;
  description: string;
  bgGradient?: string;
  content?: React.ReactNode;
}

interface SlideshowProps {
  items: SlideshowItem[];
  autoPlayInterval?: number;
}

export const Slideshow: React.FC<SlideshowProps> = ({ 
  items, 
  autoPlayInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  return (
    <div style={{
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#000000',
      aspectRatio: '16/9',
      maxHeight: 'clamp(300px, 50vw, 800px)',
      minHeight: 'clamp(200px, 40vw, 400px)',
      borderRadius: '0',
      boxShadow: `
        inset 0 0 120px rgba(0, 0, 0, 0.6),
        inset 0 0 80px rgba(0, 0, 0, 0.4),
        inset 0 0 50px rgba(0, 0, 0, 0.3),
        inset 0 0 30px rgba(0, 0, 0, 0.2),
        inset 0 0 15px rgba(0, 0, 0, 0.1),
        inset 0 0 8px rgba(0, 0, 0, 0.05),
        0 0 100px rgba(0, 0, 0, 0.5),
        0 0 60px rgba(0, 0, 0, 0.3),
        0 0 30px rgba(0, 0, 0, 0.2),
        0 0 15px rgba(0, 0, 0, 0.1),
        0 0 8px rgba(0, 0, 0, 0.05),
        0 0 4px rgba(0, 0, 0, 0.03),
        0 12px 40px rgba(0, 0, 0, 0.25),
        0 8px 25px rgba(0, 0, 0, 0.15),
        0 4px 12px rgba(0, 0, 0, 0.1),
        0 2px 6px rgba(0, 0, 0, 0.08),
        0 1px 3px rgba(0, 0, 0, 0.05)
      `
    }}>
      {/* Main Slideshow Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Slides */}
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + items.length) % items.length;
          const isNext = index === (currentIndex + 1) % items.length;

          let transform = 'translateX(100%)';
          let opacity = 0;
          let zIndex = 0;

          if (isActive) {
            transform = 'translateX(0)';
            opacity = 1;
            zIndex = 2;
          } else if (isPrev) {
            transform = 'translateX(-100%)';
            opacity = 0;
            zIndex = 1;
          } else if (isNext) {
            transform = 'translateX(100%)';
            opacity = 0;
            zIndex = 1;
          }

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform,
                opacity,
                zIndex,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0'
              }}
            >
              {/* Image Container with 16:9 aspect ratio */}
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={`/watchthis/${item.image}`}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                {/* Premium fade overlay po rubovima */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 0.3) 90%, rgba(0, 0, 0, 0.6) 100%),
                    linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 40%, transparent 60%, rgba(0, 0, 0, 0.3) 100%),
                    linear-gradient(45deg, rgba(0, 0, 0, 0.2) 0%, transparent 35%, transparent 65%, rgba(0, 0, 0, 0.2) 100%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                
                {/* Dodatni soft fade za ekstra eleganciju */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.4) 0%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.4) 100%),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.3) 100%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 2,
                  opacity: 0.6
                }} />
                
                {/* Ekstra fade layer za maksimalnu eleganciju */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    radial-gradient(ellipse 120% 80% at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.05) 85%, rgba(0, 0, 0, 0.3) 100%),
                    linear-gradient(225deg, rgba(0, 0, 0, 0.3) 0%, transparent 45%, transparent 55%, rgba(0, 0, 0, 0.3) 100%),
                    linear-gradient(315deg, rgba(0, 0, 0, 0.25) 0%, transparent 40%, transparent 60%, rgba(0, 0, 0, 0.25) 100%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 3,
                  opacity: 0.7
                }} />
                
                {/* Finalni ultra-soft fade */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.5) 100%),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 35%, transparent 65%, rgba(0, 0, 0, 0.4) 100%),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.2) 100%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 4,
                  opacity: 0.5
                }} />
                
                {/* Mega fade layer za ekstremnu eleganciju */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    radial-gradient(ellipse 150% 100% at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.05) 80%, rgba(0, 0, 0, 0.3) 100%),
                    linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 40%, transparent 60%, rgba(0, 0, 0, 0.2) 100%),
                    linear-gradient(270deg, rgba(0, 0, 0, 0.18) 0%, transparent 35%, transparent 65%, rgba(0, 0, 0, 0.18) 100%),
                    linear-gradient(60deg, rgba(0, 0, 0, 0.12) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.12) 100%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 5,
                  opacity: 0.9
                }} />
                
                {/* Ultra mega fade za maksimalnu dubinu */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.5) 100%),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.4) 100%),
                    linear-gradient(120deg, rgba(0, 0, 0, 0.2) 0%, transparent 15%, transparent 85%, rgba(0, 0, 0, 0.2) 100%),
                    linear-gradient(300deg, rgba(0, 0, 0, 0.15) 0%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.15) 100%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 6,
                  opacity: 0.7
                }} />
                
                {/* Finalni ekstremni fade */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `
                    radial-gradient(circle at 20% 20%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 20% 80%, rgba(0, 0, 0, 0.2) 0%, transparent 40%),
                    radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.2) 0%, transparent 40%),
                    linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.1) 100%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 7,
                  opacity: 0.8
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Apple Style */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          left: 'clamp(12px, 3vw, 24px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(36px, 7vw, 48px)',
          height: 'clamp(36px, 7vw, 48px)',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          cursor: isTransitioning ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(20px)',
          zIndex: 10,
          transition: 'all 0.3s ease',
          opacity: isTransitioning ? 0.3 : 1,
          touchAction: 'manipulation'
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          right: 'clamp(12px, 3vw, 24px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(36px, 7vw, 48px)',
          height: 'clamp(36px, 7vw, 48px)',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          cursor: isTransitioning ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(20px)',
          zIndex: 10,
          transition: 'all 0.3s ease',
          opacity: isTransitioning ? 0.3 : 1,
          touchAction: 'manipulation'
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots Navigation - Apple Style */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(20px, 4vw, 40px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(6px, 1.5vw, 10px)',
        zIndex: 10
      }}>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            disabled={isTransitioning}
            style={{
              width: 'clamp(10px, 2.5vw, 14px)',
              height: 'clamp(10px, 2.5vw, 14px)',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
              border: 'none',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isTransitioning ? 0.5 : 1,
              transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
              touchAction: 'manipulation'
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning && currentIndex !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
