import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Carousel } from '../../components/ui/carousel';
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
      title: 'Fintech Platform Modernization',
      impact: 'Time-to-market -35%',
      summary: 'Re-architected legacy monolith into cloud-native services with improved security and speed.',
      slug: 'fintech-platform-modernization'
    },
    {
      title: 'E-commerce Conversion Uplift',
      impact: 'Conversion rate +28%',
      summary: 'Introduced A/B testing, performance optimizations, and a streamlined checkout experience.',
      slug: 'ecommerce-conversion-uplift'
    },
    {
      title: 'B2B SaaS Growth Engine',
      impact: 'Qualified leads +210%',
      summary: 'Implemented content strategy, SEO, and product-led growth loops to scale acquisition.',
      slug: 'b2b-saas-growth-engine'
    },
    {
      title: 'Healthcare Patient Portal',
      impact: 'Support tickets -42%',
      summary: 'Accessible design, performance audit, and API hardening reduced friction and raised satisfaction.',
      slug: 'healthcare-patient-portal'
    },
    {
      title: 'EdTech Mobile Rollout',
      impact: 'DAU +120%',
      summary: 'Cross-platform app with offline-first content and analytics pipelines for cohort tracking.',
      slug: 'edtech-mobile-rollout'
    },
    {
      title: 'Logistics Ops Automation',
      impact: 'Operational cost -18%',
      summary: 'Workflow automation, dashboards, and alerting reduced manual processes across dispatch teams.',
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
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* ===========================
          HERO SECTION
          =========================== */}
      <section style={{
        padding: '140px 24px 100px',
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
            padding: '8px 16px',
            backgroundColor: '#F5F5F7',
            borderRadius: '100px',
            marginBottom: '32px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#0071E3'
          }}>
            <SparklesIcon size={16} strokeWidth={2} />
            <span>Professional Digital Solutions</span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1D1D1F',
            marginBottom: '24px',
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
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            maxWidth: '700px',
            margin: '0 auto 48px',
            fontWeight: 400
          }}>
            Expert consulting, development, and marketing solutions that help modern businesses thrive in the digital world.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
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
      <section style={{ padding: '100px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>Recent Case Studies</h2>
            <p style={{ fontSize: '18px', color: '#6E6E73' }}>Selected outcomes from recent engagements</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {caseStudies.map((cs, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: '20px',
                  padding: '28px',
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>{cs.title}</h3>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#DD5E23' }}>{cs.impact}</span>
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#6E6E73', marginBottom: '12px' }}>{cs.summary}</p>
                <Link
                  to={
                    cs.slug === 'fintech-platform-modernization'
                      ? '/services/application-development#features'
                      : cs.slug === 'edtech-mobile-rollout'
                      ? '/services/application-development#technologies'
                      : cs.slug === 'b2b-saas-growth-engine'
                      ? '/services/digital-marketing'
                      : cs.slug === 'ecommerce-conversion-uplift'
                      ? '/services/digital-marketing'
                      : cs.slug === 'healthcare-patient-portal'
                      ? '/services/support-maintenance'
                      : cs.slug === 'logistics-ops-automation'
                      ? '/services/support-maintenance'
                      : '/services'
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#0081C5',
                    fontSize: '14px',
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
      <section style={{ padding: '80px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              color: '#1D1D1F',
              marginBottom: '12px'
            }}>Insights & Thought Leadership</h2>
            <p style={{ fontSize: '16px', color: '#6E6E73' }}>Latest trends, strategies, and industry insights</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
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
                  borderRadius: '20px',
                  padding: '24px',
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
                    fontSize: '11px',
                    fontWeight: 600
                  }}>Featured</span>
                )}

                <div style={{ marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0081C5',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>{post.category}</span>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', marginLeft: '8px' }}>•</span>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', marginLeft: '8px' }}>{post.readTime}</span>
                </div>

                <h3 style={{
                  fontSize: post.featured ? '20px' : '18px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>{post.title}</h3>

                <p style={{
                  fontSize: '14px',
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
                    fontSize: '14px',
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
      <section style={{ padding: '100px 24px', background: '#F5F5F7' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              color: '#1D1D1F',
              marginBottom: '12px'
            }}>Engagement Models</h2>
            <p style={{ fontSize: '16px', color: '#6E6E73' }}>Flexible collaboration to fit your goals</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '8px' }}>{card.title}</h3>
                <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.6 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          OUR PROCESS
          =========================== */}
      <section style={{ padding: '100px 24px', background: '#F5F5F7', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>Our Process</h2>
            <p style={{ fontSize: '18px', color: '#6E6E73' }}>A proven, measurable delivery model</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {processSteps.map((ps, index) => (
              <div key={index} style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '24px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0081C5',
                    letterSpacing: '0.08em'
                  }}>{ps.step}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>{ps.title}</h3>
                </div>
                <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.6 }}>{ps.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          CAPABILITIES
          =========================== */}
      <section style={{ padding: '100px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>Capabilities</h2>
            <p style={{ fontSize: '18px', color: '#6E6E73' }}>End-to-end services for modern teams</p>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {capabilities.map((cap, index) => (
              <span key={index} style={{
                padding: '12px 16px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #F5F5F7 0%, #E8E8ED 100%)',
                color: '#1D1D1F',
                fontSize: '14px',
                border: '1px solid #E5E7EB'
              }}>{cap}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          IMAGE CAROUSEL
          =========================== */}
      <section style={{ padding: '80px 24px', background: '#F5F5F7' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '12px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Highlights
            </h2>
            <p style={{ fontSize: '18px', color: '#6E6E73' }}>A glimpse into our visual identity</p>
          </div>

          <Carousel
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
                    fontSize: '16px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    🥷 Elite Development Services
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
                    fontSize: '16px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    🚀 Strategic Business Solutions
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
                    color: '#1D1D1F',
                    fontSize: '16px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(255, 255, 255, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    💼 Premium Consultation Services
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
                    fontSize: '16px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    👥 Expert Team of Professionals
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
                    fontSize: '16px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(15px)',
                  }}>
                    🏆 Award-Winning Innovation
                  </div>
                )
              }
            ]}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
            infinite={true}
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '60px',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: '64px',
                  fontWeight: 700,
                  color: '#0071E3',
                  marginBottom: '8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '18px',
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
              fontSize: '20px',
              lineHeight: 1.6,
              color: '#6E6E73',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We're committed to delivering excellence in everything we do
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
                  width: '56px',
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
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '16px',
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

      {/* ===========================
          FINAL CTA
          =========================== */}
      <section style={{
        padding: '100px 24px',
        background: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Ready to Get Started?
          </h2>

          <p style={{
            fontSize: '20px',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '48px'
          }}>
            Let's discuss how we can help transform your business with our expert services.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
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
