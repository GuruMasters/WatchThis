import { SectionAngle } from '../../components/layout/SectionAngle';
import React from 'react';
import { PageLayout } from '../../components/layout/page-layout';
import {
  Shield,
  Eye,
  Lock,
  Database,
  Mail,
  Phone,
  Globe,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = 'January 15, 2024';

  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, participate in surveys or events, or contact us for support. This may include:`,
      list: [
        'Name, email address, and contact information',
        'Payment and billing information',
        'Account credentials and preferences',
        'Communications you send to us',
        'Survey responses and feedback'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:`,
      list: [
        'Provide, maintain, and improve our services',
        'Process transactions and send related information',
        'Send technical notices, updates, and support messages',
        'Respond to your comments and questions',
        'Communicate with you about products, services, and events',
        'Monitor and analyze trends, usage, and activities'
      ]
    },
    {
      title: 'Information Sharing and Disclosure',
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:`,
      list: [
        'With service providers who assist us in operating our platform',
        'When required by law or to protect our rights',
        'In connection with a business transfer or acquisition',
        'With your explicit consent'
      ]
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:`,
      list: [
        'Encryption of data in transit and at rest',
        'Regular security assessments and updates',
        'Access controls and authentication requirements',
        'Secure data centers and infrastructure',
        'Employee training on data protection'
      ]
    },
    {
      title: 'Your Rights and Choices',
      content: `You have certain rights regarding your personal information:`,
      list: [
        'Access, update, or delete your account information',
        'Opt-out of marketing communications',
        'Request data portability',
        'Object to certain processing activities',
        'Withdraw consent where applicable'
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar tracking technologies to collect and use personal information about you. You can control cookies through your browser settings, but some features may not function properly without them.`,
      list: [
        'Essential cookies for website functionality',
        'Analytics cookies to understand usage patterns',
        'Marketing cookies for personalized content',
        'Preference cookies to remember your settings'
      ]
    },
    {
      title: 'International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.`,
      list: [
        'Adequacy decisions by relevant authorities',
        'Standard contractual clauses',
        'Binding corporate rules',
        'Certification schemes'
      ]
    },
    {
      title: 'Data Retention',
      content: `We retain personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.`,
      list: [
        'Account data: Retained while account is active',
        'Transaction records: Retained for 7 years',
        'Marketing data: Retained until consent is withdrawn',
        'Legal compliance: Retained as required by law'
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'privacy@consultationpro.com',
      description: 'For privacy-related inquiries'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Monday-Friday, 9AM-6PM EST'
    },
    {
      icon: Globe,
      title: 'Address',
      value: '123 Business Ave, Tech District',
      description: 'Belgrade, Serbia 11000'
    }
  ];

  return (
    <PageLayout
      title="Privacy Policy"
      description="Learn how we collect, use, and protect your personal information when you use our services."
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30"></div>
                <div className="relative w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Privacy <span className="text-primary-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <SectionAngle color="yellow" cut="top" paddingClass="py-16">
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent</h3>
                <p className="text-gray-600 text-sm">We clearly explain what data we collect and why</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Secure</h3>
                <p className="text-gray-600 text-sm">Your data is protected with industry-standard security measures</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Controlled</h3>
                <p className="text-gray-600 text-sm">You have control over your data and how it's used</p>
              </div>
            </div>
        </div>
      </SectionAngle>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{section.content}</p>
                  <ul className="space-y-3">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
                Contact Our <span className="text-primary-600">Privacy Team</span>
              </h2>
              <p className="text-xl text-gray-600">
                Have questions about this privacy policy or need to exercise your privacy rights?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <h2 className="text-3xl font-black mb-6 text-gray-900">Legal Notice</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              This privacy policy is effective as of {lastUpdated} and may be updated periodically.
              We will notify you of any material changes by posting the updated policy on our website
              and updating the "Last Updated" date above.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
