import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

/**
 * APPLE REDESIGN - Support & Maintenance Service Page
 */

export const SupportMaintenancePage: React.FC = () => {
  const features = [
    {
      title: '24/7 Technical Support',
      description: 'Round-the-clock assistance to keep your systems running smoothly.'
    },
    {
      title: 'Regular Updates',
      description: 'Keep your applications up-to-date with the latest features and security patches.'
    },
    {
      title: 'Security Monitoring',
      description: 'Proactive security measures to protect your systems from threats.'
    },
    {
      title: 'Performance Optimization',
      description: 'Continuous improvements to ensure optimal speed and reliability.'
    }
  ];

  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{
        padding: '120px 24px 60px',
        textAlign: 'center',
        borderBottom: '1px solid #D2D2D7'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Support & Maintenance
          </h1>
          
          <p style={{
            fontSize: 'clamp(18px, 2vw, 21px)',
            lineHeight: 1.6,
            color: '#6E6E73'
          }}>
            Keep your systems running smoothly with our comprehensive support services.
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: '80px 24px',
        background: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            textAlign: 'center',
            marginBottom: '64px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            What We Offer
            </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: '#F5F5F7',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid #D2D2D7'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: '#6E6E73'
                }}>
                  {feature.description}
                </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{
        padding: '80px 24px',
        background: '#F5F5F7'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            marginBottom: '32px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Why Choose Our Support?
              </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '48px'
          }}>
            Focus on your business while we handle the technical details. Our support team ensures your technology stack is always secure, up-to-date, and performing at its best.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        background: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Get Peace of Mind
            </h2>
          
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '40px'
          }}>
            Let's discuss how we can support your systems and keep everything running smoothly.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Book Consultation
              </Button>
            </Link>
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <Button variant="ghost" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportMaintenancePage;
