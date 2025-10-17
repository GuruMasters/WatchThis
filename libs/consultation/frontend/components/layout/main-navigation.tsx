import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Menu, X } from 'lucide-react';
import { SparklesIcon } from '../icons';

/**
 * LUXURY PREMIUM NAVIGATION
 * 
 * Ultra-premium design with:
 * - Advanced glass morphism
 * - Gradient borders
 * - Glow effects
 * - Smooth animations
 * - Premium spacing
 */

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export const MainNavigation: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'faq', label: 'FAQ', href: '/faq' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
    <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled 
            ? 'linear-gradient(180deg, rgba(242, 244, 248, 0.98), rgba(234, 236, 242, 0.98))' 
            : 'linear-gradient(180deg, rgba(244, 246, 250, 0.96), rgba(236, 238, 244, 0.96))',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: isScrolled 
            ? '1px solid rgba(0, 113, 227, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.04)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isScrolled 
            ? '0 4px 24px rgba(0, 113, 227, 0.08), 0 2px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
            : '0 2px 8px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 32px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px'
          }}>
            {/* Luxury Logo */}
            <Link 
              to="/" 
      style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                zIndex: 1001,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.filter = 'drop-shadow(0 4px 12px rgba(0, 113, 227, 0.2))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.filter = 'none';
              }}
            >
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <img
                  src="/watchthis/watch-this-logo.svg"
                  alt="WatchThis"
                  style={{
                    height: '40px',
                    width: 'auto',
                    filter: 'drop-shadow(0 2px 8px rgba(0, 113, 227, 0.15))'
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px'
              }}
              className="desktop-nav"
              >
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.href || 
                                  (item.href !== '/' && location.pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: isActive ? '#0071E3' : '#1D1D1F',
                        textDecoration: 'none',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(0, 113, 227, 0.1) 0%, rgba(0, 136, 255, 0.08) 100%)' 
                          : 'transparent',
                        boxShadow: isActive 
                          ? '0 2px 8px rgba(0, 113, 227, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
                          : 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundImage = 'linear-gradient(135deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.02) 100%)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundImage = 'none';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Premium CTA Button */}
              <div style={{ display: 'none' }} className="desktop-nav">
                <Link to="/booking" style={{ textDecoration: 'none' }}>
                  <Button variant="luxury" size="md" rightIcon={<SparklesIcon size={16} strokeWidth={2} />}>
                    Book a Consultation
                  </Button>
            </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: isMobileMenuOpen 
                    ? 'linear-gradient(135deg, rgba(0, 113, 227, 0.15) 0%, rgba(0, 136, 255, 0.1) 100%)' 
                    : 'rgba(0, 0, 0, 0.03)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 1001,
                  boxShadow: isMobileMenuOpen 
                    ? '0 4px 12px rgba(0, 113, 227, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
                    : '0 2px 6px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}
                className="mobile-menu-btn"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} color="#0071E3" strokeWidth={2.5} />
                ) : (
                  <Menu size={24} color="#1D1D1F" strokeWidth={2.5} />
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Luxury Mobile Menu Panel */}
      <div
        style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(0, 113, 227, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isMobileMenuOpen ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 999,
          maxHeight: 'calc(100vh - 72px)',
          overflowY: 'auto',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        className="mobile-menu-panel"
      >
        <div style={{ padding: '32px' }}>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '32px'
          }}>
              {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || 
                              (item.href !== '/' && location.pathname.startsWith(item.href));
              
                return (
                  <Link
                    key={item.id}
                  to={item.href}
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: isActive ? '#0071E3' : '#1D1D1F',
                    textDecoration: 'none',
                    padding: '18px 24px',
                    borderRadius: '14px',
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(0, 113, 227, 0.1) 0%, rgba(0, 136, 255, 0.08) 100%)' 
                      : 'rgba(0, 0, 0, 0.02)',
                    boxShadow: isActive 
                      ? '0 4px 12px rgba(0, 113, 227, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
                      : '0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    display: 'block'
                  }}
                >
                  {item.label}
                  </Link>
                );
              })}
            </nav>

          <Link to="/booking" style={{ textDecoration: 'none', display: 'block' }}>
            <Button variant="luxury" size="lg" fullWidth={true} rightIcon={<SparklesIcon size={18} strokeWidth={2} />}>
              Book a Consultation
            </Button>
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default MainNavigation;
