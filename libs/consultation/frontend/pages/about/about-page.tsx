import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  RocketIcon,
  GlobeIcon,
  ZapIcon,
  LightbulbIcon,
  CodeIcon,
  TrendingUpIcon,
  PaletteIcon,
  TargetIcon,
  UsersIcon,
  BookOpenIcon,
  ScaleIcon,
  MapPinIcon,
  StarIcon,
  HandshakeIcon
} from '../../components/icons';
import GlobeWebGL from '../../components/ui/GlobeWebGL';

/**
 * COMPLETE APPLE REDESIGN - About Page
 *
 * Comprehensive about page featuring:
 * - Company overview and services
 * - Mission and vision
 * - Leadership/Representative section
 * - Interactive team sections by department
 * - Additional company highlights
 */

export const AboutPage: React.FC = () => {
  // Performance details state
  const [activePerfItem, setActivePerfItem] = React.useState<string>('bundle');
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);

  // Team section state
  const [activeTeam, setActiveTeam] = React.useState<string | null>(null);

  // Toggle team view
  const toggleTeamView = (teamName: string) => {
    setActiveTeam(activeTeam === teamName ? null : teamName);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* Hero Section */}
      <section style={{
        padding: '140px 24px 100px',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        backgroundColor: 'transparent',
        position: 'relative'
      }}>
        {/* Subtle background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230071E3' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: 'none'
          }}
        />

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1D1D1F',
            marginBottom: '32px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            About WatchThis
          </h1>

          <p style={{
            fontSize: 'clamp(20px, 2.5vw, 24px)',
            lineHeight: 1.6,
            color: '#4D4D50',
            marginBottom: '48px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
          }}>
            Empowering businesses with innovative digital solutions since 2014. We transform ideas into successful products through expert consultation and cutting-edge technology.
          </p>

          {/* Company badges */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            {[
              { icon: <RocketIcon size={18} />, label: 'Innovation First' },
              { icon: <LightbulbIcon size={18} />, label: 'Expert Consultation' },
              { icon: <GlobeIcon size={18} />, label: 'Global Reach' },
              { icon: <ZapIcon size={18} />, label: 'Fast Delivery' }
            ].map((badge, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: 9999,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.8))',
                  border: '1px solid rgba(0,113,227,0.15)',
                  fontSize: '15px',
                  color: '#0071E3',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,113,227,0.08)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              >
                {badge.icon}
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section style={{
        padding: '120px 24px',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '80px',
            alignItems: 'center'
          }}>
            {/* Mission Card */}
            <div style={{
              position: 'relative',
              backgroundImage: 'linear-gradient(145deg, rgba(0,113,227,0.05), rgba(0,136,255,0.05))',
              backgroundColor: 'transparent',
              borderRadius: 24,
              padding: '48px 40px',
              boxShadow: '0 20px 40px rgba(0,113,227,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(0,113,227,0.12)',
              overflow: 'hidden'
            }}>
              {/* Subtle gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'radial-gradient(300px 200px at 50% 0%, rgba(0,113,227,0.08), transparent 50%)'
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  padding: '8px 16px',
                  borderRadius: 9999,
                  backgroundImage: 'linear-gradient(135deg, rgba(0,113,227,0.12), rgba(0,136,255,0.12))',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(0,113,227,0.20)'
                }}>
                  <span style={{
                    width: 10,
                    height: 10,
                    borderRadius: 9999,
                    backgroundImage: 'linear-gradient(135deg, #0071E3, #0088FF)',
                    backgroundColor: 'transparent',
                    boxShadow: '0 0 0 3px rgba(0,113,227,0.25)'
                  }} />
                  <span style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, #1D1D1F, #0071E3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Our Mission
                  </span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  fontWeight: 700,
                  color: '#1D1D1F',
                  marginBottom: '20px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  lineHeight: 1.2
                }}>
                  Empowering Digital Transformation
                </h2>

                <p style={{
                  fontSize: '18px',
                  lineHeight: 1.7,
                  color: '#4D4D50',
                  marginBottom: '24px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  To bridge the gap between innovative ideas and successful digital products. We empower businesses to thrive in the digital age through expert consultation, cutting-edge technology, and strategic partnerships.
                </p>

                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#6E6E73',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Our experienced team brings decades of combined expertise in software development, digital marketing, and business strategy to transform your vision into reality.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div style={{
              position: 'relative',
              backgroundImage: 'linear-gradient(145deg, rgba(52,199,89,0.05), rgba(48,209,88,0.05))',
              backgroundColor: 'transparent',
              borderRadius: 24,
              padding: '48px 40px',
              boxShadow: '0 20px 40px rgba(52,199,89,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(52,199,89,0.12)',
              overflow: 'hidden'
            }}>
              {/* Subtle gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'radial-gradient(300px 200px at 50% 0%, rgba(52,199,89,0.08), transparent 50%)'
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  padding: '8px 16px',
                  borderRadius: 9999,
                  background: 'linear-gradient(135deg, rgba(52,199,89,0.12), rgba(48,209,88,0.12))',
                  border: '1px solid rgba(52,199,89,0.20)'
                }}>
                  <span style={{
                    width: 10,
                    height: 10,
                    borderRadius: 9999,
                    backgroundImage: 'linear-gradient(135deg, #34C759, #30D158)',
                    backgroundColor: 'transparent',
                    boxShadow: '0 0 0 3px rgba(52,199,89,0.25)'
                  }} />
                  <span style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, #1D1D1F, #34C759)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Our Vision
                  </span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  fontWeight: 700,
                  color: '#1D1D1F',
                  marginBottom: '20px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  lineHeight: 1.2
                }}>
                  Shaping the Future of Business
                </h2>

                <p style={{
                  fontSize: '18px',
                  lineHeight: 1.7,
                  color: '#4D4D50',
                  marginBottom: '24px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  To be the leading force in digital transformation, setting new standards for innovation and excellence. We envision a world where every business can leverage technology to achieve extraordinary growth and impact.
                </p>

                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#6E6E73',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Through continuous innovation, strategic partnerships, and unwavering commitment to our clients' success, we aim to redefine what's possible in the digital landscape.
                </p>
              </div>
            </div>
          </div>

          {/* Company Values Section */}
          <div style={{
            marginTop: '80px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 600,
              color: '#1D1D1F',
              marginBottom: '48px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Our Core Values
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {[
                {
                  icon: <StarIcon size={48} />,
                  title: 'Excellence',
                  desc: 'We pursue perfection in every project, delivering solutions that exceed expectations and drive real results.',
                  color: '#0071E3'
                },
                {
                  icon: <LightbulbIcon size={48} />,
                  title: 'Innovation',
                  desc: 'We embrace cutting-edge technologies and creative thinking to solve complex challenges and pioneer new solutions.',
                  color: '#34C759'
                },
                {
                  icon: <HandshakeIcon size={48} />,
                  title: 'Partnership',
                  desc: 'We build lasting relationships based on trust, transparency, and mutual success with our clients and team.',
                  color: '#FF9500'
                },
                {
                  icon: <TargetIcon size={48} />,
                  title: 'Results',
                  desc: 'We focus on measurable outcomes, ensuring every project delivers tangible value and sustainable growth.',
                  color: '#AF52DE'
                }
              ].map((value, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
                    borderRadius: 20,
                    padding: '32px 24px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                    transition: 'all 250ms ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 35px ${value.color}25, inset 0 1px 0 rgba(255,255,255,0.9)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
                  }}
                >
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '16px'
                  }}>
                    {value.icon}
                  </div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1D1D1F',
                    marginBottom: '12px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    {value.title}
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#4D4D50',
                    margin: 0,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section style={{
        padding: '120px 24px',
        backgroundImage: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        backgroundColor: 'transparent',
        position: 'relative'
      }}>
        {/* Subtle background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230071E3' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: 'none'
          }}
        />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
              padding: '12px 24px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(0,113,227,0.12), rgba(0,136,255,0.12))',
              border: '1px solid rgba(0,113,227,0.20)',
              boxShadow: '0 4px 16px rgba(0,113,227,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}>
              <span style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: 'linear-gradient(135deg, #0071E3, #0088FF)',
                boxShadow: '0 0 0 4px rgba(0,113,227,0.25)'
              }} />
              <span style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #1D1D1F, #0071E3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Leadership
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(40px, 5vw, 56px)',
              fontWeight: 700,
              color: '#1D1D1F',
              margin: 0,
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Meet Our Founder
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#4D4D50',
              margin: '0 auto',
              maxWidth: '600px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: 1.6
            }}>
              Leading innovation and driving digital transformation for over a decade
            </p>
          </div>

          {/* Representative Profile */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '64px',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Profile Image */}
            <div style={{
              position: 'relative',
              width: '300px',
              height: '400px',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,113,227,0.15), 0 10px 25px rgba(0,0,0,0.08)',
              background: 'linear-gradient(145deg, #0071E3, #0088FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Ilija's Profile Photo */}
              <img
                src="/watchthis/Ilija.jpeg"
                alt="Ilija Jovanovic - Founder & Chief Sales Officer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
              />

              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }} />
            </div>

            {/* Bio Content */}
            <div style={{
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(400px 200px at 50% 50%, rgba(0,113,227,0.1), transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#1D1D1F',
                  marginBottom: '8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  Ilija Jovanović
                </h3>

                <p style={{
                  fontSize: '18px',
                  color: '#0071E3',
                  fontWeight: 600,
                  marginBottom: '24px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  Founder & Chief Sales Officer
                </p>

                <div style={{
                  fontSize: '17px',
                  lineHeight: 1.7,
                  color: '#4D4D50',
                  marginBottom: '32px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  <p style={{ marginBottom: '16px' }}>
                    Ilija Jovanović is a seasoned sales and marketing executive with over 12 years of experience driving revenue growth and market expansion for technology companies. As the founder of WatchThis, he brings a unique blend of strategic vision and hands-on execution to every client engagement.
                  </p>

                  <p style={{ marginBottom: '16px' }}>
                    His expertise spans B2B sales strategy, digital marketing optimization, and customer acquisition funnels. Ilija has successfully led sales teams through multiple funding rounds and product launches, consistently achieving 200%+ year-over-year growth targets while building lasting client relationships.
                  </p>

                  <p>
                    With a proven track record in consultative selling and market positioning, Ilija excels at translating complex technical solutions into compelling business value propositions. His leadership in sales enablement and go-to-market strategies has helped numerous SaaS companies establish dominant market positions in competitive landscapes.
                  </p>
                </div>

                {/* Key achievements */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  {[
                    { label: '15+ Years', desc: 'Industry Experience' },
                    { label: '500+', desc: 'Projects Delivered' },
                    { label: '50+', desc: 'Team Members Led' },
                    { label: '25+', desc: 'Countries Served' }
                  ].map((achievement, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(0,113,227,0.05)',
                        borderRadius: 12,
                        padding: '16px 12px',
                        textAlign: 'center',
                        border: '1px solid rgba(0,113,227,0.1)'
                      }}
                    >
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 800,
                        color: '#0071E3',
                        marginBottom: '4px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                      }}>
                        {achievement.label}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#4D4D50',
                        fontWeight: 500,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                      }}>
                        {achievement.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '100px 24px',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0,113,227,0.08)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            textAlign: 'center',
            marginBottom: '64px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            By the Numbers
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px'
          }}>
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Completed' },
              { value: '50+', label: 'Team Members' },
              { value: '98%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
                borderRadius: 20,
                padding: '40px 24px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                transition: 'all 250ms ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 35px rgba(0,113,227,0.12), inset 0 1px 0 rgba(255,255,255,0.9)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
              }}>
                <div style={{
                  fontSize: '56px',
                  fontWeight: 800,
                  color: '#0071E3',
                  marginBottom: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#4D4D50',
                  fontWeight: 600,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{
        padding: '120px 24px',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        position: 'relative'
      }}>
        {/* Subtle background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230071E3' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: 'none'
          }}
        />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
              padding: '12px 24px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(0,113,227,0.12), rgba(0,136,255,0.12))',
              border: '1px solid rgba(0,113,227,0.20)',
              boxShadow: '0 4px 16px rgba(0,113,227,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}>
              <span style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: 'linear-gradient(135deg, #0071E3, #0088FF)',
                boxShadow: '0 0 0 4px rgba(0,113,227,0.25)'
              }} />
              <span style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #1D1D1F, #0071E3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Our Team
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(40px, 5vw, 56px)',
              fontWeight: 700,
              color: '#1D1D1F',
              margin: 0,
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Meet the Experts Behind Our Success
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#4D4D50',
              margin: '0 auto',
              maxWidth: '600px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: 1.6
            }}>
              Our diverse team of specialists brings together decades of experience across technology, strategy, and creative design
            </p>
          </div>

          {/* Department Sections */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {[
              {
                name: 'Development',
                icon: <CodeIcon size={28} />,
                color: '#0071E3',
                count: 2,
                description: 'Backend and full‑stack engineers building robust, scalable systems',
                members: [
                  {
                    name: 'Aleksandra Gerić',
                    role: 'Backend Engineer (NestJS)',
                    bio: 'A passionate backend developer with many years of experience designing and delivering reliable server‑side systems. Aleksandra specializes in NestJS, where she builds clean, testable architectures and high‑performance APIs. She is equally comfortable working across other backend languages and ecosystems, adapting quickly to project needs while keeping code quality and scalability at the forefront.',
                    image: '/watchthis/Aleksandra.jpeg'
                  },
                  {
                    name: 'Radomir Popović',
                    role: 'Full‑Stack Developer',
                    bio: 'A versatile full‑stack engineer with rich experience across modern web technologies. Radomir designs end‑to‑end solutions—from performant frontends to secure, scalable backends—and enjoys bridging product goals with pragmatic engineering. He thrives in fast‑moving environments, mentors teams, and continuously raises the bar for code quality and developer experience.',
                    image: '/watchthis/Radomir.jpeg'
                  }
                ]
              },
              {
                name: 'Marketing',
                icon: <TrendingUpIcon size={28} />,
                color: '#34C759',
                count: 8,
                description: 'Digital marketing strategists, SEO experts, and content creators driving growth',
                members: [
                  {
                    name: 'Ivana Đurić',
                    role: 'Head of Marketing',
                    bio: '10+ years in digital marketing strategy. Led campaigns that increased client revenue by 300% through data-driven approaches.',
                    image: 'ID'
                  },
                  {
                    name: 'Nikola Popović',
                    role: 'SEO Specialist',
                    bio: 'Technical SEO expert with 7+ years experience. Improved search rankings for 100+ websites, driving organic traffic growth.',
                    image: 'NP'
                  }
                ]
              },
              {
                name: 'Design',
                icon: <PaletteIcon size={28} />,
                color: '#FF9500',
                count: 6,
                description: 'UX/UI designers, brand strategists, and creative directors crafting exceptional experiences',
                members: [
                  {
                    name: 'Maja Ilić',
                    role: 'Senior UX Designer',
                    bio: 'User experience design expert with 9+ years creating intuitive interfaces. Led design for Fortune 500 companies and startups.',
                    image: 'MI'
                  },
                  {
                    name: 'Stefan Novak',
                    role: 'Brand Designer',
                    bio: 'Creative director specializing in brand identity and visual communication. 6+ years creating memorable brand experiences.',
                    image: 'SN'
                  }
                ]
              },
              {
                name: 'Strategy',
                icon: <TargetIcon size={28} />,
                color: '#AF52DE',
                count: 5,
                description: 'Business consultants, product strategists, and innovation leads shaping digital transformation',
                members: [
                  {
                    name: 'Lena Radović',
                    role: 'Strategy Director',
                    bio: 'Business strategy consultant with 12+ years experience. Led digital transformation initiatives for enterprise clients.',
                    image: 'LR'
                  },
                  {
                    name: 'Vladimir Mitić',
                    role: 'Product Strategist',
                    bio: 'Product strategy expert with 8+ years experience. Helped launch 20+ successful digital products from concept to market.',
                    image: 'VM'
                  }
                ]
              }
            ].map((dept, deptIndex) => (
              <div
                key={deptIndex}
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
                  borderRadius: 24,
                  padding: '32px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                  transition: 'all 300ms ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 35px ${dept.color}25, inset 0 1px 0 rgba(255,255,255,0.9)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
                }}
              >
                {/* Subtle gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(200px 150px at 50% 0%, ${dept.color}15, transparent 60%)`
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Department Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontSize: '28px'
                    }}>
                      {dept.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#1D1D1F',
                        margin: 0,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                      }}>
                        {dept.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: dept.color,
                        fontWeight: 600,
                        margin: 0,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                      }}>
                        {dept.count} team members
                      </p>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#4D4D50',
                    marginBottom: '24px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    {dept.description}
                  </p>

                  {/* Team Members Preview */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    {dept.members.slice(0, 3).map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${dept.color}, ${dept.color}dd)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          border: '2px solid rgba(255,255,255,0.8)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {typeof member.image === 'string' && member.image.startsWith('/') ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      member.image
                    )}
                      </div>
                    ))}
                    {dept.members.length > 3 && (
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#4D4D50',
                        border: '2px solid rgba(255,255,255,0.8)'
                      }}>
                        +{dept.members.length - 3}
                      </div>
                    )}
                  </div>

                  {/* View Team Button */}
                  <button
                    onClick={() => toggleTeamView(dept.name)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: `1px solid ${dept.color}30`,
                      background: activeTeam === dept.name ? dept.color : 'rgba(255,255,255,0.8)',
                      color: activeTeam === dept.name ? '#FFFFFF' : dept.color,
                      fontWeight: 600,
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTeam !== dept.name) {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = dept.color;
                        (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTeam !== dept.name) {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.8)';
                        (e.currentTarget as HTMLButtonElement).style.color = dept.color;
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {activeTeam === dept.name ? 'Hide Team' : `View ${dept.name} Team`}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Team View */}
          {activeTeam && (
            <div style={{
              marginTop: '32px',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))',
              borderRadius: 24,
              padding: '40px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
              animation: 'fadeInUp 300ms ease-out'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  color: [
                    { name: 'Development', color: '#0071E3' },
                    { name: 'Marketing', color: '#34C759' },
                    { name: 'Design', color: '#FF9500' },
                    { name: 'Strategy', color: '#AF52DE' }
                  ].find(dept => dept.name === activeTeam)?.color
                }}>
                  {[
                    { name: 'Development', icon: <CodeIcon size={32} /> },
                    { name: 'Marketing', icon: <TrendingUpIcon size={32} /> },
                    { name: 'Design', icon: <PaletteIcon size={32} /> },
                    { name: 'Strategy', icon: <TargetIcon size={32} /> }
                  ].find(dept => dept.name === activeTeam)?.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#1D1D1F',
                    margin: 0,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    {activeTeam} Team
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#4D4D50',
                    margin: 0,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    Meet the talented individuals driving innovation in {activeTeam.toLowerCase()}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {[
                  {
                    name: 'Development',
                    members: [
                      {
                        name: 'Aleksandra Gerić',
                        role: 'Backend Engineer (NestJS)',
                        bio: 'Passionate backend engineer focused on building robust, maintainable APIs and event‑driven services. Primary stack is NestJS, backed by strong experience with SQL/NoSQL databases, testing, and CI/CD.',
                        image: '/watchthis/Aleksandra.jpeg',
                        achievements: ['NestJS Specialist', 'Clean Architecture', 'API Performance']
                      },
                      {
                        name: 'Radomir Popović',
                        role: 'Full‑Stack Developer',
                        bio: 'Full‑stack developer delivering end‑to‑end features—from accessible, fast UIs to reliable backend services. Comfortable across multiple frameworks and cloud tooling, with a strong focus on DX and scalability.',
                        image: '/watchthis/Radomir.jpeg',
                        achievements: ['End‑to‑End Ownership', 'Performance Focus', 'Mentorship']
                      }
                    ]
                  },
                  {
                    name: 'Marketing',
                    members: [
                      {
                        name: 'Ivana Đurić',
                        role: 'Head of Marketing',
                        bio: '10+ years in digital marketing strategy. Led campaigns that increased client revenue by 300% through data-driven approaches.',
                        image: 'ID',
                        achievements: ['300% Revenue Growth', 'Marketing Strategy', 'Team Leadership']
                      },
                      {
                        name: 'Nikola Popović',
                        role: 'SEO Specialist',
                        bio: 'Technical SEO expert with 7+ years experience. Improved search rankings for 100+ websites, driving organic traffic growth.',
                        image: 'NP',
                        achievements: ['100+ SEO Projects', 'Technical SEO', 'Organic Growth']
                      }
                    ]
                  },
                  {
                    name: 'Design',
                    members: [
                      {
                        name: 'Maja Ilić',
                        role: 'Senior UX Designer',
                        bio: 'User experience design expert with 9+ years creating intuitive interfaces. Led design for Fortune 500 companies and startups.',
                        image: 'MI',
                        achievements: ['Fortune 500 Clients', 'UX Research', 'Design Systems']
                      },
                      {
                        name: 'Stefan Novak',
                        role: 'Brand Designer',
                        bio: 'Creative director specializing in brand identity and visual communication. 6+ years creating memorable brand experiences.',
                        image: 'SN',
                        achievements: ['Brand Identity', 'Visual Design', 'Creative Direction']
                      }
                    ]
                  },
                  {
                    name: 'Strategy',
                    members: [
                      {
                        name: 'Lena Radović',
                        role: 'Strategy Director',
                        bio: 'Business strategy consultant with 12+ years experience. Led digital transformation initiatives for enterprise clients.',
                        image: 'LR',
                        achievements: ['Enterprise Clients', 'Digital Transformation', 'Strategic Planning']
                      },
                      {
                        name: 'Vladimir Mitić',
                        role: 'Product Strategist',
                        bio: 'Product strategy expert with 8+ years experience. Helped launch 20+ successful digital products from concept to market.',
                        image: 'VM',
                        achievements: ['20+ Product Launches', 'Product Strategy', 'Market Analysis']
                      }
                    ]
                  }
                ].find(dept => dept.name === activeTeam)?.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
                      borderRadius: 20,
                      padding: '24px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                      transition: 'all 250ms ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
                    }}
                  >
                    {/* Profile Image */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${[
                        { name: 'Development', color: '#0071E3' },
                        { name: 'Marketing', color: '#34C759' },
                        { name: 'Design', color: '#FF9500' },
                        { name: 'Strategy', color: '#AF52DE' }
                      ].find(dept => dept.name === activeTeam)?.color}, ${[
                        { name: 'Development', color: '#0071E3' },
                        { name: 'Marketing', color: '#34C759' },
                        { name: 'Design', color: '#FF9500' },
                        { name: 'Strategy', color: '#AF52DE' }
                      ].find(dept => dept.name === activeTeam)?.color}dd)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '16px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      border: '3px solid rgba(255,255,255,0.8)'
                    }}>
                      {typeof member.image === 'string' && member.image.startsWith('/') ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        member.image
                      )}
                    </div>

                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#1D1D1F',
                      marginBottom: '4px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                    }}>
                      {member.name}
                    </h4>

                    <p style={{
                      fontSize: '14px',
                      color: '#0071E3',
                      fontWeight: 600,
                      marginBottom: '12px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}>
                      {member.role}
                    </p>

                    <p style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#4D4D50',
                      marginBottom: '16px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                    }}>
                      {member.bio}
                    </p>

                    {/* Achievements */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      {member.achievements.map((achievement, achIndex) => (
                        <span
                          key={achIndex}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 9999,
                            background: 'rgba(0,113,227,0.08)',
                            fontSize: '12px',
                            color: '#0071E3',
                            fontWeight: 500,
                            border: '1px solid rgba(0,113,227,0.15)'
                          }}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 24px',
        textAlign: 'center',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0,113,227,0.08)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Ready to Work With Our Expert Team?
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#4D4D50',
            marginBottom: '48px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
          }}>
            Join hundreds of businesses who trust our experienced team to deliver exceptional digital solutions and drive real results.
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
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section style={{
        padding: '120px 24px',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        position: 'relative'
      }}>
        {/* Subtle background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230071E3' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: 'none'
          }}
        />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
              padding: '12px 24px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(0,113,227,0.12), rgba(0,136,255,0.12))',
              border: '1px solid rgba(0,113,227,0.20)',
              boxShadow: '0 4px 16px rgba(0,113,227,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}>
              <span style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: 'linear-gradient(135deg, #0071E3, #0088FF)',
                boxShadow: '0 0 0 4px rgba(0,113,227,0.25)'
              }} />
              <span style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #1D1D1F, #0071E3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Company Culture
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(40px, 5vw, 56px)',
              fontWeight: 700,
              color: '#1D1D1F',
              margin: 0,
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Where Innovation Meets Excellence
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#4D4D50',
              margin: '0 auto',
              maxWidth: '600px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: 1.6
            }}>
              Our culture fosters creativity, collaboration, and continuous learning in a supportive environment
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                icon: <RocketIcon size={48} />,
                title: 'Innovation First',
                desc: 'We encourage bold ideas and calculated risks. Every team member has the freedom to innovate and experiment with new technologies and approaches.',
                color: '#0071E3'
              },
              {
                icon: <UsersIcon size={48} />,
                title: 'Collaborative Spirit',
                desc: 'Cross-functional teams work together seamlessly. We believe the best solutions come from diverse perspectives and open communication.',
                color: '#34C759'
              },
              {
                icon: <BookOpenIcon size={48} />,
                title: 'Continuous Learning',
                desc: 'Knowledge sharing is at our core. Weekly tech talks, mentorship programs, and conference sponsorships keep our team at the forefront of technology.',
                color: '#FF9500'
              },
              {
                icon: <ScaleIcon size={48} />,
                title: 'Work-Life Balance',
                desc: 'We prioritize mental health and well-being. Flexible hours, remote work options, and generous PTO ensure our team stays energized and productive.',
                color: '#AF52DE'
              }
            ].map((culture, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
                  borderRadius: 24,
                  padding: '32px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                  transition: 'all 300ms ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 35px ${culture.color}25, inset 0 1px 0 rgba(255,255,255,0.9)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
                }}
              >
                {/* Subtle gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(200px 150px at 50% 0%, ${culture.color}15, transparent 60%)`
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '20px'
                  }}>
                    {culture.icon}
                  </div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#1D1D1F',
                    marginBottom: '16px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    {culture.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#4D4D50',
                    margin: 0,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    {culture.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section style={{
        padding: '100px 24px',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 700,
              color: '#1D1D1F',
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Global Presence
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#4D4D50',
              margin: '0 auto',
              maxWidth: '500px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: 1.6
            }}>
              Serving clients worldwide with local expertise and global standards
            </p>
          </div>

          {/* Interactive WebGL Globe */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '80px'
          }}>
            <GlobeWebGL 
              size={450} 
              speed={0.15} 
              showMeridians={true} 
              nightMode={false} 
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                city: 'Belgrade',
                country: 'Serbia',
                icon: <MapPinIcon size={40} />,
                desc: 'Our headquarters and main development center',
                features: ['50+ Team Members', 'Full-Stack Development', '24/7 Support'],
                color: '#0071E3'
              },
              {
                city: 'New York',
                country: 'USA',
                icon: <MapPinIcon size={40} />,
                desc: 'Strategic partnerships and client relations',
                features: ['Business Development', 'Client Success', 'Market Research'],
                color: '#34C759'
              },
              {
                city: 'London',
                country: 'UK',
                icon: <MapPinIcon size={40} />,
                desc: 'European operations and enterprise clients',
                features: ['Enterprise Solutions', 'Consulting Services', 'Training Programs'],
                color: '#FF9500'
              },
              {
                city: 'Singapore',
                country: 'Singapore',
                icon: <MapPinIcon size={40} />,
                desc: 'Asia-Pacific hub for regional expansion',
                features: ['Regional Partnerships', 'Localization Services', 'APAC Market'],
                color: '#AF52DE'
              }
            ].map((location, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))',
                  borderRadius: 20,
                  padding: '28px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                  transition: 'all 250ms ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 35px ${location.color}25, inset 0 1px 0 rgba(255,255,255,0.9)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
                }}
              >
                {/* Subtle gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(150px 100px at 50% 0%, ${location.color}15, transparent 60%)`
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    marginBottom: '16px',
                    color: location.color
                  }}>
                    {location.icon}
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1D1D1F',
                    marginBottom: '4px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    {location.city}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: location.color,
                    fontWeight: 600,
                    marginBottom: '16px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    {location.country}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#4D4D50',
                    marginBottom: '20px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                  }}>
                    {location.desc}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    {location.features.map((feature, fi) => (
                      <span
                        key={fi}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 9999,
                          background: 'rgba(0,113,227,0.08)',
                          fontSize: '12px',
                          color: '#0071E3',
                          fontWeight: 500,
                          border: '1px solid rgba(0,113,227,0.15)'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
