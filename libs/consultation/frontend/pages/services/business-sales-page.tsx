import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, TrendingUp, Users, Target, DollarSign, Rocket, Network, Mail, Phone, LineChart, Lightbulb, FileText, Tag } from 'lucide-react';

/**
 * Business Development & Sales Service Page
 * Featuring animated sales funnel and conversion metrics
 */

// Mac Browser Window Component
const MacBrowserWindow: React.FC<{ children: React.ReactNode; url: string }> = ({ children, url }) => (
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

const SalesFunnelAnimationSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [flowProgress, setFlowProgress] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  const salesStages = [
    { 
      name: 'Lead Generation', 
      value: 1000, 
      color: '#00FF41',
      icon: Users,
      width: 100,
      description: 'Attracting potential clients'
    },
    { 
      name: 'Qualification', 
      value: 650, 
      color: '#FF006E',
      icon: Target,
      width: 75,
      description: 'Qualifying and segmenting leads'
    },
    { 
      name: 'Nurturing', 
      value: 420, 
      color: '#8B5CF6',
      icon: TrendingUp,
      width: 55,
      description: 'Educating and nurturing relationships'
    },
    { 
      name: 'Conversion', 
      value: 280, 
      color: '#FFBE0B',
      icon: DollarSign,
      width: 35,
      description: 'Closing the sale'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flowProgress >= 100) {
      const timer = setTimeout(() => {
        setActiveStage((current) => (current + 1) % salesStages.length);
        setFlowProgress(0);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [flowProgress, salesStages.length]);

  useEffect(() => {
    const stage = salesStages[activeStage];
    const nextStage = salesStages[(activeStage + 1) % salesStages.length];
    const rate = (nextStage.value / stage.value) * 100;
    setConversionRate(Math.round(rate));
  }, [activeStage, salesStages]);

  const stage = salesStages[activeStage];
  const StageIcon = stage.icon;


  return (
    <section style={{
      padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 24px)',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
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
          marginBottom: 'clamp(40px, 8vw, 60px)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '20px'
          }}>
            <Target size={14} color="#FFFFFF" />
            <span style={{
              color: '#FFFFFF',
              fontSize: 'clamp(11px, 2.5vw, 13px)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Sales Optimization
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            From Leads to <span style={{
              color: '#00FF41',
              textShadow: '0 0 30px rgba(0, 255, 65, 0.6)'
            }}>Loyal Customers</span>
          </h2>

          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Services that help clients develop strategy and increase sales
          </p>
        </div>

        {/* Sales Funnel Visualization */}
        <div style={{
          maxWidth: 'clamp(280px, 85vw, 700px)',
          margin: '0 auto',
          padding: '0 clamp(8px, 2vw, 16px)'
        }}>
          <MacBrowserWindow url="sales-funnel.dashboard.com">
            <div style={{
              background: '#000000',
              padding: 'clamp(24px, 5vw, 48px)'
            }}>
          {/* Active Stage Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <StageIcon size={24} color="#FFFFFF" />
              </div>
              <div>
                <div style={{
                  fontSize: 'clamp(18px, 3.8vw, 24px)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}>
                  {stage.name}
                </div>
                <div style={{
                  fontSize: 'clamp(12px, 2.8vw, 14px)',
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  {stage.description}
                </div>
              </div>
            </div>
            <div style={{
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: 'clamp(20px, 4.5vw, 28px)',
                fontWeight: 700,
                color: '#FFFFFF'
              }}>
                {stage.value}
              </div>
              <div style={{
                fontSize: 'clamp(10px, 2.2vw, 12px)',
                color: 'rgba(255,255,255,0.5)'
              }}>
                Leads
              </div>
            </div>
          </div>

          {/* Funnel Visualization */}
          <div style={{
            position: 'relative',
            minHeight: 'clamp(180px, 40vw, 240px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '10px'
          }}>
            {salesStages.map((funnelStage, i) => {
              const isActive = i === activeStage;
              const isPassed = i < activeStage;
              const StIcon = funnelStage.icon;

              return (
                <div
                  key={i}
                  style={{
                    width: `${funnelStage.width}%`,
                    maxWidth: '600px',
                    minWidth: '200px',
                    position: 'relative',
                    transition: 'all 0.4s ease'
                  }}
                >
                  {/* Funnel Stage */}
                  <div style={{
                    background: isActive 
                      ? `${funnelStage.color}15`
                      : isPassed 
                      ? `${funnelStage.color}08`
                      : 'rgba(255,255,255,0.03)',
                    padding: 'clamp(10px, 2.5vw, 14px)',
                    borderRadius: '8px',
                    border: `1px solid ${isActive ? funnelStage.color : isPassed ? `${funnelStage.color}60` : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isActive 
                      ? `0 0 40px ${funnelStage.color}60, 0 0 20px ${funnelStage.color}40, inset 0 0 20px ${funnelStage.color}20`
                      : isPassed 
                      ? `0 0 20px ${funnelStage.color}30`
                      : 'none',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                        <StIcon 
                          size={window.innerWidth < 768 ? 20 : 28} 
                          color={isActive || isPassed ? funnelStage.color : 'rgba(255,255,255,0.4)'}
                        />
                        <div>
                          <div style={{
                            fontSize: 'clamp(14px, 3.2vw, 16px)',
                            fontWeight: 600,
                            color: isActive || isPassed ? funnelStage.color : 'rgba(255,255,255,0.6)',
                            marginBottom: '2px',
                            textShadow: isActive ? `0 0 10px ${funnelStage.color}80` : 'none'
                          }}>
                            {funnelStage.name}
                          </div>
                          <div style={{
                            fontSize: 'clamp(11px, 2.5vw, 13px)',
                            color: isActive || isPassed ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'
                          }}>
                            {funnelStage.value} leads
                          </div>
                        </div>
                      </div>
                      {i < salesStages.length - 1 && (
                        <div style={{
                          fontSize: 'clamp(12px, 2.8vw, 14px)',
                          fontWeight: 600,
                          color: isActive || isPassed ? funnelStage.color : 'rgba(255,255,255,0.4)',
                          background: isActive || isPassed ? `${funnelStage.color}20` : 'rgba(255,255,255,0.03)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: isActive || isPassed ? `1px solid ${funnelStage.color}40` : 'none',
                          boxShadow: isActive ? `0 0 10px ${funnelStage.color}40` : 'none'
                        }}>
                          {Math.round((salesStages[i + 1].value / funnelStage.value) * 100)}%
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  {i < salesStages.length - 1 && (
                    <div style={{
                      width: '2px',
                      height: '8px',
                      background: isPassed || isActive 
                        ? funnelStage.color
                        : 'rgba(255,255,255,0.1)',
                      margin: '4px auto',
                      borderRadius: '2px',
                      boxShadow: isPassed || isActive ? `0 0 8px ${funnelStage.color}80` : 'none'
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Conversion Rate Display */}
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: `${stage.color}10`,
            borderRadius: '8px',
            border: `1px solid ${stage.color}40`,
            boxShadow: `0 0 20px ${stage.color}20`,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: 'clamp(10px, 2.2vw, 12px)',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '3px'
            }}>
              Conversion Rate
            </div>
            <div style={{
              fontSize: 'clamp(20px, 5vw, 30px)',
              fontWeight: 700,
              color: stage.color,
              textShadow: `0 0 20px ${stage.color}80`
            }}>
              {conversionRate}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          maxWidth: '900px',
          margin: '16px auto 0',
          height: '3px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${((activeStage) * 25) + (flowProgress * 0.25)}%`,
            background: stage.color,
            borderRadius: '2px',
            transition: 'width 0.05s linear',
            boxShadow: `0 0 10px ${stage.color}80`
          }} />
        </div>

          </MacBrowserWindow>
        </div>
      </div>
    </section>
  );
};

export const BusinessSalesPage: React.FC = () => {
  const businessServices = [
    {
      icon: Rocket,
      title: 'Sales Strategy & Automation',
      color: '#0071E3',
      gradient: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)',
      summary: 'Transform your sales process with intelligent automation and data-driven strategies that scale.',
      features: [
        'We design comprehensive sales strategies that align with your business goals, leveraging data analytics to identify the most profitable customer segments, optimize pricing models, and create repeatable processes that turn your sales team into a high-performance revenue engine.',
        'Our sales automation solutions integrate cutting-edge CRM systems with AI-powered tools to eliminate manual tasks, automate follow-ups, track every customer interaction, and provide real-time insights that help your team close deals faster while maintaining personal touch.',
        'We implement predictive analytics and machine learning models that forecast sales trends, identify at-risk deals, recommend optimal next actions, and continuously optimize your sales funnel to maximize conversion rates and revenue per customer.'
      ]
    },
    {
      icon: Network,
      title: 'CRM Integration & Management',
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
      summary: 'Seamless CRM implementation with HubSpot, Salesforce, and Pipedrive that centralizes your customer data.',
      features: [
        'We expertly implement and customize leading CRM platforms including HubSpot, Salesforce, and Pipedrive, tailoring each system to your unique sales process, ensuring data accuracy, and training your team to leverage every feature for maximum productivity and customer insight.',
        'Our CRM integration services connect your sales platform with marketing automation, customer support, accounting, and analytics tools, creating a unified ecosystem where data flows seamlessly and every department has a complete view of the customer journey.',
        'We provide ongoing CRM optimization, custom workflow automation, advanced reporting dashboards, and regular training sessions that ensure your team continues to extract maximum value from your CRM investment as your business evolves and scales.'
      ]
    },
    {
      icon: Users,
      title: 'Lead Generation & Qualification',
      color: '#00D9FF',
      gradient: 'linear-gradient(135deg, #00D9FF 0%, #00B8D9 100%)',
      summary: 'Build a consistent pipeline of high-quality leads through multi-channel strategies and smart qualification.',
      features: [
        'We architect multi-channel lead generation campaigns that combine content marketing, SEO, paid advertising, social media, and strategic partnerships to attract your ideal customers at every stage of their buying journey, ensuring a consistent flow of qualified prospects.',
        'Our lead qualification framework uses behavioral scoring, demographic data, and engagement metrics to automatically identify sales-ready prospects, prioritize follow-up activities, and route leads to the right sales rep, dramatically increasing conversion rates while reducing wasted effort.',
        'We implement nurturing sequences that educate prospects through personalized email campaigns, targeted content, and timely outreach, keeping your brand top-of-mind and gradually moving leads through the funnel until they are ready to buy.'
      ]
    },
    {
      icon: Mail,
      title: 'Outbound & Inbound Marketing',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
      summary: 'Balanced approach combining proactive outreach with magnetic inbound strategies.',
      features: [
        'Our outbound marketing strategies include targeted cold email campaigns, LinkedIn outreach, strategic calling programs, and direct mail that reach decision-makers where they are, with personalized messaging that resonates and compels action rather than annoys.',
        'We create powerful inbound marketing engines through SEO-optimized content, lead magnets, webinars, and thought leadership that attract prospects who are actively searching for solutions, positioning your brand as the trusted authority in your industry.',
        'By balancing outbound persistence with inbound magnetism, we create a comprehensive demand generation system that fills your pipeline from multiple sources, reduces customer acquisition costs, and builds a sustainable competitive advantage.'
      ]
    },
    {
      icon: Target,
      title: 'Customer Journey Mapping',
      color: '#FF006E',
      gradient: 'linear-gradient(135deg, #FF006E 0%, #FF499E 100%)',
      summary: 'Visualize and optimize every touchpoint from awareness to advocacy.',
      features: [
        'We map the complete customer journey from initial awareness through consideration, purchase, onboarding, and advocacy, identifying every touchpoint, pain point, and opportunity to create exceptional experiences that differentiate your brand and drive loyalty.',
        'Our journey mapping process reveals hidden friction in your sales and service processes, allowing us to streamline operations, eliminate bottlenecks, and create seamless transitions between marketing, sales, and customer success teams.',
        'We implement journey orchestration tools that deliver the right message at the right time through the right channel, automatically triggering personalized communications based on customer behavior, ensuring no opportunity is missed and every interaction adds value.'
      ]
    },
    {
      icon: LineChart,
      title: 'Market Research & Positioning',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      summary: 'Deep market insights that inform positioning, messaging, and competitive strategy.',
      features: [
        'We conduct comprehensive market research including competitor analysis, customer interviews, industry trend assessment, and market sizing to provide the strategic intelligence needed to make confident decisions about product development, pricing, and go-to-market strategy.',
        'Our positioning workshops define your unique value proposition, identify your ideal customer profile, craft compelling messaging that resonates with target buyers, and create positioning maps that clearly articulate why customers should choose you over alternatives.',
        'We develop competitive intelligence systems that continuously monitor market changes, competitor moves, and customer sentiment, keeping you ahead of trends and enabling rapid strategic adjustments that maintain your competitive edge.'
      ]
    },
    {
      icon: FileText,
      title: 'Pitch Decks & Business Proposals',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
      summary: 'Compelling presentations and proposals that win deals and secure investments.',
      features: [
        'We craft investor-grade pitch decks that tell your story compellingly, showcase your market opportunity, demonstrate traction, outline your business model, and present financial projections in a way that builds confidence and excitement, helping you close funding rounds and partnerships.',
        'Our sales proposals combine persuasive copywriting, professional design, and strategic pricing presentation to clearly articulate value, address objections, provide social proof, and make it easy for prospects to say yes, dramatically improving your close rates.',
        'We create customizable proposal templates, pitch deck frameworks, and presentation guidelines that ensure consistency across your organization while allowing for personalization, enabling your entire team to deliver high-quality presentations that reinforce your brand.'
      ]
    },
    {
      icon: Tag,
      title: 'Pricing Strategy & Optimization',
      color: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
      summary: 'Scientific approach to pricing that maximizes revenue and customer lifetime value.',
      features: [
        'We analyze your costs, competitive landscape, customer willingness to pay, and value delivered to develop pricing strategies that maximize profitability while remaining competitive, whether you need cost-plus, value-based, dynamic, or freemium pricing models.',
        'Our pricing optimization uses A/B testing, conjoint analysis, and price sensitivity research to identify optimal price points, package configurations, and discount strategies that increase average deal size and reduce churn without leaving money on the table.',
        'We design tiered pricing architectures and packaging strategies that segment customers effectively, encourage upsells, reduce decision paralysis, and align pricing with customer value perception, creating clear upgrade paths that grow revenue as customers succeed.'
      ]
    }
  ];

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      maxWidth: '100vw',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
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
            <Rocket size={16} strokeWidth={2} />
            <span>Business Growth Solutions</span>
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
          Business Development & Sales
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #0071E3 0%, #10B981 100%)',
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
            Strategic services that help you develop winning strategies, optimize sales processes, and drive sustainable business growth.
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
            Boost Your Sales
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

      {/* Sales Funnel Animation */}
      <SalesFunnelAnimationSection />

      {/* Services - Full Width Alternating Sections */}
      {businessServices.map((service, i) => {
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
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 clamp(16px, 5vw, 24px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
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
                    Sales Excellence
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
      `}</style>

      {/* Interactive Service Timeline */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#F8F9FA',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,113,227,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
          <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Business Development Journey
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              From strategy to execution - our proven methodology delivers results
            </p>
          </div>

          {/* Timeline Container */}
          <div style={{
            position: 'relative',
            padding: '40px 0'
          }}>
            {/* Central Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(180deg, #0071E3 0%, #E5E7EB 50%, #0071E3 100%)',
              transform: 'translateX(-50%)',
              zIndex: 1
            }} />

            {[
              {
                step: 1,
                icon: Lightbulb,
                title: 'Strategic Market Consulting',
                subtitle: 'Foundation & Research',
                benefits: ['Competitive analysis & positioning', 'Market research & insights', 'Go-to-market strategy'],
                results: ['Market expansion', 'Competitive advantage', 'Strategic clarity'],
                timeline: '2-6 months',
                color: '#F97316',
                position: 'left'
              },
              {
                step: 2,
                icon: Target,
                title: 'Lead Generation & Nurturing',
                subtitle: 'Attract & Qualify',
                benefits: ['Multi-channel campaign management', 'Automated lead scoring systems', 'Personalized nurturing sequences'],
                results: ['5x more qualified leads', 'Higher conversion rates', 'Reduced acquisition costs'],
                timeline: '1-3 months',
                color: '#F59E0B',
                position: 'right'
              },
              {
                step: 3,
                icon: Users,
                title: 'Customer Acquisition Optimization',
                subtitle: 'Convert & Retain',
                benefits: ['Conversion rate optimization', 'Customer journey mapping', 'Referral program development'],
                results: ['50% lower CAC', 'Higher customer retention', 'Improved LTV'],
                timeline: '2-6 months',
                color: '#EF4444',
                position: 'left'
              },
              {
                step: 4,
                icon: Network,
                title: 'CRM Integration & Automation',
                subtitle: 'Streamline Operations',
                benefits: ['Complete CRM platform setup', 'Workflow automation', 'Data synchronization'],
                results: ['Streamlined operations', '95% data accuracy', '30% faster processes'],
                timeline: '1-2 months',
                color: '#8B5CF6',
                position: 'right'
              },
              {
                step: 5,
                icon: DollarSign,
                title: 'Sales Process Optimization',
                subtitle: 'Accelerate Performance',
                benefits: ['AI-powered lead prioritization', 'Sales cycle acceleration', 'Performance analytics'],
                results: ['35% shorter cycles', '70% productivity boost', 'Higher close rates'],
                timeline: '1-3 months',
                color: '#06B6D4',
                position: 'left'
              },
              {
                step: 6,
                icon: TrendingUp,
                title: 'Revenue Growth Strategy',
                subtitle: 'Scale & Sustain',
                benefits: ['Data-driven pricing optimization', 'Sales funnel analysis', 'Customer lifetime value maximization'],
                results: ['40-80% revenue increase', 'Improved profit margins', 'Scalable growth model'],
                timeline: '2-4 months',
                color: '#10B981',
                position: 'right'
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = item.position === 'left';

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: index < 5 ? '80px' : '0',
                    position: 'relative'
                  }}
                >
                  {/* Timeline Node */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}80 100%)`,
                    border: '6px solid #FFFFFF',
                    boxShadow: `0 8px 24px ${item.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3
                  }}>
                    <IconComponent size={24} color="#FFFFFF" />
                  </div>

                  {/* Step Number */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 4,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: item.color
                    }}>
                      {item.step}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div style={{
                    width: '45%',
                    marginLeft: isLeft ? '0' : 'auto',
                    marginRight: isLeft ? 'auto' : '0',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: 'clamp(24px, 4vw, 32px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    border: `2px solid ${item.color}15`,
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 20px 48px ${item.color}20`;
                    e.currentTarget.style.borderColor = `${item.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = `${item.color}15`;
                  }}
                  >
                    {/* Header */}
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{
                        fontSize: 'clamp(18px, 3.6vw, 22px)',
                        fontWeight: 700,
                        color: '#1D1D1F',
                        marginBottom: '4px'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: 'clamp(12px, 2.4vw, 14px)',
                        color: item.color,
            fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{
                        fontSize: 'clamp(14px, 2.8vw, 16px)',
                        fontWeight: 600,
                        color: '#1D1D1F',
                        marginBottom: '12px'
                      }}>
                        Key Benefits:
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {item.benefits.map((benefit, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: item.color,
                              marginTop: '6px',
                              flexShrink: 0
                            }} />
                            <span style={{
                              fontSize: 'clamp(12px, 2.4vw, 14px)',
                              color: '#6E6E73',
                              lineHeight: 1.4
                            }}>
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{
                        fontSize: 'clamp(14px, 2.8vw, 16px)',
                        fontWeight: 600,
                        color: '#1D1D1F',
                        marginBottom: '12px'
                      }}>
                        Expected Results:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {item.results.map((result, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
                              padding: '4px 8px',
                              borderRadius: '12px',
                              border: `1px solid ${item.color}25`,
                              fontSize: 'clamp(10px, 2vw, 12px)',
                              fontWeight: 600,
                              color: item.color
                            }}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        display: 'inline-block'
                      }}>
                        <span style={{
                          fontSize: 'clamp(11px, 2.2vw, 13px)',
                          fontWeight: 700,
                          color: '#FFFFFF'
                        }}>
                          {item.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Connection Arrow */}
                  <div style={{
                    position: 'absolute',
                    left: isLeft ? '45%' : '55%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '2px',
                    background: item.color,
                    zIndex: 2
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: isLeft ? 'calc(45% + 20px)' : 'calc(55% - 22px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '0',
                    height: '0',
                    borderTop: '6px solid transparent',
                    borderBottom: '6px solid transparent',
                    borderLeft: isLeft ? `8px solid ${item.color}` : 'none',
                    borderRight: !isLeft ? `8px solid ${item.color}` : 'none',
                    zIndex: 2
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#000000'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Success Stories
          </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Real results from real businesses
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 'clamp(24px, 4vw, 32px)'
          }}>
            {[
              {
                quote: '"Increased our lead generation by 65% in just 3 months through automated nurturing campaigns."',
                author: 'Sarah Johnson',
                position: 'CMO',
                company: 'TechCorp',
                logo: '🏢',
                result: '+65% Leads'
              },
              {
                quote: '"CRM integration streamlined our sales process and improved close rates by 40%."',
                author: 'Michael Chen',
                position: 'Sales Director',
                company: 'GrowthLabs',
                logo: '🚀',
                result: '+40% Conversion'
              },
              {
                quote: '"Their market research helped us identify a $2M opportunity we were completely missing."',
                author: 'Emma Rodriguez',
                position: 'CEO',
                company: 'InnovateNow',
                logo: '💡',
                result: '$2M Opportunity'
              },
              {
                quote: '"Automated sales funnel reduced our customer acquisition cost by 55%."',
                author: 'David Kim',
                position: 'VP Sales',
                company: 'ScaleUp Inc',
                logo: '📈',
                result: '-55% CAC'
              },
              {
                quote: '"Their strategic positioning increased our premium pricing acceptance by 80%."',
                author: 'Lisa Wong',
                position: 'Marketing Lead',
                company: 'PremiumBrands',
                logo: '💎',
                result: '+80% Premium Sales'
              },
              {
                quote: '"Lead qualification system improved our sales team productivity by 70%."',
                author: 'Robert Taylor',
                position: 'Sales Manager',
                company: 'FastTrack Solutions',
                logo: '⚡',
                result: '+70% Productivity'
              }
            ].map((testimonial, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: 'clamp(32px, 6vw, 40px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: '48px',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '16px',
                  fontFamily: 'serif'
                }}>
                  "
                </div>

                <blockquote style={{
                  fontSize: 'clamp(16px, 3.2vw, 18px)',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '24px',
                  fontStyle: 'italic'
                }}>
                  {testimonial.quote}
                </blockquote>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{
                      fontSize: 'clamp(14px, 2.8vw, 16px)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '2px'
                    }}>
                      {testimonial.author}
                    </div>
                    <div style={{
                      fontSize: 'clamp(12px, 2.4vw, 14px)',
                      color: 'rgba(255,255,255,0.6)',
                      marginBottom: '4px'
                    }}>
                      {testimonial.position}
                    </div>
                    <div style={{
                      fontSize: 'clamp(12px, 2.4vw, 14px)',
                      color: '#0071E3',
                      fontWeight: 600
                    }}>
                      {testimonial.company}
                    </div>
                  </div>

                  <div style={{
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      marginBottom: '4px'
                    }}>
                      {testimonial.logo}
                    </div>
                    <div style={{
                      fontSize: 'clamp(12px, 2.4vw, 14px)',
                      fontWeight: 700,
                      color: '#00FF41',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {testimonial.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Integrations */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Tools & Platforms
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              We work with industry-leading platforms to deliver exceptional results
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 'clamp(32px, 5vw, 48px)',
            marginBottom: 'clamp(60px, 10vw, 80px)'
          }}>
            {[
              {
                name: 'HubSpot',
                logo: '🔵',
                description: 'Complete CRM and marketing automation platform'
              },
              {
                name: 'Salesforce',
                logo: '🟦',
                description: 'Enterprise-grade CRM with advanced analytics'
              },
              {
                name: 'Zoho CRM',
                logo: '🟠',
                description: 'Affordable yet powerful CRM solution'
              },
              {
                name: 'Power BI',
                logo: '🟡',
                description: 'Advanced business intelligence and analytics'
              },
              {
                name: 'Google Analytics',
                logo: '📊',
                description: 'Comprehensive web analytics and insights'
              },
              {
                name: 'LinkedIn Ads',
                logo: '💼',
                description: 'Professional networking and B2B advertising'
              }
            ].map((tool, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: 'clamp(24px, 4vw, 32px)',
                  background: '#F8F9FA',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  {tool.logo}
                </div>
                <h3 style={{
                  fontSize: 'clamp(18px, 3.5vw, 20px)',
                  fontWeight: 700,
                  color: '#1D1D1F',
                  marginBottom: '8px'
                }}>
                  {tool.name}
                </h3>
                <p style={{
                  fontSize: 'clamp(13px, 2.6vw, 14px)',
                  color: '#6E6E73',
                  lineHeight: 1.5
                }}>
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#000000'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Case Studies
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Real-world examples of transformation and growth
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
            gap: 'clamp(32px, 5vw, 48px)'
          }}>
            {[
              {
                title: 'E-commerce Platform Sales Growth',
                description: 'How we increased sales by 60% through lead funnel optimization and automated marketing campaigns.',
                results: [
                  '60% increase in monthly revenue',
                  '45% reduction in customer acquisition cost',
                  '3x improvement in lead-to-customer conversion'
                ],
                industry: 'E-commerce',
                duration: '4 months'
              },
              {
                title: 'CRM Integration Success',
                description: 'Streamlined sales process and improved team productivity by implementing comprehensive CRM automation.',
                results: [
                  '30% faster sales cycle completion',
                  '70% reduction in manual data entry',
                  '95% improvement in lead follow-up accuracy'
                ],
                industry: 'B2B Software',
                duration: '3 months'
              },
              {
                title: 'Market Expansion Strategy',
                description: 'Identified and captured new market opportunities resulting in significant revenue growth.',
                results: [
                  '$2.5M additional annual revenue',
                  'Entry into 3 new market segments',
                  '25% increase in market share'
                ],
                industry: 'Manufacturing',
                duration: '6 months'
              },
              {
                title: 'Lead Generation Campaign',
                description: 'Multi-channel lead generation strategy that transformed their inbound marketing performance.',
                results: [
                  '400% increase in qualified leads',
                  '65% improvement in lead quality score',
                  '50% reduction in cost per lead'
                ],
                industry: 'Professional Services',
                duration: '5 months'
              }
            ].map((study, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: 'clamp(32px, 6vw, 40px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}>
                  {study.industry}
                </div>

                <h3 style={{
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  {study.title}
                </h3>

                <p style={{
                  fontSize: 'clamp(14px, 2.8vw, 16px)',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  {study.description}
                </p>

                <div style={{ marginBottom: '20px' }}>
                  {study.results.map((result, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: idx < study.results.length - 1 ? '8px' : '0'
                      }}
                    >
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#00FF41',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontSize: 'clamp(13px, 2.6vw, 14px)',
                        color: '#FFFFFF',
                        fontWeight: 500
                      }}>
                        {result}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    fontSize: 'clamp(12px, 2.4vw, 13px)',
                    color: 'rgba(255,255,255,0.6)',
                    fontWeight: 600
                  }}>
                    Duration: {study.duration}
                  </div>
                  <div style={{
                    fontSize: 'clamp(12px, 2.4vw, 13px)',
                    color: '#00FF41',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Success Story
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        textAlign: 'center',
        background: '#FFFFFF'
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
          Ready to Transform Your Sales?
        </h2>
        <p style={{
          fontSize: 'clamp(16px, 3.5vw, 20px)',
            lineHeight: 1.6,
          color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            padding: '0 16px'
          }}>
            Let's build a winning sales strategy together and unlock your business's growth potential.
          </p>
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 16px'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="xl" rightIcon={<ArrowRight size={22} />}>
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

export default BusinessSalesPage;

