import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Slideshow } from '../../components/ui/slideshow';
import { LaptopIcon, ChartIcon, LightbulbIcon, ShieldIcon, SparklesIcon } from '../../components/icons';

/**
 * COMPLETE APPLE REDESIGN - Homepage
 * 
 * Beautiful, minimal, professional design inspired by Apple
 * 
 * Sections:
 * 1. Hero - Large headline, subheadline, CTA
 * 2. Services Overview - 4 service cards
 * 3. Stats - Clean numbers
 * 4. Features - Why choose us
 * 5. CTA Final - Get started
 */

export const HomePage: React.FC = () => {
  const services = [
    {
      title: 'Web & App Development',
      description: 'Custom software solutions that scale with your business. From concept to deployment.',
      features: ['React & Next.js', 'Mobile Apps', 'API Development', 'Cloud Infrastructure'],
      icon: <LaptopIcon size={56} strokeWidth={1.5} />,
      href: '/services/application-development'
    },
    {
      title: 'SEO & Paid Media',
      description: 'Drive qualified traffic and convert visitors into customers with data-driven strategies.',
      features: ['Search Optimization', 'Google & Social Ads', 'Content Strategy', 'Analytics'],
      icon: <ChartIcon size={56} strokeWidth={1.5} />,
      href: '/services/digital-marketing'
    },
    {
      title: 'Business Consulting',
      description: 'Strategic guidance to help your business grow and succeed in the digital age.',
      features: ['Digital Strategy', 'Process Optimization', 'Technology Advisory', 'Growth Planning'],
      icon: <LightbulbIcon size={56} strokeWidth={1.5} />,
      href: '/services/business-consulting'
    },
    {
      title: 'Support & Maintenance',
      description: 'Keep your systems running smoothly with 24/7 support and proactive monitoring.',
      features: ['24/7 Support', 'Regular Updates', 'Security Monitoring', 'Performance Optimization'],
      icon: <ShieldIcon size={56} strokeWidth={1.5} />,
      href: '/services/support-maintenance'
    }
  ];

  const stats = [
    { value: '200+', label: 'Projects Delivered' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Team Members' }
  ];

  const features = [
    {
      title: 'Expert Team',
      description: 'Work with experienced professionals who are passionate about delivering excellence.'
    },
    {
      title: 'Proven Process',
      description: 'We follow industry best practices and agile methodologies to ensure success.'
    },
    {
      title: 'Long-term Partnership',
      description: "We're committed to your success beyond project delivery with ongoing support."
    },
    {
      title: 'Results-Driven',
      description: 'Every decision is backed by data and focused on achieving measurable results.'
    }
  ];

  const caseStudies = [
    {
      title: 'Custom Software Development',
      impact: 'Development speed +40%',
      summary: 'Built scalable web and mobile applications using React, Node.js, and cloud technologies for modern businesses.',
      slug: 'fintech-platform-modernization'
    },
    {
      title: 'Digital Marketing Success',
      impact: 'Lead generation +150%',
      summary: 'Implemented SEO strategies, Google Ads campaigns, and content marketing to drive qualified traffic and conversions.',
      slug: 'ecommerce-conversion-uplift'
    },
    {
      title: 'Business Development Growth',
      impact: 'Revenue growth +85%',
      summary: 'Developed sales strategies, market expansion plans, and partnership programs to accelerate business growth.',
      slug: 'b2b-saas-growth-engine'
    },
    {
      title: 'Security & Compliance Solutions',
      impact: 'Security incidents -90%',
      summary: 'Implemented comprehensive security measures, GDPR compliance, and data protection protocols for sensitive industries.',
      slug: 'healthcare-patient-portal'
    },
    {
      title: 'Mobile App Development',
      impact: 'User engagement +200%',
      summary: 'Created cross-platform mobile applications with offline capabilities, push notifications, and real-time analytics.',
      slug: 'edtech-mobile-rollout'
    },
    {
      title: 'Cloud Infrastructure Setup',
      impact: 'Operational efficiency +60%',
      summary: 'Migrated to cloud platforms, automated deployments, and implemented monitoring systems for scalable operations.',
      slug: 'logistics-ops-automation'
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      text: 'We align on objectives, risks, and KPIs, then propose a measurable execution plan.'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      text: 'Rapid prototyping and design systems ensure clarity, speed, and consistency.'
    },
    {
      step: '03',
      title: 'Build & Integrate',
      text: 'Engineering with best practices, CI/CD, code review, and robust QA.'
    },
    {
      step: '04',
      title: 'Launch & Grow',
      text: 'Data-driven iteration, performance tuning, and growth experiments at scale.'
    },
  ];

  const capabilities = [
    'Product Strategy',
    'UX/UI Design',
    'Web & Mobile Apps',
    'API & Integrations',
    'Cloud & DevOps',
    'Data & Analytics',
    'SEO & Paid Media',
    'Automation',
  ];

  return (
    <div style={{ 
      backgroundColor: '#FFFFFF',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* ===========================
          HERO SECTION
          =========================== */}
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
            <SparklesIcon size={16} strokeWidth={2} />
            <span>Professional Digital Solutions</span>
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
            Transform Your
            <br />
            <span style={{ 
              background: 'linear-gradient(90deg, #0071E3 0%, #0077ED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Digital Presence
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
            Expert consulting, development, and marketing solutions that help modern businesses thrive in the digital world.
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
                Get Started
              </Button>
            </Link>
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===========================
          CASE STUDIES
          =========================== */}
      <section style={{ padding: 'clamp(50px, 12vw, 100px) clamp(16px, 5vw, 24px)', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 8vw, 56px)' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>Recent Case Studies</h2>
            <p style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', color: '#6E6E73', padding: '0 16px' }}>Selected outcomes from recent engagements</p>
          </div>

          <div className="case-studies-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(16px, 4vw, 24px)' }}>
            {caseStudies.map((cs, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: 'clamp(16px, 4vw, 20px)',
                  padding: 'clamp(20px, 5vw, 28px)',
                  border: '1px solid #E5E7EB',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: 'clamp(17px, 4vw, 20px)', fontWeight: 600, color: '#1D1D1F', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>{cs.title}</h3>
                  <span style={{ fontSize: 'clamp(13px, 3vw, 14px)', fontWeight: 700, color: '#DD5E23' }}>{cs.impact}</span>
                </div>
                <p style={{ fontSize: 'clamp(14px, 3.2vw, 15px)', lineHeight: 1.6, color: '#6E6E73', marginBottom: '12px' }}>{cs.summary}</p>
                <Link
                  to={
                    cs.slug === 'fintech-platform-modernization'
                      ? '/services/software-development'
                      : cs.slug === 'edtech-mobile-rollout'
                      ? '/services/software-development'
                      : cs.slug === 'b2b-saas-growth-engine'
                      ? '/services/business-sales'
                      : cs.slug === 'ecommerce-conversion-uplift'
                      ? '/services/digital-marketing'
                      : cs.slug === 'healthcare-patient-portal'
                      ? '/services/security-compliance'
                      : cs.slug === 'logistics-ops-automation'
                      ? '/services/cloud-infrastructure'
                      : '/services'
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#0081C5',
                    fontSize: 'clamp(13px, 2.8vw, 14px)',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Read more
                  <span style={{ display: 'inline-block', transform: 'translateY(1px)' }}>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          INSIGHTS & THOUGHT LEADERSHIP
          =========================== */}
      <section style={{ padding: 'clamp(50px, 10vw, 80px) clamp(16px, 5vw, 24px)', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 6vw, 40px)' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontWeight: 600,
              color: '#1D1D1F',
              marginBottom: 'clamp(8px, 2vw, 12px)',
              padding: '0 16px'
            }}>Insights & Thought Leadership</h2>
            <p style={{ fontSize: 'clamp(15px, 3.2vw, 16px)', color: '#6E6E73', padding: '0 16px' }}>Latest trends, strategies, and industry insights</p>
          </div>

          <div className="insights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(16px, 4vw, 24px)' }}>
            {[
              {
                title: 'Building Scalable React Applications in 2024',
                excerpt: 'Best practices for component architecture, performance optimization, and maintainable code patterns.',
                category: 'Development',
                readTime: '5 min read',
                featured: true,
                slug: 'building-scalable-react-applications-2024'
              },
              {
                title: 'The ROI of Technical Debt Reduction',
                excerpt: 'How addressing technical debt early can save 3x the development time and improve team productivity.',
                category: 'Strategy',
                readTime: '7 min read',
                featured: false,
                slug: 'roi-of-technical-debt-reduction'
              },
              {
                title: 'From Monolith to Microservices: A Practical Guide',
                excerpt: 'Step-by-step approach to breaking down monolithic applications into scalable, maintainable services.',
                category: 'Architecture',
                readTime: '8 min read',
                featured: false,
                slug: 'monolith-to-microservices-practical-guide'
              },
            ].map((post, i) => (
              <div
                key={i}
                style={{
                  background: post.featured ? 'linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%)' : '#F5F5F7',
                  borderRadius: 'clamp(16px, 4vw, 20px)',
                  padding: 'clamp(18px, 4.5vw, 24px)',
                  border: post.featured ? '2px solid #0081C5' : '1px solid #E5E7EB',
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {post.featured && (
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '4px 8px',
                    backgroundColor: '#0081C5',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: 'clamp(10px, 2.2vw, 11px)',
                    fontWeight: 600
                  }}>Featured</span>
                )}

                <div style={{ marginBottom: '12px' }}>
                  <span style={{
                    fontSize: 'clamp(11px, 2.5vw, 12px)',
                    fontWeight: 600,
                    color: '#0081C5',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>{post.category}</span>
                  <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#9CA3AF', marginLeft: '8px' }}>•</span>
                  <span style={{ fontSize: 'clamp(11px, 2.5vw, 12px)', color: '#9CA3AF', marginLeft: '8px' }}>{post.readTime}</span>
                </div>

                <h3 style={{
                  fontSize: post.featured ? 'clamp(18px, 4vw, 20px)' : 'clamp(16px, 3.5vw, 18px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>{post.title}</h3>

                <p style={{
                  fontSize: 'clamp(13px, 2.8vw, 14px)',
                  lineHeight: 1.6,
                  color: '#6E6E73',
                  marginBottom: '12px'
                }}>{post.excerpt}</p>

                <Link
                  to={
                    post.slug === 'building-scalable-react-applications-2024'
                      ? '/services/application-development#technologies'
                      : post.slug === 'roi-of-technical-debt-reduction'
                      ? '/about'
                      : post.slug === 'monolith-to-microservices-practical-guide'
                      ? '/services/application-development#features'
                      : '/services'
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#0081C5',
                    fontSize: 'clamp(13px, 2.8vw, 14px)',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Read more
                  <span style={{ display: 'inline-block', transform: 'translateY(1px)' }}>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          ENGAGEMENT MODELS
          =========================== */}
      <section style={{ padding: 'clamp(50px, 12vw, 100px) clamp(16px, 5vw, 24px)', background: '#111111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 6vw, 40px)' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: 'clamp(8px, 2vw, 12px)',
              padding: '0 16px'
            }}>Engagement Models</h2>
            <p style={{ fontSize: 'clamp(15px, 3.2vw, 16px)', color: '#A1A1A6', padding: '0 16px' }}>Flexible collaboration to fit your goals</p>
          </div>

          <div className="engagement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(16px, 4vw, 24px)' }}>
            {[
              {
                title: 'Project-Based',
                text: 'Well-defined scope, fixed timelines, and deliverables for clear outcomes.',
              },
              {
                title: 'Dedicated Team',
                text: 'Embedded specialists who work as an extension of your in-house team.',
              },
              {
                title: 'Advisory & Audits',
                text: 'Architecture reviews, performance tuning, and strategic consulting.',
              },
            ].map((card, idx) => (
              <div key={idx} style={{ background: '#1C1C1E', border: '1px solid #2C2C2E', borderRadius: 'clamp(16px, 4vw, 18px)', padding: 'clamp(18px, 4.5vw, 24px)' }}>
                <h3 style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ fontSize: 'clamp(14px, 3.2vw, 15px)', color: '#A1A1A6', lineHeight: 1.6 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          OUR PROCESS
          =========================== */}
      <section style={{ padding: 'clamp(50px, 12vw, 100px) clamp(16px, 5vw, 24px)', background: '#111111', borderTop: '1px solid #2C2C2E', borderBottom: '1px solid #2C2C2E' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 8vw, 56px)' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              background: 'linear-gradient(135deg, #0071E3 0%, #34C759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>Our Process</h2>
            <p style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', color: 'rgba(255, 255, 255, 0.9)', padding: '0 16px', textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>A proven, measurable delivery model</p>
          </div>

          <div className="process-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: 'clamp(16px, 4vw, 20px)'
          }}>
            {processSteps.map((ps, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 'clamp(16px, 4vw, 18px)',
                  padding: 'clamp(18px, 4.5vw, 24px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
                    <span style={{
                      fontSize: 'clamp(14px, 3.2vw, 16px)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.08em',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}>{ps.step}</span>
                    <h3 style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', fontWeight: 600, color: '#FFFFFF', textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}>{ps.title}</h3>
                  </div>
                  <p style={{ fontSize: 'clamp(14px, 3.2vw, 15px)', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>{ps.text}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          CAPABILITIES
          =========================== */}
      <section style={{ padding: 'clamp(50px, 12vw, 100px) clamp(16px, 5vw, 24px)', background: '#F5F5F7' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 8vw, 56px)' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>Capabilities</h2>
            <p style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', color: '#6E6E73', padding: '0 16px' }}>End-to-end services for modern teams</p>
          </div>

          {/* Zanimljiv dizajn sa tekstom */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
            borderRadius: 'clamp(20px, 5vw, 32px)',
            padding: 'clamp(40px, 8vw, 60px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}>
            {/* Dekorativni elementi */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(0, 113, 227, 0.1) 0%, rgba(0, 136, 255, 0.05) 100%)',
              borderRadius: '50%',
              filter: 'blur(40px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, rgba(251, 195, 20, 0.08) 0%, rgba(255, 204, 0, 0.04) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }} />

            {/* Glavni sadržaj */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 48px)' }}>
                <h3 style={{
                  fontSize: 'clamp(24px, 5vw, 36px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: 'clamp(16px, 3vw, 24px)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  From Strategy to Scale
                </h3>
                <p style={{
                  fontSize: 'clamp(16px, 3.5vw, 20px)',
                  color: '#6E6E73',
                  lineHeight: 1.6,
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  We don't just build software—we architect digital experiences that drive business growth. 
                  Our comprehensive approach combines cutting-edge technology with strategic thinking, 
                  delivering solutions that are both technically excellent and commercially viable.
                </p>
              </div>

              {/* Capabilities grid sa zanimljivim dizajnom */}
              <div className="capabilities-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
                gap: 'clamp(16px, 4vw, 24px)',
                marginTop: 'clamp(24px, 6vw, 40px)'
          }}>
            {capabilities.map((cap, index) => (
                  <div key={index} style={{
                    position: 'relative',
                    padding: 'clamp(20px, 4vw, 28px)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 'clamp(12px, 3vw, 16px)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  }}
                  >
                    <div style={{
                      fontSize: 'clamp(14px, 3.2vw, 16px)',
                      fontWeight: 600,
                color: '#1D1D1F',
                      textAlign: 'center',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}>
                      {cap}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          IMAGE CAROUSEL
          =========================== */}
      <section className="slideshow-section" style={{ 
        padding: '80px 24px', 
        background: '#111111',
        minHeight: 'clamp(700px, 100vh, 1000px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              background: 'linear-gradient(135deg, #0071E3 0%, #34C759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Highlights
            </h2>
            <p style={{ fontSize: 'clamp(16px, 3.5vw, 18px)', color: '#A1A1A6' }}>A glimpse into our visual identity</p>
          </div>

          <Slideshow
            items={[
              {
                id: 'ninja-hero',
                image: 'ninja-hero.png',
                title: 'Ninja Hero',
                description: 'Mastering the art of premium development with precision and skill',
                bgGradient: 'linear-gradient(135deg, rgba(251, 195, 20, 0.2) 0%, rgba(0, 113, 227, 0.15) 50%, rgba(29, 29, 31, 0.3) 100%)',
                content: (
                  <div style={{
                    background: 'radial-gradient(circle at center, rgba(251, 195, 20, 0.3) 0%, transparent 60%)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '2px solid rgba(251, 195, 20, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: '#FBC314',
                    fontSize: 'clamp(16px, 3.5vw, 18px)',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    Elite Development Services
                  </div>
                )
              },
              {
                id: 'ninja-cta',
                image: 'ninja-cta.png',
                title: 'Call to Action Ninja',
                description: 'Strategic solutions that drive results and transform businesses',
                bgGradient: 'linear-gradient(135deg, rgba(0, 113, 227, 0.25) 0%, rgba(251, 195, 20, 0.2) 50%, rgba(29, 29, 31, 0.4) 100%)',
                content: (
                  <div style={{
                    background: 'radial-gradient(circle at center, rgba(0, 113, 227, 0.4) 0%, transparent 60%)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '2px solid rgba(0, 113, 227, 0.5)',
                    backdropFilter: 'blur(10px)',
                    color: '#0071E3',
                    fontSize: 'clamp(16px, 3.5vw, 18px)',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    Strategic Business Solutions
                  </div>
                )
              },
              {
                id: 'ninja-what',
                image: 'ninja-what.png',
                title: 'What We Offer',
                description: 'Comprehensive consultation services tailored to your unique needs',
                bgGradient: 'linear-gradient(135deg, rgba(29, 29, 31, 0.4) 0%, rgba(251, 195, 20, 0.2) 50%, rgba(0, 113, 227, 0.2) 100%)',
                content: (
                  <div style={{
                    background: 'radial-gradient(circle at center, rgba(29, 29, 31, 0.6) 0%, transparent 60%)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '2px solid rgba(29, 29, 31, 0.7)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    fontSize: 'clamp(16px, 3.5vw, 18px)',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    Premium Consultation Services
                  </div>
                )
              },
              {
                id: 'ninja-who',
                image: 'ninja-who.png',
                title: 'Who We Are',
                description: 'Expert team of developers and consultants dedicated to excellence',
                bgGradient: 'linear-gradient(135deg, rgba(251, 195, 20, 0.3) 0%, rgba(29, 29, 31, 0.3) 50%, rgba(0, 113, 227, 0.2) 100%)',
                content: (
                  <div style={{
                    background: 'radial-gradient(circle at center, rgba(251, 195, 20, 0.3) 0%, transparent 60%)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '2px solid rgba(251, 195, 20, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: '#FBC314',
                    fontSize: 'clamp(16px, 3.5vw, 18px)',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    Expert Team of Professionals
                  </div>
                )
              },
              {
                id: 'logo-new',
                image: 'logo-new.png',
                title: 'Watch This Excellence',
                description: 'Pioneering innovation and delivering exceptional digital experiences',
                bgGradient: 'linear-gradient(135deg, rgba(0, 113, 227, 0.3) 0%, rgba(29, 29, 31, 0.4) 50%, rgba(251, 195, 20, 0.2) 100%)',
                content: (
                  <div style={{
                    background: 'radial-gradient(circle at center, rgba(0, 113, 227, 0.4) 0%, transparent 60%)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '2px solid rgba(0, 113, 227, 0.5)',
                    backdropFilter: 'blur(10px)',
                    color: '#0071E3',
                    fontSize: 'clamp(16px, 3.5vw, 18px)',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    Award-Winning Innovation
                  </div>
                )
              }
            ]}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* ===========================
          STATS SECTION
          =========================== */}
      <section style={{
        padding: '100px 24px',
        background: '#FFFFFF',
        borderTop: '1px solid #D2D2D7',
        borderBottom: '1px solid #D2D2D7'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: '60px',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: 'clamp(36px, 10vw, 64px)',
                  fontWeight: 700,
                  color: '#0071E3',
                  marginBottom: '8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 'clamp(15px, 3.5vw, 18px)',
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

      {/* ===========================
          WHY CHOOSE US
          =========================== */}
      <section style={{
        padding: '100px 24px',
        background: '#F5F5F7'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Why Choose WatchThis
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: '#6E6E73',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We're committed to delivering excellence in everything we do
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '32px'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: '32px',
                  textAlign: 'center'
                }}
              >
                {/* Checkmark */}
                <div style={{
                  width: 'clamp(48px, 10vw, 56px)',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#0071E3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Check size={28} color="#FFFFFF" strokeWidth={3} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(18px, 4.5vw, 22px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: 'clamp(14px, 3.2vw, 16px)',
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

      {/* Mobile overrides */}
      <style>{`
        @media (max-width: 768px) {
          .slideshow-section { min-height: 60vh !important; padding: 48px 16px !important; }
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

      {/* ===========================
          FINAL CTA
          =========================== */}
      <section style={{
        padding: 'clamp(50px, 12vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        textAlign: 'center'
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
            Ready to Get Started?
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            padding: '0 16px'
          }}>
            Let's discuss how we can help transform your business with our expert services.
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
    </div>
  );
};

export default HomePage;
