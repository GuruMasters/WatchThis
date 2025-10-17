import React, { useState, useEffect, useCallback, useRef } from 'react';
 

/**
 * PREMIUM 3D IMAGE CAROUSEL COMPONENT
 *
 * Features:
 * - Advanced 3D perspective with smooth depth transitions
 * - Beautiful floating and rotation animations
 * - Premium glass-morphism effects
 * - Image-only display with no overlays
 * - Smooth cubic-bezier animations
 * - Interactive hover effects with dynamic scaling
 * - Touch/swipe support for mobile
 * - Auto-play capability
 * - Luxury modern design
 * - Fully responsive layout
 */

export interface CarouselItem {
  id: string | number;
  content?: React.ReactNode;
  image: string;
  title?: string;
  description?: string;
  bgGradient?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  infinite?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSlideChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 6000,
  showDots = true,
  showArrows = true,
  infinite = true,
  className = '',
  style = {},
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({
        x: (x / rect.width) * 2 - 1,
        y: (y / rect.height) * 2 - 1,
      });
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('mousemove', handleMouseMove);
      return () => carouselElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;

    let newIndex = index;
    if (infinite) {
      if (index < 0) newIndex = items.length - 1;
      else if (index >= items.length) newIndex = 0;
    } else {
      if (index < 0 || index >= items.length) return;
    }

    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);

    setTimeout(() => setIsTransitioning(false), 800);
  }, [items.length, infinite, isTransitioning, onSlideChange]);

  // Next slide
  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // Previous slide
  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isHovered) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [autoPlay, autoPlayInterval, nextSlide, isHovered]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Rotation state za kontinualnu rotaciju orbite
  const [rotation, setRotation] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    if (!isImageHovered && autoPlay) {
      const rotationInterval = setInterval(() => {
        setRotation((prev) => (prev + 0.15) % 360); // Sporija rotacija
      }, 16); // ~60fps
      return () => clearInterval(rotationInterval);
    }
  }, [isImageHovered, autoPlay]);

  // 3D Ring/Orbit calculations - slike u kružnoj orbiti
  const getSlideTransform = (slideIndex: number) => {
    const totalItems = items.length;
    const angleStep = (2 * Math.PI) / totalItems;
    const baseAngle = slideIndex * angleStep;
    const rotationRad = (rotation * Math.PI) / 180;
    const angle = baseAngle + rotationRad;
    
    // Radius orbite - smanjen za 30%
    const radius = 385; // 550 * 0.7 = 385
    
    // Pozicija na orbiti
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    // Rotacija ka centru - slike gledaju ka centru
    const rotateY = -(angle * 180 / Math.PI) + 90;
    
    // Depth factor - ko je bliže kameri (z > 0) veći je
    const depthFactor = (Math.sin(angle) + 1) / 2; // 0 do 1
    
    // Skaliranje - prednje slike znatno veće
    const scale = 0.6 + (depthFactor * 0.55);
    
    // Vidljivost - zadnje slike prozirnije
    const opacity = 0.3 + (depthFactor * 0.7);

    return {
      transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: Math.round(depthFactor * 100),
    };
  };

  // 3D Ring container sa bogatijim dizajnom - smanjen za 30%
  const carouselContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '1260px', // 1800 * 0.7 = 1260
    margin: '0 auto',
    height: '490px', // 700 * 0.7 = 490
    overflow: 'visible',
    borderRadius: '32px',
    background: `
      radial-gradient(circle at 50% 40%, 
        rgba(100, 200, 255, 0.2) 0%,
        rgba(150, 220, 255, 0.15) 15%,
        rgba(255, 200, 100, 0.12) 35%,
        rgba(180, 160, 255, 0.08) 55%,
        rgba(0, 100, 180, 0.05) 75%,
        transparent 100%),
      linear-gradient(135deg, 
        rgba(100, 200, 255, 0.05) 0%,
        transparent 50%,
        rgba(255, 200, 100, 0.05) 100%)
    `,
    backdropFilter: 'blur(20px)',
    boxShadow: 'inset 0 0 80px rgba(100, 200, 255, 0.1)',
    ...style,
  };

  const slidesContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    perspective: '2000px',
  };

  const slideStyle = (index: number): React.CSSProperties => {
    const baseTransform = getSlideTransform(index);

    return {
      position: 'absolute',
      width: '126px', // 180 * 0.7 = 126
      height: '126px', // 180 * 0.7 = 126
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease, box-shadow 0.3s ease',
      pointerEvents: 'auto', // Omogući hover
      overflow: 'hidden',
      borderRadius: '20px',
      backgroundColor: '#FFFFFF',
      padding: '14px', // 20 * 0.7 = 14
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.9)',
      isolation: 'isolate',
      ...baseTransform,
    };
  };


  const dotsContainerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%) translateZ(30px)',
    display: 'flex',
    gap: '16px',
    zIndex: 20,
  };

  const dotStyle = (isActive: boolean): React.CSSProperties => ({
    width: isActive ? '40px' : '16px',
    height: '16px',
    borderRadius: '8px',
    background: isActive
      ? 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)'
      : 'rgba(255, 255, 255, 0.7)',
    border: isActive ? 'none' : '2px solid rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    boxShadow: isActive
      ? '0 4px 12px rgba(128, 128, 128, 0.5), 0 0 20px rgba(128, 128, 128, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    transform: isActive ? 'translateY(-2px) scale(1.1)' : 'translateY(0) scale(1)',
  });

  const slideImageStyle = (): React.CSSProperties => {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
      borderRadius: '16px',
      display: 'block',
      transition: 'all 0.4s ease',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    };
  };

  return (
    <div
      ref={carouselRef}
      className={`carousel-3d-container ${className}`}
      style={carouselContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Ring Orbit Container */}
      <div style={slidesContainerStyle}>
        {/* Centralna sfera sa BOGATIJEM dizajnom */}
        <div style={{
          position: 'absolute',
          width: '455px', // 650 * 0.7 = 455
          height: '455px',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.5) 0%,
              rgba(100, 200, 255, 0.7) 5%,
              rgba(150, 220, 255, 0.5) 15%,
              rgba(255, 200, 100, 0.4) 30%,
              rgba(180, 160, 255, 0.35) 45%,
              rgba(255, 100, 200, 0.25) 60%,
              rgba(0, 100, 180, 0.2) 75%,
              rgba(100, 255, 200, 0.15) 85%,
              transparent 100%),
            radial-gradient(circle at 70% 70%, 
              rgba(255, 200, 100, 0.4) 0%,
              rgba(255, 150, 200, 0.3) 20%,
              transparent 50%)
          `,
          boxShadow: `
            0 0 200px rgba(100, 200, 255, 0.7),
            0 0 150px rgba(150, 220, 255, 0.6),
            0 0 100px rgba(255, 200, 100, 0.5),
            0 0 80px rgba(180, 160, 255, 0.4),
            0 0 50px rgba(255, 100, 200, 0.4),
            inset 0 0 120px rgba(255, 255, 255, 0.4),
            inset 0 0 80px rgba(100, 200, 255, 0.3),
            inset 0 0 40px rgba(255, 200, 100, 0.2)
          `,
          transform: 'translateZ(-300px)',
          zIndex: -1,
          animation: 'sphereGlow 6s ease-in-out infinite',
        }} />
        
        {/* Unutrašnji prsten */}
        <div style={{
          position: 'absolute',
          width: '630px', // 900 * 0.7 = 630
          height: '630px',
          borderRadius: '50%',
          border: '3px solid rgba(100, 200, 255, 0.3)',
          boxShadow: '0 0 80px rgba(100, 200, 255, 0.5), inset 0 0 80px rgba(100, 200, 255, 0.25), 0 0 40px rgba(255, 200, 100, 0.3)',
          transform: 'translateZ(-200px) rotateX(70deg)',
          zIndex: -2,
          pointerEvents: 'none',
          animation: 'rotateRing 20s linear infinite',
        }} />
        
        {/* Spoljašnji prsten */}
        <div style={{
          position: 'absolute',
          width: '910px', // 1300 * 0.7 = 910
          height: '910px',
          borderRadius: '50%',
          border: '2px solid rgba(100, 200, 255, 0.18)',
          boxShadow: '0 0 60px rgba(100, 200, 255, 0.35), inset 0 0 60px rgba(100, 200, 255, 0.2), 0 0 30px rgba(180, 160, 255, 0.25)',
          transform: 'translateZ(-150px) rotateX(75deg)',
          zIndex: -3,
          pointerEvents: 'none',
          animation: 'rotateRing 30s linear infinite reverse',
        }} />
        
        {/* Svetlosne partikle */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            borderRadius: '50%',
            backgroundColor: i % 3 === 0 ? 'rgba(100, 200, 255, 0.8)' : i % 3 === 1 ? 'rgba(255, 200, 100, 0.8)' : 'rgba(180, 160, 255, 0.8)',
            boxShadow: `0 0 ${15 + (i % 3) * 5}px ${i % 3 === 0 ? 'rgba(100, 200, 255, 1)' : i % 3 === 1 ? 'rgba(255, 200, 100, 1)' : 'rgba(180, 160, 255, 1)'}`,
            left: `${15 + i * 7}%`,
            top: `${25 + (i % 4) * 12}%`,
            animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            zIndex: -1,
          }} />
        ))}
        
        {items.map((item, index) => {
          return (
            <div
              key={item.id}
              className="carousel-slide"
              style={slideStyle(index)}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <img
                src={`/watchthis/${item.image}`}
                  alt={item.title || `Slide ${index + 1}`}
                style={slideImageStyle()}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/watchthis/ninja-hero.png';
                  }}
                />
            </div>
          );
        })}
      </div>

      {/* Strelice uklonjene po zahtjevu */}

      {/* 3D Navigation Dots */}
      {showDots && items.length > 1 && (
        <div style={dotsContainerStyle}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                ...dotStyle(index === currentIndex),
                transform: index === currentIndex
                  ? 'translateY(-2px) translateZ(35px) scale(1.1)'
                  : `translateY(0) translateZ(${Math.abs(index - currentIndex) * 5}px) scale(1)`,
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = `translateY(-1px) translateZ(25px) scale(1.3)`;
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = `translateY(0) translateZ(${Math.abs(index - currentIndex) * 5}px) scale(1)`;
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* 3D Ring Orbit Animations & Effects */}
      <style>
        {`
          /* Glow animation za centralnu sferu - BOGATIJA verzija */
          @keyframes sphereGlow {
            0%, 100% {
              box-shadow: 
                0 0 200px rgba(100, 200, 255, 0.7),
                0 0 150px rgba(150, 220, 255, 0.6),
                0 0 100px rgba(255, 200, 100, 0.5),
                0 0 80px rgba(180, 160, 255, 0.4),
                0 0 50px rgba(255, 100, 200, 0.4),
                inset 0 0 120px rgba(255, 255, 255, 0.4),
                inset 0 0 80px rgba(100, 200, 255, 0.3),
                inset 0 0 40px rgba(255, 200, 100, 0.2);
            }
            25% {
              box-shadow: 
                0 0 250px rgba(255, 200, 100, 0.8),
                0 0 180px rgba(255, 150, 200, 0.7),
                0 0 120px rgba(100, 200, 255, 0.6),
                0 0 90px rgba(150, 220, 255, 0.5),
                0 0 60px rgba(180, 160, 255, 0.5),
                inset 0 0 140px rgba(255, 255, 255, 0.5),
                inset 0 0 90px rgba(255, 200, 100, 0.4),
                inset 0 0 50px rgba(100, 200, 255, 0.3);
            }
            50% {
              box-shadow: 
                0 0 220px rgba(180, 160, 255, 0.75),
                0 0 160px rgba(100, 200, 255, 0.65),
                0 0 110px rgba(255, 100, 200, 0.55),
                0 0 85px rgba(255, 200, 100, 0.45),
                0 0 55px rgba(150, 220, 255, 0.45),
                inset 0 0 130px rgba(255, 255, 255, 0.45),
                inset 0 0 85px rgba(180, 160, 255, 0.35),
                inset 0 0 45px rgba(255, 100, 200, 0.25);
            }
            75% {
              box-shadow: 
                0 0 240px rgba(255, 100, 200, 0.8),
                0 0 170px rgba(180, 160, 255, 0.7),
                0 0 115px rgba(150, 220, 255, 0.6),
                0 0 88px rgba(100, 200, 255, 0.5),
                0 0 58px rgba(255, 200, 100, 0.5),
                inset 0 0 135px rgba(255, 255, 255, 0.48),
                inset 0 0 87px rgba(255, 100, 200, 0.37),
                inset 0 0 47px rgba(180, 160, 255, 0.27);
            }
          }
          
          /* Prsten rotacija */
          @keyframes rotateRing {
            from {
              transform: translateZ(-200px) rotateX(70deg) rotateZ(0deg);
            }
            to {
              transform: translateZ(-200px) rotateX(70deg) rotateZ(360deg);
            }
          }
          
          /* Floating animation za partikle */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) translateX(0px);
              opacity: 0.4;
            }
            25% {
              transform: translateY(-15px) translateX(5px);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-8px) translateX(-5px);
              opacity: 1;
            }
            75% {
              transform: translateY(-20px) translateX(3px);
              opacity: 0.6;
            }
          }

          /* Base carousel container */
          .carousel-3d-container {
            perspective: 2000px;
            perspective-origin: center center;
            transform-style: preserve-3d;
          }

          /* Individual slide styling - glatka tranzicija */
          .carousel-slide {
            transform-style: preserve-3d;
            will-change: transform, opacity;
            isolation: isolate;
            cursor: pointer;
          }

          .carousel-slide:hover {
            transform: scale(1.15) !important;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3), 0 15px 40px rgba(100, 200, 255, 0.2) !important;
            z-index: 1000 !important;
            border-color: rgba(100, 200, 255, 0.6) !important;
          }

          /* Smooth transitions for all carousel elements */
          .carousel-3d-container * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Responsive adjustments - smanjeno za 30% */
          @media (max-width: 1400px) {
            .carousel-3d-container {
              perspective: 1800px;
              max-width: 980px; /* 1400 * 0.7 */
            }
          }

          @media (max-width: 1200px) {
            .carousel-3d-container {
              perspective: 1500px;
              max-width: 840px; /* 1200 * 0.7 */
              height: 420px !important; /* 600 * 0.7 */
            }
          }

          @media (max-width: 768px) {
            .carousel-3d-container {
              perspective: 1200px;
              max-width: 100%;
              height: 350px !important; /* 500 * 0.7 */
            }
          }

          @media (max-width: 480px) {
            .carousel-3d-container {
              perspective: 1000px;
              height: 280px !important; /* 400 * 0.7 */
            }
          }
        `}
      </style>
    </div>
  );
};

// Export named and default
export { Carousel };
export default Carousel;

