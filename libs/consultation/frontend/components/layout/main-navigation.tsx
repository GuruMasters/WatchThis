import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
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
 * - Dropdown for Services
 */

// Premium SVG Icons for Services
const ServiceIcons = {
  SoftwareDev: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  Design: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
      <path d="M2 2l7.586 7.586"></path>
      <circle cx="11" cy="11" r="2"></circle>
    </svg>
  ),
  Marketing: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  Business: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  Cloud: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  ),
  Consulting: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
  ),
  Data: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  Security: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  )
};

interface ServiceItem {
  id: string;
  label: string;
  href: string;
  icon: React.FC;
}

interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  dropdown?: ServiceItem[];
}

export const MainNavigation: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesItems: ServiceItem[] = [
    { id: 'software-dev', label: 'Software Development', href: '/services/software-development', icon: ServiceIcons.SoftwareDev },
    { id: 'design-branding', label: 'Design & Branding', href: '/services/design-branding', icon: ServiceIcons.Design },
    { id: 'digital-marketing', label: 'Digital Marketing', href: '/services/digital-marketing', icon: ServiceIcons.Marketing },
    { id: 'business-sales', label: 'Business Development & Sales', href: '/services/business-sales', icon: ServiceIcons.Business },
    { id: 'cloud-infrastructure', label: 'Cloud & Infrastructure', href: '/services/cloud-infrastructure', icon: ServiceIcons.Cloud },
    { id: 'consulting-strategy', label: 'Consulting & Strategy', href: '/services/consulting-strategy', icon: ServiceIcons.Consulting },
    { id: 'data-analytics', label: 'Data & Analytics', href: '/services/data-analytics', icon: ServiceIcons.Data },
    { id: 'security-compliance', label: 'Security & Compliance', href: '/services/security-compliance', icon: ServiceIcons.Security }
  ];

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', dropdown: servicesItems },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'privacy', label: 'Privacy & GDPR', href: '/privacy-gdpr' },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownOpen && !(event.target as Element).closest('.services-dropdown-container')) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [servicesDropdownOpen]);

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
          padding: '0 clamp(16px, 4vw, 32px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: 'clamp(64px, 10vw, 72px)'
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
              gap: '12px',
              marginLeft: 'auto'
            }}>
              <div style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px'
              }}
              className="desktop-nav"
              >
                {navigationItems.map((item) => {
                  const isActive = item.href ? (location.pathname === item.href || 
                                  (item.href !== '/' && location.pathname.startsWith(item.href))) : 
                                  location.pathname.startsWith('/services');
                  
                  // Dropdown za Services
                  if (item.dropdown) {
                    return (
                      <div
                        key={item.id}
                        className="services-dropdown-container"
                        style={{ position: 'relative' }}
                      >
                        <button
                          onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                          style={{
                            fontSize: 'clamp(14px, 3.2vw, 16px)',
                            fontWeight: 600,
                            color: isActive ? '#0071E3' : '#1D1D1F',
                            textDecoration: 'none',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            background: isActive || servicesDropdownOpen
                              ? 'linear-gradient(135deg, rgba(0, 113, 227, 0.1) 0%, rgba(0, 136, 255, 0.08) 100%)'
                              : 'transparent',
                            boxShadow: isActive || servicesDropdownOpen
                              ? '0 2px 8px rgba(0, 113, 227, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                              : 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {item.label}
                          <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {servicesDropdownOpen && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            marginTop: '8px',
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(24px)',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                            border: '1px solid rgba(0, 113, 227, 0.1)',
                            minWidth: '260px',
                            overflow: 'hidden',
                            zIndex: 1000
                          }}>
                            {item.dropdown.map((service) => (
                              <Link
                                key={service.id}
                                to={service.href}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  padding: '14px 20px',
                                  textDecoration: 'none',
                                  color: '#1D1D1F',
                                  fontSize: '15px',
                                  fontWeight: 500,
                                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(0, 113, 227, 0.08)';
                                  e.currentTarget.style.paddingLeft = '24px';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.paddingLeft = '20px';
                                }}
                              >
                                <div style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  width: '20px',
                                  height: '20px',
                                  color: '#0071E3'
                                }}>
                                  <service.icon />
                                </div>
                                <span>{service.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  // Obični link za ostale stavke
                  return (
                    <Link
                      key={item.id}
                      to={item.href!}
                      style={{
                        fontSize: 'clamp(14px, 3.2vw, 16px)',
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
              const isActive = item.href ? (location.pathname === item.href || 
                              (item.href !== '/' && location.pathname.startsWith(item.href))) :
                              location.pathname.startsWith('/services');
              
              // Dropdown za Services u mobile meniju
              if (item.dropdown) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      style={{
                        fontSize: 'clamp(16px, 4vw, 20px)',
                        fontWeight: 600,
                        color: isActive ? '#0071E3' : '#1D1D1F',
                        textDecoration: 'none',
                        padding: '18px 24px',
                        borderRadius: '14px',
                        background: isActive || mobileServicesOpen
                          ? 'linear-gradient(135deg, rgba(0, 113, 227, 0.1) 0%, rgba(0, 136, 255, 0.08) 100%)' 
                          : 'rgba(0, 0, 0, 0.02)',
                        boxShadow: isActive || mobileServicesOpen
                          ? '0 4px 12px rgba(0, 113, 227, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
                          : '0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        transition: 'all 0.3s ease',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={20} style={{ transition: 'transform 0.3s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    
                    {/* Submenu */}
                    {mobileServicesOpen && (
                      <div style={{
                        marginTop: '8px',
                        marginLeft: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        {item.dropdown.map((service) => (
                          <Link
                            key={service.id}
                            to={service.href}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '14px 20px',
                              textDecoration: 'none',
                              color: '#1D1D1F',
                              fontSize: 'clamp(14px, 3.5vw, 16px)',
                              fontWeight: 500,
                              background: 'rgba(0, 0, 0, 0.02)',
                              borderRadius: '12px',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              width: '20px',
                              height: '20px',
                              color: '#0071E3'
                            }}>
                              <service.icon />
                            </div>
                            <span>{service.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              // Obični link za ostale stavke
                return (
                  <Link
                    key={item.id}
                  to={item.href!}
                  style={{
                    fontSize: 'clamp(16px, 4vw, 20px)',
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
