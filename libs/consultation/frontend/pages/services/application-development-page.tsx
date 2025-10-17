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
            Web & App Development
          </h1>
          
          <p style={{
            fontSize: 'clamp(18px, 2vw, 21px)',
            lineHeight: 1.6,
            color: '#6E6E73'
          }}>
            Professional software solutions tailored to your business needs. We build scalable, performant applications that drive results.
            </p>
          </div>
      </section>

      {/* Features */}
      <section id="features" style={{
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

      {/* Technologies */}
      <section id="technologies" style={{
        padding: '80px 24px',
        background: '#F5F5F7'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            marginBottom: '48px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Technologies We Use
              </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}>
            {technologies.map((tech, index) => (
              <div key={index} style={{
                padding: '12px 24px',
                background: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '17px',
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
            Ready to Start Your Project?
            </h2>
          
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '40px'
          }}>
            Let's discuss your requirements and build something amazing together.
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

export default ApplicationDevelopmentPage;
