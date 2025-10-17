import { SectionAngle } from '../../components/layout/SectionAngle';
import React from 'react';
import { PageLayout } from '../../components/layout/page-layout';
import {
  Cookie,
  Settings,
  Eye,
  Shield,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  X,
  AlertTriangle,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  const lastUpdated = 'January 15, 2024';

  const cookieTypes = [
    {
      category: 'Essential Cookies',
      description: 'Required for basic website functionality and cannot be disabled.',
      cookies: [
        { name: '_session_id', purpose: 'Maintains user session', duration: 'Session', provider: 'WatchThis' },
        { name: '_csrf_token', purpose: 'Prevents cross-site attacks', duration: 'Session', provider: 'WatchThis' },
        { name: 'auth_token', purpose: 'User authentication', duration: '30 days', provider: 'WatchThis' }
      ],
      required: true
    },
    {
      category: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      cookies: [
        { name: '_ga', purpose: 'Google Analytics tracking', duration: '2 years', provider: 'Google' },
        { name: '_gid', purpose: 'Google Analytics session', duration: '24 hours', provider: 'Google' },
        { name: 'hotjar_id', purpose: 'User behavior tracking', duration: '1 year', provider: 'Hotjar' }
      ],
      required: false
    },
    {
      category: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaign performance.',
      cookies: [
        { name: 'fb_pixel', purpose: 'Facebook advertising', duration: '90 days', provider: 'Facebook' },
        { name: 'linkedin_insight', purpose: 'LinkedIn advertising', duration: '90 days', provider: 'LinkedIn' },
        { name: 'google_ads', purpose: 'Google advertising', duration: '90 days', provider: 'Google' }
      ],
      required: false
    },
    {
      category: 'Preference Cookies',
      description: 'Remember your settings and preferences for a personalized experience.',
      cookies: [
        { name: 'theme_preference', purpose: 'Dark/light mode setting', duration: '1 year', provider: 'WatchThis' },
        { name: 'language_setting', purpose: 'User language preference', duration: '1 year', provider: 'WatchThis' },
        { name: 'notification_settings', purpose: 'User notification preferences', duration: '1 year', provider: 'WatchThis' }
      ],
      required: false
    }
  ];

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and user behavior tracking',
      privacyPolicy: 'https://policies.google.com/privacy',
      cookies: ['_ga', '_gid', '_gat']
    },
    {
      name: 'Facebook Pixel',
      purpose: 'Advertising and conversion tracking',
      privacyPolicy: 'https://www.facebook.com/policy.php',
      cookies: ['fb_pixel', 'fbc', 'fbp']
    },
    {
      name: 'Hotjar',
      purpose: 'User experience and behavior analysis',
      privacyPolicy: 'https://www.hotjar.com/privacy',
      cookies: ['hotjar_id', 'hotjar_session']
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Privacy Officer',
      value: 'privacy@consultationpro.com',
      description: 'For cookie-related inquiries'
    },
    {
      icon: Phone,
      title: 'Support Line',
      value: '+1 (555) 123-4567',
      description: 'Monday-Friday, 9AM-6PM EST'
    }
  ];

  return (
    <PageLayout
      title="Cookie Policy"
      description="Learn about the cookies and tracking technologies we use on our website and how you can control them."
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30"></div>
                <div className="relative w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Cookie className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Cookie <span className="text-primary-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              We use cookies and similar technologies to enhance your browsing experience and provide personalized content.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Overview */}
      <SectionAngle color="yellow" cut="top" paddingClass="py-16">
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Essential</h3>
                <p className="text-gray-600 text-sm">Required for website functionality</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm">Help us understand usage patterns</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Marketing</h3>
                <p className="text-gray-600 text-sm">Deliver relevant advertisements</p>
              </div>
            </div>
        </div>
      </SectionAngle>

      {/* Cookie Categories */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {cookieTypes.map((category, index) => (
                <div key={index} className="glass-card p-8 rounded-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.category}</h2>
                      <p className="text-gray-600 leading-relaxed">{category.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      category.required
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {category.required ? 'Required' : 'Optional'}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Cookie Name</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Purpose</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Duration</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Provider</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.cookies.map((cookie, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-3 px-4">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{cookie.name}</code>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">{cookie.purpose}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{cookie.duration}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{cookie.provider}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6">
                Third-Party <span className="text-primary-600">Services</span>
              </h2>
              <p className="text-xl text-gray-600">
                We use trusted third-party services that may set their own cookies. Learn about their privacy practices.
              </p>
            </div>

            <div className="space-y-6">
              {thirdPartyServices.map((service, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-3">{service.purpose}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.cookies.map((cookie, idx) => (
                          <code key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                            {cookie}
                          </code>
                        ))}
                      </div>
                    </div>
                    <a
                      href={service.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2"
                    >
                      Privacy Policy
                      <AlertTriangle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6">
                Managing <span className="text-primary-600">Cookies</span>
              </h2>
              <p className="text-xl text-gray-600">
                You have control over your cookie preferences and can manage them in several ways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Browser Settings</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Most web browsers allow you to control cookies through their settings preferences.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Block all cookies from websites</li>
                  <li>• Block third-party cookies only</li>
                  <li>• Be notified before cookies are set</li>
                  <li>• Delete existing cookies</li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Cookie Consent</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  You can manage your cookie preferences using our cookie consent banner.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Accept all cookies</li>
                  <li>• Reject non-essential cookies</li>
                  <li>• Customize cookie preferences</li>
                  <li>• Withdraw consent at any time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6">
                Questions About <span className="text-primary-600">Cookies</span>?
              </h2>
              <p className="text-xl text-gray-600">
                Contact our privacy team for questions about our cookie policy or cookie management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{contact.title}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{contact.value}</p>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black mb-6 text-gray-900">Important Notice</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              This cookie policy is effective as of {lastUpdated} and may be updated periodically.
              We will notify you of any material changes by posting the updated policy on our website.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CookiePolicyPage;
