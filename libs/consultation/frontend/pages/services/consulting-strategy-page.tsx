import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, CheckCircle2, Lightbulb, Target, TrendingUp, Users, Brain, Zap, BarChart3, Clock, Award, Shield, GraduationCap, Rocket, Sparkles as SparklesIcon, Compass, Cog, Workflow, FileText, Building2, Globe, AlertTriangle } from 'lucide-react';

/**
 * Consulting & Strategy Service Page
 * Featuring animated strategy workflow and decision tree
 */

// Mac Browser Window Component
const MacBrowserWindow: React.FC<{ children: React.ReactNode; url: string }> = ({ children, url }) => (
  <div style={{
    background: '#1E1E1E',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <div style={{
      background: '#2D2D2D',
      padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 2vw, 12px)'
    }}>
      <div style={{ display: 'flex', gap: 'clamp(4px, 1vw, 8px)' }}>
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#28C840' }} />
      </div>
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
    <div>{children}</div>
  </div>
);

const StrategyAnimationSection: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [pulsingLines, setPulsingLines] = useState<number[]>([]);
  const [dataPackets, setDataPackets] = useState<Array<{ id: number; serviceIndex: number; progress: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [ripplePhase, setRipplePhase] = useState(0);

  // 12 services evenly distributed in a perfect circle, starting from top
  const services = [
    { name: 'Digital Transformation', icon: Zap, desc: 'Modernize your business' },
    { name: 'Business Strategy', icon: Target, desc: 'Strategic planning & growth' },
    { name: 'Market Analysis', icon: TrendingUp, desc: 'Data-driven insights' },
    { name: 'Technical Architecture', icon: Brain, desc: 'Scalable solutions' },
    { name: 'AI & Machine Learning', icon: Lightbulb, desc: 'Intelligent automation' },
    { name: 'Process Optimization', icon: Clock, desc: 'Efficiency improvements' },
    { name: 'Design Thinking', icon: Users, desc: 'User-centered approach' },
    { name: 'Product Roadmap', icon: BarChart3, desc: 'Strategic development' },
    { name: 'Change Management', icon: Award, desc: 'Organizational transformation' },
    { name: 'Risk Assessment', icon: Shield, desc: 'Security & compliance' },
    { name: 'Team Training', icon: GraduationCap, desc: 'Skills development' },
    { name: 'Innovation Labs', icon: Rocket, desc: 'Future-ready solutions' }
  ].map((service, index) => ({
    ...service,
    // Start from top (-90°) and distribute evenly in a circle (30° each)
    angle: -90 + (360 / 12) * index
  }));

  // Cycle through active services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [services.length]);

  // Pulse random lines
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLines = Array.from({ length: 4 }, () => Math.floor(Math.random() * services.length));
      setPulsingLines(randomLines);
    }, 700);
    return () => clearInterval(interval);
  }, [services.length]);

  // Data packets animation - packets moving from hub to nodes
  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket = {
        id: Date.now(),
        serviceIndex: Math.floor(Math.random() * services.length),
        progress: 0
      };
      setDataPackets(prev => [...prev, newPacket]);
    }, 1200);
    return () => clearInterval(interval);
  }, [services.length]);

  // Update data packets progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPackets(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 0.02 }))
          .filter(p => p.progress <= 1)
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Sparkles animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 30;
        setSparkles(prev => [...prev, {
          id: Date.now(),
          x: 50 + radius * Math.cos(angle),
          y: 50 + radius * Math.sin(angle)
        }]);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Cleanup sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => prev.filter(s => Date.now() - s.id < 1500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Ripple animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRipplePhase(prev => (prev + 0.05) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const primaryColor = '#0071E3';
  const secondaryColor = '#4FC3F7';

  return (
    <section style={{
      padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,113,227,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.08) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.4
      }} />

      {/* Radial glow */}
      <div style={{
            position: 'absolute',
            inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(0,113,227,0.15) 0%, transparent 60%)',
        opacity: 0.6
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0,113,227,0.1)',
            border: '1px solid rgba(0,113,227,0.3)',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '24px'
          }}>
            <SparklesIcon size={16} color="#0071E3" />
            <span style={{
              color: '#0071E3',
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              STRATEGIC SERVICES ECOSYSTEM
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(36px, 7vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            <span style={{ color: '#FFFFFF' }}>
              Connected
            </span>
            {' '}
            <span style={{
              background: 'linear-gradient(135deg, #0071E3 0%, #4FC3F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Consulting
            </span>
            {' '}
            <span style={{ color: '#FFFFFF' }}>
              Services
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Comprehensive ecosystem of interconnected services powering your digital transformation
          </p>
        </div>

        {/* Introductory Content */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 24px)'
        }}>
          {/* Main Introduction Text */}
          <div style={{
            marginBottom: '48px',
            animation: 'fade-in 0.8s ease-out'
          }}>
            <div style={{
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'left'
            }}>
              <p style={{
                fontSize: 'clamp(17px, 3.5vw, 19px)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.7,
                letterSpacing: '-0.01em',
                marginBottom: '32px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 400
              }}>
                In today's rapidly evolving business landscape, strategic consulting has become more critical than ever. Our approach combines <span style={{ color: '#0071E3', fontWeight: 600 }}>deep industry expertise</span> with <span style={{ color: '#4FC3F7', fontWeight: 600 }}>innovative methodologies</span> to deliver transformative results that drive sustainable growth and competitive advantage.
              </p>
              
              <p style={{
                fontSize: 'clamp(17px, 3.5vw, 19px)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.7,
                letterSpacing: '-0.01em',
                marginBottom: '32px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 400
              }}>
                We leverage advanced analytics and market intelligence to inform every strategic decision, ensuring your business moves forward with confidence. Our data-driven insights uncover hidden opportunities and help you navigate complex market dynamics with clarity and precision.
              </p>

              <p style={{
                fontSize: 'clamp(17px, 3.5vw, 19px)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.7,
                letterSpacing: '-0.01em',
                marginBottom: '32px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 400
              }}>
                No two businesses are alike. We craft customized strategies that align with your unique goals, culture, and market position. Every engagement begins with understanding your specific challenges and opportunities, ensuring our recommendations are perfectly tailored to your organization's needs.
              </p>

              <p style={{
                fontSize: 'clamp(17px, 3.5vw, 19px)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.7,
                letterSpacing: '-0.01em',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 400
              }}>
                With over 15 years of experience and 500+ successful engagements, we bring a track record of delivering measurable impact. Our proven methodologies have helped organizations across industries achieve sustainable growth, operational excellence, and lasting competitive advantages in their markets.
              </p>
            </div>
          </div>

          {/* Visual Separator with Icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '48px 0'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,113,227,0.3) 50%, transparent 100%)'
            }} />
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${primaryColor}30 0%, ${secondaryColor}20 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${primaryColor}40`,
              boxShadow: `0 0 30px ${primaryColor}40`
            }}>
              <SparklesIcon size={24} color={primaryColor} />
            </div>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,113,227,0.3) 50%, transparent 100%)'
            }} />
          </div>

          {/* Key Benefits Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: 'clamp(32px, 6vw, 48px)',
            position: 'relative',
              overflow: 'hidden'
          }}>
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 80% 20%, ${primaryColor}10 0%, transparent 60%)`,
              animation: 'mesh-move 8s ease-in-out infinite alternate',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Why Choose Our Consulting Services?
              </h3>

            <div style={{
              display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
                gap: 'clamp(20px, 4vw, 28px)'
              }}>
                {[
                  { icon: Target, title: 'Proven Track Record', description: 'Over 500 successful projects across diverse industries' },
                  { icon: Users, title: 'Expert Team', description: '50+ certified consultants with deep industry knowledge' },
                  { icon: Zap, title: 'Agile Approach', description: 'Fast implementation with measurable results' },
                  { icon: Shield, title: 'Long-term Partnership', description: 'Ongoing support and continuous optimization' }
                ].map((benefit, i) => {
                  const BenefitIcon = benefit.icon;
                return (
                    <div key={i} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      animation: `fade-in 0.6s ease-out ${i * 0.1}s backwards`
                    }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                      borderRadius: '50%',
                        background: `${primaryColor}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                        marginBottom: '16px',
                        border: `2px solid ${primaryColor}40`
                      }}>
                        <BenefitIcon size={28} color={primaryColor} />
                    </div>
                      <h4 style={{
                        fontSize: 'clamp(15px, 3vw, 18px)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '8px'
                      }}>
                        {benefit.title}
                      </h4>
                      <p style={{
                        fontSize: 'clamp(13px, 2.5vw, 14px)',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.5
                      }}>
                        {benefit.description}
                      </p>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mesh-move {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5%, 5%);
          }
        }
      `}</style>
    </section>
  );
};

const ConsultingStrategyPage: React.FC = () => {
  const consultingServices = [
    {
      icon: Compass,
      title: 'Business & Digital Strategy',
      color: '#0071E3',
      gradient: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)',
      summary: 'We plan smart — so your business grows steadily with clear goals and measurable success.',
      features: [
        'We develop digital and business strategies tailored to your specific client goals, ensuring every decision aligns with your vision and market position for sustainable, profitable growth that lasts.',
        'Our comprehensive market analysis includes competitor evaluation, industry trends assessment, and opportunity identification to give you the strategic intelligence needed to make confident business decisions.',
        'We define key performance indicators (KPIs) and implement tracking systems that provide real-time visibility into your progress, allowing for data-driven adjustments that maximize your return on investment.'
      ]
    },
    {
      icon: Brain,
      title: 'IT Consulting',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
      summary: 'Advice and solutions based on experience and the latest technologies.',
      features: [
        'Our technical analysis covers your entire existing system infrastructure, identifying bottlenecks, security vulnerabilities, and scalability issues to provide a complete picture of your current technology landscape.',
        'We provide expert recommendations for software architectures, technology stacks, and digital tools that align with your business objectives, ensuring you invest in solutions that grow with your needs.',
        'Our migration, security, and maintenance consulting covers everything from cloud migration strategies and data protection frameworks to ongoing system monitoring and proactive maintenance planning.'
      ]
    },
    {
      icon: Workflow,
      title: 'Process Optimization',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      summary: 'We simplify your business — making every step more efficient.',
      features: [
        'We map and analyze your internal processes to identify inefficiencies, redundancies, and bottlenecks that are costing you time and money, creating a clear roadmap for optimization and automation.',
        'Our business process automation integrates disparate systems and workflows into seamless, intelligent processes that reduce manual work, eliminate errors, and accelerate your operational speed.',
        'We provide comprehensive change management support to ensure smooth transitions, including stakeholder communication, training programs, and adoption monitoring to maximize the benefits of your process improvements.'
      ]
    },
    {
      icon: FileText,
      title: 'Strategic Planning',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
      summary: 'A plan without strategy is just a wish list — so we create the path to your goal.',
      features: [
        'Our strategic planning covers both short-term tactical execution and long-term vision, creating integrated roadmaps that balance immediate needs with sustainable growth objectives for lasting success.',
        'We develop comprehensive financial planning and resource allocation strategies that optimize your budget, forecast cash flow, and ensure you have the right resources at the right time to execute your plans.',
        'Our scenario analysis and risk assessment prepare you for multiple futures, stress-testing your strategies against market changes, competitive threats, and economic uncertainties to build resilience.'
      ]
    },
    {
      icon: Building2,
      title: 'Organizational Development',
      color: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
      summary: 'We develop people and systems that drive change.',
      features: [
        'Our strategic organizational restructuring aligns your company structure with your business objectives, creating efficient hierarchies, clear reporting lines, and agile decision-making processes that support growth.',
        'We provide executive and leadership development programs that build the strategic thinking, change management, and innovation skills your leaders need to navigate complex business challenges and drive transformation.',
        'Our innovation culture development creates environments where creativity flourishes, collaboration thrives, and calculated risk-taking becomes part of your organizational DNA, ensuring continuous improvement and competitive advantage.'
      ]
    },
    {
      icon: Globe,
      title: 'Market Entry Consulting',
      color: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
      summary: 'We open doors to new markets and opportunities.',
      features: [
        'Our market entry consulting covers everything from market research and competitive analysis to regulatory requirements and cultural adaptation, ensuring successful expansion into new territories and customer segments.',
        'We handle product localization and target audience research, adapting your offerings to local preferences, languages, and cultural nuances while maintaining brand consistency and market positioning.',
        'Our partnership, licensing, and strategic adaptation services help you build local alliances, negotiate favorable terms, and create market-specific strategies that accelerate your international growth.'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Risk & Compliance Advisory',
      color: '#DC2626',
      gradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
      summary: 'We reduce risks before they become problems.',
      features: [
        'Our comprehensive risk identification and assessment covers operational, financial, cybersecurity, reputational, and strategic risks, providing you with prioritized mitigation strategies and proactive protection plans.',
        'We ensure compliance with laws, industry standards, and security regulations through gap analysis, policy development, and implementation support for GDPR, HIPAA, SOX, and other regulatory frameworks.',
        'Our crisis management protocols and business continuity planning prepare you for worst-case scenarios with communication strategies, recovery procedures, and resilience frameworks that protect your business and stakeholders.'
      ]
    }
  ];

  return (
    <div style={{
      backgroundColor: '#000000',
      maxWidth: '100vw',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      {/* Hero Section - Dark Elegant */}
      <section style={{
        padding: 'clamp(80px, 15vw, 160px) clamp(20px, 5vw, 40px)',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        minHeight: '70vh'
      }}>
        {/* Background Pattern */}
            <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />

        {/* Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(0,113,227,0.1), rgba(138,92,246,0.1))',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(16,185,129,0.1))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />

        <div style={{ maxWidth: '1450px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(500px, 100%), 1fr))',
            gap: 'clamp(40px, 8vw, 80px)',
            alignItems: 'center'
          }}>
            {/* Content */}
            <div>
              <h1 style={{
                fontSize: 'clamp(40px, 8vw, 72px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Consulting & Strategy
              </h1>
              <p style={{
                fontSize: 'clamp(18px, 4vw, 24px)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '16px'
              }}>
                From idea to action — we build strategies that drive change.
              </p>
              <p style={{
                fontSize: 'clamp(16px, 3.5vw, 20px)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '40px'
              }}>
                Our team combines deep market understanding, technology expertise, and business acumen to create strategies that lead to real results. From digital transformation to business optimization — we plan your success together.
              </p>
              <Link to="/booking">
                <Button variant="luxury" size="lg" rightIcon={<ArrowRight />}>
                  Get a Consultation
                </Button>
              </Link>
            </div>

            {/* Visual Element */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
          position: 'relative',
                width: '400px',
                height: '400px'
              }}>
                {/* Central Hub */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #0071E3 0%, #8B5CF6 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 60px rgba(0,113,227,0.4)',
                  zIndex: 3
                }}>
                  <Compass size={48} color="#FFFFFF" />
                </div>

                {/* Orbiting Elements */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#DC2626'][i]} 0%, ${['#34D399', '#FBBF24', '#F87171', '#A78BFA', '#22D3EE', '#EF4444'][i]} 100%)`,
                      borderRadius: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 24px ${['rgba(16,185,129,0.4)', 'rgba(245,158,11,0.4)', 'rgba(239,68,68,0.4)', 'rgba(139,92,246,0.4)', 'rgba(6,182,212,0.4)', 'rgba(220,38,38,0.4)'][i]}`,
                      animation: `rotate ${20 + i * 2}s linear infinite`,
                      zIndex: 2
                    }}
                  >
                    {[Brain, Workflow, FileText, Building2, Globe, AlertTriangle][i] &&
                      React.createElement([Brain, Workflow, FileText, Building2, Globe, AlertTriangle][i], {
                        size: 24,
                        color: '#FFFFFF'
                      })
                    }
                  </div>
                ))}

                {/* Connection Lines */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <div
                    key={`line-${i}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '140px',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(0,113,227,0.6), rgba(138,92,246,0.3))',
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      transformOrigin: 'left center',
          zIndex: 1
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
          }
          @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg) translate(140px) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg) translate(140px) rotate(-360deg); }
          }
        `}</style>
      </section>

      {/* Services - Full Width Alternating Sections */}
      {consultingServices.map((service, i) => {
        const isBlack = i % 2 === 0;
        const isTextLeft = i % 2 === 0;
        const IconComponent = service.icon;

        return (
          <section
            key={i}
            style={{
              padding: 'clamp(60px, 12vw, 120px) 0',
              background: isBlack ? '#000000' : '#FFFFFF',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              maxWidth: '1450px',
              margin: '0 auto',
              padding: '0 clamp(20px, 5vw, 40px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(24px, 6vw, 60px)',
              alignItems: 'center'
            }}>
              {/* Text Content */}
          <div style={{ 
                order: isTextLeft ? 1 : 2
          }}>
                {/* Service Number Badge */}
            <div style={{
                  display: 'flex',
              alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 24px ${service.color}40`
                  }}>
              <span style={{
                      fontSize: '16px',
                      fontWeight: 900,
                      color: '#FFFFFF'
                    }}>
                      {i + 1}
                    </span>
                  </div>
                  <span style={{
                    color: service.color,
                    fontSize: 'clamp(13px, 3vw, 15px)',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase'
                  }}>
                    Strategy Excellence
              </span>
            </div>

                {/* Title */}
            <h2 style={{
                  fontSize: 'clamp(32px, 6vw, 48px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: isBlack ? '#FFFFFF' : '#1D1D1F',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {service.title}
                </h2>

                {/* Summary */}
                <p style={{
                  fontSize: 'clamp(14px, 3vw, 17px)',
                  lineHeight: 1.6,
                  color: isBlack ? 'rgba(255,255,255,0.7)' : '#6E6E73',
                  marginBottom: '32px',
                  fontWeight: 400,
                  maxWidth: '600px'
                }}>
                  {service.summary}
                </p>

                {/* Features */}
                <div style={{
                  marginBottom: '32px'
                }}>
                  {service.features.map((feature, idx) => (
                    <p
                      key={idx}
                      style={{
                        fontSize: 'clamp(13px, 2.8vw, 15px)',
                        lineHeight: 1.7,
                        color: isBlack ? 'rgba(255,255,255,0.8)' : '#3C3C43',
                        marginBottom: idx === service.features.length - 1 ? '0' : '20px',
                        fontWeight: 400,
                        textAlign: 'justify'
                      }}
                    >
                      {feature}
                    </p>
                  ))}
                </div>
              </div>

              {/* Visual Side - Animated Icon */}
              <div style={{
                order: isTextLeft ? 2 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: 'clamp(220px, 30vw, 350px)'
              }}>
                {/* Main Icon Circle */}
                <div style={{
                  position: 'relative',
                  width: 'clamp(150px, 25vw, 250px)',
                  height: 'clamp(150px, 25vw, 250px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Outer Rings */}
                  <div style={{
                    position: 'absolute',
                    inset: '-20px',
                    borderRadius: '50%',
                    border: `2px solid ${service.color}20`,
                    animation: 'rotate 30s linear infinite'
                  }} />

                  <div style={{
                    position: 'absolute',
                    inset: '-10px',
                    borderRadius: '50%',
                    border: `2px dashed ${service.color}30`,
                    animation: 'rotate 20s linear infinite reverse'
                  }} />

                  {/* Main Circle with Icon */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 20px 60px ${service.color}50, inset 0 0 60px ${service.color}30`,
                    position: 'relative',
                    zIndex: 1,
                    animation: 'float 6s ease-in-out infinite'
                  }}>
                    <IconComponent
                      size={window.innerWidth < 768 ? 50 : 80}
                      color="#FFFFFF"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Orbiting Particles */}
                  {[0, 120, 240].map((angle, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: service.color,
                        boxShadow: `0 0 20px ${service.color}`,
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${angle}deg) translate(${window.innerWidth < 768 ? '80px' : '135px'}) rotate(-${angle}deg)`,
                        animation: `rotate ${15 + idx * 2}s linear infinite`,
                        opacity: 0.6
                      }}
                    />
                  ))}

                  {/* Background Glow */}
                  <div style={{
                    position: 'absolute',
                    inset: '-40px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                    filter: 'blur(50px)',
                    animation: 'pulse 4s ease-in-out infinite'
                  }} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Case Studies */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(20px, 5vw, 40px)',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1450px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(60px, 10vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
                fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
              }}>
              Real Results
          </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Measurable impact from our strategic consulting
            </p>
            </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
            gap: 'clamp(24px, 4vw, 32px)'
          }}>
            {[
              { 
                title: 'Process Optimization Success',
                description: 'Helped a manufacturing client reduce operational costs by 30% through process optimization and automation implementation.',
                metrics: ['30% cost reduction', '45% faster throughput', '6-month ROI'],
                industry: 'Manufacturing'
              },
              {
                title: 'Digital Strategy Growth',
                description: 'Developed and implemented a comprehensive digital strategy that increased revenue by 65% over 8 months.',
                metrics: ['65% revenue growth', '40% more leads', '3x conversion rate'],
                industry: 'E-commerce'
              },
              {
                title: 'Market Entry Strategy',
                description: 'Successfully guided a tech startup through market entry, achieving $2.5M in first-year revenue.',
                metrics: ['$2.5M revenue', '3 markets entered', '25% market share'],
                industry: 'Technology'
              },
              {
                title: 'Organizational Restructuring',
                description: 'Restructured operations for a financial services firm, improving efficiency by 40% and reducing overhead by 25%.',
                metrics: ['40% efficiency gain', '25% overhead reduction', '12-month payback'],
                industry: 'Financial Services'
              },
              {
                title: 'Risk Management Framework',
                description: 'Implemented comprehensive risk management that prevented potential $5M loss and improved compliance rating.',
                metrics: ['$5M risk mitigated', '100% compliance', 'Zero incidents'],
                industry: 'Healthcare'
              },
              {
                title: 'Innovation Strategy',
                description: 'Created an innovation framework that launched 8 new products, generating $12M in additional revenue.',
                metrics: ['8 new products', '$12M revenue', '35% profit margin'],
                industry: 'Consumer Goods'
              }
            ].map((study, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: 'clamp(32px, 6vw, 40px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,113,227,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(0,113,227,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
              <div style={{
                      display: 'flex',
                      alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontSize: 'clamp(12px, 2.4vw, 14px)',
                    fontWeight: 700,
                    color: '#0071E3',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {study.industry}
                  </span>
                  <CheckCircle2 size={20} color="#10B981" />
            </div>

                    <h3 style={{
                  fontSize: 'clamp(18px, 3.6vw, 22px)',
                      fontWeight: 700,
                  color: '#1D1D1F',
                      marginBottom: '12px',
                  lineHeight: 1.3
                    }}>
                  {study.title}
                    </h3>

                <p style={{
                      fontSize: 'clamp(14px, 2.8vw, 16px)',
                  color: '#6E6E73',
                  lineHeight: 1.5,
                      marginBottom: '20px'
                    }}>
                  {study.description}
                    </p>

                    <div style={{
                      display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {study.metrics.map((metric, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)',
                        color: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: 'clamp(12px, 2.4vw, 14px)',
                        fontWeight: 600
                      }}
                    >
                      {metric}
                          </span>
            ))}
            </div>
        </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(20px, 5vw, 40px)',
        background: 'rgba(255,255,255,0.01)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1450px', margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 'clamp(60px, 10vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Our Approach
            </h2>
        <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Proven methodology that delivers sustainable results
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: 'clamp(32px, 5vw, 48px)'
          }}>
            {[
              {
                step: '01',
                title: 'Analysis & Research',
                description: 'Deep dive into your current state, market position, and opportunities for improvement.',
                icon: BarChart3,
                color: '#0071E3'
              },
              {
                step: '02',
                title: 'Strategy Development',
                description: 'Craft comprehensive strategies aligned with your goals and market realities.',
                icon: Lightbulb,
                color: '#8B5CF6'
              },
              {
                step: '03',
                title: 'Implementation & Support',
                description: 'Execute strategies with ongoing support and optimization for maximum impact.',
                icon: Rocket,
                color: '#10B981'
              }
            ].map((phase, i) => {
              const PhaseIcon = phase.icon;
              return (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Step Number */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: phase.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px ${phase.color}40`
                  }}>
                    <span style={{
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {phase.step}
                    </span>
                    </div>

                  {/* Icon */}
                      <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${phase.color}20, ${phase.color}10)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: `2px solid ${phase.color}30`
                        }}>
                    <PhaseIcon size={32} color={phase.color} />
                        </div>

                  {/* Content */}
                        <h3 style={{
                    fontSize: 'clamp(18px, 3.6vw, 20px)',
                          fontWeight: 700,
                          color: '#FFFFFF',
                    marginBottom: '12px'
                        }}>
                          {phase.title}
                        </h3>
                    <p style={{
                    fontSize: 'clamp(14px, 2.8vw, 16px)',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.5
                  }}>
                    {phase.description}
                  </p>

                  {/* Connection Line (except last) */}
                  {i < 2 && (
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      right: '-50%',
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)',
                      zIndex: -1
                    }} />
                  )}
                      </div>
              );
            })}
                    </div>
                  </div>
      </section>

      {/* Industries We Support */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(20px, 5vw, 40px)',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 2px, transparent 2px)',
          backgroundSize: '60px 60px',
          opacity: 0.1
        }} />

        <div style={{ maxWidth: '1450px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(80px, 15vw, 120px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Industries We Serve
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Deep expertise across diverse sectors
            </p>
          </div>

          {/* Industries Timeline Flow */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(60px, 10vw, 100px)'
          }}>
            {[
              {
                name: 'Finance & Banking',
                description: 'Risk management, regulatory compliance, and digital transformation strategies.',
                services: ['Risk Assessment', 'Digital Banking', 'Compliance Strategy'],
                color: '#0071E3'
              },
              {
                name: 'E-commerce & Retail',
                description: 'Customer experience optimization and scalable growth strategies.',
                services: ['Conversion Optimization', 'Market Expansion', 'Inventory Strategy'],
                color: '#10B981'
              },
              {
                name: 'Technology & SaaS',
                description: 'Product strategy, market positioning, and scaling methodologies.',
                services: ['Product Strategy', 'Go-to-Market', 'Competitive Analysis'],
                color: '#8B5CF6'
              },
              {
                name: 'Healthcare & Life Sciences',
                description: 'Regulatory compliance, patient experience, and operational efficiency.',
                services: ['Compliance Strategy', 'Patient Journey', 'Operational Excellence'],
                color: '#EF4444'
              },
              {
                name: 'Manufacturing & Industrial',
                description: 'Supply chain optimization and Industry 4.0 transformation.',
                services: ['Process Optimization', 'Digital Transformation', 'Supply Chain'],
                color: '#F59E0B'
              },
              {
                name: 'Education & EdTech',
                description: 'Learning experience design and institutional growth strategies.',
                services: ['Learning Strategy', 'Digital Adoption', 'Growth Planning'],
                color: '#06B6D4'
              },
              {
                name: 'Real Estate & Construction',
                description: 'Market analysis, project management, and development strategies.',
                services: ['Market Analysis', 'Project Strategy', 'Development Planning'],
                color: '#DC2626'
              },
              {
                name: 'Non-Profit & Social Impact',
                description: 'Mission-driven strategies and sustainable growth planning.',
                services: ['Impact Strategy', 'Fundraising', 'Organizational Development'],
                color: '#84CC16'
              }
            ].map((industry, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(40px, 8vw, 80px)',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    opacity: 0,
                    animation: `fadeInUp 0.8s ease-out ${i * 0.2}s forwards`
                  }}
                >
                  {/* Content Block */}
                  <div style={{
                    flex: 1,
                    padding: 'clamp(40px, 8vw, 60px)',
                    background: `linear-gradient(135deg, ${industry.color}08 0%, ${industry.color}05 100%)`,
                    border: `1px solid ${industry.color}20`,
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    position: 'relative'
                  }}>
                    {/* Accent Line */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${industry.color}, ${industry.color}80)`,
                      borderRadius: '20px 20px 0 0'
                    }} />

                    {/* Industry Number */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${industry.color}20, ${industry.color}10)`,
                      border: `2px solid ${industry.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: industry.color
                    }}>
                      {i + 1}
                    </div>

                    {/* Content */}
                    <div style={{ paddingTop: '10px' }}>
                      <h3 style={{
                        fontSize: 'clamp(24px, 4vw, 32px)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '16px',
                        lineHeight: 1.2
                      }}>
                        {industry.name}
                      </h3>

                      <p style={{
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.6,
                        marginBottom: '24px'
                      }}>
                        {industry.description}
                      </p>

                      {/* Services List */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '20px'
                      }}>
                        {industry.services.map((service, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: 'clamp(13px, 2.5vw, 15px)',
                              color: '#FFFFFF',
                              fontWeight: 500,
                              background: `${industry.color}30`,
                              padding: '8px 16px',
                              borderRadius: '20px',
                              border: `1px solid ${industry.color}50`,
                              display: 'inline-block'
                            }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Connector */}
                  <div style={{
                    width: '4px',
                    height: 'clamp(100px, 20vw, 150px)',
                    background: `linear-gradient(180deg, ${industry.color}60, ${industry.color}20)`,
                    borderRadius: '2px',
                    position: 'relative'
                  }}>
                    {/* Timeline Node */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${industry.color}, ${industry.color}80)`,
                      border: '3px solid #000000',
                      boxShadow: `0 0 20px ${industry.color}50`
                    }} />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div style={{ flex: 0.3 }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(20px, 5vw, 40px)',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            marginBottom: '24px',
            color: '#FFFFFF',
            letterSpacing: '-0.02em'
        }}>
          Ready to Transform Your Business?
        </h2>
        <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Let's develop a strategy that drives real results
          </p>
          <Link to="/booking">
            <Button variant="luxury" size="xl" rightIcon={<ArrowRight />}>
              Schedule Consultation
          </Button>
        </Link>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        /* Mobile responsive overrides */
        @media (max-width: 768px) {
          /* Service cards grid - single column on mobile */
          .consulting-services-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          /* Process steps - single column on mobile */
          .process-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          /* Stats grid - 2 columns on mobile */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          
          /* Better animations on mobile */
          .animated-element {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ConsultingStrategyPage;
