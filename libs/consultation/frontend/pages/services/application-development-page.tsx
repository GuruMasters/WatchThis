import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

/**
 * APPLE REDESIGN - Application Development Service Page
 * Clean, minimal design with white background
 */

export const ApplicationDevelopmentPage: React.FC = () => {
  const features = [
    {
      title: 'Custom Web Applications',
      description: 'Scalable web apps built with modern technologies like React, Node.js, and cloud infrastructure.'
    },
    {
      title: 'Mobile Development',
      description: 'Native iOS and Android apps, or cross-platform solutions with React Native and Flutter.'
    },
    {
      title: 'API Development',
      description: 'RESTful and GraphQL APIs designed for performance, security, and scalability.'
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Deploy and manage your applications on AWS, Azure, or Google Cloud with confidence.'
    }
  ];

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'
  ];

  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{
        padding: 'clamp(60px, 15vw, 120px) clamp(16px, 5vw, 24px) clamp(40px, 8vw, 60px)',
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
            Web & App Development
          </h1>
          
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 21px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            padding: '0 16px'
          }}>
            Professional software solutions tailored to your business needs. We build scalable, performant applications that drive results.
            </p>
          </div>
      </section>

      {/* Features */}
      <section id="features" style={{
        padding: 'clamp(50px, 10vw, 80px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 64px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            padding: '0 16px'
          }}>
            What We Offer
          </h2>

          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(20px, 4vw, 32px)'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: '#F5F5F7',
                borderRadius: 'clamp(12px, 3vw, 18px)',
                padding: 'clamp(20px, 5vw, 32px)',
                border: '1px solid #D2D2D7'
              }}>
                <h3 style={{
                  fontSize: 'clamp(18px, 4.5vw, 24px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 3.2vw, 17px)',
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

      {/* Technologies */}
      <section id="technologies" style={{
        padding: 'clamp(50px, 10vw, 80px) clamp(16px, 5vw, 24px)',
        background: '#F5F5F7'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            padding: '0 16px'
          }}>
            Technologies We Use
              </h2>

          <div className="tech-badges" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center'
          }}>
            {technologies.map((tech, index) => (
              <div key={index} style={{
                padding: 'clamp(10px, 2.5vw, 12px) clamp(16px, 4vw, 24px)',
                background: '#FFFFFF',
                borderRadius: '8px',
                fontSize: 'clamp(14px, 3.2vw, 17px)',
                color: '#1D1D1F',
                fontWeight: 500,
                border: '1px solid #D2D2D7'
              }}>
                {tech}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(50px, 10vw, 80px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            padding: '0 16px'
          }}>
            Ready to Start Your Project?
            </h2>
          
          <p style={{
            fontSize: 'clamp(15px, 3.5vw, 18px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 40px)',
            padding: '0 16px'
          }}>
            Let's discuss your requirements and build something amazing together.
          </p>

          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 16px'
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

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          /* Features grid - single column on mobile */
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          /* Tech badges - better wrapping */
          .tech-badges {
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplicationDevelopmentPage;
