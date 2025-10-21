import React, { useState, useEffect } from 'react';

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
  bgGradient?: string;
  content?: React.ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ 
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
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '24px',
      backgroundColor: '#1C1C1E',
      minHeight: 'clamp(500px, 70vh, 700px)'
    }}>
      {/* Main Carousel Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(500px, 70vh, 700px)',
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
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                background: item.bgGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(20px, 5vw, 40px)',
                textAlign: 'center'
              }}
            >
              {/* Image */}
              <div style={{
                width: 'clamp(180px, 40vw, 300px)',
                height: 'clamp(180px, 40vw, 300px)',
                marginBottom: 'clamp(24px, 5vw, 40px)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
                backgroundColor: '#FFFFFF'
              }}>
                <img
                  src={`/watchthis/${item.image}`}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Content */}
              {item.content && (
                <div style={{ marginBottom: 'clamp(16px, 3vw, 24px)' }}>
                  {item.content}
                </div>
              )}

              {/* Title */}
              <h3 style={{
                fontSize: 'clamp(20px, 5vw, 32px)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: 'clamp(12px, 2vw, 16px)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}>
                {item.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 'clamp(14px, 3vw, 16px)',
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '600px',
                lineHeight: 1.6,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
              }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          left: 'clamp(10px, 2vw, 20px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          cursor: isTransitioning ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 10,
          transition: 'all 0.2s ease',
          opacity: isTransitioning ? 0.5 : 1
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={isTransitioning}
        style={{
          position: 'absolute',
          right: 'clamp(10px, 2vw, 20px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(40px, 8vw, 48px)',
          height: 'clamp(40px, 8vw, 48px)',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          cursor: isTransitioning ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 10,
          transition: 'all 0.2s ease',
          opacity: isTransitioning ? 0.5 : 1
        }}
        onMouseEnter={(e) => {
          if (!isTransitioning) {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(20px, 4vw, 32px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(8px, 2vw, 12px)',
        zIndex: 10
      }}>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            disabled={isTransitioning}
            style={{
              width: currentIndex === index ? 'clamp(28px, 6vw, 40px)' : 'clamp(10px, 2vw, 12px)',
              height: 'clamp(10px, 2vw, 12px)',
              borderRadius: 'clamp(5px, 1vw, 6px)',
              backgroundColor: currentIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              cursor: isTransitioning ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: currentIndex === index ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
              opacity: isTransitioning ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isTransitioning && currentIndex !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentIndex !== index) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
