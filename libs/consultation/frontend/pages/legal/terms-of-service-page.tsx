import { SectionAngle } from '../../components/layout/SectionAngle';
import React from 'react';
import { PageLayout } from '../../components/layout/page-layout';
import {
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  CreditCard,
  Users,
  Clock,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  const lastUpdated = 'January 15, 2024';

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using WatchThis's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
      list: [
        'These terms apply to all users of our services',
        'Continued use constitutes acceptance of updates',
        'We reserve the right to modify these terms',
        'Users will be notified of significant changes'
      ]
    },
    {
      title: 'Service Description',
      content: `WatchThis provides business consulting, application development, digital marketing, and support services to help businesses grow and succeed in the digital landscape.`,
      list: [
        'Professional consulting services',
        'Custom application development',
        'Digital marketing solutions',
        'Ongoing support and maintenance',
        'Training and educational resources'
      ]
    },
    {
      title: 'User Responsibilities',
      content: `Users are responsible for:`,
      list: [
        'Providing accurate and complete information',
        'Maintaining the confidentiality of account credentials',
        'Using services in compliance with applicable laws',
        'Respecting intellectual property rights',
        'Not engaging in harmful or malicious activities'
      ]
    },
    {
      title: 'Payment Terms',
      content: `Payment terms and billing procedures:`,
      list: [
        'Services are billed according to agreed pricing',
        'Payment is due within 30 days of invoice date',
        'Late payments may incur additional charges',
        'All prices are exclusive of applicable taxes',
        'Refunds are provided according to our refund policy'
      ]
    },
    {
      title: 'Intellectual Property',
      content: `All content, features, and functionality of our services are owned by WatchThis and are protected by copyright, trademark, and other intellectual property laws.`,
      list: [
        'Service marks and logos are our property',
        'User-generated content may be used by us',
        'We respect third-party intellectual property',
        'Users retain rights to their own content'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law:`,
      list: [
        'We are not liable for indirect damages',
        'Our total liability is limited to service fees paid',
        'We do not guarantee uninterrupted service',
        'Users assume certain risks when using our services'
      ]
    },
    {
      title: 'Service Availability',
      content: `While we strive for high availability:`,
      list: [
        'Services may be temporarily unavailable',
        'Scheduled maintenance will be communicated',
        'Emergency maintenance may occur without notice',
        'We are not liable for downtime losses'
      ]
    },
    {
      title: 'Termination',
      content: `Either party may terminate services:`,
      list: [
        'With 30 days written notice',
        'Immediately for breach of terms',
        'Upon completion of agreed services',
        'According to specific contract terms'
      ]
    }
  ];

  const prohibitedActivities = [
    'Violating laws or regulations',
    'Infringing on intellectual property rights',
    'Transmitting viruses or malicious code',
    'Attempting to gain unauthorized access',
    'Using services for illegal purposes',
    'Engaging in fraudulent activities',
    'Harassing or abusing other users',
    'Overloading our systems or infrastructure'
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Legal Department',
      value: 'legal@consultationpro.com',
      description: 'For legal inquiries and notices'
    },
    {
      icon: Phone,
      title: 'Business Hours',
      value: 'Mon-Fri, 9AM-6PM EST',
      description: 'Phone support availability'
    }
  ];

  return (
    <PageLayout
      title="Terms of Service"
      description="Read our terms of service to understand your rights and responsibilities when using our services."
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30"></div>
                <div className="relative w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Scale className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Terms of <span className="text-primary-600">Service</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              Please read these terms of service carefully before using our services.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <SectionAngle color="yellow" cut="top" paddingClass="py-16">
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Fair & Transparent</h3>
                <p className="text-gray-600 text-sm">Clear terms that protect both parties</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Secure</h3>
                <p className="text-gray-600 text-sm">Your data and transactions are protected</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Collaborative</h3>
                <p className="text-gray-600 text-sm">Partnership approach to achieve success</p>
              </div>
            </div>
        </div>
      </SectionAngle>

      {/* Terms Content */}
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

              {/* Prohibited Activities */}
              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Activities</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The following activities are strictly prohibited when using our services:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prohibitedActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-600">{activity}</span>
                    </div>
                  ))}
                </div>
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
                Questions About <span className="text-primary-600">These Terms</span>?
              </h2>
              <p className="text-xl text-gray-600">
                Contact our legal team for clarification or assistance with these terms of service.
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

      {/* Agreement Notice */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black mb-6 text-gray-900">Agreement to Terms</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              If you do not agree with these terms, please do not use our services.
            </p>
            <div className="bg-white shadow-sm p-6 rounded-xl border border-gray-200">
              <p className="text-gray-600">
                These terms constitute the entire agreement between you and WatchThis and supersede all prior agreements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfServicePage;
