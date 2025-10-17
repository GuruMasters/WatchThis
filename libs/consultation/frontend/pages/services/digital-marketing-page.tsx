import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

/**
 * APPLE REDESIGN - Digital Marketing Service Page
 */

export const DigitalMarketingPage: React.FC = () => {
  const features = [
    {
      title: 'Search Engine Optimization',
      description: 'Improve your visibility on Google and drive organic traffic with proven SEO strategies.'
    },
    {
      title: 'Paid Advertising',
      description: 'Google Ads, Facebook Ads, and LinkedIn campaigns that deliver measurable ROI.'
    },
    {
      title: 'Content Marketing',
      description: 'Engaging content that resonates with your audience and builds brand authority.'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Data-driven insights to optimize your marketing performance and track success.'
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
            SEO & Paid Media
          </h1>
          
          <p style={{
            fontSize: 'clamp(18px, 2vw, 21px)',
            lineHeight: 1.6,
            color: '#6E6E73'
          }}>
            Drive growth through strategic digital marketing. Reach your target audience and convert visitors into customers.
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

      {/* Results */}
      <section style={{
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
            marginBottom: '64px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Average Results
              </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px'
          }}>
            {[
              { value: '150%', label: 'Traffic Increase' },
              { value: '3x', label: 'Lead Generation' },
              { value: '200%', label: 'ROI Growth' }
            ].map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: '56px',
                  fontWeight: 700,
                  color: '#0071E3',
                  marginBottom: '8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '17px',
                  color: '#6E6E73',
                  fontWeight: 500
                }}>
                  {stat.label}
                  </div>
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
            Ready to Grow Your Business?
            </h2>
          
          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '40px'
          }}>
            Let's create a marketing strategy that delivers real results.
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

export default DigitalMarketingPage;
