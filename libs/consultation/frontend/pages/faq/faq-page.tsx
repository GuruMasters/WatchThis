import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
// (Quick message email removed per request)

/**
 * COMPLETE APPLE REDESIGN - FAQ Page
 * 
 * Clean, searchable FAQ with accordion
 */

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // Quick message state removed

  const faqs: FAQItem[] = [
    {
      category: 'General',
      question: 'What services do you offer?',
      answer: 'We offer comprehensive digital services including Web & App Development, SEO & Paid Media, Business Consulting, and Support & Maintenance. Each service is tailored to meet your specific business needs and goals.'
    },
    {
      category: 'General',
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a complex application could take 3-6 months. We provide detailed timelines during the initial consultation.'
    },
    {
      category: 'General',
      question: 'What is your pricing structure?',
      answer: 'We offer flexible pricing based on project requirements. We can work on a fixed-price basis for well-defined projects or hourly rates for ongoing work. Contact us for a detailed quote.'
    },
    {
      category: 'Development',
      question: 'What technologies do you work with?',
      answer: 'We specialize in modern technologies including React, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Firebase. We always use the best tools for your specific needs.'
    },
    {
      category: 'Development',
      question: 'Do you build mobile apps?',
      answer: 'Yes! We build native iOS and Android apps, as well as cross-platform solutions using React Native. We can help you choose the best approach for your project.'
    },
    {
      category: 'Development',
      question: 'Can you help with existing projects?',
      answer: 'Absolutely! We can take over existing projects, perform code audits, fix bugs, add features, or provide ongoing maintenance and support.'
    },
    {
      category: 'Marketing',
      question: 'How do you measure success for marketing campaigns?',
      answer: "We track key metrics including website traffic, conversion rates, ROI, cost per acquisition, and engagement rates. You'll receive regular reports with actionable insights."
    },
    {
      category: 'Marketing',
      question: 'Do you handle social media management?',
      answer: 'Yes, we offer social media strategy, content creation, paid advertising, and community management across all major platforms.'
    },
    {
      category: 'Marketing',
      question: 'How long until I see results from SEO?',
      answer: "SEO is a long-term strategy. You'll typically see initial improvements in 3-6 months, with significant results after 6-12 months of consistent effort."
    },
    {
      category: 'Support',
      question: 'What is included in your support packages?',
      answer: '24/7 monitoring, regular updates, security patches, bug fixes, performance optimization, and monthly reports. We offer different tiers to match your needs.'
    },
    {
      category: 'Support',
      question: 'Do you offer emergency support?',
      answer: 'Yes! We provide 24/7 emergency support for critical issues. Response times vary by support plan, with priority plans getting immediate attention.'
    },
    {
      category: 'Process',
      question: 'What is your development process?',
      answer: "We follow agile methodology with regular sprints, continuous feedback, and iterative improvements. You'll be involved throughout the process with regular demos and updates."
    },
    {
      category: 'Process',
      question: 'How do we communicate during the project?',
      answer: "We use your preferred communication tools (Slack, Teams, email) and schedule regular check-ins. You'll have a dedicated project manager as your main point of contact."
    },
    {
      category: 'Process',
      question: 'What happens after the project is complete?',
      answer: 'We provide training, documentation, and a warranty period. We also offer ongoing support and maintenance packages to keep everything running smoothly.'
    },
    {
      category: 'Billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfer (preferred), major credit cards, and invoicing via popular procurement platforms. For longer engagements we can arrange milestone-based billing.'
    },
    {
      category: 'Billing',
      question: 'Do you require an upfront deposit?',
      answer: 'For fixed‑price projects we typically request a 30% project kickoff deposit, with the remainder tied to milestones. For time‑and‑materials, billing is monthly.'
    },
    {
      category: 'Security',
      question: 'How do you protect our data?',
      answer: 'We follow least‑privilege access, environment‑based secrets management, encrypted data in transit (TLS) and at rest (where applicable), and code reviews. NDAs and DPAs are available upon request.'
    },
    {
      category: 'Security',
      question: 'Will you sign an NDA?',
      answer: 'Yes. We can sign your standard NDA or provide ours before any sensitive information is shared.'
    },
    {
      category: 'Onboarding',
      question: 'How do we start working together?',
      answer: 'We begin with a short discovery call, align on goals, timeline, and scope, then provide a proposal. After approval and kickoff, we set up communication channels and a shared project board.'
    },
    {
      category: 'Maintenance',
      question: 'Do you provide SLAs and ongoing maintenance?',
      answer: 'Yes. We offer several support tiers with response-time SLAs, proactive monitoring, regular updates, and security patches.'
    },
    {
      category: 'Integrations',
      question: 'Can you integrate with our existing systems?',
      answer: 'Absolutely. We regularly integrate with CRMs, payment gateways, analytics, and internal APIs. We design contracts and webhooks to keep systems in sync reliably.'
    }
  ];

  // Quick message handler removed

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* ===========================
          HERO SECTION
          =========================== */}
      <section style={{
        padding: '140px 24px 80px',
        backgroundColor: '#F5F5F7',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}>
            <HelpCircle size={48} color="#0071E3" strokeWidth={1.5} />
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 72px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Frequently Asked Questions
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            maxWidth: '700px',
            margin: '0 auto 48px'
          }}>
            Find answers to common questions about our services, process, and pricing.
          </p>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <Search size={20} color="#86868B" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 52px',
                fontSize: '17px',
                border: '1px solid #D2D2D7',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease',
                background: '#FFFFFF',
                color: '#1D1D1F',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0071E3';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(0, 113, 227, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#D2D2D7';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* ===========================
          FAQ CATEGORIES
          =========================== */}
      <section style={{
        padding: '80px 24px'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {categories.map((category) => {
            const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
            
            if (categoryFAQs.length === 0) return null;

            return (
              <div key={category} style={{ marginBottom: '64px' }}>
          <h2 style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '32px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {category}
          </h2>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {categoryFAQs.map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isExpanded = expandedIndex === globalIndex;

                    return (
                      <div
                        key={index}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D2D2D7',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {/* Question Header */}
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : globalIndex)}
                          style={{
                            width: '100%',
                            padding: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F5F5F7';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <span style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            color: '#1D1D1F',
                            flex: 1
                          }}>
                            {faq.question}
                          </span>
                          
                          {isExpanded ? (
                            <ChevronUp size={24} color="#0071E3" strokeWidth={2} />
                          ) : (
                            <ChevronDown size={24} color="#86868B" strokeWidth={2} />
                          )}
                        </button>

                        {/* Answer */}
                        {isExpanded && (
                          <div style={{
                            padding: '0 24px 24px',
                            borderTop: '1px solid #F5F5F7'
                          }}>
                            <p style={{
                              fontSize: '16px',
                              lineHeight: 1.6,
                              color: '#6E6E73',
                              marginTop: '16px'
                            }}>
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 24px'
            }}>
              <p style={{
                fontSize: '18px',
                color: '#86868B'
              }}>
                No questions found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===========================
          CTA SECTION
          =========================== */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: '#F5F5F7',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1D1D1F',
            marginBottom: '16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Still Have Questions?
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '24px'
          }}>
            Still have questions? Write us — we usually respond within one business day.
          </p>

          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg">Send Message</Button>
          </Link>

          <div style={{ height: 12 }} />
          <Link to="/booking" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="lg">Book Consultation</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
