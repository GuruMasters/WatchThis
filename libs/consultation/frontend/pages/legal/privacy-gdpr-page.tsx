import React from 'react';
import { PageLayout } from '../../components/layout/page-layout';
import { MainNavigation } from '../../components/layout/main-navigation';
import {
  Shield,
  Eye,
  Lock,
  Database,
  Mail,
  Phone,
  Globe,
  Users,
  CheckCircle,
  AlertTriangle,
  Calendar,
  FileText,
  Settings,
  Clock,
  ArrowRight,
  SparklesIcon
} from 'lucide-react';

/**
 * Privacy & GDPR Page
 * Comprehensive privacy policy with GDPR compliance information
 * Features animated sections and premium design
 */

// Mac Browser Window Component for Security Demo
const SecurityBrowserWindow: React.FC<{ title: string; url: string; content: string }> = ({ title, url, content }) => (
  <div style={{
    background: '#1E1E1E',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)'
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
        🔒 {url}
      </div>
    </div>
    {/* Browser Content - Secure Form Demo */}
    <div style={{
      background: '#FFFFFF',
      padding: 'clamp(20px, 4vw, 40px)',
      minHeight: 'clamp(200px, 50vw, 400px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '300px'
      }}>
        <div style={{
          fontSize: 'clamp(18px, 4vw, 24px)',
          fontWeight: 600,
          color: '#1D1D1F',
          marginBottom: '12px'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: 'clamp(14px, 3vw, 16px)',
          color: '#6E6E73',
          lineHeight: 1.5,
          marginBottom: '20px'
        }}>
          {content}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#0071E3',
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          fontWeight: 500
        }}>
          <Lock size={14} />
          <span>SSL Encrypted & Secure</span>
        </div>
      </div>
    </div>
  </div>
);

const PrivacyGdprPage: React.FC = () => {
  const lastUpdated = 'October 2025';

  const gdprPrinciples = [
    {
      title: 'Lawfulness, fairness and transparency',
      description: 'Your privacy is extremely important to us. We process your data in accordance with the law, fairly and transparently.',
      icon: Shield,
      details: [
        'Clear privacy policies and terms of use',
        'Explicit consent when required',
        'Legitimate business purposes',
        'Transparent data processing activities'
      ]
    },
    {
      title: 'Purpose limitation',
      description: 'We collect and use your data only for specific, explicit and legitimate purposes.',
      icon: Eye,
      details: [
        'Data used only for agreed purposes',
        'No reuse without your consent',
        'Clear purpose specification',
        'Limited data retention periods'
      ]
    },
    {
      title: 'Data minimization',
      description: 'We ensure that your personal data is adequate, relevant and limited to what is necessary.',
      icon: Database,
      details: [
        'Collect only necessary data',
        'Regular data reviews',
        'Data deletion when no longer needed',
        'Privacy by design principles'
      ]
    },
    {
      title: 'Accuracy and currency',
      description: 'We take all reasonable steps to ensure that your personal data is accurate and up-to-date.',
      icon: CheckCircle,
      details: [
        'Data accuracy verification',
        'Regular data quality checks',
        'User correction mechanisms',
        'Timely updates and corrections'
      ]
    },
    {
      title: 'Limited data retention',
      description: 'We store your data in a form that allows identification only for as long as necessary.',
      icon: Clock,
      details: [
        'Defined retention periods',
        'Automatic data deletion',
        'Regular cleanup processes',
        'Legal retention possibilities'
      ]
    },
    {
      title: 'Integrity and confidentiality',
      description: 'We process your data in a way that ensures appropriate data security.',
      icon: Lock,
      details: [
        'Encryption in transit and at rest',
        'Access control and authentication',
        'Regular security assessments',
        'Incident response procedures'
      ]
    }
  ];

  const collectedData = [
    {
      category: 'Basic Information',
      items: [
        'Full name',
        'Email address',
        'Contact phone',
        'Company name'
      ],
      purpose: 'Communication and identification'
    },
    {
      category: 'Project Information',
      items: [
        'Description of services requested',
        'Technical specifications',
        'Deadlines and budget',
        'Special requirements'
      ],
      purpose: 'Project implementation'
    },
    {
      category: 'Technical Information',
      items: [
        'IP address and location',
        'Device type and browser',
        'Cookies and analytics data',
        'Website visit time'
      ],
      purpose: 'Service improvement'
    }
  ];

  const securityMeasures = [
    {
      title: 'SSL/TLS Encryption',
      description: 'All data is transmitted over secure HTTPS connection with 256-bit encryption.',
      icon: Lock,
      details: [
        'End-to-end encryption',
        'SSL certificates from trusted providers',
        'Regular security checks',
        'Perfect Forward Secrecy (PFS)'
      ]
    },
    {
      title: 'Restricted data access',
      description: 'Only authorized personnel have access to your data with multiple levels of authentication.',
      icon: Shield,
      details: [
        'Role-based access',
        'Two-factor authentication (2FA)',
        'Regular access audits',
        'Automatic account locking'
      ]
    },
    {
      title: 'Data backups',
      description: 'We regularly create encrypted data backups with multiple locations.',
      icon: Database,
      details: [
        'Daily automatic backups',
        'Encrypted copies',
        'Geographically distributed locations',
        'Data restoration testing'
      ]
    },
    {
      title: 'Internal protocols',
      description: 'We adhere to strict internal security protocols and continuous employee training.',
      icon: Settings,
      details: [
        'Data security training',
        'Clean desk policies',
        'Social engineering protection procedures',
        'Regular security exercises'
      ]
    }
  ];

  const userRights = [
    {
      title: 'Right of access',
      description: 'You have the right to obtain confirmation as to whether we process your data and access to that data.',
      icon: Eye,
      details: [
        'Free access to your data',
        'Information about processing purposes',
        'Copy of data in structured format',
        'Clear information about your rights'
      ]
    },
    {
      title: 'Right to rectification',
      description: 'You have the right to rectify inaccurate personal data or to complete incomplete data.',
      icon: Settings,
      details: [
        'Correction of inaccurate information',
        'Completion of incomplete data',
        'Quick request processing',
        'Notification of corrections to recipients'
      ]
    },
    {
      title: 'Right to erasure',
      description: 'You have the right to have your data erased in certain circumstances (right to be forgotten).',
      icon: FileText,
      details: [
        'Erasure when data is no longer necessary',
        'Erasure when consent is withdrawn',
        'Erasure when processing is unlawful',
        'Notification to recipients about erasure'
      ]
    },
    {
      title: 'Right to restrict processing',
      description: 'You have the right to restrict the processing of your data in certain situations.',
      icon: Shield,
      details: [
        'Temporary restriction of processing',
        'Restriction during accuracy verification',
        'Restriction when processing is unlawful',
        'Restriction for legal claim purposes'
      ]
    },
    {
      title: 'Right to data portability',
      description: 'You have the right to receive your data in a structured, commonly used format.',
      icon: Database,
      details: [
        'Data in machine-readable format',
        'Transfer to another service provider',
        'Direct transfer between controllers',
        'Without disrupting service continuity'
      ]
    },
    {
      title: 'Right to object',
      description: 'You have the right to object to the processing of data for direct marketing purposes.',
      icon: Users,
      details: [
        'Objection to direct marketing',
        'Objection to automated decision-making',
        'Objection to profiling',
        'Special rights for minors'
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'GDPR Coordinator',
      value: 'busines.watch.this@gmail.com',
      description: 'For all data protection questions'
    }
  ];

  return (
    <>
      <MainNavigation />
      <PageLayout
        title="Privacy & GDPR - WatchThis"
        description="Your privacy is our priority. Learn how we protect your data in accordance with GDPR standards."
        showNavigation={false}
      >
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          padding: 'clamp(80px, 15vw, 140px) clamp(16px, 5vw, 24px)',
          background: 'linear-gradient(180deg, #1D1D1F 0%, #0a0a0f 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0, 113, 227, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 113, 227, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.3
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(0, 113, 227, 0.1)',
            border: '1px solid rgba(0, 113, 227, 0.3)',
            borderRadius: '50px',
            padding: '12px 24px',
            marginBottom: '32px'
          }}>
            <Shield size={20} color="#0071E3" />
            <span style={{
              color: '#0071E3',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              PRIVACY & GDPR PROTECTION
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(42px, 10vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Your Privacy is
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Our Responsibility
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 4vw, 22px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '800px',
            margin: '0 auto 40px'
          }}>
            As a company providing digital services, we are committed to protecting all personal and business data
            of our clients in accordance with the General Data Protection Regulation (GDPR).
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(12px, 2vw, 14px)',
            marginTop: '20px'
          }}>
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* GDPR Principles Section */}
      <section 
        className="gdpr-principles-section"
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px)',
          background: '#FFFFFF'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontWeight: 700,
              color: '#1D1D1F',
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
               Data Protection Principles
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              color: '#6E6E73',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              We process your data in accordance with the 6 fundamental GDPR principles
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(40px, 8vw, 60px)',
            border: '1px solid rgba(0, 113, 227, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 113, 227, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Pattern */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, rgba(0, 113, 227, 0.03) 0%, rgba(0, 212, 255, 0.03) 100%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              opacity: 0.6
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20%',
              right: '8%',
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, rgba(0, 200, 81, 0.03) 0%, rgba(0, 212, 255, 0.03) 100%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              opacity: 0.5
            }} />

            <div style={{
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid rgba(0, 113, 227, 0.1)'
            }}>
              {/* Table Header - Hidden on mobile */}
              <div 
                className="gdpr-table-header"
                style={{
                  background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
                  padding: '20px 24px',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1fr',
                  gap: '20px',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  letterSpacing: '0.5px'
                }}>
                  PRINCIP
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '0.5px'
                }}>
                  DESCRIPTION & PURPOSE
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '0.5px'
                }}>
                  KEY FEATURES
                </div>
              </div>

              {/* Table Body */}
              <div>
                {gdprPrinciples.map((principle, index) => (
                  <div key={index} style={{
                    opacity: 0,
                    animation: 'fadeInUp 1s ease forwards',
                    animationDelay: `${0.2 + index * 0.1}s`,
                    borderBottom: index < gdprPrinciples.length - 1 ? '1px solid rgba(0, 113, 227, 0.08)' : 'none',
                    background: index % 2 === 0 ? '#FFFFFF' : 'rgba(0, 113, 227, 0.02)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 113, 227, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : 'rgba(0, 113, 227, 0.02)';
                  }}>
                    <div 
                      className="gdpr-table-row"
                      style={{
                        padding: '24px',
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 1fr',
                        gap: '20px',
                        alignItems: 'flex-start'
                      }}
                    >
                      {/* Icon Column */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingTop: '4px'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0, 113, 227, 0.2)'
                        }}>
                          <principle.icon size={24} color="#FFFFFF" />
                        </div>
                      </div>

                      {/* Description Column */}
                      <div>
                        <h3 style={{
                          fontSize: 'clamp(16px, 3vw, 18px)',
                          fontWeight: 600,
                          color: '#1D1D1F',
                          marginBottom: '8px',
                          lineHeight: 1.3
                        }}>
                          {principle.title}
                        </h3>
                        <p style={{
                          fontSize: 'clamp(13px, 2.5vw, 14px)',
                          color: '#6E6E73',
                          lineHeight: 1.6,
                          margin: 0
                        }}>
                          {principle.description}
                        </p>
                      </div>

                      {/* Details Column */}
                      <div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}>
                          {principle.details.map((detail, idx) => (
                            <div key={idx} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '6px 10px',
                              background: 'rgba(0, 113, 227, 0.04)',
                              borderRadius: '6px',
                              border: '1px solid rgba(0, 113, 227, 0.1)',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(0, 113, 227, 0.08)';
                              e.currentTarget.style.transform = 'translateX(2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(0, 113, 227, 0.04)';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}>
                              <CheckCircle size={14} color="#0071E3" style={{ flexShrink: 0 }} />
                              <span style={{
                                fontSize: '13px',
                                color: '#6E6E73',
                                fontWeight: 500,
                                lineHeight: 1.4
                              }}>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Data We Collect Section */}
      <section 
        className="data-collection-section"
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px)',
          background: 'linear-gradient(180deg, #1D1D1F 0%, #0a0a0f 100%)'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
               What Data We Collect
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              We collect only information necessary for providing our services
            </p>
          </div>

          <div 
            className="data-collection-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
              gap: '30px'
            }}
          >
            {collectedData.map((category, index) => (
              <div 
                key={index} 
                className="data-category-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  {category.category}
                </h3>
                <p style={{
                  color: '#0071E3',
                  fontSize: '16px',
                  fontWeight: 500,
                  marginBottom: '20px'
                }}>
                  {category.purpose}
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {category.items.map((item, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                      fontSize: '16px',
                      color: 'rgba(255,255,255,0.9)'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#0071E3',
                        borderRadius: '50%'
                      }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Use Data Section */}
      <section 
        className="how-we-use-data-section"
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px)',
          background: '#FFFFFF'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div 
            className="grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
              gap: '60px',
              alignItems: 'center'
            }}
          >
            <div>
              <h2 style={{
                fontSize: 'clamp(32px, 8vw, 56px)',
                fontWeight: 700,
                color: '#1D1D1F',
                marginBottom: '24px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                 How We Use Data
              </h2>
              <p style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                color: '#6E6E73',
                lineHeight: 1.7,
                marginBottom: '30px'
              }}>
                Your data is used <strong>exclusively</strong> for collaboration and service provision purposes.
                We do not sell, share or misuse your information in any way.
              </p>
              <div 
                className="info-box"
                style={{
                  background: '#F8F9FA',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid rgba(0, 113, 227, 0.1)'
                }}
              >
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '16px'
                }}>
                  Our obligations to you:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#6E6E73' }}>
                    <CheckCircle size={20} color="#0071E3" />
                    <span>Transparency in data processing</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#6E6E73' }}>
                    <CheckCircle size={20} color="#0071E3" />
                    <span>No sharing with third parties without consent</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#6E6E73' }}>
                    <CheckCircle size={20} color="#0071E3" />
                    <span>No marketing use without consent</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6E6E73' }}>
                    <CheckCircle size={20} color="#0071E3" />
                    <span>Data deletion when no longer needed</span>
                  </li>
                </ul>
              </div>
            </div>
            <div style={{
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <SecurityBrowserWindow
                title="Secure Communication"
                url="watchthis.com/contact"
                content="Your messages and data are always protected with SSL encryption"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures Section */}
      <section 
        className="security-measures-section"
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px)',
          background: 'linear-gradient(180deg, #1D1D1F 0%, #0a0a0f 100%)'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontWeight: 700,
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
            
              <span style={{
                background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 25%, #00C851 50%, #00D4FF 75%, #0071E3 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'gradientShift 3s ease-in-out infinite',
                display: 'inline-block'
              }}>
               Data Security
              </span>
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              We have implemented multiple layers of protection to keep your data secure
            </p>
          </div>

          <div 
            className="security-measures-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              gap: '30px'
            }}
          >
            {securityMeasures.map((measure, index) => (
              <div 
                key={index} 
                className="security-measure-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 113, 227, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <measure.icon size={28} color="#FFFFFF" />
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '12px'
                }}>
                  {measure.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  {measure.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {measure.details.map((detail, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)'
                    }}>
                      <CheckCircle size={14} color="#0071E3" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Retention Section */}
      <section 
        className="data-retention-section"
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px)',
          background: '#FFFFFF'
        }}
      >
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 8vw, 56px)',
            fontWeight: 700,
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Data Retention Period
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            color: '#6E6E73',
            lineHeight: 1.6,
            marginBottom: '40px'
          }}>
            Client personal data is stored only as long as necessary for the execution of the agreed service
          </p>
          
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(40px, 8vw, 60px)',
            border: '1px solid rgba(0, 113, 227, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 113, 227, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background Pattern */}
            <div style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(0, 113, 227, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              opacity: 0.6
            }} />

            <div 
              className="data-retention-content"
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(30px, 5vw, 40px)'
              }}
            >
              {/* Tokom saradnje */}
              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.2s'
              }}>
                <h3 style={{
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px'
                }}>
                  During collaboration
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  color: '#6E6E73',
                  lineHeight: 1.7,
                  marginBottom: '16px'
                }}>
                  Data is stored during the project duration and warranty period. This includes all relevant 
                  information necessary for successful execution of agreed services, client communication and 
                  technical support provision. During this period, your data is fully protected and accessible 
                  only to authorized personnel directly involved in your project.
                </p>
              </div>

              {/* Zakonske obaveze */}
              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.4s'
              }}>
                <h3 style={{
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px'
                }}>
                  Legal obligations
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  color: '#6E6E73',
                  lineHeight: 1.7,
                  marginBottom: '16px'
                }}>
                  Some data is stored longer if required by law (invoices, contracts). This refers to 
                  documentation necessary for fulfilling tax obligations, accounting records 
                  and other legal requirements. This data is stored in accordance with domestic and international regulations, 
                  and access is limited to responsible persons for financial and legal business operations of the company.
                </p>
              </div>

              {/* Automatsko brisanje */}
              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.6s'
              }}>
                <h3 style={{
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px'
                }}>
                  Automatic deletion
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  color: '#6E6E73',
                  lineHeight: 1.7,
                  marginBottom: '16px'
                }}>
                  Data is automatically deleted after the retention period expires. Our system is configured to 
                  automatically identify and securely delete all data that has reached the final retention period. 
                  This process is executed regularly and includes secure deletion from all servers, backup systems 
                  and any other locations where data is stored, ensuring that your data cannot be 
                  recovered after deletion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Rights Section */}
      <section 
        className="user-rights-section"
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px)',
          background: 'linear-gradient(180deg, #1D1D1F 0%, #0a0a0f 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0, 113, 227, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 159, 64, 0.1) 0%, transparent 50%)',
          animation: 'float 20s ease-in-out infinite'
        }} />

        <div style={{
          maxWidth: '1200px',
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
              gap: '12px',
              background: 'rgba(0, 113, 227, 0.1)',
              border: '1px solid rgba(0, 113, 227, 0.3)',
              borderRadius: '50px',
              padding: '12px 24px',
              marginBottom: '32px'
            }}>
              <Shield size={20} color="#0071E3" />
              <span style={{
                color: '#0071E3',
                fontSize: 'clamp(14px, 3vw, 16px)',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                YOUR DATA RIGHTS
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontWeight: 700,
              marginBottom: '20px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
             
              <span style={{
                background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 25%, #00C851 50%, #00D4FF 75%, #0071E3 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'gradientShift 3s ease-in-out infinite',
                display: 'inline-block'
              }}>
              User Rights
              </span>
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              In accordance with GDPR, you have complete rights over your data
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '24px',
            padding: 'clamp(40px, 8vw, 60px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Floating particles animation */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '4px',
              height: '4px',
              background: '#0071E3',
              borderRadius: '50%',
              opacity: 0.6,
              animation: 'floatParticle 15s linear infinite'
            }} />
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '15%',
              width: '6px',
              height: '6px',
              background: '#FF9F40',
              borderRadius: '50%',
              opacity: 0.4,
              animation: 'floatParticle 12s linear infinite reverse'
            }} />
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '80%',
              width: '3px',
              height: '3px',
              background: '#00D4FF',
              borderRadius: '50%',
              opacity: 0.5,
              animation: 'floatParticle 18s linear infinite'
            }} />

            <div 
              className="user-rights-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(445px, 100%), 1fr))',
                gap: 'clamp(32px, 5vw, 48px)'
              }}
            >
              {/* Pravo na pristup */}
              <div 
                className="user-right-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: 'clamp(24px, 4vw, 32px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  opacity: 0,
                  animation: 'fadeInUp 1s ease forwards',
                  animationDelay: '0.2s',
                  transition: 'all 0.3s ease'
                }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 113, 227, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Eye size={24} color="#FFFFFF" />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 3.5vw, 24px)',
                    fontWeight: 600,
                    color: '#FFFFFF'
                  }}>
                    Right of access
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.7,
                  fontSize: 'clamp(13px, 2.5vw, 15px)',
                  marginBottom: '16px'
                }}>
                  You have the right to obtain confirmation as to whether we process your data and access to that data. 
                  This includes free access to your data, information about processing purposes, a copy of data 
                  in structured format and clear information about your rights. You can request detailed 
                  information about how and why we use your data, including information about who 
                  has access to your data and how it is used in our systems.
                </p>
              </div>

              {/* Pravo na ispravku */}
              <div 
                className="user-right-card"
                style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: 'clamp(24px, 4vw, 32px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.4s',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 159, 64, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #FF9F40 0%, #FF6B35 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Settings size={24} color="#FFFFFF" />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 3.5vw, 24px)',
                    fontWeight: 600,
                    color: '#FFFFFF'
                  }}>
                    Right to rectification
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.7,
                  fontSize: 'clamp(13px, 2.5vw, 15px)',
                  marginBottom: '16px'
                }}>
                  You have the right to rectify inaccurate personal data or to complete incomplete data. 
                  This includes correction of inaccurate information, completion of incomplete data, quick processing 
                  of requests and notification of corrections to recipients. You can request updates to any 
                  data relating to you, including contact information, addresses, personal details 
                  and any other information you consider inaccurate or outdated.
                </p>
              </div>

              {/* Pravo na brisanje */}
              <div 
                className="user-right-card"
                style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: 'clamp(24px, 4vw, 32px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.6s',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(229, 62, 62, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileText size={24} color="#FFFFFF" />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 3.5vw, 24px)',
                    fontWeight: 600,
                    color: '#FFFFFF'
                  }}>
                    Right to erasure
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.7,
                  fontSize: 'clamp(13px, 2.5vw, 15px)',
                  marginBottom: '16px'
                }}>
                  You have the right to have your data erased in certain circumstances (right to be forgotten). 
                  This includes erasure when data is no longer necessary, when consent is withdrawn, 
                  when processing is unlawful and notification to recipients about erasure. Your data will be 
                  securely deleted from all our systems, including secure deletion from all servers, 
                  backup systems and any other locations where your data may be stored.
                </p>
              </div>

              {/* Pravo na ograničenje obrade */}
              <div 
                className="user-right-card"
                style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: 'clamp(24px, 4vw, 32px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.8s',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(159, 122, 234, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Shield size={24} color="#FFFFFF" />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 3.5vw, 24px)',
                    fontWeight: 600,
                    color: '#FFFFFF'
                  }}>
                    Right to restrict processing
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.7,
                  fontSize: 'clamp(13px, 2.5vw, 15px)',
                  marginBottom: '16px'
                }}>
                  You have the right to restrict the processing of your data in certain situations. 
                  This includes temporary restriction of processing, restriction during accuracy verification, 
                  restriction when processing is unlawful and restriction for legal claim purposes. 
                  Your data will be stored but will not be further processed, allowing you 
                  to maintain control over your data until any dispute or issue is resolved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Policy Section */}
      <section 
        className="cookie-policy-section"
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px)',
          background: 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(0, 113, 227, 0.1)',
            border: '1px solid rgba(0, 113, 227, 0.2)',
            borderRadius: '50px',
            padding: '12px 24px',
            marginBottom: '32px'
          }}>
            <Settings size={20} color="#0071E3" />
            <span style={{
              color: '#0071E3',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              COOKIE MANAGEMENT
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(32px, 8vw, 56px)',
            fontWeight: 700,
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Cookie Policy
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            color: '#6E6E73',
            lineHeight: 1.6,
            marginBottom: '50px',
            maxWidth: '700px',
            margin: '0 auto 50px'
          }}>
            Cookies are used exclusively for analytics and improving your experience
          </p>
          <div 
            className="cookie-policy-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))',
              gap: '40px'
            }}
          >
            <div 
              className="cookie-policy-card"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
                borderRadius: '20px',
                padding: '40px',
                border: '1px solid rgba(0, 113, 227, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 113, 227, 0.06)',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 113, 227, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 113, 227, 0.06)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #0071E3 0%, #00D4FF 100%)'
              }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 113, 227, 0.2)'
                }}>
                  <Database size={24} color="#FFFFFF" />
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  margin: 0
                }}>
                  Types of cookies
                </h3>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#6E6E73',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                We use different types of cookies to improve the functionality of our website and your user experience.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px', color: '#6E6E73' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(0, 113, 227, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckCircle size={18} color="#0071E3" />
                  </div>
                  <div>
                    <strong style={{ color: '#1D1D1F', fontSize: '16px' }}>Essential cookies for website functionality</strong>
                    <div style={{ fontSize: '14px', marginTop: '6px', lineHeight: 1.5 }}>
                      Necessary for basic website functionality, including navigation and access to secure areas.
                    </div>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px', color: '#6E6E73' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(0, 113, 227, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckCircle size={18} color="#0071E3" />
                  </div>
                  <div>
                    <strong style={{ color: '#1D1D1F', fontSize: '16px' }}>Analytics cookies for service improvement</strong>
                    <div style={{ fontSize: '14px', marginTop: '6px', lineHeight: 1.5 }}>
                      Help us understand how users use the website so we can improve it.
                    </div>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', color: '#6E6E73' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(0, 113, 227, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckCircle size={18} color="#0071E3" />
                  </div>
                  <div>
                    <strong style={{ color: '#1D1D1F', fontSize: '16px' }}>Functional cookies for better user experience</strong>
                    <div style={{ fontSize: '14px', marginTop: '6px', lineHeight: 1.5 }}>
                      Allow the website to remember your choices and adapt content to your needs.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(0, 113, 227, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 113, 227, 0.06)',
              textAlign: 'left',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 113, 227, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 113, 227, 0.06)';
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(90deg, #FF9F40 0%, #FF6B35 100%)'
              }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #FF9F40 0%, #FF6B35 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(255, 159, 64, 0.3)'
                }}>
                  <Settings size={24} color="#FFFFFF" />
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  margin: 0
                }}>
                  Your control
                </h3>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#6E6E73',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                You have complete control over cookies and can manage them according to your needs.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px', color: '#6E6E73' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255, 159, 64, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckCircle size={18} color="#FF9F40" />
                  </div>
                  <div>
                    <strong style={{ color: '#1D1D1F', fontSize: '16px' }}>You can accept or reject cookies</strong>
                    <div style={{ fontSize: '14px', marginTop: '6px', lineHeight: 1.5 }}>
                      Cookie banner allows you to choose which cookies you want to accept.
                    </div>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px', color: '#6E6E73' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255, 159, 64, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckCircle size={18} color="#FF9F40" />
                  </div>
                  <div>
                    <strong style={{ color: '#1D1D1F', fontSize: '16px' }}>Control through browser settings</strong>
                    <div style={{ fontSize: '14px', marginTop: '6px', lineHeight: 1.5 }}>
                      Most browsers allow blocking or deleting cookies through settings.
                    </div>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', color: '#6E6E73' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255, 159, 64, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <CheckCircle size={18} color="#FF9F40" />
                  </div>
                  <div>
                    <strong style={{ color: '#1D1D1F', fontSize: '16px' }}>Notification on first website visit</strong>
                    <div style={{ fontSize: '14px', marginTop: '6px', lineHeight: 1.5 }}>
                      Transparent cookie banner informs you about cookie usage on first visit.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        className="contact-section"
        style={{
          padding: 'clamp(30px, 5vw, 40px) clamp(16px, 4vw, 24px)',
          background: '#FFFFFF'
        }}
      >
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 4vw, 24px)',
            fontWeight: 600,
            color: '#1D1D1F',
            marginBottom: '12px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            textAlign: 'center'
          }}>
            Data Protection Contact
          </h2>
          <p style={{
            fontSize: 'clamp(13px, 2.5vw, 14px)',
            color: '#6E6E73',
            lineHeight: 1.5,
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            For all data protection questions, contact our GDPR coordinator
          </p>

          <div 
            className="contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: '32px',
              alignItems: 'start'
            }}
          >
            <div 
              className="contact-card"
              style={{
                background: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
                borderRadius: '17px',
                padding: '21px',
                border: '1px solid rgba(0, 113, 227, 0.08)',
                boxShadow: '0 4px 13px rgba(0, 113, 227, 0.05)',
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
                borderRadius: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 13px',
                boxShadow: '0 2px 8px rgba(0, 113, 227, 0.2)'
              }}>
                <Mail size={20} color="#FFFFFF" />
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '6px'
              }}>
                GDPR Koordinator
              </h3>
              <p 
                className="email"
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#0071E3',
                  marginBottom: '6px',
                  wordBreak: 'break-all'
                }}
              >
                busines.watch.this@gmail.com
              </p>
              <p 
                className="description"
                style={{
                  color: '#6E6E73',
                  fontSize: '13px'
                }}
              >
                For all data protection questions
              </p>
            </div>

            <div 
              className="contact-card emergency-card"
              style={{
                background: 'linear-gradient(135deg, #FFF8F0 0%, #FFFFFF 100%)',
                borderRadius: '17px',
                padding: '19px',
                border: '1px solid rgba(255, 159, 64, 0.15)',
                boxShadow: '0 4px 13px rgba(255, 159, 64, 0.08)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '13px'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  background: 'linear-gradient(135deg, #FF9F40 0%, #FF6B35 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(255, 159, 64, 0.3)'
                }}>
                  <AlertTriangle size={16} color="#FFFFFF" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#1D1D1F',
                    marginBottom: '8px'
                  }}>
                    Security emergencies
                  </h3>
                  <p style={{
                    color: '#6E6E73',
                    lineHeight: 1.5,
                    fontSize: '13px',
                    marginBottom: '8px'
                  }}>
                    In case of suspected data security breach or information leak,
                    contact us immediately via email.
                  </p>
                  <div 
                    className="status-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 159, 64, 0.1)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#E67E22'
                    }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#E67E22',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }} />
                    <span>Monitoring i incident response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </PageLayout>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }

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

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Mobile responsive styles for GDPR table */
        @media (max-width: 768px) {
          .gdpr-table-header {
            display: none !important;
          }
          
          .gdpr-table-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 20px !important;
          }
          
          .gdpr-table-row > div:first-child {
            display: flex !important;
            justify-content: flex-start !important;
            align-items: center !important;
            gap: 12px !important;
            margin-bottom: 8px !important;
          }
          
          .gdpr-table-row > div:first-child > div {
            width: 40px !important;
            height: 40px !important;
            margin: 0 !important;
          }
          
          .gdpr-table-row > div:first-child > div > svg {
            width: 20px !important;
            height: 20px !important;
          }
          
          .gdpr-table-row > div:nth-child(2) {
            margin-bottom: 16px !important;
          }
          
          .gdpr-table-row > div:nth-child(2) h3 {
            font-size: 18px !important;
            margin-bottom: 8px !important;
          }
          
          .gdpr-table-row > div:nth-child(2) p {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }
          
          .gdpr-table-row > div:last-child {
            margin-top: 0 !important;
          }
          
          .gdpr-table-row > div:last-child > div {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          
          .gdpr-table-row > div:last-child > div > div {
            padding: 8px 12px !important;
            font-size: 12px !important;
          }
        }

        /* Mobile responsive styles for User Rights cards */
        @media (max-width: 768px) {
          .user-rights-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .user-right-card {
            padding: 20px !important;
            margin: 0 !important;
          }
          
          .user-right-card > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 16px !important;
          }
          
          .user-right-card > div:first-child > div:first-child {
            width: 40px !important;
            height: 40px !important;
            flex-shrink: 0 !important;
          }
          
          .user-right-card > div:first-child > div:first-child > svg {
            width: 20px !important;
            height: 20px !important;
          }
          
          .user-right-card > div:first-child > h3 {
            font-size: 18px !important;
            line-height: 1.3 !important;
            margin: 0 !important;
          }
          
          .user-right-card > p {
            font-size: 14px !important;
            line-height: 1.6 !important;
            margin-bottom: 0 !important;
          }
        }

        /* Comprehensive mobile responsive styles for all sections */
        @media (max-width: 768px) {
          /* Hero section mobile improvements */
          .hero-section {
            padding: 60px 16px 80px !important;
            text-align: center !important;
          }
          
          .hero-section h1 {
            font-size: 36px !important;
            line-height: 1.1 !important;
            margin-bottom: 16px !important;
          }
          
          .hero-section p {
            font-size: 16px !important;
            line-height: 1.5 !important;
            margin-bottom: 24px !important;
          }
          
          /* GDPR Principles section mobile */
          .gdpr-principles-section {
            padding: 60px 16px !important;
          }
          
          .gdpr-principles-section h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          .gdpr-principles-section p {
            font-size: 16px !important;
            margin-bottom: 40px !important;
          }
          
          /* Data collection section mobile */
          .data-collection-section {
            padding: 60px 16px !important;
          }
          
          .data-collection-section h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          .data-collection-section p {
            font-size: 16px !important;
            margin-bottom: 40px !important;
          }
          
          .data-collection-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .data-category-card {
            padding: 20px !important;
          }
          
          .data-category-card h3 {
            font-size: 20px !important;
            margin-bottom: 12px !important;
          }
          
          .data-category-card p {
            font-size: 14px !important;
            margin-bottom: 16px !important;
          }
          
          .data-category-card ul li {
            font-size: 14px !important;
            margin-bottom: 8px !important;
          }
          
          /* How We Use Data section mobile */
          .how-we-use-data-section {
            padding: 60px 16px !important;
          }
          
          .how-we-use-data-section .grid-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .how-we-use-data-section h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          .how-we-use-data-section p {
            font-size: 16px !important;
            margin-bottom: 24px !important;
          }
          
          .how-we-use-data-section .info-box {
            padding: 20px !important;
          }
          
          .how-we-use-data-section .info-box h4 {
            font-size: 16px !important;
            margin-bottom: 12px !important;
          }
          
          .how-we-use-data-section .info-box ul li {
            font-size: 14px !important;
            margin-bottom: 8px !important;
          }
          
          /* Security measures section mobile */
          .security-measures-section {
            padding: 60px 16px !important;
          }
          
          .security-measures-section h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          .security-measures-section p {
            font-size: 16px !important;
            margin-bottom: 40px !important;
          }
          
          .security-measures-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .security-measure-card {
            padding: 20px !important;
          }
          
          .security-measure-card h3 {
            font-size: 18px !important;
            margin-bottom: 12px !important;
          }
          
          .security-measure-card p {
            font-size: 14px !important;
            margin-bottom: 16px !important;
          }
          
          .security-measure-card ul li {
            font-size: 13px !important;
            margin-bottom: 6px !important;
          }
          
          /* Data retention section mobile */
          .data-retention-section {
            padding: 60px 16px !important;
          }
          
          .data-retention-section h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          .data-retention-section p {
            font-size: 16px !important;
            margin-bottom: 32px !important;
          }
          
          .data-retention-content {
            padding: 32px 20px !important;
          }
          
          .data-retention-content h3 {
            font-size: 18px !important;
            margin-bottom: 12px !important;
          }
          
          .data-retention-content p {
            font-size: 14px !important;
            line-height: 1.6 !important;
            margin-bottom: 16px !important;
          }
          
          /* User rights section mobile */
          .user-rights-section {
            padding: 60px 16px !important;
          }
          
          .user-rights-section h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          .user-rights-section p {
            font-size: 16px !important;
            margin-bottom: 40px !important;
          }
          
          /* Cookie policy section mobile */
          .cookie-policy-section {
            padding: 60px 16px !important;
          }
          
          .cookie-policy-section h2 {
            font-size: 28px !important;
            margin-bottom: 16px !important;
          }
          
          .cookie-policy-section p {
            font-size: 16px !important;
            margin-bottom: 40px !important;
          }
          
          .cookie-policy-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .cookie-policy-card {
            padding: 20px !important;
          }
          
          .cookie-policy-card h3 {
            font-size: 18px !important;
            margin-bottom: 12px !important;
          }
          
          .cookie-policy-card p {
            font-size: 14px !important;
            margin-bottom: 16px !important;
          }
          
          .cookie-policy-card ul li {
            font-size: 14px !important;
            margin-bottom: 12px !important;
          }
          
          .cookie-policy-card ul li strong {
            font-size: 14px !important;
          }
          
          .cookie-policy-card ul li div {
            font-size: 13px !important;
            margin-top: 4px !important;
          }
          
          /* Contact section mobile */
          .contact-section {
            padding: 40px 16px !important;
          }
          
          .contact-section h2 {
            font-size: 20px !important;
            margin-bottom: 8px !important;
          }
          
          .contact-section p {
            font-size: 14px !important;
            margin-bottom: 20px !important;
          }
          
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          .contact-card {
            padding: 16px !important;
          }
          
          .contact-card h3 {
            font-size: 14px !important;
            margin-bottom: 4px !important;
          }
          
          .contact-card p {
            font-size: 13px !important;
            margin-bottom: 4px !important;
          }
          
          .contact-card .email {
            font-size: 13px !important;
            word-break: break-all !important;
          }
          
          .contact-card .description {
            font-size: 12px !important;
          }
          
          .contact-card .emergency-card {
            padding: 12px !important;
          }
          
          .contact-card .emergency-card h3 {
            font-size: 13px !important;
            margin-bottom: 6px !important;
          }
          
          .contact-card .emergency-card p {
            font-size: 12px !important;
            margin-bottom: 6px !important;
          }
          
          .contact-card .emergency-card .status-badge {
            font-size: 10px !important;
            padding: 3px 6px !important;
          }
        }
      `}</style>
    </>
  );
};

export default PrivacyGdprPage;
