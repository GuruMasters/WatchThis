import React, { useEffect, useState } from 'react';

interface CustomLoaderProps {
  message?: string;
  subMessage?: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ 
  message = 'Loading', 
  subMessage = 'Please wait...' 
}) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 50%, #FFFFFF 100%)',
      zIndex: 99999,
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      {/* Subtle animated grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        animation: 'gridMove 20s linear infinite'
      }} />

      {/* Animated background orbs */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(0,113,227,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(100,100,100,0.03) 0%, transparent 50%)',
        animation: 'pulseBackground 8s ease-in-out infinite'
      }} />

      {/* Floating orbs - subtle light colors */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            borderRadius: '50%',
            background: i % 3 === 0 
              ? 'radial-gradient(circle, rgba(0,113,227,0.05) 0%, transparent 70%)'
              : i % 3 === 1
              ? 'radial-gradient(circle, rgba(150,150,150,0.04) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(100,100,100,0.03) 0%, transparent 70%)',
            animation: `float${i % 6} ${10 + i * 2}s ease-in-out infinite`,
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
            filter: 'blur(60px)',
            opacity: 0.6
          }}
        />
      ))}

      {/* Main loader container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px'
      }}>
        {/* Elegant spinning logo */}
        <div style={{
          position: 'relative',
          width: '160px',
          height: '160px'
        }}>
          {/* Outer rotating ring - light gray */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'rgba(0,0,0,0.15)',
            borderRightColor: 'rgba(0,0,0,0.15)',
            animation: 'spin 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }} />

          {/* Middle rotating ring - blue accent */}
          <div style={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'rgba(0,113,227,0.4)',
            borderLeftColor: 'rgba(0,113,227,0.4)',
            animation: 'spin 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse'
          }} />

          {/* Inner rotating ring - subtle */}
          <div style={{
            position: 'absolute',
            inset: '24px',
            borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTopColor: 'rgba(0,0,0,0.08)',
            borderBottomColor: 'rgba(0,0,0,0.08)',
            animation: 'spin 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }} />

          {/* Center pulsing orb - white with subtle shadow */}
          <div style={{
            position: 'absolute',
            inset: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,113,227,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
            animation: 'pulse 2.5s ease-in-out infinite',
            border: '1px solid rgba(0,0,0,0.06)'
          }}>
            {/* Inner highlight */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
              animation: 'pulse 2s ease-in-out infinite reverse'
            }} />
            
            {/* Center dot accent */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)',
              boxShadow: '0 2px 8px rgba(0,113,227,0.4)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
          </div>

          {/* Orbiting particles - minimal and elegant */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: i % 2 === 0 ? 'rgba(0,113,227,0.6)' : 'rgba(100,100,100,0.4)',
                boxShadow: i % 2 === 0 ? '0 0 8px rgba(0,113,227,0.3)' : '0 0 6px rgba(100,100,100,0.2)',
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 60}deg) translate(90px)`,
                animation: `orbit ${4 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Loading text - elegant and minimal */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#1D1D1F',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            letterSpacing: '-0.02em'
          }}>
            {message}{dots}
          </h2>

          <p style={{
            fontSize: '15px',
            color: 'rgba(0,0,0,0.5)',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '0.3px',
            fontWeight: 400
          }}>
            {subMessage}
          </p>

          {/* Progress bar - light and elegant */}
          <div style={{
            width: '280px',
            height: '3px',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: '100px',
            overflow: 'hidden',
            position: 'relative',
            marginTop: '20px',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
          }}>
            {/* Progress fill */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0071E3 0%, #0088FF 100%)',
              borderRadius: '100px',
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 0 12px rgba(0,113,227,0.3)'
            }} />

            {/* Shimmer effect */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              animation: 'shimmer 2.5s infinite',
              borderRadius: '100px'
            }} />
          </div>

          {/* Progress percentage - subtle */}
          <div style={{
            fontSize: '13px',
            color: 'rgba(0,0,0,0.4)',
            fontWeight: 500,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            letterSpacing: '0.5px'
          }}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading indicators - minimal dots */}
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: i % 2 === 0 ? 'rgba(0,113,227,0.6)' : 'rgba(100,100,100,0.4)',
                animation: 'bounce 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
                boxShadow: i % 2 === 0 ? '0 0 8px rgba(0,113,227,0.2)' : '0 0 6px rgba(100,100,100,0.1)'
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px); }
          to { transform: rotate(360deg) translateX(100px); }
        }

        @keyframes bounce {
          0%, 80%, 100% { 
            transform: translateY(0) scale(1);
          }
          40% { 
            transform: translateY(-12px) scale(1.2);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulseBackground {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.2); }
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.3); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 20px) scale(1.1); }
        }

        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -40px) scale(1.25); }
        }

        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -20px) scale(1.15); }
        }

        @keyframes float5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 30px) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default CustomLoader;

