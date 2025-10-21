import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, Palette, Layout, Layers } from 'lucide-react';

/**
 * Design & Branding Service Page
 * Featuring animated color palettes and design elements
 */

// Mac Browser Window Component with Image
const MacBrowserWindow: React.FC<{ imageSrc: string; url: string; imageOpacity?: number }> = ({ imageSrc, url, imageOpacity = 1 }) => (
  <div style={{
    background: '#1E1E1E',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
    width: '100%',
    maxWidth: 'clamp(300px, 90vw, 1100px)',
    margin: '0 auto'
  }}>
    {/* Browser Toolbar */}
    <div style={{
      background: '#2D2D2D',
      padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 2vw, 12px)'
    }}>
      {/* Traffic Lights */}
      <div style={{ display: 'flex', gap: 'clamp(4px, 1vw, 8px)' }}>
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#28C840' }} />
      </div>
      {/* Address Bar */}
      <div style={{
        flex: 1,
        background: '#1E1E1E',
        borderRadius: 'clamp(4px, 1vw, 6px)',
        padding: 'clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)',
        fontSize: 'clamp(10px, 2.5vw, 13px)',
        color: '#999',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {url}
      </div>
    </div>
    {/* Browser Content - Image */}
    <div style={{
      background: '#FFFFFF',
      overflow: 'hidden',
      position: 'relative',
      minHeight: 'clamp(200px, 50vw, 700px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img
        src={imageSrc}
        alt="Design showcase"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          maxHeight: 'clamp(300px, 80vw, 700px)',
          objectFit: 'contain',
          opacity: imageOpacity,
          transition: 'opacity 0.3s ease-in-out',
          backgroundColor: '#FFFFFF'
        }}
      />
    </div>
  </div>
);

const DesignAnimationSection: React.FC = () => {
  const [activeDesign, setActiveDesign] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

  const designs = [
    { id: 0, name: 'Creativity', url: 'creative-design.com', imageSrc: '/watchthis/music player.png' },
    { id: 1, name: 'Elegance', url: 'elegant-style.com', imageSrc: '/watchthis/grooming salon.png' },
    { id: 2, name: 'Luxury', url: 'luxury-living.com', imageSrc: '/watchthis/furniture salon.png' },
    { id: 3, name: 'Academic', url: 'education.edu', imageSrc: '/watchthis/university.png' }
  ];

  const handleDesignChange = (designId: number) => {
    if (designId === activeDesign || isTransitioning) return;
    
    setIsTransitioning(true);
    setImageOpacity(0);
    
    setTimeout(() => {
      setActiveDesign(designId);
      setTimeout(() => {
        setImageOpacity(1);
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  return (
    <section style={{
      padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
      background: 'linear-gradient(180deg, #1D1D1F 0%, #0a0a0f 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(52,199,89,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,199,89,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.4
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(175,82,222,0.1)',
            border: '1px solid rgba(175,82,222,0.3)',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '24px'
          }}>
            <Palette size={16} color="#AF52DE" />
            <span style={{
              color: '#AF52DE',
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              DESIGN SHOWCASE
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(36px, 8vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Beautiful Designs
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #AF52DE 0%, #FF6482 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              We Create
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(15px, 3.5vw, 20px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Explore our portfolio of stunning web designs
          </p>
        </div>

        {/* Mac Browser Window */}
        <div className="design-browser-wrap" style={{
          maxWidth: 'clamp(300px, 90vw, 1100px)',
          margin: '0 auto',
          padding: '0 clamp(8px, 2vw, 16px)',
          transform: 'scale(0.95)',
          transition: 'transform 0.3s ease'
        }}>
          <MacBrowserWindow
            url={designs[activeDesign].url}
            imageSrc={designs[activeDesign].imageSrc}
            imageOpacity={imageOpacity}
          />
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 16px)',
          marginTop: 'clamp(32px, 8vw, 48px)',
          flexWrap: 'wrap',
          padding: '0 clamp(8px, 2vw, 16px)'
        }}>
          {designs.map((design) => (
            <button
              key={design.id}
              onClick={() => handleDesignChange(design.id)}
              disabled={isTransitioning}
              style={{
                padding: 'clamp(10px, 2.5vw, 14px) clamp(20px, 5vw, 32px)',
                borderRadius: 'clamp(8px, 2vw, 12px)',
                background: activeDesign === design.id 
                  ? 'linear-gradient(135deg, #AF52DE 0%, #FF6482 100%)' 
                  : 'rgba(255,255,255,0.05)',
                color: '#FFF',
                fontSize: 'clamp(12px, 2.8vw, 16px)',
                fontWeight: 600,
                cursor: isTransitioning ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeDesign === design.id 
                  ? '0 8px 24px rgba(175,82,222,0.4)' 
                  : 'none',
                transform: activeDesign === design.id ? 'translateY(-2px)' : 'translateY(0)',
                border: activeDesign === design.id 
                  ? 'none' 
                  : '1px solid rgba(255,255,255,0.1)',
                opacity: isTransitioning ? 0.6 : 1,
                minWidth: 'clamp(100px, 20vw, 140px)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeDesign !== design.id && !isTransitioning) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeDesign !== design.id) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {design.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DesignBrandingPage: React.FC = () => {
  const designServices = [
    {
      icon: Palette,
      title: 'Branding & Visual Identity',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #C084FC 100%)',
      summary: 'Logo, color palette, typography, brand identity guidelines.',
      description: 'We create complete visual identities for your brand that reflect your story, values, and target audience. Our process begins with detailed analysis of your brand, competition, and market to develop a unique and recognizable visual system that builds lasting connections with your customers. We ensure every element works together harmoniously to create a cohesive brand experience across all touchpoints.',
      highlights: ['Logo Design', 'Color Systems', 'Typography', 'Brand Guidelines']
    },
    {
      icon: Layout,
      title: 'Graphic Design',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
      summary: 'Brochures, flyers, posters, packaging, digital banners.',
      description: 'We specialize in creating professional brochures that effectively communicate your messages and values. From concept to final product, we take care of every detail - from typography and element layout to paper selection and finishing touches that make your materials stand out. Our designs ensure your brand message is delivered with maximum impact and visual appeal.',
      highlights: ['Brochure Design', 'Poster Creation', 'Packaging Solutions', 'Digital Assets']
    },
    {
      icon: Check,
      title: 'Motion & Video Design',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 50%, #EA580C 100%)',
      summary: 'Animations, advertisements, intro sequences and video editing.',
      description: 'We create dynamic animations that bring your brand to life and make it memorable. From simple logo animations to complex explainer videos, our motion design combines creativity with technical precision to deliver engaging visual stories that captivate your audience and strengthen brand recall.',
      highlights: ['Logo Animation', 'Video Production', 'Motion Graphics', 'Post-Production']
    },
    {
      icon: Layers,
      title: '3D & Product Visualization',
      color: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
      summary: '3D models and renders for presentations and advertising.',
      description: 'We create detailed 3D models of your products that allow customers to experience them from all angles and perspectives. Our 3D visualization combines technical precision with aesthetic appeal to showcase your products in the best possible light, helping customers make informed purchasing decisions.',
      highlights: ['3D Modeling', 'Photorealistic Renders', 'Interactive Presentations', 'Technical Visualization']
    }
  ];

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      maxWidth: '100vw',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      <style>{animations}</style>
      {/* Hero */}
      <section style={{
        padding: 'clamp(60px, 15vw, 140px) clamp(16px, 5vw, 24px) clamp(50px, 12vw, 100px)',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
            backgroundColor: '#F5F5F7',
            borderRadius: '100px',
            marginBottom: 'clamp(20px, 5vw, 32px)',
            fontSize: 'clamp(12px, 3vw, 14px)',
            fontWeight: 500,
            color: '#0071E3'
          }}>
            <Palette size={16} strokeWidth={2} />
            <span>Professional Design Services</span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 80px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#1D1D1F',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Design & Branding
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Excellence
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 24px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            maxWidth: '700px',
            margin: '0 auto',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            fontWeight: 400,
            padding: '0 16px'
          }}>
            Everything related to visual identity and user experience design that transforms your brand into a memorable digital presence.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 16px'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
              >
                Start Your Design
              </Button>
            </Link>
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Design Animation */}
      <DesignAnimationSection />

      {/* Design Services Overview */}
      <section style={{
        padding: 'clamp(60px, 12vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#F5F5F7',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '700',
              lineHeight: 1.1,
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Our Services
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Comprehensive design solutions for every creative challenge
            </p>
          </div>

          {/* Services Elegant Grid */}
          <div className="design-services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(16px, 4vw, 24px)',
            padding: '0 clamp(8px, 2vw, 16px)'
          }}>
            {designServices.map((service, i) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: 'clamp(24px, 4vw, 32px)',
                    border: `3px solid ${service.color}20`,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `serviceCardFadeIn 0.8s ease-out ${i * 0.12}s backwards`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                    e.currentTarget.style.boxShadow = `0 24px 60px ${service.color}30`;
                    e.currentTarget.style.borderColor = service.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = `${service.color}20`;
                  }}
                >
                  {/* Animated Background */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${service.color}05, transparent, ${service.color}03)`,
                    opacity: 0.8,
                    animation: `cardShimmer 3s ease-in-out infinite ${i * 0.5}s`
                  }} />

                  {/* Service Number Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    boxShadow: `0 6px 18px ${service.color}50`,
                    animation: `badgeFloat 2s ease-in-out infinite ${i * 0.3}s`
                  }}>
                    {i + 1}
                  </div>

                  {/* Icon Container */}
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: `0 12px 32px ${service.color}25`,
                    transition: 'all 0.4s ease',
                    animation: `iconGlow 2s ease-in-out infinite alternate ${i * 0.4}s`
                  }}>
                    <ServiceIcon size={32} color="#FFFFFF" />
                  </div>

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 style={{
                      fontSize: 'clamp(18px, 3.2vw, 24px)',
                      fontWeight: '700',
                      color: '#1D1D1F',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                      letterSpacing: '-0.01em'
                    }}>
                      {service.title}
                    </h3>

                    <p style={{
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      color: service.color,
                      fontWeight: '500',
                      marginBottom: '10px',
                      opacity: 0.9,
                      lineHeight: 1.4
                    }}>
                      {service.summary}
                    </p>

                    <p style={{
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.5,
                      marginBottom: '12px',
                      fontWeight: '400'
                    }}>
                      {service.description}
                    </p>

                    {/* Service Highlights */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      {service.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            background: `linear-gradient(135deg, ${service.color}06, ${service.color}03)`,
                            borderRadius: '8px',
                            border: `1px solid ${service.color}12`,
                            transition: 'all 0.3s ease',
                            animation: `highlightSlide 0.6s ease-out ${i * 0.1 + idx * 0.1}s backwards`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${service.color}10, ${service.color}05)`;
                            e.currentTarget.style.transform = 'translateX(3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `linear-gradient(135deg, ${service.color}06, ${service.color}03)`;
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div style={{
                            width: '3px',
                            height: '3px',
                            borderRadius: '50%',
                            background: service.color,
                            flexShrink: 0,
                            animation: `dotPulse 1.5s ease-in-out infinite ${i * 0.2 + idx * 0.2}s`
                          }} />
                          <span style={{
                            fontSize: 'clamp(10px, 1.8vw, 12px)',
                            color: service.color,
                            fontWeight: '500',
                            lineHeight: 1.3
                          }}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Bar */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '4px',
                    background: service.gradient,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease'
                  }}
                  className="hover-bar"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '700',
              lineHeight: 1.1,
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Why Choose Us
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Experience excellence in design with our proven track record and client-focused approach
            </p>
          </div>

          {/* Modern Horizontal Showcase */}
          <div style={{
            position: 'relative',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {/* Ultra Wavy Central Line */}
            <svg
              style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
                width: '150px',
                height: '100%',
              transform: 'translateX(-50%)',
                zIndex: 1
              }}
              viewBox="0 0 150 500"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="ultraWavyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0071E3" />
                  <stop offset="15%" stopColor="#10B981" />
                  <stop offset="30%" stopColor="#8B5CF6" />
                  <stop offset="45%" stopColor="#F59E0B" />
                  <stop offset="60%" stopColor="#EF4444" />
                  <stop offset="75%" stopColor="#EC4899" />
                  <stop offset="90%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0071E3" />
                </linearGradient>
              </defs>

              {/* Main ultra-wavy central line with more curves */}
              <path
                d="M 75 0 Q 30 40 75 80 Q 120 120 75 160 Q 30 200 75 240 Q 120 280 75 320 Q 30 360 75 400 Q 120 440 75 480 Q 60 500 75 500"
                stroke="url(#ultraWavyGradient)"
                strokeWidth="4"
                strokeDasharray="800"
                strokeDashoffset="0"
                fill="none"
                style={{
                  animation: 'wavyFlow 6s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 15px rgba(0,113,227,0.5))'
                }}
              />
            </svg>

            {/* Feature Items */}
            <div className="why-features-list" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '80px',
              position: 'relative',
              zIndex: 2
            }}>
              {[
                {
                  title: 'User-Centered Approach',
                  subtitle: 'Human-First Design Philosophy',
                  description: 'Every design decision starts with understanding your users. We conduct thorough research to create experiences that truly resonate with your audience.',
                  stats: '95%',
                  statsLabel: 'User Satisfaction',
                  color: '#0071E3',
                  icon: Palette,
                  gradient: 'linear-gradient(135deg, #0071E3 0%, #0051B3 100%)',
                  side: 'left'
                },
                {
                  title: 'Modern Design Trends',
                  subtitle: 'Cutting-Edge Innovation',
                  description: 'We stay ahead of the curve, implementing the latest design trends and technologies to keep your brand relevant and competitive.',
                  stats: '150+',
                  statsLabel: 'Projects Delivered',
                  color: '#10B981',
                  icon: Layers,
                  gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  side: 'right'
                },
                {
                  title: 'Brand Consistency',
                  subtitle: 'Cohesive Visual Identity',
                  description: 'From logo to landing pages, we ensure every touchpoint reflects your brand personality and maintains visual consistency across all platforms.',
                  stats: '100%',
                  statsLabel: 'Brand Compliance',
                  color: '#8B5CF6',
                  icon: Check,
                  gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  side: 'left'
                },
                {
                  title: 'Fast Iterations',
                  subtitle: 'Agile Development Process',
                  description: 'Quick turnaround times with regular feedback loops ensure your project stays on track and meets your evolving requirements.',
                  stats: '<48h',
                  statsLabel: 'Average Response',
                  color: '#F59E0B',
                  icon: ArrowRight,
                  gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  side: 'right'
                }
              ].map((feature, i) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={i}
                    className="why-feature-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: feature.side === 'left' ? 'flex-start' : 'flex-end',
                      animation: `timelineItem 0.8s ease-out ${i * 0.2}s backwards`
                    }}
                  >
                    {/* Timeline Node */}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      boxShadow: `0 8px 24px ${feature.color}40`,
                      position: 'relative',
                      zIndex: 3,
                      animation: `nodePulse 2s ease-in-out infinite ${i * 0.5}s`
                    }}>
                      {i + 1}
                    </div>

                    {/* Content Card */}
                    <div className="feature-content-card" style={{
                      width: '500px',
                      marginLeft: feature.side === 'left' ? '40px' : '0',
                      marginRight: feature.side === 'right' ? '40px' : '0',
                      background: 'rgba(255,255,255,0.95)',
                      borderRadius: '20px',
                      padding: '28px',
                      border: `2px solid ${feature.color}15`,
                      backdropFilter: 'blur(15px)',
                      boxShadow: `0 12px 40px ${feature.color}10`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 20px 50px ${feature.color}20`;
                      e.currentTarget.style.borderColor = feature.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = `0 12px 40px ${feature.color}10`;
                      e.currentTarget.style.borderColor = `${feature.color}15`;
                    }}
                    >
                      {/* Background Pattern */}
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '100px',
                        height: '100px',
                        background: `radial-gradient(circle, ${feature.color}08, transparent)`,
                        borderRadius: '50%',
                        transform: 'translate(30px, -30px)',
                        opacity: 0.6
                      }} />

                      {/* Stats Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: feature.gradient,
                        color: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '700',
                        boxShadow: `0 4px 12px ${feature.color}30`,
                        animation: `statsFloat 2s ease-in-out infinite ${i * 0.3}s`
                      }}>
                        {feature.stats}
                      </div>

                      {/* Icon */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}8)`,
                        border: `2px solid ${feature.color}25`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        boxShadow: `0 6px 18px ${feature.color}15`,
                        animation: `iconFloat 2s ease-in-out infinite ${i * 0.4}s`
                      }}>
                        <FeatureIcon size={22} color={feature.color} />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 style={{
                          fontSize: 'clamp(20px, 3.5vw, 24px)',
                          fontWeight: '700',
                          color: '#1D1D1F',
                          marginBottom: '8px',
                          lineHeight: 1.3
                        }}>
                          {feature.title}
                        </h3>

                        <p style={{
                          fontSize: 'clamp(12px, 2.2vw, 14px)',
                          color: feature.color,
                          fontWeight: '600',
                          marginBottom: '14px',
                          opacity: 0.9
                        }}>
                          {feature.subtitle}
                        </p>

                        <p style={{
                          fontSize: 'clamp(14px, 2.6vw, 16px)',
                          color: '#6E6E73',
                          lineHeight: 1.6,
                          marginBottom: '18px'
                        }}>
                          {feature.description}
                        </p>

                        {/* Stats */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: `${feature.color}08`,
                          borderRadius: '10px',
                          border: `1px solid ${feature.color}15`
                        }}>
                          <span style={{
                            fontSize: '11px',
                            color: feature.color,
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {feature.statsLabel}
                          </span>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '800',
                            color: feature.color
                          }}>
                            {feature.stats}
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect Bar */}
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '3px',
                        background: feature.gradient,
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease'
                      }}
                      className="hover-bar"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              width: '40px',
              height: '40px',
              background: 'radial-gradient(circle, rgba(0,113,227,0.2), transparent)',
              borderRadius: '50%',
              animation: 'floatElement 8s ease-in-out infinite'
            }} />

            <div style={{
              position: 'absolute',
              bottom: '20%',
              right: '20%',
              width: '50px',
              height: '50px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.2), transparent)',
              borderRadius: '50%',
              animation: 'floatElement 10s ease-in-out infinite reverse'
            }} />

            <div style={{
              position: 'absolute',
              top: '50%',
              right: '10%',
              width: '35px',
              height: '35px',
              background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent)',
              borderRadius: '50%',
              animation: 'floatElement 12s ease-in-out infinite'
            }} />
          </div>
        </div>
      </section>


      {/* Our Process */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '700',
              lineHeight: 1.1,
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Our Process
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Professional approach that delivers exceptional results
            </p>
          </div>

          {/* Ultra Compact Horizontal Process */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 clamp(8px, 2vw, 16px)'
          }}>
            {/* Single Horizontal Line */}
            <div style={{
              height: '6px',
              background: 'linear-gradient(90deg, #0071E3 0%, #10B981 20%, #8B5CF6 40%, #F59E0B 60%, #EF4444 80%, #06B6D4 100%)',
              borderRadius: '3px',
              margin: '40px 0',
              animation: 'timelinePulse 2s ease-in-out infinite',
              boxShadow: '0 2px 8px rgba(0,113,227,0.3)'
            }} />

            {/* Process Steps - Horizontal Layout */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 'clamp(20px, 4vw, 40px)',
              flexWrap: 'wrap'
          }}>
            {[
              {
                  step: 1,
                  title: 'Research',
                  subtitle: 'Market analysis & user research',
                color: '#0071E3',
                  description: 'Comprehensive business and audience analysis to understand requirements and opportunities.'
              },
              {
                  step: 2,
                  title: 'Strategy',
                  subtitle: 'Planning & concept development',
                color: '#10B981',
                  description: 'Strategic planning and innovative concept development using design thinking methodologies.'
              },
              {
                  step: 3,
                  title: 'Design',
                  subtitle: 'Visual design & prototyping',
                color: '#8B5CF6',
                  description: 'Creative visual design with interactive prototypes and user experience optimization.'
              },
              {
                  step: 4,
                  title: 'Refine',
                  subtitle: 'Testing & iteration',
                color: '#F59E0B',
                  description: 'User testing, feedback integration, and iterative refinement for optimal results.'
              },
              {
                  step: 5,
                  title: 'Deliver',
                  subtitle: 'Implementation & support',
                color: '#EF4444',
                  description: 'Final deliverables, developer handovers, and ongoing design system maintenance.'
                }
            ].map((process, i) => (
              <div
                key={i}
                style={{
                    flex: '1',
                    minWidth: '160px',
                    textAlign: 'center',
                    animation: `processStep 0.6s ease-out ${i * 0.15}s backwards`
                  }}
                >
                  {/* Step Circle on Line */}
                <div style={{
                    width: '40px',
                    height: '40px',
                  borderRadius: '50%',
                    background: `linear-gradient(135deg, ${process.color}, ${process.color}80)`,
                    border: `4px solid #FFFFFF`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                    fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                    boxShadow: `0 4px 12px ${process.color}40`,
                    margin: '-20px auto 16px',
                    animation: `nodePulse 2s ease-in-out infinite ${i * 0.4}s`,
                    position: 'relative',
                    zIndex: 2
                }}>
                  {process.step}
                </div>

                  {/* Content Card */}
                <div style={{
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '12px',
                    padding: '20px 16px',
                    border: `2px solid ${process.color}20`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: `0 4px 16px ${process.color}10`,
                    transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${process.color}20`;
                    e.currentTarget.style.borderColor = process.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 16px ${process.color}10`;
                    e.currentTarget.style.borderColor = `${process.color}20`;
                }}
              >
                    {/* Background Pattern */}
                <div style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '60px',
                      height: '60px',
                      background: `radial-gradient(circle, ${process.color}08, transparent)`,
                      borderRadius: '50%',
                      transform: 'translate(20px, -20px)',
                      opacity: 0.5
                    }} />

                    {/* Title & Subtitle */}
                  <div style={{
        position: 'relative',
                      zIndex: 1
                }}>
                  <h3 style={{
                        fontSize: 'clamp(14px, 2.5vw, 18px)',
              fontWeight: '700',
              color: '#1D1D1F',
                        marginBottom: '4px',
                        lineHeight: 1.2
                  }}>
                    {process.title}
                  </h3>
            <p style={{
                        fontSize: 'clamp(10px, 1.8vw, 12px)',
                        color: process.color,
                        fontWeight: '500',
                        opacity: 0.9,
                        marginBottom: '8px',
                        lineHeight: 1.3
                      }}>
                        {process.subtitle}
                      </p>
                  <p style={{
                        fontSize: 'clamp(9px, 1.6vw, 11px)',
                    color: '#6E6E73',
                        lineHeight: 1.4,
                        fontWeight: '400'
                  }}>
                        {process.description}
                  </p>
                    </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Tools & Technologies */}
      <section style={{
        padding: 'clamp(60px, 12vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '700',
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Tools & Technologies
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Industry-leading tools we master for exceptional results
            </p>
          </div>

          {/* Tools & Technologies - Logo Grid */}
          <div className="tools-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(20px, 4vw, 40px)',
            padding: '0 clamp(12px, 2vw, 20px)',
            maxWidth: '1280px',
              margin: '0 auto'
          }}>
            {[
              {
                name: 'Figma',
                sources: [
                  'https://cdn.simpleicons.org/figma/FFFFFF',
                  '/watchthis/tools/figma-white.png',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/240px-Figma-logo.svg.png'
                ]
              },
              {
                name: 'Adobe XD',
                sources: [
                  'https://cdn.simpleicons.org/adobexd/FFFFFF',
                  '/watchthis/tools/adobexd-white.png',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/240px-Adobe_XD_CC_icon.svg.png'
                ]
              },
              {
                name: 'Sketch',
                sources: [
                  'https://cdn.simpleicons.org/sketch/FFFFFF',
                  '/watchthis/tools/sketch-white.png',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sketch_Logo.svg/240px-Sketch_Logo.svg.png'
                ]
              },
              {
                name: 'Photoshop',
                sources: [
                  'https://cdn.simpleicons.org/adobephotoshop/FFFFFF',
                  '/watchthis/tools/photoshop-white.png',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/240px-Adobe_Photoshop_CC_icon.svg.png'
                ]
              },
              {
                name: 'Illustrator',
                sources: [
                  'https://cdn.simpleicons.org/adobeillustrator/FFFFFF',
                  '/watchthis/tools/illustrator-white.png',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/240px-Adobe_Illustrator_CC_icon.svg.png'
                ]
              },
              {
                name: 'After Effects',
                sources: [
                  'https://cdn.simpleicons.org/adobeaftereffects/FFFFFF',
                  '/watchthis/tools/aftereffects-white.png',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/240px-Adobe_After_Effects_CC_icon.svg.png'
                ]
              },
              {
                name: 'Blender',
                sources: [
                  'https://cdn.simpleicons.org/blender/FFFFFF',
                  '/watchthis/tools/blender-white.png',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Blender_logo_no_text.svg/240px-Blender_logo_no_text.svg.png'
                ]
              }
            ].map((tool, i) => {
              return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'clamp(12px, 3vw, 20px)',
                  animation: `toolReveal 0.8s ease-out ${i * 0.1}s backwards`,
                  cursor: 'default'
                }}
              >
                {/* Tile */}
                <div
                  style={{
                    width: 'clamp(80px, 15vw, 140px)',
                    height: 'clamp(80px, 15vw, 140px)',
                    borderRadius: '22px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 18px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px) scale(1.04)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 28px 80px rgba(0,0,0,0.65), 0 0 40px rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.22)';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 18px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.14)';
                  }}
                >
                  {/* Shine */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.09), transparent 60%)',
                      pointerEvents: 'none',
                      animation: 'logoShine 5s ease-in-out infinite'
                    }}
                  />

                  {/* Logo */}
                  <img
                    src={tool.sources[0]}
                    alt={`${tool.name} logo`}
                    loading="lazy"
                    style={{
                      width: (tool as any).scale ? `${(tool as any).scale * 100}%` : '74%',
                      height: (tool as any).scale ? `${(tool as any).scale * 100}%` : '74%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.45))',
                      transition: 'transform 0.25s ease, filter 0.25s ease',
                      display: 'block'
                    }}
                    data-source-index="0"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)';
                      (e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 14px 34px rgba(0,0,0,0.6))';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 10px 28px rgba(0,0,0,0.45))';
                    }}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      const idx = parseInt(img.dataset.sourceIndex || '0', 10);
                      const nextIdx = idx + 1;
                      // @ts-ignore
                      const list = (tool as any).sources as string[];
                      if (nextIdx < list.length) {
                        img.dataset.sourceIndex = String(nextIdx);
                        img.src = list[nextIdx];
                        return;
                      }
                      img.style.display = 'none';
                      const fallback = img.nextElementSibling as HTMLDivElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback badge */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                      color: 'rgba(255,255,255,0.95)',
                      fontWeight: 800,
                      fontSize: '22px'
                    }}
                  >
                    {tool.name[0]}
                  </div>
                </div>

                {/* Label */}
                <span style={{
                  fontSize: 'clamp(12px, 2.2vw, 16px)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  textAlign: 'center'
                }}>
                  {tool.name}
                </span>
                </div>
            );
            })}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        textAlign: 'center',
        background: '#F5F5F7'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 6vw, 56px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1D1D1F',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            padding: '0 16px'
          }}>
            Ready to Create Amazing Designs?
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            padding: '0 16px'
          }}>
            Let's design something beautiful together and transform your brand into a memorable digital experience.
          </p>

          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 16px'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight size={22} />}
              >
                Book Consultation
              </Button>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .design-browser-wrap { transform: scale(1) !important; padding: 0 12px !important; }
          .design-services-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .why-features-list { gap: 40px !important; }
          .why-feature-item { justify-content: center !important; }
          .feature-content-card { width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; padding: 20px !important; }
          .tools-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .design-browser-wrap img { max-height: 50vh !important; }
          .case-studies-grid,
          .insights-grid,
          .engagement-grid,
          .process-grid,
          .capabilities-grid,
          .features-grid,
          .stats-grid { gap: 16px !important; }
          .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </div>
  );
};

// Enhanced Animations
const animations = `
  @keyframes serviceCardFadeIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes processStep {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes portfolioCard {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes toolCard {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes teamCard {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes miniPulse {
    0%, 100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @keyframes serviceCardReveal {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes featureCardReveal {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes floatingCard {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.8) rotate(-2deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0deg);
    }
  }

  @keyframes cardGlow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.02);
    }
  }

  @keyframes badgeFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-2px) rotate(1deg);
    }
    75% {
      transform: translateY(2px) rotate(-1deg);
    }
  }

  @keyframes iconPulse {
    0%, 100% {
      transform: scale(1);
      boxShadow: 0 8px 20px currentColor;
    }
    50% {
      transform: scale(1.05);
      boxShadow: 0 12px 28px currentColor;
    }
  }

  @keyframes backgroundFloat {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    33% {
      transform: translateY(-10px) scale(1.02);
    }
    66% {
      transform: translateY(10px) scale(0.98);
    }
  }

  @keyframes lineFlow {
    0% {
      strokeDashoffset: 0;
    }
    100% {
      strokeDashoffset: 20;
    }
  }

  @keyframes centralFloat {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-15px) scale(1.1);
      opacity: 0.8;
    }
  }

  @keyframes hubPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      boxShadow: 0 20px 60px rgba(0,113,227,0.3);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      boxShadow: 0 30px 80px rgba(0,113,227,0.5);
    }
  }

  @keyframes hexCardFloat {
    from {
      opacity: 0;
      transform: translateY(60px) scale(0.8) rotate(var(--angle, 0deg));
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(var(--angle, 0deg));
    }
  }

  @keyframes hexCardGlow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.02);
    }
  }

  @keyframes badgeRotate {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(2deg);
    }
    75% {
      transform: rotate(-2deg);
    }
  }

  @keyframes iconRotate {
    0%, 100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(5deg);
    }
  }

  @keyframes hubLine {
    0%, 100% {
      opacity: 0.6;
      strokeWidth: 3;
    }
    50% {
      opacity: 1;
      strokeWidth: 4;
    }
  }

  @keyframes orbitalRotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes orbitalDot {
    from {
      transform: rotate(0deg) translateX(150px) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(150px) rotate(-360deg);
    }
  }

  @keyframes zigzagStep {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes zigzagCard {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes stepPulse {
    0%, 100% {
      transform: scale(1);
      boxShadow: 0 8px 24px currentColor;
    }
    50% {
      transform: scale(1.1);
      boxShadow: 0 12px 32px currentColor;
    }
  }

  @keyframes statsFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  @keyframes iconBounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  @keyframes zigzagFlow {
    0% {
      strokeDashoffset: 0;
    }
    100% {
      strokeDashoffset: 12;
    }
  }

  @keyframes floatBubble {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-20px) scale(1.1);
      opacity: 0.8;
    }
  }

  @keyframes cornerCardFloat {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes cornerStatsFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  @keyframes cornerIconPulse {
    0%, 100% {
      transform: scale(1);
      boxShadow: 0 8px 20px currentColor;
    }
    50% {
      transform: scale(1.05);
      boxShadow: 0 12px 28px currentColor;
    }
  }

  @keyframes centralHubPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      boxShadow: 0 15px 40px rgba(0,113,227,0.3);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      boxShadow: 0 25px 60px rgba(0,113,227,0.5);
    }
  }

  @keyframes cornerLineFlow {
    0%, 100% {
      opacity: 0.6;
      strokeWidth: 2;
    }
    50% {
      opacity: 1;
      strokeWidth: 3;
    }
  }

  @keyframes modernCardReveal {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes modernStatsFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  @keyframes modernIconPulse {
    0%, 100% {
      transform: scale(1);
      boxShadow: 0 8px 20px currentColor;
    }
    50% {
      transform: scale(1.05);
      boxShadow: 0 12px 28px currentColor;
    }
  }

  @keyframes timelineItem {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes nodePulse {
    0%, 100% {
      transform: scale(1);
      boxShadow: 0 8px 24px currentColor;
    }
    50% {
      transform: scale(1.1);
      boxShadow: 0 12px 32px currentColor;
    }
  }

  @keyframes wavyFlow {
    0%, 100% {
      opacity: 0.8;
      strokeDasharray: 800;
      strokeDashoffset: 0;
    }
    50% {
      opacity: 1;
      strokeDasharray: 800;
      strokeDashoffset: 200;
    }
  }

  @keyframes timelinePulse {
    0%, 100% {
      opacity: 0.8;
      transform: scaleY(1);
    }
    50% {
      opacity: 1;
      transform: scaleY(1.02);
    }
  }

  @keyframes nodePulse {
    0%, 100% {
      transform: scale(1);
      boxShadow: 0 8px 24px currentColor;
    }
    50% {
      transform: scale(1.1);
      boxShadow: 0 12px 32px currentColor;
    }
  }

  @keyframes detailFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes cardShimmer {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }

  @keyframes badgeFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-2px) rotate(1deg);
    }
    75% {
      transform: translateY(2px) rotate(-1deg);
    }
  }

  @keyframes iconGlow {
    0% {
      box-shadow: 0 12px 32px currentColor;
    }
    100% {
      box-shadow: 0 16px 40px currentColor;
    }
  }

  @keyframes highlightSlide {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes dotPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }

  @keyframes iconFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  @keyframes gridShift {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 60px 60px;
    }
  }

  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) scale(1.2);
      opacity: 0.6;
    }
    75% {
      transform: translateY(10px) scale(0.8);
      opacity: 0.4;
    }
  }

  @keyframes toolReveal {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes icon3D {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
      box-shadow: 0 12px 32px currentColor;
    }
    25% {
      transform: rotateX(5deg) rotateY(5deg);
      box-shadow: 0 16px 40px currentColor;
    }
    50% {
      transform: rotateX(-5deg) rotateY(-5deg);
      box-shadow: 0 20px 48px currentColor;
    }
    75% {
      transform: rotateX(3deg) rotateY(-3deg);
      box-shadow: 0 14px 36px currentColor;
    }
    100% {
      transform: rotateX(0deg) rotateY(0deg);
      box-shadow: 0 12px 32px currentColor;
    }
  }

  @keyframes backgroundPulse {
    0%, 100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  @keyframes geometricFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-30px) rotate(90deg) scale(1.2);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-15px) rotate(180deg) scale(0.8);
      opacity: 0.4;
    }
    75% {
      transform: translateY(-45px) rotate(270deg) scale(1.1);
      opacity: 0.7;
    }
  }

  @keyframes toolFloat {
    0%, 100% {
      transform: translateY(0) rotateX(0deg);
    }
    25% {
      transform: translateY(-10px) rotateX(2deg);
    }
    50% {
      transform: translateY(-5px) rotateX(-1deg);
    }
    75% {
      transform: translateY(-15px) rotateX(1deg);
    }
  }

  @keyframes sphereRotate {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }

  @keyframes ringPulse {
    0%, 100% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  @keyframes toolCardReveal {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes glowPulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.2);
    }
  }

  @keyframes floatElement {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-15px) scale(1.1);
      opacity: 0.8;
    }
  }

  @keyframes logoShine {
    0% { transform: translate(0,0) rotate(0deg); opacity: 0.6; }
    50% { transform: translate(10%,10%) rotate(8deg); opacity: 1; }
    100% { transform: translate(0,0) rotate(0deg); opacity: 0.6; }
  }
`;

export default DesignBrandingPage;

